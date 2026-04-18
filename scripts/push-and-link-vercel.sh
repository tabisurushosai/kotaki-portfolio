#!/usr/bin/env bash
# GitHub に push し、既存の Vercel プロジェクトと Git を連携する。
# 事前: export GH_TOKEN=ghp_xxxx（classic: repo 権限 / fine-grained: Contents+Metadata 読み書き）
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

REPO_NAME="${GITHUB_REPO_NAME:-kotaki-portfolio}"
PRIVATE="${GITHUB_REPO_PRIVATE:-false}"

if [[ -z "${GH_TOKEN:-}" ]]; then
  echo "GH_TOKEN が未設定です。次を実行してから再実行してください:"
  echo "  export GH_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx"
  echo "（GitHub → Settings → Developer settings → Personal access tokens）"
  exit 1
fi

LOGIN="$(
  curl -sS -H "Authorization: Bearer ${GH_TOKEN}" -H "Accept: application/vnd.github+json" \
    https://api.github.com/user | python3 -c "import sys,json; print(json.load(sys.stdin)['login'])"
)"

echo "GitHub ユーザー: ${LOGIN}"

HTTP_CODE="$(
  curl -sS -o /tmp/gh-create-repo.json -w "%{http_code}" -X POST \
    -H "Authorization: Bearer ${GH_TOKEN}" \
    -H "Accept: application/vnd.github+json" \
    https://api.github.com/user/repos \
    -d "{\"name\":\"${REPO_NAME}\",\"private\":${PRIVATE},\"description\":\"小瀧雄基 ポートフォリオ（Vite + React）\"}"
)"
if [[ "$HTTP_CODE" != "201" && "$HTTP_CODE" != "422" ]]; then
  echo "リポジトリ作成に失敗しました (HTTP ${HTTP_CODE}):"
  cat /tmp/gh-create-repo.json
  exit 1
fi

AUTH_REMOTE="https://x-access-token:${GH_TOKEN}@github.com/${LOGIN}/${REPO_NAME}.git"
CLEAN_REMOTE="https://github.com/${LOGIN}/${REPO_NAME}.git"

git remote remove origin 2>/dev/null || true
git remote add origin "$AUTH_REMOTE"
git push -u origin main
git push origin --tags
git remote set-url origin "$CLEAN_REMOTE"

echo "GitHub: ${CLEAN_REMOTE%.git}"

if command -v vercel >/dev/null 2>&1; then
  echo "Vercel に Git を接続しています…"
  vercel git connect "$CLEAN_REMOTE" || {
    echo "※ vercel git connect に失敗しました。Vercel ダッシュボード → Project → Settings → Git で接続してください。"
    exit 1
  }
  echo "完了。Vercel ダッシュボードで Production Branch = main を確認してください。"
else
  echo "vercel CLI がありません。Vercel ダッシュボードからリポジトリを接続してください。"
fi
