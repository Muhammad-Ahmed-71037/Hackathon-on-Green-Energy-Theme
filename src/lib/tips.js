export function getOptimizationTips(inputs, outputs) {
  const tips = [];

  if (inputs.daytimeUsagePct < 40) {
    tips.push({
      title: 'Shift Usage to Solar Hours',
      body: 'Try moving heavy tasks like laundry, ironing, and water heating to 11 AM–3 PM when solar generation is at its peak. This maximizes your solar savings.',
    });
  }

  if (inputs.heavyHours > 4) {
    tips.push({
      title: 'Reduce Heavy Appliance Runtime',
      body: 'Your AC or heater runs more than 4 hours daily. Set AC to 26°C, use ceiling fans, and schedule cooling only when needed. This can cut your bill by 20-30%.',
    });
  }

  if (outputs.paybackYears > 4) {
    tips.push({
      title: 'Optimize System Size',
      body: 'Your payback period is quite long. Consider right-sizing your system to match consumption better, or enable net-metering to sell excess power back to the grid.',
    });
  }

  if (outputs.ecoScore >= 80) {
    tips.push({
      title: 'Excellent Efficiency!',
      body: 'Your energy habits are stellar! Keep up the good work. Regular panel cleaning and annual system audits will maintain peak performance.',
    });
  } else if (outputs.ecoScore < 60) {
    tips.push({
      title: 'Boost Your Eco Score',
      body: 'Small changes make a big difference. Increase daytime usage, reduce AC hours, and align consumption with solar generation to improve your score.',
    });
  }

  tips.push({
    title: 'Panel Maintenance',
    body: 'Clean your solar panels monthly to recover 3-5% efficiency loss from dust. In Pakistan\'s climate, this simple step significantly improves output.',
  });

  return tips;
}
