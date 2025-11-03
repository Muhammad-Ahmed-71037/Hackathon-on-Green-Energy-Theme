// Optional Gemini AI integration for generating personalized energy tips
// Note: Using this in the browser exposes your API key. For hackathon demos only.
// In production, proxy this request via a serverless function.

const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Simple in-memory cache to avoid hitting rate limits
const tipsCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Rate limiting: minimum delay between API calls
let lastApiCall = 0;
const MIN_DELAY = 3000; // 3 seconds between calls

function getCacheKey(inputs, outputs) {
  return `${inputs.city}-${inputs.monthlyUnits}-${inputs.heavyHours}-${inputs.daytimeUsagePct}-${Math.round(outputs.systemKW)}`;
}

export async function generateAiTips(inputs, outputs) {
  const apiKey = 'AIzaSyClP3FwJ7xjsH_a8ZawOOBZZpXk9n6DTjE';
  if (!apiKey) return null;

  // Check cache first
  const cacheKey = getCacheKey(inputs, outputs);
  const cached = tipsCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('✅ Using cached AI tips');
    return cached.tips;
  }

  // Rate limiting: ensure minimum delay between API calls
  const now = Date.now();
  const timeSinceLastCall = now - lastApiCall;
  if (timeSinceLastCall < MIN_DELAY) {
    console.log(`⏳ Rate limit: waiting ${MIN_DELAY - timeSinceLastCall}ms`);
    await new Promise(resolve => setTimeout(resolve, MIN_DELAY - timeSinceLastCall));
  }

  try {
    lastApiCall = Date.now();
    const prompt = buildPrompt(inputs, outputs);
    const res = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500, // Reasonable limit for 3-5 tips
          responseMimeType: 'application/json', // Force JSON output
        }
      })
    });

    if (res.status === 429) {
      console.warn('⚠️ API rate limit hit, using fallback rules');
      return null;
    }

    if (!res.ok) {
      throw new Error(`Gemini error: ${res.status}`);
    }

    const data = await res.json();
    console.log('🔍 Full Gemini response:', JSON.stringify(data, null, 2)); // Debug: full response
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    console.log('🤖 Gemini text extracted:', text.substring(0, 200)); // Debug: show first 200 chars
    const parsed = parseTips(text);
    
    if (parsed.length) {
      // Cache successful results
      tipsCache.set(cacheKey, {
        tips: parsed,
        timestamp: Date.now()
      });
      console.log('✅ AI tips generated successfully:', parsed.length, 'tips');
      return parsed;
    }
    
    console.warn('⚠️ Gemini returned empty or unparseable response');
    return null;
  } catch (e) {
    console.error('AI tips failed, falling back to rules', e.message);
    return null;
  }
}

function buildPrompt(inputs, outputs) {
  return `You are an energy efficiency coach for households in Pakistan.
Given the user's inputs and computed solar plan, generate 3-5 concise, practical tips.
Keep it 1-2 sentences per tip. Avoid fluff. Mention Pakistan context when relevant.
Return JSON array of objects with keys: title, body.

Inputs (Pakistan):
- City: ${inputs.city}
- Monthly units (kWh): ${inputs.monthlyUnits}
- Heavy appliance hours/day: ${inputs.heavyHours}
- Daytime usage %: ${inputs.daytimeUsagePct}
- Budget (Rs): ${inputs.budget}
- Net-metering: ${inputs.netMetering}

Outputs:
- System size (kW): ${outputs.systemKW}
- Monthly generation (kWh): ${outputs.monthlyGenKWh}
- Monthly savings (Rs): ${outputs.monthlySavingsRs}
- Payback (years): ${outputs.paybackYears}
- 5yr ROI %: ${outputs.roi5yr}
- Eco score: ${outputs.ecoScore}
- CO2 avoided / year (kg): ${outputs.co2AvoidedKgYear}

JSON only, no extra text.`;
}

function parseTips(text) {
  try {
    const jsonStart = text.indexOf('[');
    const jsonEnd = text.lastIndexOf(']') + 1;
    if (jsonStart === -1 || jsonEnd === 0) return [];
    const sliced = text.slice(jsonStart, jsonEnd);
    const tips = JSON.parse(sliced);
    return Array.isArray(tips)
      ? tips
          .filter(t => t && t.title && t.body)
          .slice(0, 5)
      : [];
  } catch {
    return [];
  }
}
