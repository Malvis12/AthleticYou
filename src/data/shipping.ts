export interface StateOption {
  code: string;
  name: string;
  zone: 'lagos' | 'southwest' | 'regional' | 'remote';
  deliveryDays: string;
  fee: number;
}

export const NIGERIAN_STATES: StateOption[] = [
  { code: 'LA', name: 'Lagos', zone: 'lagos', deliveryDays: '1 - 2 business days', fee: 3500 },
  { code: 'AB', name: 'Abuja (FCT)', zone: 'regional', deliveryDays: '2 - 4 business days', fee: 6500 },
  { code: 'OG', name: 'Ogun State', zone: 'southwest', deliveryDays: '2 - 3 business days', fee: 5000 },
  { code: 'OY', name: 'Oyo State (Ibadan)', zone: 'southwest', deliveryDays: '2 - 3 business days', fee: 5000 },
  { code: 'RI', name: 'Rivers State (Port Harcourt)', zone: 'regional', deliveryDays: '3 - 4 business days', fee: 7000 },
  { code: 'ED', name: 'Edo State (Benin City)', zone: 'regional', deliveryDays: '3 - 4 business days', fee: 6500 },
  { code: 'DE', name: 'Delta State (Warri/Asaba)', zone: 'regional', deliveryDays: '3 - 4 business days', fee: 7000 },
  { code: 'AN', name: 'Anambra State (Onitsha/Awka)', zone: 'regional', deliveryDays: '3 - 4 business days', fee: 7000 },
  { code: 'EN', name: 'Enugu State', zone: 'regional', deliveryDays: '3 - 5 business days', fee: 7500 },
  { code: 'KA', name: 'Kaduna State', zone: 'regional', deliveryDays: '3 - 5 business days', fee: 8000 },
  { code: 'KN', name: 'Kano State', zone: 'regional', deliveryDays: '3 - 5 business days', fee: 8000 },
  { code: 'KW', name: 'Kwara State (Ilorin)', zone: 'regional', deliveryDays: '3 - 4 business days', fee: 6000 },
  { code: 'OT', name: 'Other Nigerian States', zone: 'remote', deliveryDays: '4 - 6 business days', fee: 9500 }
];

export const FREE_SHIPPING_THRESHOLD = 250000;
