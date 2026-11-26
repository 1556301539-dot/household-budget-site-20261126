// The router and the controls. The site is five pages on hash routes; every
// control on every page is wired here, and every change re-renders the page
// it is on and saves the household's edits.
//
//   #/                the month's statement
//   #/budget          the twelve budget lines
//   #/transactions    the spending log
//   #/goals           the three savings goals
//   #/bills           the bills calendar
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import { MONTHS } from './data.js';
import { PAGES, missing } from './views.js';
import { loadState, saveState, resetState } from './state.js';

const app = document.getElementById('app');
const monthButtons = document.getElementById('month-switch');
let state = loadState();

function route() {
  const path = (location.hash.replace(/^#/, '') || '/').split('?')[0];
  return PAGES[path] ? path : null;
}

function render() {
  window.__shotReady = false;
  const path = route();
  document.querySelectorAll('nav a').forEach((a) => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + (path || '/'));
  });
  monthButtons.querySelectorAll('button').forEach((b) => {
    b.classList.toggle('active', b.dataset.month === state.month);
    b.setAttribute('aria-pressed', b.dataset.month === state.month ? 'true' : 'false');
  });
  const page = path ? PAGES[path] : missing;
  document.title = `${page === PAGES['/'] ? 'Statement' : document.querySelector(`nav a[href="#${path}"]`)?.textContent || 'Not found'} | Alvarez Family Budget`;
  app.innerHTML = page(state);
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

// The month switcher lives in the masthead, above the page.
monthButtons.addEventListener('click', (e) => {
  const button = e.target.closest('button[data-month]');
  if (!button) return;
  state.month = button.dataset.month;
  saveState(state);
  render();
});

// Every other control lives inside the rendered page, so one listener on the
// page catches them all. Sliders and number fields update each other live
// while they are dragged or typed, and only commit (save + re-render) when
// the control is released — re-rendering mid-drag would drop the drag.
app.addEventListener('input', (e) => {
  const planSlider = e.target.closest('input[data-plan]');
  if (planSlider) {
    state.plan[planSlider.dataset.plan] = Number(planSlider.value);
    const num = app.querySelector(`input[data-plan-num="${planSlider.dataset.plan}"]`);
    if (num) num.value = planSlider.value;
    return;
  }
  const planNum = e.target.closest('input[data-plan-num]');
  if (planNum) {
    state.plan[planNum.dataset.planNum] = Number(planNum.value) || 0;
    const slider = app.querySelector(`input[data-plan="${planNum.dataset.planNum}"]`);
    if (slider) slider.value = planNum.value;
  }
});

app.addEventListener('change', (e) => {
  const planSlider = e.target.closest('input[data-plan]');
  const planNum = e.target.closest('input[data-plan-num]');
  if (planSlider || planNum) {
    saveState(state);
    render();
    return;
  }
  const filter = e.target.closest('select[data-filter]');
  if (filter) {
    state.filter = filter.value;
    saveState(state);
    render();
  }
});

app.addEventListener('submit', (e) => {
  if (e.target.id !== 'add-form') return;
  e.preventDefault();
  const form = e.target;
  const what = form.what.value.trim();
  const amount = Number(form.amount.value);
  const date = form.date.value || `${state.month}-26`;
  if (!what || !(amount > 0)) return;
  state.added[state.month] = state.added[state.month] || [];
  state.added[state.month].push({ date, category: form.category.value, what, amount });
  saveState(state);
  render();
});

app.addEventListener('click', (e) => {
  const reset = e.target.closest('[data-action="reset-plan"]');
  if (reset) {
    state.plan = {};
    saveState(state);
    render();
    return;
  }
  const goalAdd = e.target.closest('[data-goal]');
  if (goalAdd) {
    const id = goalAdd.dataset.goal;
    state.goals[id] = (state.goals[id] || 0) + Number(goalAdd.dataset.add);
    saveState(state);
    render();
    return;
  }
  const goalCustom = e.target.closest('[data-goal-custom]');
  if (goalCustom) {
    const id = goalCustom.dataset.goalCustom;
    const input = app.querySelector(`input[data-goal-num="${id}"]`);
    const amount = Number(input?.value);
    if (amount > 0) {
      state.goals[id] = (state.goals[id] || 0) + amount;
      saveState(state);
      render();
    }
    return;
  }
  const bill = e.target.closest('[data-bill]');
  if (bill) {
    state.bills[bill.dataset.bill] = true;
    saveState(state);
    render();
  }
});

window.addEventListener('hashchange', render);
render();
