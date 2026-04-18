#!/usr/bin/env bash
# GitHub に初回公開する（要: gh auth login または環境変数 GH_TOKEN）
set -euo pipefail
cd "$(dirname "$0")/.."

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI (gh) をインストールしてください: https://cli.github.com/"
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "先にログインしてください: gh auth login"
  echo "またはトークンを渡す: export GH_TOKEN=ghp_xxxx"
  exit 1
fi

REPO_NAME="${GITHUB_REPO_NAME:-kotaki-portfolio}"
VISIBILITY="${GITHUB_REPO_VISIBILITY:-public}"

if git remote get-url origin >/dev/null 2>&1; then
  echo "remote origin があります。push のみ実行します。"
  git push -u origin main
else
  gh repo create "$REPO_NAME" \
    --"$VISIBILITY" \
    --source=. \
    --remote=origin \
    --push \
    --description "小瀧雄基 ポートフォリオ（Vite + React）"
fi

echo "完了: $(gh repo view --json url -q .url 2>/dev/null || echo 'GitHub で URL を確認してください')"
