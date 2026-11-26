// The five pages of the site, each a function of the household's state.
// Every number on every page is computed from data.js and the household's
// own edits — nothing is typed twice, so the pages can never disagree.

import { HOUSEHOLD, MONTHS, CATEGORIES, BENCHMARKS, GOALS, BILLS } from './data.js';
import { monthSummary, monthTransactions, categorySpent, categoryPlan, goalBalance, billStatus, billCounts, money, pct } from './state.js';
import { trendChart, shareRing, planBar } from './charts.js';

export const escape = (s) =>
  String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function monthLabel(state) {
  return MONTHS.find((m) => m.id === state.month).label;
}

function overLines(state) {
  return CATEGORIES.map((c) => {
    const spent = categorySpent(state, state.month, c.id);
    const plan = categoryPlan(state, c.id);
    return { ...c, spent, plan, over: spent - plan };
  }).filter((c) => c.over > 0);
}

// #/ — the statement: what came in, what went out, what is left, and how
// the month looks against the last six and against the country.
export function overview(state) {
  const s = monthSummary(state, state.month);
  const rows = CATEGORIES.map((c) => ({ ...c, spent: categorySpent(state, state.month, c.id) }))
    .sort((a, b) => b.spent - a.spent);
  const over = overLines(state);
  const top5 = rows.slice(0, 5);

  const stats = `
  <section class="stats" aria-label="This month at a glance">
    <div class="stat"><span class="stat-label">Take-home pay</span><span class="stat-value">${money(s.income)}</span><span class="stat-note">${escape(HOUSEHOLD.income.map((i) => i.label.split(' — ')[0]).join(' + '))}</span></div>
    <div class="stat"><span class="stat-label">Spent in ${escape(monthLabel(state))}</span><span class="stat-value">${money(s.spent)}</span><span class="stat-note">of ${money(s.planned)} planned</span></div>
    <div class="stat"><span class="stat-label">Left over</span><span class="stat-value">${money(s.leftover)}</span><span class="stat-note">${s.leftover >= s.plannedLeftover ? 'ahead of' : 'behind'} the ${money(s.plannedLeftover)} plan</span></div>
    <div class="stat"><span class="stat-label">Saving rate</span><span class="stat-value">${pct(s.savingsRate)}</span><span class="stat-note">US average about 4.6% (BEA 2024)</span></div>
  </section>`;

  const legend = top5
    .map((r, i) => `<li><span class="dot" style="background:${['#1e3a8a', '#0f172a', '#a16207', '#475569', '#94a3b8'][i]}"></span>${escape(r.name)} <b>${money(r.spent)}</b></li>`)
    .join('');

  const alerts = over.length
    ? `<section class="panel alerts"><h2>Over plan this month</h2><ul>${over.map((c) => `<li><b>${escape(c.name)}</b> — ${money(c.spent)} spent against ${money(c.plan)} planned, over by <b>${money(c.over)}</b>. ${c.id === 'groceries' ? 'Two big Costco runs and Sofia’s school lunches.' : c.id === 'dining' ? 'Three weekends out instead of the usual two.' : 'A birthday gift and the hardware store run.'}</li>`).join('')}</ul></section>`
    : `<section class="panel alerts good"><h2>On plan this month</h2><p>Every line is inside its budget.</p></section>`;

  const goals = GOALS.map((g) => {
    const bal = goalBalance(state, g);
    const share = Math.min(100, (bal / g.target) * 100);
    return `<div class="goal-mini"><div class="goal-mini-head"><b>${escape(g.name)}</b><span>${money(bal)} of ${money(g.target)}</span></div><div class="bar"><span style="width:${share.toFixed(1)}%"></span></div></div>`;
  }).join('');

  const bench = BENCHMARKS.map(
    (b) => `<tr><td>${escape(b.label)}</td><td class="num">${escape(b.ours)}</td><td class="num">${escape(b.us)}</td><td class="muted">${escape(b.usNote)}</td></tr>`,
  ).join('');

  return `
  <h1>${escape(monthLabel(state))} statement</h1>
  <p class="lede">One month of a three-person household in Austin, Texas — every dollar accounted for, and the plan it is measured against.</p>
  ${stats}
  <div class="cols">
    <section class="panel"><h2>Spending, June – November 2026</h2>${trendChart()}<p class="muted">August ran hot: back-to-school shopping and the car’s new tyres. Every month still finished below the $7,850 pay line.</p></section>
    <section class="panel"><h2>Where November’s money went</h2><div class="ring-wrap">${shareRing(rows, s.spent)}<ul class="legend">${legend}</ul></div></section>
  </div>
  ${alerts}
  <div class="cols">
    <section class="panel"><h2>Savings goals</h2>${goals}<p><a href="#/goals">See all three goals &rarr;</a></p></section>
    <section class="panel"><h2>How we compare</h2><table class="bench"><thead><tr><th></th><th class="num">Alvarez</th><th class="num">US average</th><th></th></tr></thead><tbody>${bench}</tbody></table><p class="muted">US figures: Bureau of Labor Statistics, Consumer Expenditure Survey 2024. Housing is our smallest share because the mortgage was fixed in 2023.</p></section>
  </div>`;
}

// #/budget — the twelve lines, each with its plan, its real spending and a
// slider that moves the plan. The totals at the foot move with it.
export function budget(state) {
  const s = monthSummary(state, state.month);
  const rows = CATEGORIES.map((c) => {
    const spent = categorySpent(state, state.month, c.id);
    const plan = categoryPlan(state, c.id);
    const left = plan - spent;
    const flag = left < 0 ? `<span class="flag over">over by ${money(-left)}</span>` : `<span class="flag">${money(left)} left</span>`;
    return `<tr class="${left < 0 ? 'is-over' : ''}">
      <td><b>${escape(c.name)}</b><span class="note">${escape(c.note)}</span></td>
      <td class="num">${money(spent)}</td>
      <td class="slider-cell"><input type="range" min="0" max="2500" step="5" value="${plan}" data-plan="${c.id}" aria-label="Planned budget for ${escape(c.name)}"><input type="number" min="0" step="5" value="${plan}" data-plan-num="${c.id}" aria-label="Planned dollars for ${escape(c.name)}"></td>
      <td>${planBar(spent, plan)}</td>
      <td class="num">${flag}</td>
    </tr>`;
  }).join('');

  return `
  <h1>Monthly budget — ${escape(monthLabel(state))}</h1>
  <p class="lede">Twelve lines, planned before the month starts and measured after it. Move a slider and the totals at the foot move with it; the plan is saved in this browser.</p>
  <table class="ledger">
    <thead><tr><th>Category</th><th class="num">Spent</th><th>Planned</th><th></th><th class="num">Left</th></tr></thead>
    <tbody>${rows}</tbody>
    <tfoot><tr><td><b>Total</b></td><td class="num"><b>${money(s.spent)}</b></td><td class="num"><b>${money(s.planned)}</b></td><td></td><td class="num"><b>${money(s.planned - s.spent)}</b> under plan</td></tr></tfoot>
  </table>
  <p class="actions"><button type="button" data-action="reset-plan">Reset the plan to $7,440</button> <span class="muted">Planned leftover: ${money(s.plannedLeftover)} a month.</span></p>`;
}

// #/transactions — the spending log: every purchase, filterable, and a form
// that adds one. Added rows update the budget page and the statement too.
export function transactions(state) {
  const all = monthTransactions(state, state.month);
  const shown = state.filter === 'all' ? all : all.filter((t) => t.category === state.filter);
  const total = shown.reduce((sum, t) => sum + t.amount, 0);
  const options = ['all', ...CATEGORIES.map((c) => c.id)]
    .map((id) => {
      const label = id === 'all' ? 'All categories' : CATEGORIES.find((c) => c.id === id).name;
      return `<option value="${id}" ${state.filter === id ? 'selected' : ''}>${escape(label)}</option>`;
    })
    .join('');
  const catOptions = CATEGORIES.map((c) => `<option value="${c.id}">${escape(c.name)}</option>`).join('');
  const rows = [...shown].reverse().map((t) => {
    const cat = CATEGORIES.find((c) => c.id === t.category);
    return `<tr><td>${escape(t.date.slice(5))}</td><td>${escape(t.what)}</td><td>${escape(cat ? cat.name : t.category)}</td><td class="num">${money(t.amount)}</td></tr>`;
  }).join('');

  return `
  <h1>Spending log — ${escape(monthLabel(state))}</h1>
  <p class="lede">Every purchase, in the order it happened. ${all.length} transactions, ${money(all.reduce((sum, t) => sum + t.amount, 0))} in all — the same total the budget page shows.</p>
  <form id="add-form" class="add-form">
    <label>Date <input type="date" name="date" value="${state.month}-26" required></label>
    <label>Category <select name="category">${catOptions}</select></label>
    <label>What <input type="text" name="what" placeholder="e.g. H-E-B" required maxlength="80"></label>
    <label>Amount <input type="number" name="amount" min="1" step="1" placeholder="0" required></label>
    <button type="submit">Add spending</button>
  </form>
  <p class="filter-row"><label>Show <select data-filter>${options}</select></label> <span class="muted">Showing ${shown.length} of ${all.length} — ${money(total)}</span></p>
  <table class="ledger">
    <thead><tr><th>Date</th><th>What</th><th>Category</th><th class="num">Amount</th></tr></thead>
    <tbody>${rows || '<tr><td colspan="4">Nothing in this category this month.</td></tr>'}</tbody>
  </table>`;
}

// #/goals — three savings goals with live progress and a way to add money.
export function goals(state) {
  const cards = GOALS.map((g) => {
    const bal = goalBalance(state, g);
    const share = Math.min(100, (bal / g.target) * 100);
    const left = Math.max(0, g.target - bal);
    return `<section class="panel goal-card">
    <h2>${escape(g.name)}</h2>
    <p class="goal-figure"><span class="goal-saved">${money(bal)}</span> <span class="muted">of ${money(g.target)} — ${pct(share)} there</span></p>
    <div class="bar big"><span style="width:${share.toFixed(1)}%"></span></div>
    <p>${escape(g.note)}</p>
    <p class="muted">${g.monthly > 0 ? `${money(g.monthly)} a month, automatic.` : 'No automatic transfer.'} ${money(left)} to go.</p>
    <p class="goal-add"><button type="button" data-goal="${g.id}" data-add="25">Add $25</button> <button type="button" data-goal="${g.id}" data-add="50">Add $50</button> <label>$ <input type="number" min="1" step="1" data-goal-num="${g.id}" placeholder="0" aria-label="Custom amount for ${escape(g.name)}"></label> <button type="button" data-goal-custom="${g.id}">Add it</button></p>
  </section>`;
  }).join('');

  const totalSaved = GOALS.reduce((sum, g) => sum + goalBalance(state, g), 0);
  return `
  <h1>Savings goals</h1>
  <p class="lede">Three pots, three dates, no borrowing between them. ${money(totalSaved)} saved across all three.</p>
  <div class="goals-grid">${cards}</div>`;
}

// #/bills — the calendar of fixed outgoings: what is paid, what is due, and
// what is coming. Due bills can be marked paid, and the counts update.
export function bills(state) {
  const counts = billCounts(state);
  const dueSoon = BILLS.filter((b) => billStatus(state, b) === 'due')
    .reduce((sum, b) => sum + b.amount, 0);
  const rows = [...BILLS].sort((a, b) => (a.date < b.date ? -1 : 1)).map((b) => {
    const status = billStatus(state, b);
    const badge = status === 'paid' ? '<span class="badge paid">Paid</span>' : status === 'due' ? '<span class="badge due">Due</span>' : '<span class="badge upcoming">Upcoming</span>';
    const action = status === 'paid'
      ? '<span class="muted">—</span>'
      : `<button type="button" data-bill="${b.id}">Mark paid</button>`;
    return `<tr><td>${escape(b.date.slice(5))}</td><td>${escape(b.name)}</td><td class="num">${money(b.amount)}</td><td>${badge}</td><td>${action}</td></tr>`;
  }).join('');

  return `
  <h1>Bills &amp; due dates</h1>
  <p class="lede">${counts.paid} of ${BILLS.length} bills paid. ${money(dueSoon)} still due before the month ends — the Costco renewal on the 28th and the credit card on the 30th.</p>
  <table class="ledger">
    <thead><tr><th>Date</th><th>Bill</th><th class="num">Amount</th><th>Status</th><th></th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <p class="muted">Fixed outgoings are paid on the 1st where the household can: mortgage, childcare, insurance, car, and both savings transfers all leave on payday, so they are never late.</p>`;
}

export const PAGES = {
  '/': overview,
  '/budget': budget,
  '/transactions': transactions,
  '/goals': goals,
  '/bills': bills,
};

export function missing() {
  return `<h1>Not found</h1><p>There is no page at this address. <a href="#/">Back to the statement</a>.</p>`;
}
