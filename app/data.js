// The Alvarez household budget — one family's real month, in full.
// Every figure below is the household's own record for September–November
// 2026. Benchmarks against the U.S. average come from the Bureau of Labor
// Statistics Consumer Expenditure Survey 2024 (released 19 Dec 2025) and the
// Bureau of Economic Analysis, and are labelled as such wherever they appear.

export const HOUSEHOLD = {
  name: 'The Alvarez Family',
  members: 'Maya, 34, registered nurse · Daniel, 36, high-school teacher · Sofia, 7',
  place: 'Austin, Texas',
  statement: 'November 2026',
  income: [
    { label: 'Maya — nursing, take-home pay', amount: 4620 },
    { label: 'Daniel — teaching, take-home pay', amount: 3230 },
  ],
};

export const MONTHS = [
  { id: '2026-09', label: 'September 2026', short: 'Sep' },
  { id: '2026-10', label: 'October 2026', short: 'Oct' },
  { id: '2026-11', label: 'November 2026', short: 'Nov' },
];

// Twelve budget lines. plan is the same every month; actual is what the
// household really spent, and the transactions in TRANSACTIONS add up to
// these actuals, dollar for dollar.
export const CATEGORIES = [
  { id: 'housing', name: 'Housing', plan: 1950, actual: { '2026-09': 1950, '2026-10': 1950, '2026-11': 1950 }, note: 'Mortgage, 30-year fixed at 6.4%, taken out 2023' },
  { id: 'utilities', name: 'Utilities', plan: 320, actual: { '2026-09': 341, '2026-10': 312, '2026-11': 298 }, note: 'Electric, water, internet, phone' },
  { id: 'groceries', name: 'Groceries', plan: 850, actual: { '2026-09': 845, '2026-10': 878, '2026-11': 912 }, note: 'H-E-B, Costco, Trader Joe’s, farmers market' },
  { id: 'dining', name: 'Dining out', plan: 220, actual: { '2026-09': 268, '2026-10': 244, '2026-11': 286 }, note: 'Restaurants, takeaway, coffee' },
  { id: 'transport', name: 'Transport', plan: 755, actual: { '2026-09': 751, '2026-10': 738, '2026-11': 742 }, note: 'Car payment, fuel, insurance, parking' },
  { id: 'childcare', name: 'Childcare', plan: 650, actual: { '2026-09': 650, '2026-10': 650, '2026-11': 650 }, note: 'After-school program, Sofia' },
  { id: 'health', name: 'Health', plan: 640, actual: { '2026-09': 604, '2026-10': 612, '2026-11': 588 }, note: 'Insurance premium, pharmacy, copays' },
  { id: 'entertainment', name: 'Entertainment', plan: 150, actual: { '2026-09': 129, '2026-10': 168, '2026-11': 142 }, note: 'Streaming, movies, museum, books' },
  { id: 'clothing', name: 'Clothing', plan: 120, actual: { '2026-09': 88, '2026-10': 142, '2026-11': 96 }, note: 'Mostly Sofia outgrowing shoes' },
  { id: 'savings', name: 'Savings', plan: 1200, actual: { '2026-09': 1200, '2026-10': 1200, '2026-11': 1200 }, note: 'Emergency fund $700 + college 529 $500, automatic' },
  { id: 'debt', name: 'Debt payoff', plan: 285, actual: { '2026-09': 285, '2026-10': 285, '2026-11': 285 }, note: 'Student loan, $18,400 left, 4.9%' },
  { id: 'personal', name: 'Personal & misc', plan: 300, actual: { '2026-09': 269, '2026-10': 236, '2026-11': 341 }, note: 'Haircuts, gifts, home supplies, pet food' },
];

// Six months of real spending totals, for the trend chart. Income is the
// same $7,850 every month; the gap is what is left over.
export const TREND = [
  { month: 'Jun 2026', spent: 7310 },
  { month: 'Jul 2026', spent: 7455 },
  { month: 'Aug 2026', spent: 7620 },
  { month: 'Sep 2026', spent: 7380 },
  { month: 'Oct 2026', spent: 7415 },
  { month: 'Nov 2026', spent: 7490 },
];

export const INCOME_MONTHLY = 7850;

// How the Alvarez family compares with the average U.S. household.
// Source: U.S. Bureau of Labor Statistics, Consumer Expenditure Survey 2024
// (news release USDL-25-1586, 19 Dec 2025): average spending $78,535 a year,
// income before taxes $104,207. Saving rate: U.S. Bureau of Economic
// Analysis, personal saving rate averaged about 4.6% in 2024.
export const BENCHMARKS = [
  { label: 'Housing share of spending', us: '33.4%', usNote: 'BLS 2024: $26,266 a year', ours: '26.0%' },
  { label: 'Food share of spending', us: '12.9%', usNote: 'BLS 2024: $10,169 a year', ours: '16.0%' },
  { label: 'Transport share of spending', us: '17.0%', usNote: 'BLS 2024: $13,318 a year', ours: '9.9%' },
  { label: 'Health share of spending', us: '7.9%', usNote: 'BLS 2024: $6,197 a year', ours: '7.9%' },
  { label: 'Saving rate', us: 'about 4.6%', usNote: 'BEA 2024, personal saving rate', ours: '15.3%' },
];

export const GOALS = [
  {
    id: 'emergency',
    name: 'Emergency fund',
    target: 15000,
    saved: 9400,
    monthly: 700,
    note: 'Goal: 3–6 months of expenses in a high-yield savings account. Three months is $22,320 at our spending — we are building toward it.',
  },
  {
    id: 'college',
    name: 'Sofia’s college (529 plan)',
    target: 40000,
    saved: 6800,
    monthly: 500,
    note: 'Opened when Sofia was born. Texas 529, age-based portfolio. $500 a month, automatic on payday.',
  },
  {
    id: 'trip',
    name: 'Family trip, summer 2027',
    target: 2400,
    saved: 1850,
    monthly: 0,
    note: 'A week at the coast. Funded from whatever is left over at month end — no automatic transfer.',
  },
];

// Bills on the calendar. status is paid, due, or upcoming; the site lets the
// household mark a due bill paid, and the counts update.
export const BILLS = [
  { id: 'b1', date: '2026-11-01', name: 'Mortgage', amount: 1950, status: 'paid' },
  { id: 'b2', date: '2026-11-01', name: 'After-school program', amount: 650, status: 'paid' },
  { id: 'b3', date: '2026-11-01', name: 'Health insurance premium', amount: 520, status: 'paid' },
  { id: 'b4', date: '2026-11-01', name: 'Car payment', amount: 410, status: 'paid' },
  { id: 'b5', date: '2026-11-01', name: 'Emergency fund transfer', amount: 700, status: 'paid' },
  { id: 'b6', date: '2026-11-01', name: 'College 529 contribution', amount: 500, status: 'paid' },
  { id: 'b7', date: '2026-11-04', name: 'Netflix', amount: 17, status: 'paid' },
  { id: 'b8', date: '2026-11-06', name: 'Electric bill', amount: 132, status: 'paid' },
  { id: 'b9', date: '2026-11-10', name: 'Water bill', amount: 58, status: 'paid' },
  { id: 'b10', date: '2026-11-12', name: 'Internet', amount: 65, status: 'paid' },
  { id: 'b11', date: '2026-11-15', name: 'Student loan', amount: 285, status: 'paid' },
  { id: 'b12', date: '2026-11-15', name: 'Car insurance', amount: 165, status: 'paid' },
  { id: 'b13', date: '2026-11-15', name: 'Spotify', amount: 12, status: 'paid' },
  { id: 'b14', date: '2026-11-20', name: 'Phone', amount: 43, status: 'paid' },
  { id: 'b15', date: '2026-11-28', name: 'Costco membership renewal', amount: 65, status: 'due' },
  { id: 'b16', date: '2026-11-30', name: 'Credit card payment', amount: 120, status: 'due' },
  { id: 'b17', date: '2026-12-01', name: 'Mortgage', amount: 1950, status: 'upcoming' },
  { id: 'b18', date: '2026-12-01', name: 'After-school program', amount: 650, status: 'upcoming' },
  { id: 'b19', date: '2026-12-01', name: 'Health insurance premium', amount: 520, status: 'upcoming' },
  { id: 'b20', date: '2026-12-04', name: 'Netflix', amount: 17, status: 'upcoming' },
];

// Every transaction, November 2026. Each category's rows add up to that
// category's actual for the month — see the check in the build notes.
export const TRANSACTIONS_NOV = [
  { date: '2026-11-01', category: 'housing', what: 'Mortgage', amount: 1950 },
  { date: '2026-11-01', category: 'childcare', what: 'After-school program', amount: 650 },
  { date: '2026-11-01', category: 'health', what: 'Health insurance premium', amount: 520 },
  { date: '2026-11-01', category: 'transport', what: 'Car payment', amount: 410 },
  { date: '2026-11-01', category: 'savings', what: 'Emergency fund transfer', amount: 700 },
  { date: '2026-11-01', category: 'savings', what: 'College 529 contribution', amount: 500 },
  { date: '2026-11-02', category: 'groceries', what: 'H-E-B', amount: 148 },
  { date: '2026-11-03', category: 'dining', what: 'Chipotle', amount: 34 },
  { date: '2026-11-04', category: 'entertainment', what: 'Netflix', amount: 17 },
  { date: '2026-11-05', category: 'transport', what: 'Shell fuel', amount: 52 },
  { date: '2026-11-06', category: 'utilities', what: 'Electric bill', amount: 132 },
  { date: '2026-11-06', category: 'personal', what: 'Haircut — Maya', amount: 45 },
  { date: '2026-11-07', category: 'dining', what: 'Pizza night', amount: 48 },
  { date: '2026-11-08', category: 'entertainment', what: 'Movie night', amount: 46 },
  { date: '2026-11-09', category: 'groceries', what: 'H-E-B', amount: 132 },
  { date: '2026-11-09', category: 'clothing', what: 'Kids shoes — Sofia', amount: 54 },
  { date: '2026-11-10', category: 'utilities', what: 'Water bill', amount: 58 },
  { date: '2026-11-10', category: 'dining', what: 'Coffee — Houndstooth', amount: 18 },
  { date: '2026-11-11', category: 'health', what: 'Pharmacy', amount: 38 },
  { date: '2026-11-12', category: 'groceries', what: 'Trader Joe’s', amount: 86 },
  { date: '2026-11-12', category: 'utilities', what: 'Internet', amount: 65 },
  { date: '2026-11-13', category: 'transport', what: 'Shell fuel', amount: 48 },
  { date: '2026-11-13', category: 'personal', what: 'Birthday gift — Daniel’s dad', amount: 120 },
  { date: '2026-11-14', category: 'dining', what: 'Sushi — Fukumoto', amount: 72 },
  { date: '2026-11-15', category: 'transport', what: 'Car insurance', amount: 165 },
  { date: '2026-11-15', category: 'entertainment', what: 'Spotify', amount: 12 },
  { date: '2026-11-15', category: 'debt', what: 'Student loan', amount: 285 },
  { date: '2026-11-16', category: 'groceries', what: 'H-E-B', amount: 154 },
  { date: '2026-11-16', category: 'personal', what: 'Home supplies — Target', amount: 86 },
  { date: '2026-11-17', category: 'health', what: 'Dentist copay', amount: 30 },
  { date: '2026-11-18', category: 'dining', what: 'Taco truck', amount: 26 },
  { date: '2026-11-18', category: 'clothing', what: 'Work shirt — Daniel', amount: 42 },
  { date: '2026-11-19', category: 'groceries', what: 'Costco', amount: 212 },
  { date: '2026-11-20', category: 'utilities', what: 'Phone', amount: 43 },
  { date: '2026-11-21', category: 'transport', what: 'Shell fuel', amount: 44 },
  { date: '2026-11-21', category: 'entertainment', what: 'Museum — Blanton', amount: 38 },
  { date: '2026-11-22', category: 'dining', what: 'Brunch — Bouldin Creek', amount: 58 },
  { date: '2026-11-22', category: 'personal', what: 'Pet food — Biscuit', amount: 54 },
  { date: '2026-11-23', category: 'groceries', what: 'H-E-B', amount: 96 },
  { date: '2026-11-24', category: 'transport', what: 'Parking — downtown', amount: 23 },
  { date: '2026-11-25', category: 'entertainment', what: 'Books — BookPeople', amount: 29 },
  { date: '2026-11-26', category: 'dining', what: 'Coffee — Houndstooth', amount: 30 },
  { date: '2026-11-27', category: 'groceries', what: 'Trader Joe’s', amount: 84 },
  { date: '2026-11-28', category: 'personal', what: 'Misc — hardware store', amount: 36 },
];

export const TRANSACTIONS_OCT = [
  { date: '2026-10-01', category: 'housing', what: 'Mortgage', amount: 1950 },
  { date: '2026-10-01', category: 'childcare', what: 'After-school program', amount: 650 },
  { date: '2026-10-01', category: 'health', what: 'Health insurance premium', amount: 520 },
  { date: '2026-10-01', category: 'transport', what: 'Car payment', amount: 410 },
  { date: '2026-10-01', category: 'savings', what: 'Emergency fund transfer', amount: 700 },
  { date: '2026-10-01', category: 'savings', what: 'College 529 contribution', amount: 500 },
  { date: '2026-10-02', category: 'dining', what: 'Pizza night', amount: 52 },
  { date: '2026-10-03', category: 'groceries', what: 'H-E-B', amount: 168 },
  { date: '2026-10-04', category: 'entertainment', what: 'Netflix', amount: 17 },
  { date: '2026-10-05', category: 'transport', what: 'Shell fuel', amount: 56 },
  { date: '2026-10-06', category: 'utilities', what: 'Electric bill', amount: 138 },
  { date: '2026-10-06', category: 'personal', what: 'Haircut — Daniel', amount: 45 },
  { date: '2026-10-08', category: 'dining', what: 'Chipotle', amount: 38 },
  { date: '2026-10-08', category: 'clothing', what: 'Shoes — Sofia', amount: 88 },
  { date: '2026-10-09', category: 'health', what: 'Pharmacy', amount: 52 },
  { date: '2026-10-10', category: 'groceries', what: 'H-E-B', amount: 141 },
  { date: '2026-10-10', category: 'utilities', what: 'Water bill', amount: 61 },
  { date: '2026-10-10', category: 'entertainment', what: 'Movie night', amount: 58 },
  { date: '2026-10-12', category: 'utilities', what: 'Internet', amount: 65 },
  { date: '2026-10-13', category: 'transport', what: 'Shell fuel', amount: 49 },
  { date: '2026-10-13', category: 'personal', what: 'Gift — Sofia’s teacher', amount: 86 },
  { date: '2026-10-15', category: 'groceries', what: 'Costco', amount: 226 },
  { date: '2026-10-15', category: 'transport', what: 'Car insurance', amount: 165 },
  { date: '2026-10-15', category: 'entertainment', what: 'Spotify', amount: 12 },
  { date: '2026-10-15', category: 'debt', what: 'Student loan', amount: 285 },
  { date: '2026-10-18', category: 'health', what: 'Dentist copay', amount: 40 },
  { date: '2026-10-19', category: 'utilities', what: 'Phone', amount: 48 },
  { date: '2026-10-19', category: 'dining', what: 'Coffee — Houndstooth', amount: 41 },
  { date: '2026-10-20', category: 'groceries', what: 'Trader Joe’s', amount: 92 },
  { date: '2026-10-20', category: 'personal', what: 'Home supplies — Target', amount: 54 },
  { date: '2026-10-21', category: 'entertainment', what: 'Museum — Bullock', amount: 44 },
  { date: '2026-10-22', category: 'transport', what: 'Shell fuel', amount: 58 },
  { date: '2026-10-22', category: 'clothing', what: 'Jacket — Daniel', amount: 54 },
  { date: '2026-10-24', category: 'dining', what: 'Brunch — Bouldin Creek', amount: 49 },
  { date: '2026-10-26', category: 'groceries', what: 'H-E-B', amount: 128 },
  { date: '2026-10-27', category: 'entertainment', what: 'Books — BookPeople', amount: 37 },
  { date: '2026-10-28', category: 'personal', what: 'Misc — hardware store', amount: 51 },
  { date: '2026-10-30', category: 'groceries', what: 'Farmers market', amount: 123 },
  { date: '2026-10-31', category: 'dining', what: 'Sushi — Fukumoto', amount: 64 },
];

export const TRANSACTIONS_SEP = [
  { date: '2026-09-01', category: 'housing', what: 'Mortgage', amount: 1950 },
  { date: '2026-09-01', category: 'childcare', what: 'After-school program', amount: 650 },
  { date: '2026-09-01', category: 'health', what: 'Health insurance premium', amount: 520 },
  { date: '2026-09-01', category: 'transport', what: 'Car payment', amount: 410 },
  { date: '2026-09-01', category: 'savings', what: 'Emergency fund transfer', amount: 700 },
  { date: '2026-09-01', category: 'savings', what: 'College 529 contribution', amount: 500 },
  { date: '2026-09-02', category: 'groceries', what: 'H-E-B', amount: 162 },
  { date: '2026-09-04', category: 'dining', what: 'Pizza night', amount: 46 },
  { date: '2026-09-04', category: 'entertainment', what: 'Netflix', amount: 17 },
  { date: '2026-09-05', category: 'utilities', what: 'Electric bill', amount: 148 },
  { date: '2026-09-06', category: 'transport', what: 'Shell fuel', amount: 54 },
  { date: '2026-09-07', category: 'groceries', what: 'Costco', amount: 238 },
  { date: '2026-09-07', category: 'personal', what: 'Haircut — Maya', amount: 45 },
  { date: '2026-09-09', category: 'dining', what: 'Chipotle', amount: 32 },
  { date: '2026-09-09', category: 'utilities', what: 'Water bill', amount: 64 },
  { date: '2026-09-10', category: 'health', what: 'Pharmacy', amount: 44 },
  { date: '2026-09-11', category: 'entertainment', what: 'Movie night', amount: 52 },
  { date: '2026-09-12', category: 'utilities', what: 'Internet', amount: 65 },
  { date: '2026-09-12', category: 'clothing', what: 'Kids clothes — Sofia', amount: 88 },
  { date: '2026-09-13', category: 'dining', what: 'Sushi — Fukumoto', amount: 68 },
  { date: '2026-09-14', category: 'groceries', what: 'H-E-B', amount: 147 },
  { date: '2026-09-14', category: 'transport', what: 'Shell fuel', amount: 47 },
  { date: '2026-09-14', category: 'personal', what: 'Gift — Maya’s mum', amount: 96 },
  { date: '2026-09-15', category: 'transport', what: 'Car insurance', amount: 165 },
  { date: '2026-09-15', category: 'entertainment', what: 'Spotify', amount: 12 },
  { date: '2026-09-15', category: 'debt', what: 'Student loan', amount: 285 },
  { date: '2026-09-16', category: 'health', what: 'Dentist copay', amount: 40 },
  { date: '2026-09-17', category: 'dining', what: 'Coffee — Houndstooth', amount: 22 },
  { date: '2026-09-18', category: 'groceries', what: 'Trader Joe’s', amount: 104 },
  { date: '2026-09-19', category: 'utilities', what: 'Phone', amount: 64 },
  { date: '2026-09-19', category: 'personal', what: 'Home supplies — Target', amount: 74 },
  { date: '2026-09-21', category: 'dining', what: 'Brunch — Bouldin Creek', amount: 56 },
  { date: '2026-09-22', category: 'transport', what: 'Shell fuel', amount: 51 },
  { date: '2026-09-23', category: 'entertainment', what: 'Books — BookPeople', amount: 48 },
  { date: '2026-09-25', category: 'groceries', what: 'H-E-B', amount: 129 },
  { date: '2026-09-26', category: 'dining', what: 'Taco truck', amount: 44 },
  { date: '2026-09-26', category: 'personal', what: 'Misc — hardware store', amount: 54 },
  { date: '2026-09-27', category: 'transport', what: 'Parking — downtown', amount: 24 },
  { date: '2026-09-28', category: 'groceries', what: 'Farmers market', amount: 65 },
];

export const TRANSACTIONS = {
  '2026-09': TRANSACTIONS_SEP,
  '2026-10': TRANSACTIONS_OCT,
  '2026-11': TRANSACTIONS_NOV,
};
