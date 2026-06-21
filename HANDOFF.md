# HANDOFF — 紀とり ホームページ（新セッション用 引き継ぎ）

> 新しいチャットは **まずこのファイルを読んで** から作業すること。

## これは何
- 和歌山県御坊市の炭火焼き鳥「**紀とり｜KITORI**」公式サイト。
- 依存パッケージ不要の静的サイト（HTML / CSS / Vanilla JS）。和モダン（墨黒×熾火の金、明朝体）、スクロール演出・粒子アニメ・完全レスポンシブ。
- 詳細仕様は [README.md](README.md) を参照。

## 現状 / 構成（分割で変更あり・注意）
- GitHub Pages で公開中: **https://youtubeshort2003-cyber.github.io/kitori-homepage/**
- **分割時にファイルをルート直下へ移動した**ため、構成は README の `site/` 記述ではなく現状は以下：
  - `index.html`（ページ本体・1ページ完結）
  - `assets/css/style.css` / `assets/js/main.js` / `assets/img/favicon.svg`
- ローカル確認: リポジトリ直下で `python -m http.server 8000` → http://localhost:8000

## 経緯
- 元は `youtube_shorts_automation` リポジトリの `docs/` に混在。2026-06-21にテーマ別へ分割し独立リポジトリへ。

## 公開前に差し替え推奨（READMEより）
- メニュー・価格・コース（現状は参考値）／料理・店内・外観の写真追加（`assets/img/`）／コンセプト文。
- 店舗基本情報（住所・TEL・営業時間）は食べログ反映済み。
