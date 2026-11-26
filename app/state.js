// The household's live state: which month is open, and every change the
// household makes in the browser (a moved budget line, a transaction added,
// money put toward a goal, a bill marked paid). The starter data in data.js
// never changes; edits live here and in localStorage, so a reload keeps them
// and a fresh browser shows the November statement as recorded.

import { CATEGORIES, TRANSACTIONS, INCOME_MONTHLY, GOALS, BILLS } from './data.js';

const KEY = 'alvarez-budget-v1';

function blankState() {
  return {
    month: '2026-11',
    plan: {}, // category id -> planned dollars, when the household moves a line
    added: {}, // month id -> [transaction, ...] the household typed in
    goals: {}, // goal id -> extra dollars added on top of the recorded saved
    bills: {}, // bill id -> true, when a due bill is marked paid
    filter: 'all', // spending-log category filter
  };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return blankState();
    const saved = JSON.parse(raw);
    return { ...blankState(), ...saved };
  } catch {
    return blankState();
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // A browser that refuses storage still runs the site; edits just do not persist.
  }
}

export function resetState() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Nothing to clear.
  }
  return blankState();
}

// Money, always with a thousands separator and no cents: $7,850.
export function money(n) {
  const sign = n < 0 ? '−' : '';
  return sign + '$' + Math.abs(Math.round(n)).toLocaleString('en-US');
}

export function pct(n) {
  return (Math.round(n * 10) / 10).toFixed(1) + '%';
}

// All transactions for a month: the recorded ones plus any the household added.
export function monthTransactions(state, monthId) {
  const base = TRANSACTIONS[monthId] || [];
  const extra = state.added[monthId] || [];
  return [...base, ...extra];
}

// What a category really cost in a month, recorded plus added.
export function categorySpent(state, monthId, categoryId) {
  return monthTransactions(state, monthId)
    .filter((t) => t.category === categoryId)
    .reduce((sum, t) => sum + t.amount, 0);
}

// The plan for a category, after the household moves its slider.
export function categoryPlan(state, categoryId) {
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  const moved = state.plan[categoryId];
  return typeof moved === 'number' ? moved : cat.plan;
}

// The month in one object: income, planned and real spending, what is left.
export function monthSummary(state, monthId) {
  const planned = CATEGORIES.reduce((sum, c) => sum + categoryPlan(state, c.id), 0);
  const spent = monthTransactions(state, monthId).reduce((sum, t) => sum + t.amount, 0);
  const saved = categorySpent(state, monthId, 'savings');
  return {
    income: INCOME_MONTHLY,
    planned,
    spent,
    leftover: INCOME_MONTHLY - spent,
    plannedLeftover: INCOME_MONTHLY - planned,
    savingsRate: (saved / INCOME_MONTHLY) * 100,
  };
}

// A goal's balance, recorded plus anything added in the browser.
export function goalBalance(state, goal) {
  return goal.saved + (state.goals[goal.id] || 0);
}

// A bill's status, after the household marks it paid.
export function billStatus(state, bill) {
  if (bill.status === 'paid') return 'paid';
  return state.bills[bill.id] ? 'paid' : bill.status;
}

export function billCounts(state) {
  const counts = { paid: 0, due: 0, upcoming: 0 };
  for (const bill of BILLS) counts[billStatus(state, bill)] += 1;
  return counts;
}

export function categoryById(id) {
  return CATEGORIES.find((c) => c.id === id);
}
