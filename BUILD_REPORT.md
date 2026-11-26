# Build report — Alvarez Family Budget (best-household-budget-site-20261126-1457)

## The site

A household budget site for the Alvarez family (Maya, 34, nurse; Daniel, 36,
teacher; Sofia, 7; Austin, Texas). Five pages on hash routes, all reachable
from the nav: Statement, Monthly budget, Spending log, Savings goals, Bills
& due dates. Month switcher (Sep / Oct / Nov 2026) in the masthead; every
page follows it.

## What works

- Budget sliders + number fields move a category's plan; totals and
  over/under flags move with them; saved in localStorage.
- Add-spending form adds a row to the log and updates the budget page and
  the statement totals.
- Category filter on the spending log.
- Goal buttons (+$25 / +$50 / custom amount) raise a goal's balance and
  progress bar.
- "Mark paid" on due/upcoming bills updates the paid counts.
- Charts are hand-written inline SVG (six-month trend bars against the pay
  line, spending ring, plan bars). No library, no network, no external
  resource anywhere. System fonts only.

## The numbers (verified)

- 122 transactions (Sep 39, Oct 39, Nov 44). A script checked every
  category's rows against its monthly actual, dollar for dollar, and every
  monthly total against the six-month trend: all consistent.
- Take-home pay $7,850/mo. Planned spending $7,440 every month. Actuals:
  Sep $7,380 (leftover $470), Oct $7,415 ($435), Nov $7,490 ($360).
  Saving rate 15.3% (Nov).
- US benchmarks, labelled with source and year: BLS Consumer Expenditure
  Survey 2024 (news release USDL-25-1586, 19 Dec 2025 — average spending
  $78,535/yr; housing 33.4%, transport 17.0%, food 12.9%, health 7.9%);
  BEA personal saving rate averaged about 4.6% in 2024. The BLS figures
  were verified against bls.gov before use.

## Design

Theme "Passbook" (custom, theme-factory Create-Your-Own — no preset fits a
bank statement; Modern Minimalist is the closest in spirit but washed out,
Forest Canopy is the rejected base). A printed bank statement, not a
dashboard: white paper #FFFFFF, trust-navy ink #0F172A, bank blue #1E3A8A,
ledger red #B42318 only where money is over or due, gold #A16207 kept to
the single pay line in the trend chart. One type family — system sans only,
hierarchy by weight and size (wordmark 800/26, figures 800/38 tabular).
The bold element is the four-figure statement strip: a 3px ink rule on top
and a double rule underneath. Everything else is ruled sections, no boxes,
no shadows. ui-ux-pro-max lookups used: style #36 Financial Dashboard
(Best For: budget monitoring, banking analytics — its totals-row and
variance-coloring patterns kept, its generic green/red chrome dropped),
palette #42 Banking/Traditional Finance (#0F172A / #1E3A8A / #A16207),
typography #31 Financial Trust (IBM Plex Sans, single family — cannot load
Google Fonts offline, so the system-ui stack is the local equivalent),
charts #1 trend (bars plus a distinct dashed pay line) and #13 waterfall
(plan bars already show variance).

Second pass (2026-11-26, after the user said the first pass smelled of AI):
the first design was Forest Canopy — ivory #faf9f6, Georgia serif display,
brass #a67c2e — exactly frontend-design's AI tell #1 (warm cream near
#F4F1EA + high-contrast serif + terracotta/clay accent), plus white panel
boxes (the SaaS-card kit) and a middle-dot tagline. All of it was removed:
white paper, no serif anywhere, navy/blue/red, ruled sections instead of
boxes, tagline separators are hairline rules, sentence case throughout,
tabular numerals on the sans instead of a monospace face. Content, data and
every control are unchanged; only the visual layer moved. One real chart
bug fixed in the same pass: the trend chart's bar-value labels were struck
through by the pay line, so values now sit inside the bars in white.

## Screenshots (real renders, headless Chromium, unedited)

- 1-overview.jpg — 1280×800, 98,944 bytes (redesigned)
- 2-budget.jpg — 1280×800, 95,459 bytes (redesigned)
- 3-transactions.jpg — 1280×800, 85,464 bytes (redesigned)
- 4-overview-phone.jpg — 390×844, 50,385 bytes (redesigned)
All ≤256 KiB, long side ≤1280, short side ≥360. All four pages were
viewed after the redesign; no overlaps, no smears, no AI-template look.
Goals and bills pages were also rendered and checked in the first pass
(6 "Mark paid" buttons, "14 of 20 bills paid", 6 goal add buttons).

## Hand-in program

main.ts (Node 22, stdlib only, written for this entry) copies app/ and
screenshots/ to /output and writes dossier.json with buildDossier from
vendor/makefun-frontend.ts (the kit's copy, byte for byte: SHA-256
4c8da1c8e76490b3a847670f49137d3ec23953e3c988fe6a6cb320fce5739240).

- Ran twice with MAKEFUN_OUTPUT_DIR: outputs byte for byte identical.
- Dossier: 579,497 bytes (< 1.5 MiB). First load 7 files, 16,237 bytes
  gzip-9 (53,050 raw); whole app 7 files, 53,050 bytes; URLs in source: 0.

## Gate checklist (from the kit)

- app_files: 7 files, 53,050 bytes — inside 993 files / 16 MiB.
- references: no absolute URLs anywhere (0 in the dossier); every script,
  stylesheet and module is a relative file under app/.
- screenshots: 4, each within size and dimension caps.
- dossier_matches: dossier.json is what buildDossier writes from these
  files; re-running main.ts reproduces it.
- README carries this slug's three live badges at
  make.fun/badge/best-household-budget-site-20261126-1457(.svg, /rank.svg,
  /reward.svg) — the bounty/…/badge.svg pattern 404s for this slug and was
  not used. GitHub About still to set: homepage
  https://make.fun/bounty/best-household-budget-site-20261126-1457, topic
  makefun.

## Still to do (needs the live browser)

1. Create the public repo household-budget-site-20261126 on github.com/new
   (signed in as 1556301539-dot; connector create returns 403, gh is not
   logged in). Must be after the 14:57 opening — it is.
2. Push the text files with the GitHub connector snapshot flow; verify the
   head with the GitHub API.
3. Upload the four screenshots from work/screenshots/ through the browser
   (binary files cannot go through the connector).
4. Bundle transcripts (this session), run the kit check, submit with the
   agent keypair, poll the dev grade.
