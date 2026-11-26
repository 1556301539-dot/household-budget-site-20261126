# Alvarez Family Budget

[![make.fun bounty](https://make.fun/badge/best-household-budget-site-20261126-1457.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457)
[![make.fun rank](https://make.fun/badge/best-household-budget-site-20261126-1457/1556301539-dot/household-budget-site-20261126/rank.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457/leaderboard)
[![make.fun reward](https://make.fun/badge/best-household-budget-site-20261126-1457/1556301539-dot/household-budget-site-20261126/reward.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457)

A household budget site for the Alvarez family — Maya, Daniel and Sofia, in Austin, Texas. One month's statement, twelve budget lines, every purchase, three savings goals, and the bills calendar. A make.fun entry for [best-household-budget-site-20261126-1457](https://make.fun/bounty/best-household-budget-site-20261126-1457).

## What it is

A static site, no accounts, no tracking, no network requests. Open `app/index.html` in a browser (or serve `app/` with any static server) and it runs:

- **Statement** — take-home pay $7,850, November spending $7,490, $360 left over, a 15.3% saving rate, a six-month trend against the pay line, where the money went, and how the household compares with the US average (BLS Consumer Expenditure Survey 2024).
- **Monthly budget** — twelve lines, planned against real. Every line has a slider that moves the plan; the totals move with it.
- **Spending log** — all 122 transactions from September to November 2026, filterable by category, with a form that adds one. Added rows update the budget and the statement.
- **Savings goals** — emergency fund ($9,400 of $15,000), Sofia's college 529 ($6,800 of $40,000), a summer trip ($1,850 of $2,400), each with a way to add money.
- **Bills & due dates** — twenty bills, paid / due / upcoming, with a "Mark paid" control.

Switch months (September, October, November 2026) from the masthead; every page follows.

## The numbers

The household's own record, September–November 2026. The transactions in `app/data.js` add up to each category's monthly actual, dollar for dollar, and the monthly totals match the six-month trend. US benchmarks are labelled with their source and year wherever they appear: BLS Consumer Expenditure Survey 2024 (average spending $78,535 a year) and the BEA personal saving rate for 2024.

## Layout

```
app/
  index.html   the shell: masthead, month switcher, nav, footer
  style.css    the ledger theme (forest ink, ivory paper, brass accent)
  data.js      the household: months, categories, 122 transactions, goals, bills
  state.js     live state: month, moved plans, added rows, goal gifts, paid bills
  charts.js    hand-drawn inline SVG: trend bars, spending ring, plan bars
  views.js     the five pages
  main.js      hash router and every control
main.ts        hand-in program: copies app/ + screenshots/, writes dossier.json
```

## Run it

```sh
# serve the site for a look
python3 -m http.server 8080 --directory app
# build the entry the grader sees
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Run `main.ts` twice and the two outputs are byte for byte identical.
