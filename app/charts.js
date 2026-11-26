// Charts, drawn as plain inline SVG from the household's own numbers — no
// library, no network, nothing to load. Every chart is a string of SVG that
// views.js drops into the page.

import { TREND, INCOME_MONTHLY } from './data.js';
import { money } from './state.js';

const BLUE = '#1e3a8a';
const INK = '#0f172a';
const GOLD = '#a16207';
const MUTED = '#64748b';
const RED = '#b42318';

// Six months of spending as bars, with a gold line for the $7,850 take-home
// pay. The gap between a bar and the line is the month's leftover.
export function trendChart() {
  const w = 560;
  const h = 210;
  const padL = 44;
  const padB = 26;
  const padT = 30;
  const max = 8200;
  const innerW = w - padL - 12;
  const innerH = h - padT - padB;
  const y = (v) => padT + innerH - (v / max) * innerH;
  const slot = innerW / TREND.length;
  const barW = Math.min(52, slot * 0.58);

  let bars = '';
  TREND.forEach((m, i) => {
    const x = padL + i * slot + (slot - barW) / 2;
    const top = y(m.spent);
    const over = m.spent > INCOME_MONTHLY;
    bars += `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${barW}" height="${(y(0) - top).toFixed(1)}" fill="${over ? RED : BLUE}"/>`;
    // Value inside the bar: the pay line runs just above the bar tops, so a
    // label above the bar would be struck through by it.
    bars += `<text x="${(x + barW / 2).toFixed(1)}" y="${(top + 16).toFixed(1)}" text-anchor="middle" font-size="11" fill="#ffffff" font-weight="700">${money(m.spent).replace('$', '')}</text>`;
    bars += `<text x="${(x + barW / 2).toFixed(1)}" y="${(h - 8).toFixed(1)}" text-anchor="middle" font-size="11" fill="${MUTED}">${m.month}</text>`;
  });

  const lineY = y(INCOME_MONTHLY);
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="Monthly spending, June to November 2026, against take-home pay of $7,850">
<line x1="${padL}" y1="7" x2="${padL + 24}" y2="7" stroke="${GOLD}" stroke-width="2" stroke-dasharray="6 4"/>
<text x="${padL + 30}" y="11" font-size="11" fill="${GOLD}" font-weight="700">Take-home pay $7,850</text>
<line x1="${padL}" y1="${lineY.toFixed(1)}" x2="${w - 12}" y2="${lineY.toFixed(1)}" stroke="${GOLD}" stroke-width="2" stroke-dasharray="6 4"/>
<line x1="${padL}" y1="${y(0).toFixed(1)}" x2="${w - 12}" y2="${y(0).toFixed(1)}" stroke="${INK}" stroke-width="1"/>
${bars}
</svg>`;
}

// Where the month's money went: the five biggest lines plus everything else,
// as a ring. The middle reads the month's total.
export function shareRing(rows, total) {
  const size = 200;
  const c = size / 2;
  const r = 74;
  const thick = 26;
  const circ = 2 * Math.PI * r;
  const colors = [BLUE, INK, GOLD, '#475569', '#94a3b8', '#cbd5e1'];
  const top = rows.slice(0, 5);
  const rest = total - top.reduce((s, row) => s + row.spent, 0);
  const slices = [...top, { name: 'Everything else', spent: rest }];
  let offset = 0;
  let rings = '';
  slices.forEach((s, i) => {
    if (s.spent <= 0) return;
    const frac = s.spent / total;
    const len = Math.max(frac * circ - 2, 1);
    rings += `<circle cx="${c}" cy="${c}" r="${r}" fill="none" stroke="${colors[i % colors.length]}" stroke-width="${thick}" stroke-dasharray="${len.toFixed(1)} ${(circ - len).toFixed(1)}" stroke-dashoffset="${(-offset).toFixed(1)}" transform="rotate(-90 ${c} ${c})"/>`;
    offset += frac * circ;
  });
  return `<svg viewBox="0 0 ${size} ${size}" width="200" height="200" role="img" aria-label="Spending by category">
${rings}
<text x="${c}" y="${c - 4}" text-anchor="middle" font-size="20" font-weight="700" fill="${INK}">${money(total)}</text>
<text x="${c}" y="${c + 16}" text-anchor="middle" font-size="11" fill="${MUTED}">spent this month</text>
</svg>`;
}

// One horizontal bar: what a category cost against what was planned. The
// gold tick marks the plan; the bar turns red past it.
export function planBar(spent, plan) {
  const w = 220;
  const h = 14;
  const scale = Math.max(spent, plan, 1);
  const spentW = (spent / scale) * w;
  const tickX = (plan / scale) * w;
  const over = spent > plan;
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="Spent ${money(spent)} of ${money(plan)} planned">
<rect x="0" y="0" width="${w}" height="${h}" fill="#e8ecf1"/>
<rect x="0" y="0" width="${spentW.toFixed(1)}" height="${h}" fill="${over ? RED : BLUE}"/>
<line x1="${tickX.toFixed(1)}" y1="0" x2="${tickX.toFixed(1)}" y2="${h}" stroke="${GOLD}" stroke-width="2"/>
</svg>`;
}
