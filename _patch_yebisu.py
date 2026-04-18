# -*- coding: utf-8 -*-
from pathlib import Path

p = Path(__file__).resolve().parent / "portfolio.html"
t = p.read_text(encoding="utf-8")

t = t.replace(
    "以下は個別事例です（タイトルをタップして展開）。",
    "各項目は折りたたみ時も一行要約を表示しています。詳細はタップで展開できます。",
    1,
)

old1 = (
    "                  <span>物件��入シミュレーター</span>\n"
    "                </summary>"
)
new1 = (
    "                  <span class=\"work-sub-summary-main\">\n"
    "                    <span class=\"work-sub-summary-title\">物件��入シミュレーター</span>\n"
    "                    <span class=\"work-sub-summary-teaser\">"
    "��入前後の�クトを主要指標で即時比��"
    "</span>\n"
    "                  </span>\n"
    "                </summary>"
)
if old1 not in t:
    raise SystemExit("first summary block not found")
t = t.replace(old1, new1, 1)

# Fix corrupted稼?率 in teaser (U+FFFD) or normal file
bad_teaser = (
    '<span class="work-sub-summary-teaser">利回り・稼\ufffd率・'
    "キャッシュフローをヒートマップで可視化</span>"
)
good_teaser = (
    '<span class="work-sub-summary-teaser">利回り・稼��率・'
    "キャッシュフローをヒートマップで可視化</span>"
)
if bad_teaser in t:
    t = t.replace(bad_teaser, good_teaser, 1)
elif "利回り・稼��率・キャッシュフローをヒートマップで可視化" not in t:
    # fallback: any one broken middle char between 稼 and 率
    import re

    t, n = re.subn(
        r'(<span class="work-sub-summary-teaser">利回り・)稼.率(・キャッシュフローをヒートマップで可視化</span>)',
        r"\1稼��\2",
        t,
        count=1,
    )
    if n != 1:
        raise SystemExit("could not fix dashboard teaser")

old_bank = (
    "                  <span>��行提出資料 自動生成ツール</span>\n"
    "                </summary>"
)
new_bank = (
    "                  <span class=\"work-sub-summary-main\">\n"
    "                    <span class=\"work-sub-summary-title\">��行提出資料 自動生成ツール</span>\n"
    "                    <span class=\"work-sub-summary-teaser\">"
    "決算・物件データから融資向けサマリーと主要指標を自動生成"
    "</span>\n"
    "                  </span>\n"
    "                </summary>"
)
if old_bank not in t:
    raise SystemExit("bank block not found")
t = t.replace(old_bank, new_bank, 1)

old_nb = (
    "                  <span>経� NotebookLM</span>\n"
    "                </summary>"
)
new_nb = (
    "                  <span class=\"work-sub-summary-main\">\n"
    "                    <span class=\"work-sub-summary-title\">経��参�� NotebookLM</span>\n"
    "                    <span class=\"work-sub-summary-teaser\">"
�判断用のAI壁打�環境を設計・構��"
    "</span>\n"
    "                  </span>\n"
    "                </summary>"
)
if old_nb not in t:
    raise SystemExit("notebooklm block not found")
t = t.replace(old_nb, new_nb, 1)

old_dash = (
    "                  <span>統合版経��ダッシュボード</span>\n"
    "                </summary>"
)
new_dash = (
    "                  <span class=\"work-sub-summary-main\">\n"
    "                    <span class=\"work-sub-summary-title\">統�ダッシュボード</span>\n"
    "                    <span class=\"work-sub-summary-teaser\">"
    "4業務ツールを1画面に統合し入力とAIプロンプトを一括連携"
    "</span>\n"
    "                  </span>\n"
    "                </summary>"
)
if old_dash not in t:
    raise SystemExit("dashboard block not found")
t = t.replace(old_dash, new_dash, 1)

p.write_text(t, encoding="utf-8")
print("patched ok")
