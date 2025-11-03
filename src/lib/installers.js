// Verified Solar Installers Database for Pakistan
export const INSTALLERS = {
  karachi: [
    {
      id: 'inst_001',
      name: 'Karachi Solar Solutions',
      rating: 4.8,
      reviews: 245,
      installationsCompleted: 1200,
      avgResponseTime: '2 hours',
      specialization: 'Residential & Commercial',
      priceRange: 'Rs 170k-185k per kW',
      phone: '+92-300-1234567',
      whatsapp: '+92-300-1234567',
      verified: true,
      greenCertified: true,
    },
    {
      id: 'inst_002',
      name: 'Sindh Renewable Energy',
      rating: 4.6,
      reviews: 180,
      installationsCompleted: 850,
      avgResponseTime: '3 hours',
      specialization: 'Industrial & Large-scale',
      priceRange: 'Rs 165k-180k per kW',
      phone: '+92-301-2345678',
      whatsapp: '+92-301-2345678',
      verified: true,
      greenCertified: true,
    },
    {
      id: 'inst_003',
      name: 'Metro Solar Tech',
      rating: 4.5,
      reviews: 120,
      installationsCompleted: 600,
      avgResponseTime: '4 hours',
      specialization: 'Budget-Friendly Solutions',
      priceRange: 'Rs 160k-175k per kW',
      phone: '+92-302-3456789',
      whatsapp: '+92-302-3456789',
      verified: true,
      greenCertified: false,
    },
  ],
  lahore: [
    {
      id: 'inst_004',
      name: 'Punjab Solar Power',
      rating: 4.9,
      reviews: 320,
      installationsCompleted: 1500,
      avgResponseTime: '1 hour',
      specialization: 'Premium Installations',
      priceRange: 'Rs 175k-190k per kW',
      phone: '+92-303-4567890',
      whatsapp: '+92-303-4567890',
      verified: true,
      greenCertified: true,
    },
    {
      id: 'inst_005',
      name: 'Lahore Green Energy Co.',
      rating: 4.7,
      reviews: 200,
      installationsCompleted: 950,
      avgResponseTime: '2 hours',
      specialization: 'Residential & Schools',
      priceRange: 'Rs 170k-185k per kW',
      phone: '+92-304-5678901',
      whatsapp: '+92-304-5678901',
      verified: true,
      greenCertified: true,
    },
  ],
  islamabad: [
    {
      id: 'inst_006',
      name: 'Capital Solar Systems',
      rating: 4.8,
      reviews: 280,
      installationsCompleted: 1100,
      avgResponseTime: '2 hours',
      specialization: 'Government & Private Sector',
      priceRange: 'Rs 180k-195k per kW',
      phone: '+92-305-6789012',
      whatsapp: '+92-305-6789012',
      verified: true,
      greenCertified: true,
    },
  ],
  quetta: [
    {
      id: 'inst_007',
      name: 'Balochistan Solar Hub',
      rating: 4.6,
      reviews: 90,
      installationsCompleted: 400,
      avgResponseTime: '3 hours',
      specialization: 'Remote Area Installations',
      priceRange: 'Rs 185k-200k per kW',
      phone: '+92-306-7890123',
      whatsapp: '+92-306-7890123',
      verified: true,
      greenCertified: true,
    },
  ],
  peshawar: [
    {
      id: 'inst_008',
      name: 'KPK Renewable Solutions',
      rating: 4.7,
      reviews: 150,
      installationsCompleted: 700,
      avgResponseTime: '2 hours',
      specialization: 'Residential & SMEs',
      priceRange: 'Rs 175k-190k per kW',
      phone: '+92-307-8901234',
      whatsapp: '+92-307-8901234',
      verified: true,
      greenCertified: true,
    },
  ],
  multan: [
    {
      id: 'inst_009',
      name: 'South Punjab Solar',
      rating: 4.5,
      reviews: 110,
      installationsCompleted: 550,
      avgResponseTime: '3 hours',
      specialization: 'Agricultural & Residential',
      priceRange: 'Rs 170k-185k per kW',
      phone: '+92-308-9012345',
      whatsapp: '+92-308-9012345',
      verified: true,
      greenCertified: false,
    },
  ],
};

export const getInstallersByCity = (city) => {
  return INSTALLERS[city] || INSTALLERS.karachi;
};

// Lead generation pricing (what installers pay us)
export const LEAD_PRICING = {
  qualified: 800, // Rs per qualified lead (green verdict)
  borderline: 400, // Rs per borderline lead (yellow verdict)
  consultation: 200, // Rs per consultation request
};

// Calculate lead value
export const calculateLeadValue = (verdict) => {
  if (verdict === 'strong') return LEAD_PRICING.qualified;
  if (verdict === 'borderline') return LEAD_PRICING.borderline;
  return LEAD_PRICING.consultation;
};
