// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const customers = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    image_url: '/customers/hector-simpson.png',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Steven Tey',
    email: 'steven@tey.com',
    image_url: '/customers/steven-tey.png',
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    image_url: '/customers/steph-dietz.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    name: 'Emil Kowalski',
    email: 'emil@kowalski.com',
    image_url: '/customers/emil-kowalski.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: customers[7].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[6].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-18',
  },
  {
    customer_id: customers[0].id,
    amount: 8945,
    status: 'paid',
    date: '2023-10-04',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

const patientdetails = [
  {
    p_id: '990931003V',
    name: 'Ravindu Ilangamge',
    age: '25',
    gender: 'male',
    address: '607, Madamandiya, Panagoda, Homagama',
  },
  {
    p_id: '980931003V',
    name: 'Kavindu Rupesinghe',
    age: '26',
    gender: 'male',
    address: '6, Keremulla road, Panagoda, Homagama',
  },
  {
    p_id: '770931003V',
    name: 'Yamuna Perera',
    age: '47',
    gender: 'female',
    address: '33, watta road, Habarakada, Kaduwela',
  },
  {
    p_id: '20021931003',
    name: 'Upuli Saveena',
    age: '23',
    gender: 'female',
    address: '607, Madamandiya, Panagoda, Homagama',
  },
];

const visits = [
  {
    patient_id: '990931003V',
    date: '2023-12-06',
    pCompl: 'fever with diarrhea',
    hpc: 'onset 2 days ago. intermitent fever which is subsiding with PCM. Watery stools. 6 times per day. Not bloody/mucous.',
    pmhx: 'no significant pmhx',
    allergy: 'no allergy',
    examination: 'pale and ill looking',
    investigations_sofar: '',
    prescribed_med: 'PCM 1g sos, Jeewani',
    investigations_ordered: 'FBC, CRP',
  },
  {
    patient_id: '980931003V',
    date: '2023-12-19',
    pCompl: 'fever with diarrhea',
    hpc: 'onset 2 days ago. intermitent fever which is subsiding with PCM. Watery stools. 6 times per day. Not bloody/mucous.',
    pmhx: 'no significant pmhx',
    allergy: 'no allergy',
    examination: 'pale and ill looking',
    investigations_sofar: '',
    prescribed_med: 'PCM 1g sos, Jeewani',
    investigations_ordered: 'FBC, CRP',
  },
  {
    patient_id: '770931003V',
    date: '2023-12-16',
    pCompl: 'fever with diarrhea',
    hpc: 'onset 2 days ago. intermitent fever which is subsiding with PCM. Watery stools. 6 times per day. Not bloody/mucous.',
    pmhx: 'no significant pmhx',
    allergy: 'no allergy',
    examination: 'pale and ill looking',
    investigations_sofar: '',
    prescribed_med: 'PCM 1g sos, Jeewani',
    investigations_ordered: 'FBC, CRP',
  },
  {
    patient_id: '200516273456',
    date: '2023-12-24',
    pCompl: 'fever with diarrhea',
    hpc: 'onset 2 days ago. intermitent fever which is subsiding with PCM. Watery stools. 6 times per day. Not bloody/mucous.',
    pmhx: 'no significant pmhx',
    allergy: 'no allergy',
    examination: 'pale and ill looking',
    investigations_sofar: '',
    prescribed_med: 'PCM 1g sos, Jeewani',
    investigations_ordered: 'FBC, CRP',
  },
  {
    patient_id: '200516273456',
    date: '2023-12-12',
    pCompl: 'fever with diarrhea',
    hpc: 'onset 2 days ago. intermitent fever which is subsiding with PCM. Watery stools. 6 times per day. Not bloody/mucous.',
    pmhx: 'no significant pmhx',
    allergy: 'no allergy',
    examination: 'pale and ill looking',
    investigations_sofar: '',
    prescribed_med: 'PCM 1g sos, Jeewani',
    investigations_ordered: 'FBC, CRP',
  },
  {
    patient_id: '200516273456',
    date: '2023-12-10',
    pCompl: 'fever with diarrhea',
    hpc: 'onset 2 days ago. intermitent fever which is subsiding with PCM. Watery stools. 6 times per day. Not bloody/mucous.',
    pmhx: 'no significant pmhx',
    allergy: 'no allergy',
    examination: 'pale and ill looking',
    investigations_sofar: '',
    prescribed_med: 'PCM 1g sos, Jeewani',
    investigations_ordered: 'FBC, CRP',
  },
  {
    patient_id: '200112131425',
    date: '2023-12-30',
    pCompl: 'fever with diarrhea',
    hpc: 'onset 2 days ago. intermitent fever which is subsiding with PCM. Watery stools. 6 times per day. Not bloody/mucous.',
    pmhx: 'no significant pmhx',
    allergy: 'no allergy',
    examination: 'pale and ill looking',
    investigations_sofar: '',
    prescribed_med: 'PCM 1g sos, Jeewani',
    investigations_ordered: 'FBC, CRP',
  },
  {
    patient_id: '200112131425',
    date: '2023-12-07',
    pCompl: 'fever with diarrhea',
    hpc: 'onset 2 days ago. intermitent fever which is subsiding with PCM. Watery stools. 6 times per day. Not bloody/mucous.',
    pmhx: 'no significant pmhx',
    allergy: 'no allergy',
    examination: 'pale and ill looking',
    investigations_sofar: '',
    prescribed_med: 'PCM 1g sos, Jeewani',
    investigations_ordered: 'FBC, CRP',
  },
  {
    patient_id: '990931003V',
    date: '2023-08-06',
    pCompl: 'fever with diarrhea',
    hpc: 'onset 2 days ago. intermitent fever which is subsiding with PCM. Watery stools. 6 times per day. Not bloody/mucous.',
    pmhx: 'no significant pmhx',
    allergy: 'no allergy',
    examination: 'pale and ill looking',
    investigations_sofar: '',
    prescribed_med: 'PCM 1g sos, Jeewani',
    investigations_ordered: 'FBC, CRP',
  },
  {
    patient_id: '990931003V',
    date: '2023-05-06',
    pCompl: 'fever with diarrhea',
    hpc: 'onset 2 days ago. intermitent fever which is subsiding with PCM. Watery stools. 6 times per day. Not bloody/mucous.',
    pmhx: 'no significant pmhx',
    allergy: 'no allergy',
    examination: 'pale and ill looking',
    investigations_sofar: '',
    prescribed_med: 'PCM 1g sos, Jeewani',
    investigations_ordered: 'FBC, CRP',
  },
  {
    patient_id: '990931003V',
    date: '2023-04-06',
    pCompl: 'fever with diarrhea',
    hpc: 'onset 2 days ago. intermitent fever which is subsiding with PCM. Watery stools. 6 times per day. Not bloody/mucous.',
    pmhx: 'no significant pmhx',
    allergy: 'no allergy',
    examination: 'pale and ill looking',
    investigations_sofar: '',
    prescribed_med: 'PCM 1g sos, Jeewani',
    investigations_ordered: 'FBC, CRP',
  },
  {
    patient_id: '990931003V',
    date: '2023-03-06',
    pCompl: 'fever with diarrhea',
    hpc: 'onset 2 days ago. intermitent fever which is subsiding with PCM. Watery stools. 6 times per day. Not bloody/mucous.',
    pmhx: 'no significant pmhx',
    allergy: 'no allergy',
    examination: 'pale and ill looking',
    investigations_sofar: '',
    prescribed_med: 'PCM 1g sos, Jeewani',
    investigations_ordered: 'FBC, CRP',
  },
  {
    patient_id: '990931003V',
    date: '2023-02-06',
    pCompl: 'fever with diarrhea',
    hpc: 'onset 2 days ago. intermitent fever which is subsiding with PCM. Watery stools. 6 times per day. Not bloody/mucous.',
    pmhx: 'no significant pmhx',
    allergy: 'no allergy',
    examination: 'pale and ill looking',
    investigations_sofar: '',
    prescribed_med: 'PCM 1g sos, Jeewani',
    investigations_ordered: 'FBC, CRP',
  },
  {
    patient_id: '990931003V',
    date: '2023-10-06',
    pCompl: 'fever with diarrhea',
    hpc: 'onset 2 days ago. intermitent fever which is subsiding with PCM. Watery stools. 6 times per day. Not bloody/mucous.',
    pmhx: 'no significant pmhx',
    allergy: 'no allergy',
    examination: 'pale and ill looking',
    investigations_sofar: '',
    prescribed_med: 'PCM 1g sos, Jeewani',
    investigations_ordered: 'FBC, CRP',
  },
  {
    patient_id: '990931003V',
    date: '2023-11-06',
    pCompl: 'fever with diarrhea',
    hpc: 'onset 2 days ago. intermitent fever which is subsiding with PCM. Watery stools. 6 times per day. Not bloody/mucous.',
    pmhx: 'no significant pmhx',
    allergy: 'no allergy',
    examination: 'pale and ill looking',
    investigations_sofar: '',
    prescribed_med: 'PCM 1g sos, Jeewani',
    investigations_ordered: 'FBC, CRP',
  },
];

const drug_details = [
  {
    drug_id:'42576cd2-b0df-486a-a8dc-96dc18430b2d',
    drug_name_generic: 'Clotrimazole',
    
    drug_form: 'Cream',
  },
  {
    drug_id:'91541674-3299-4567-aeef-ba85336770e9',
    drug_name_generic: 'Paracetamol',
    
    drug_form: 'Tablet',
  },
  {
    drug_id:'701d342c-ad9f-4dae-9069-93687126e527',
    drug_name_generic: 'Paracetamol',
    
    drug_form: 'Tablet',
  },
  {
    drug_id:'7cef118d-15be-4f2e-b6ec-1333f50cb6f9',
    drug_name_generic: 'Dexamethasone',
    
    drug_form: 'Tablet',
  },
  {
    drug_id:'65e53501-8389-4ef4-b0b8-ac2b7cd05a8e',
    drug_name_generic: 'Hydrochlorothiazide',
    
    drug_form: 'Tablet',
  },
  {
    drug_id:'a04eb3ca-3d47-4ed6-b7f1-e30a13e727e8',
    drug_name_generic: 'Famotidine',
    
    drug_form: 'Tablet',
  },
  {
    drug_id:'3142a074-f237-43e1-acbf-37c9645b0033',
    drug_name_generic: 'Famotidine',
    
    drug_form: 'Tablet',
  },
  {
    drug_id:'428e9c80-03ec-48b9-bb54-b680d979026d',
    drug_name_generic: 'Cephalexin',
    
    drug_form: 'Capsule',
  },
  {
    drug_id:'b6b0d983-9dc1-4154-9b3c-c478db864f21',
    drug_name_generic: 'Clarithromycin',
    
    drug_form: 'Tablet',
  },
  {
    drug_id:'9ac557c8-043a-4f66-8a6f-5e5cd6bf2098',
    drug_name_generic: 'Gentamicin',
    
    drug_form: 'Eye/Ear drop',
  },
];

const drug_stocks = [
  {
    stock_id: '61cbc2b7-d2ad-40e1-bfde-4ec929e37383',
    drug_id: drug_details[0].drug_id,
    drug_brand: '',
    manufacturer: 'Beklo Pharma',
    drug_dose: '10 mg/g',
    container_quantity: 20,
    units_per_container: 1,
    total_quantity: 20,
    supplier: 'United Pharma',
    mfdate: '2023-08-01',
    expdate: '2026-07-01',
    batch_no: 'C30-34',
    buy_price: 15000,
    sell_price: 17000,
  },
  {
    stock_id: '0e50316d-0f37-4063-b134-ea491998b281',
    drug_id: drug_details[1].drug_id,
    drug_brand: '',
    manufacturer: 'SPMC',
    drug_dose: '500 mg',
    container_quantity: 1,
    units_per_container: 1000,
    total_quantity: 1000,
    supplier: 'United Pharma',
    mfdate: '2024-01-01',
    expdate: '2025-12-01',
    batch_no: 'LtDHRA28',
    buy_price: 325000,
    sell_price: 600,
  },
  {
    stock_id: '77f4fe5e-3dd3-43bb-923c-9d73940c4d1c',
    drug_id: drug_details[2].drug_id,
    drug_brand: '',
    manufacturer: 'Medopharm',
    drug_dose: '500 mg',
    container_quantity: 4,
    units_per_container: 1000,
    total_quantity: 4000,
    supplier: 'United Pharma',
    mfdate: '2023-10-01',
    expdate: '2026-09-01',
    batch_no: '23MJ086',
    buy_price: 325000,
    sell_price: 600,
  },
  {
    stock_id: '583211ef-5954-44c2-be2f-ff30b7af7086',
    drug_id: drug_details[3].drug_id,
    manufacturer: 'MAGBRO Healtcare PVT LTD',
    drug_brand: '',
    drug_dose: '0.5 mg',
    container_quantity: 2,
    units_per_container: 1000,
    total_quantity: 2000,
    supplier: 'United Pharma',
    mfdate: '2023-08-01',
    expdate: '2026-07-01',
    batch_no: 'MHET/2671',
    buy_price: 131000,
    sell_price: 300,
  },
  {
    stock_id: 'e8b102da-78a0-4329-b6dc-420ba892e5a9',
    drug_id: drug_details[4].drug_id,
    drug_brand: '',
    manufacturer: 'Morison PLC',
    drug_dose: '50 mg',
    container_quantity: 1,
    units_per_container: 1000,
    total_quantity: 1000,
    supplier: 'United Pharma',
    mfdate: '2022-09-01',
    expdate: '2025-08-01',
    batch_no: '',
    buy_price: 125348,
    sell_price: 300,
  },
  {
    stock_id: '4c3b0cea-7081-445a-9247-7a10753521bd',
    drug_id: drug_details[5].drug_id,
    drug_brand: '',
    manufacturer: 'DAGON Pharmaceuticals PVT LTD',
    drug_dose: '40 mg',
    container_quantity: 10,
    units_per_container: 100,
    total_quantity: 1000,
    supplier: 'United Pharma',
    mfdate: '2023-03-01',
    expdate: '2026-02-01',
    batch_no: 'ED063',
    buy_price: 30300,
    sell_price: 500,
  },
  {
    stock_id: '53c92fda-8789-4911-80ba-62c7decce081',
    drug_id: drug_details[6].drug_id,
    drug_brand: 'Famogen-20',
    manufacturer: 'MCW Healthcare (P) LTD',
    drug_dose: '20 mg',
    container_quantity: 5,
    units_per_container: 100,
    total_quantity: 500,
    supplier: 'United Pharma',
    mfdate: '2023-12-01',
    expdate: '2026-11-01',
    batch_no: 'SE07301',
    buy_price: 31625,
    sell_price: 500,
  },
  {
    stock_id: 'dbd55f23-b1a2-42c1-870f-bb0a2600c9cb',
    drug_id: drug_details[7].drug_id,
    drug_brand: 'Cephadex 500',
    manufacturer: 'Medispray laboratories PVT LTD',
    drug_dose: '500 mg',
    container_quantity: 3,
    units_per_container: 100,
    total_quantity: 300,
    supplier: 'United Pharma',
    mfdate: '2023-09-01',
    expdate: '2025-02-01',
    batch_no: 'EA30344',
    buy_price: null,
    sell_price: null,
  },
  {
    stock_id: '3d123f28-a7f0-4084-858e-e6f30f21b333',
    drug_id: drug_details[8].drug_id,
    drug_brand: '',
    manufacturer: 'SPMC',
    drug_dose: '250 mg',
    container_quantity: 7,
    units_per_container: 100,
    total_quantity: 700,
    supplier: 'United Pharma',
    mfdate: '2023-05-01',
    expdate: '2025-04-01',
    batch_no: 'LTHAE08',
    buy_price: 140000,
    sell_price: 2000,
  },
  {
    stock_id: 'bfaf3e67-9494-4a37-b941-203c829842eb',
    drug_id: drug_details[9].drug_id,
    drug_brand: 'Gentalab eye drop',
    manufacturer: 'Laborate Pharmaceuticals India LTD',
    drug_dose: '0.3% w/v',
    container_quantity: 7,
    units_per_container: 1,
    total_quantity: 7,
    supplier: 'United Pharma',
    mfdate: '2023-02-01',
    expdate: '2026-01-01',
    batch_no: 'NGLOE-001',
    buy_price: 8000,
    sell_price: 10000,
  },
];

module.exports = {
  users,
  customers,
  invoices,
  revenue,
  patientdetails,
  visits,
  drug_details,
  drug_stocks,
};
