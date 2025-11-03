// Bank financing options for solar installations in Pakistan

export const BANKS = [
  {
    id: 'bank_001',
    name: 'State Bank Green Finance',
    logo: '🏦',
    interestRate: 6.5,
    tenure: [3, 5, 7, 10],
    maxLoan: 3000000,
    processingFee: 1.5,
    greenSubsidy: true,
    subsidyAmount: 30000,
    approvalTime: '5-7 days',
    minDownPayment: 15,
  },
  {
    id: 'bank_002',
    name: 'HBL Solar Finance',
    logo: '🏦',
    interestRate: 7.8,
    tenure: [3, 5, 7],
    maxLoan: 2500000,
    processingFee: 2.0,
    greenSubsidy: false,
    subsidyAmount: 0,
    approvalTime: '3-5 days',
    minDownPayment: 20,
  },
  {
    id: 'bank_003',
    name: 'Allied Bank Green Loan',
    logo: '🏦',
    interestRate: 8.5,
    tenure: [3, 5],
    maxLoan: 2000000,
    processingFee: 1.8,
    greenSubsidy: true,
    subsidyAmount: 25000,
    approvalTime: '7-10 days',
    minDownPayment: 25,
  },
];

export const GOVERNMENT_SUBSIDY = {
  name: 'Pakistan Green Energy Initiative 2025',
  maxSubsidy: 100000,
  eligibilityCriteria: {
    minSystemSize: 3, // kW
    maxSystemSize: 10, // kW
    residentialOnly: true,
  },
  subsidyRate: 0.15, // 15% of total cost
  description: 'Government subsidy covers up to 15% of total solar installation cost for residential users',
};

export const calculateEMI = (principal, annualRate, years) => {
  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
               (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(emi);
};

export const calculateLoanOptions = (systemCost, outputs) => {
  const options = [];

  BANKS.forEach((bank) => {
    const downPayment = Math.round(systemCost * (bank.minDownPayment / 100));
    const loanAmount = systemCost - downPayment;
    const processingFee = Math.round(loanAmount * (bank.processingFee / 100));
    
    // Check government subsidy eligibility
    let govSubsidy = 0;
    if (
      outputs.systemKW >= GOVERNMENT_SUBSIDY.eligibilityCriteria.minSystemSize &&
      outputs.systemKW <= GOVERNMENT_SUBSIDY.eligibilityCriteria.maxSystemSize
    ) {
      govSubsidy = Math.min(
        Math.round(systemCost * GOVERNMENT_SUBSIDY.subsidyRate),
        GOVERNMENT_SUBSIDY.maxSubsidy
      );
    }

    const totalSubsidy = (bank.greenSubsidy ? bank.subsidyAmount : 0) + govSubsidy;
    const netLoanAmount = Math.max(0, loanAmount - totalSubsidy);

    bank.tenure.forEach((years) => {
      const emi = calculateEMI(netLoanAmount, bank.interestRate, years);
      const totalPayment = emi * years * 12;
      const totalInterest = totalPayment - netLoanAmount;

      // Check if EMI is less than monthly savings (key selling point!)
      const emiVsSavings = outputs.monthlySavingsRs > emi;

      options.push({
        bank: bank.name,
        logo: bank.logo,
        interestRate: bank.interestRate,
        tenure: years,
        downPayment,
        loanAmount: netLoanAmount,
        emi,
        totalPayment,
        totalInterest,
        processingFee,
        subsidyAmount: totalSubsidy,
        approvalTime: bank.approvalTime,
        emiVsSavings,
        netMonthlySavings: emiVsSavings ? outputs.monthlySavingsRs - emi : 0,
      });
    });
  });

  // Sort by best deal (lowest EMI first)
  return options.sort((a, b) => a.emi - b.emi);
};

export const getSubsidyEligibility = (systemKW) => {
  const { minSystemSize, maxSystemSize } = GOVERNMENT_SUBSIDY.eligibilityCriteria;
  
  if (systemKW < minSystemSize) {
    return {
      eligible: false,
      reason: `System too small. Minimum ${minSystemSize} kW required for subsidy.`,
    };
  }
  
  if (systemKW > maxSystemSize) {
    return {
      eligible: false,
      reason: `System too large. Maximum ${maxSystemSize} kW eligible for subsidy.`,
    };
  }
  
  return {
    eligible: true,
    reason: 'You qualify for government green energy subsidy!',
  };
};
