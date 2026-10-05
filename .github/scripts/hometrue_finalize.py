from pathlib import Path

p = Path('platform.html')
s = p.read_text(encoding='utf-8')
original = s

# Sweep remaining hard-coded legacy brand colors into the locked Refined Baseline palette.
replacements = {
    '#1a2332':'#0F1B3D', '#243042':'#1C253B', '#2e3d52':'#27345F',
    '#00838f':'#1FA663', '#0097a7':'#1FA663', '#e0f7fa':'#EEF9F3', '#006670':'#137A48', '#b2ebf2':'#BFE6D2',
    '#4527a0':'#4E2E8F', '#5e35b1':'#6845AD', '#ede7f6':'#E9E4F7', '#311b92':'#3B216F', '#d1c4e9':'#CEC3E9',
    '#2e7d52':'#1FA663', '#388e5e':'#2BB674', '#e8f5ee':'#EEF9F3', '#1b5e38':'#137A48', '#c8e6d4':'#BFE6D2',
    '#eceff1':'#F4F2FA', '#e0e7ea':'#E9E4F7', '#b0bec5':'#C7C2D8', '#90a4ae':'#7B8190',
    '#546e7a':'#596175', '#cfd8dc':'#D8D3E5', '#6d4c00':'#D69A08', '#fff8e6':'#FFF7DF'
}
for old,new in replacements.items():
    count = s.count(old)
    if count:
        print(f'{old} -> {new}: {count}')
        s = s.replace(old,new)

# Brand-specific hard-coded accents that were previously teal/cyan.
s = s.replace(".mh-tag{font-family:var(--fm);font-size:.58rem;letter-spacing:.3em;text-transform:uppercase;color:rgba(140,220,230,1.0);", ".mh-tag{font-family:var(--fm);font-size:.58rem;letter-spacing:.3em;text-transform:uppercase;color:#E9E4F7;")
s = s.replace(".mh-sub{font-family:var(--fm);font-size:.6rem;color:rgba(220,232,235,1.0);", ".mh-sub{font-family:var(--fm);font-size:.6rem;color:rgba(255,255,255,.86);")
s = s.replace(".scope-b{display:inline-block;background:rgba(0,131,143,.25);border:1px solid rgba(0,151,167,.5);color:rgba(160,230,240,1.0);", ".scope-b{display:inline-block;background:rgba(78,46,143,.28);border:1px solid rgba(105,74,176,.70);color:#E9E4F7;")
s = s.replace(".gs{font-family:var(--fm);font-size:.6rem;letter-spacing:.12em;color:rgba(200,218,222,1.0);", ".gs{font-family:var(--fm);font-size:.6rem;letter-spacing:.12em;color:rgba(255,255,255,.78);")

# Tester indicator uses the locked gold rather than the old arbitrary yellow.
s = s.replace("el.style.color = '#ffd54f';", "el.style.color = '#D69A08';")

if s == original:
    raise SystemExit('No final palette changes produced')

# Guard against the primary legacy palette returning in inline styling.
for legacy in ['#1a2332','#00838f','#0097a7','#4527a0','#2e7d52','#eceff1','#e0e7ea','#546e7a','#cfd8dc','#6d4c00']:
    if legacy in s:
        raise SystemExit(f'Legacy brand color remains: {legacy}')

p.write_text(s, encoding='utf-8')
