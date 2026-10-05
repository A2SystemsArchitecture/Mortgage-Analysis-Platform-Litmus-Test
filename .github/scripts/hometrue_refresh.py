from pathlib import Path

p = Path('platform.html')
s = p.read_text(encoding='utf-8')
original = s

def replace_exact(old, new, min_count=1):
    global s
    count = s.count(old)
    if count < min_count:
        raise SystemExit(f'Expected at least {min_count} occurrence(s), found {count}: {old[:100]!r}')
    s = s.replace(old, new)
    print(f'replaced {count}: {old[:80]}')

old_root = """  --slate-bg:#eceff1;--slate-surface:#e0e7ea;--slate:#b0bec5;--slate-dim:#90a4ae;
  --midnight:#1a2332;--midnight-mid:#243042;--midnight-lt:#2e3d52;
  --teal:#00838f;--teal-mid:#0097a7;--teal-light:#e0f7fa;--teal-dim:#006670;--teal-muted:#b2ebf2;
  --indigo:#4527a0;--indigo-mid:#5e35b1;--indigo-light:#ede7f6;--indigo-dim:#311b92;--indigo-muted:#d1c4e9;
  --emerald:#2e7d52;--emerald-mid:#388e5e;--emerald-light:#e8f5ee;--emerald-dim:#1b5e38;--emerald-muted:#c8e6d4;
  --ink:#1a2332;--white:#ffffff;--muted:#546e7a;--rule:#cfd8dc;
  --warn:#6d4c00;--warn-lt:#fff8e6;--error:#c62828;--error-lt:#ffebee;"""
new_root = """  /* HomeTrue Refined Baseline — LOCKED web palette v1.0 */
  --brand-navy:#0F1B3D;--brand-green:#1FA663;--brand-purple:#4E2E8F;--brand-gold:#D69A08;
  --brand-charcoal:#1C253B;--brand-lavender:#E9E4F7;--brand-mist:#F4F2FA;--brand-white:#FFFFFF;
  --slate-bg:#F4F2FA;--slate-surface:#E9E4F7;--slate:#C7C2D8;--slate-dim:#7B8190;
  --midnight:#0F1B3D;--midnight-mid:#1C253B;--midnight-lt:#27345F;
  --teal:#1FA663;--teal-mid:#1FA663;--teal-light:#EEF9F3;--teal-dim:#137A48;--teal-muted:#BFE6D2;
  --indigo:#4E2E8F;--indigo-mid:#6845AD;--indigo-light:#E9E4F7;--indigo-dim:#3B216F;--indigo-muted:#CEC3E9;
  --emerald:#1FA663;--emerald-mid:#2BB674;--emerald-light:#EEF9F3;--emerald-dim:#137A48;--emerald-muted:#BFE6D2;
  --ink:#1C253B;--white:#FFFFFF;--muted:#596175;--rule:#D8D3E5;
  --warn:#D69A08;--warn-lt:#FFF7DF;--error:#C62828;--error-lt:#FFEBEE;"""
replace_exact(old_root, new_root)
replace_exact('<meta name="theme-color" content="#1a2332">', '<meta name="theme-color" content="#0F1B3D">')
replace_exact(".mh::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 20% 50%,rgba(0,151,167,.12),transparent 60%),radial-gradient(ellipse at 80% 50%,rgba(46,125,82,.08),transparent 60%);}", ".mh::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 20% 50%,rgba(78,46,143,.18),transparent 60%),radial-gradient(ellipse at 80% 50%,rgba(31,166,99,.12),transparent 60%);}")
replace_exact(".mh-rule{width:2rem;height:2px;background:linear-gradient(90deg,rgba(0,200,220,.9),rgba(56,142,94,.9));margin:.5rem auto;position:relative;}", ".mh-rule{width:2.75rem;height:2px;background:linear-gradient(90deg,#D69A08,#4E2E8F,#1FA663);margin:.5rem auto;position:relative;}")

launch_replacements = {
    'Full access opens July 1, 2026.':'Full access opens November 1, 2026.',
    'Return to Waitlist · Full Access July 1':'Return to Waitlist · Full Access November 1',
    'Launch July 1, 2026':'Launch November 1, 2026',
    'on launch day July 1, 2026.':'on launch day November 1, 2026.',
    'What unlocks at each plan · July 1, 2026':'What unlocks at each plan · November 1, 2026',
    'Demo limit reached — Full access July 1':'Demo limit reached — Full access November 1',
    'available July 1, 2026. Join the waitlist for early access.':'available November 1, 2026. Join the waitlist for early access.',
    'Launches July 1, 2026':'Launches November 1, 2026',
    'starting July 1, 2026.':'starting November 1, 2026.'
}
for old,new in launch_replacements.items():
    replace_exact(old,new)

# Update the calculation object before replacing generic display text embedded inside it.
replace_exact('let MKT = {rv:"Friday, May 15, 2026 · 9:00 AM ET · 6.36% (760+ credit)",ov:"Verified May 15, 2026",fm:6.36,br:6.11,wr:6.75,', 'let MKT = {rv:"October 1, 2026 · 7.28% · Freddie Mac PMMS 30-year fixed national average",ov:"Verified October 1, 2026",fm:7.28,br:7.03,wr:7.67,')
replace_exact('Friday, May 15, 2026 · 9:00 AM ET · 6.36% (760+ credit)', 'October 1, 2026 · 7.28% · 30-year fixed national average')
replace_exact('Friday, May 15, 2026 · 9:00 AM ET', 'October 1, 2026')
replace_exact('6.36% (760+ credit)', '7.28% · 30-year fixed national average')

old_ranges = """const RATE_RANGES = {
  'excellent':  { min: 6.00, max: 6.25, label: '760+ Excellent' },
  'very-good':  { min: 6.25, max: 6.50, label: '720–759 Very Good' },
  'good':       { min: 6.50, max: 6.875,label: '680–719 Good' },
  'fair':       { min: 6.875,max: 7.25, label: '640–679 Fair' },
};"""
new_ranges = """const RATE_RANGES = {
  // HomeTrue planning ranges calibrated to the current Freddie Mac PMMS benchmark; not lender quotes.
  'excellent':  { min: 6.92, max: 7.17, label: '760+ Excellent' },
  'very-good':  { min: 7.17, max: 7.42, label: '720–759 Very Good' },
  'good':       { min: 7.42, max: 7.795,label: '680–719 Good' },
  'fair':       { min: 7.795,max: 8.17, label: '640–679 Fair' },
};"""
replace_exact(old_ranges,new_ranges)
replace_exact('current market range of 6.00–6.75%', 'current HomeTrue planning range of 7.03–7.67%')
replace_exact("const rate = RATE_RANGES[cr] ? (RATE_RANGES[cr].min + RATE_RANGES[cr].max) / 2 : 6.25;", "const rate = RATE_RANGES[cr] ? (RATE_RANGES[cr].min + RATE_RANGES[cr].max) / 2 : MKT.fm;")
replace_exact("const base={address:\"Sample Property — Enter your own above\",price:460000,dpct:3,damt:13800,loan:446200,byr:2008,rage:10,rtp:'tile',con:'cbs',sht:true,hoa:185,fld:'x',ilo:10000,ihi:13000,pri:true,crd:'excellent',br:6.00,wr:6.75};", "const base={address:\"Sample Property — Enter your own above\",price:460000,dpct:3,damt:13800,loan:446200,byr:2008,rage:10,rtp:'tile',con:'cbs',sht:true,hoa:185,fld:'x',ilo:10000,ihi:13000,pri:true,crd:'excellent',br:MKT.br,wr:MKT.wr};")

old_bars = "const bars=[6.00,6.23,6.33,6.50,6.75].map(r=>{const pi=cPI(i.loan,r);const pct=Math.round((r-5.5)/(7.5-5.5)*100);return`<div class=\"br\"><span class=\"brl\">${r}%</span><div class=\"btr\"><div class=\"bf\" style=\"width:${pct}%\"></div></div><span class=\"bv2\">${fmt(pi)}/mo</span></div>`;}).join('');"
new_bars = "const rateFloor=MKT.br-.5,rateCeil=MKT.wr+.5;const bars=[MKT.br,(MKT.br+MKT.fm)/2,MKT.fm,(MKT.fm+MKT.wr)/2,MKT.wr].map(r=>{r=Math.round(r*100)/100;const pi=cPI(i.loan,r);const pct=Math.max(0,Math.min(100,Math.round((r-rateFloor)/(rateCeil-rateFloor)*100)));return`<div class=\"br\"><span class=\"brl\">${r.toFixed(2)}%</span><div class=\"btr\"><div class=\"bf\" style=\"width:${pct}%\"></div></div><span class=\"bv2\">${fmt(pi)}/mo</span></div>`;}).join('');"
replace_exact(old_bars,new_bars)

replace_exact('Run a real Tier 1 analysis on any property in our 11 launch states. Your actual numbers — no fictional data.', 'Run a real Tier 1 analysis on any property in a supported HomeTrue market. Your actual numbers — no fictional data.')
replace_exact('The platform covers 16 states and 79 counties', 'The platform covers all supported HomeTrue states and counties shown in the market selector')
replace_exact('Mortgage rate data is updated every Friday by 12:00 PM Eastern Time based on the Freddie Mac Primary Mortgage Market Survey published that same Thursday.', 'Mortgage rate data is updated every Friday by 7:00 AM Eastern Time based on the latest official Freddie Mac Primary Mortgage Market Survey release.')
replace_exact('Rate data is sourced from Freddie Mac PMMS, verified every Friday by 12:00 PM ET', 'Rate data is sourced from Freddie Mac PMMS, verified every Friday by 7:00 AM ET')

for token in ['May 15, 2026', '6.36% (760+ credit)', 'Full access July 1', 'Launch July 1, 2026', 'launch day July 1, 2026', 'Launches July 1, 2026', 'starting July 1, 2026']:
    if token in s:
        raise SystemExit(f'Stale token remains: {token}')
if s == original:
    raise SystemExit('No platform changes produced')
p.write_text(s, encoding='utf-8')

m = Path('site.webmanifest')
ms = m.read_text(encoding='utf-8')
ms2 = ms.replace('"background_color": "#1a2332"', '"background_color": "#0F1B3D"').replace('"theme_color": "#1a2332"', '"theme_color": "#0F1B3D"')
if ms2 == ms:
    raise SystemExit('Expected site.webmanifest color replacements were not found')
m.write_text(ms2, encoding='utf-8')
