export const CITIES = {
  karachi: {
    name: 'Karachi',
    H: 5.2,
    tariffRsPerKWh: 25,
    costPerKW: 180000,
  },
  lahore: {
    name: 'Lahore',
    H: 5.0,
    tariffRsPerKWh: 26,
    costPerKW: 175000,
  },
  islamabad: {
    name: 'Islamabad',
    H: 4.8,
    tariffRsPerKWh: 24,
    costPerKW: 185000,
  },
  quetta: {
    name: 'Quetta',
    H: 5.5,
    tariffRsPerKWh: 23,
    costPerKW: 190000,
  },
  peshawar: {
    name: 'Peshawar',
    H: 4.9,
    tariffRsPerKWh: 24,
    costPerKW: 180000,
  },
  multan: {
    name: 'Multan',
    H: 5.3,
    tariffRsPerKWh: 25,
    costPerKW: 175000,
  },
};

export const getCityDefaults = (cityKey) => {
  return CITIES[cityKey] || CITIES.karachi;
};
