#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
export ROOT="$(pwd)"

if [[ ! -f "$ROOT/portfolio.html" ]]; then
  echo "ERROR: portfolio.html not found" >&2
  exit 1
fi

python3 << 'PY'
import os
import re
import sys
from collections import Counter
from pathlib import Path

root = Path(os.environ["ROOT"])
html = (root / "portfolio.html").read_text(encoding="utf-8")

ids = re.findall(r'\bid="([^"]+)"', html)
dups = [k for k, v in Counter(ids).items() if v > 1]
if dups:
    print("ERROR: duplicate id values:", ", ".join(sorted(dups)), file=sys.stderr)
    sys.exit(1)

id_set = set(ids)
hrefs = re.findall(r'href="#([^"]+)"', html)
missing = sorted({h for h in hrefs if h not in id_set})
if missing:
    print("ERROR: href targets missing id:", ", ".join(missing), file=sys.stderr)
    sys.exit(1)

warned = False
for m in re.finditer(r'(?:src|href)="\./([^"]+)"', html):
    rel = m.group(1)
    p = root / rel
    if not p.is_file():
        print(f"WARN: referenced file missing locally: ./{rel}", file=sys.stderr)
        warned = True

print("OK: portfolio.html checks passed" + (" (warnings above)" if warned else ""))
PY

vercel deploy --prod --yes
