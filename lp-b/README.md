# FlexibleCAREER LP

パーソルテンプスタッフ株式会社 向けランディングページ

---

## 表示方法

ビルドツール不要。`index.html` をブラウザで開くだけで動作します。

> **注意:** フォント（Zen Kaku Gothic New / Plus Jakarta Sans）は Google Fonts から読み込みます。
> 表示にはインターネット接続が必要です。

ローカルで編集しながら確認する場合は VS Code の **Live Server** 拡張を推奨します。

---

## ファイル構成

```
/
├── index.html          メインHTML
├── style.css           変数・リセット・共通スタイル
├── components/         複数箇所で使う共通UIパーツ
│   ├── button.css      ボタン
│   └── badge.css       バッジ
├── sections/           セクションごとのCSS（1セクション1ファイル）
│   ├── header.css
│   ├── hero.css
│   └── ...
├── js/
│   └── main.js         ハンバーガー・追従CTA・アニメーション制御
└── assets/
    └── images/         画像（.webp / .jpg / .png / .svg）
```

---

## デザイン変数の場所

色・余白・フォントサイズはすべて `style.css` の `:root` に集約しています。

```css
:root {
  --color-primary: #0B1F3A;   /* メインカラー */
  --color-cta:     #FF8A00;   /* CTAオレンジ */
  --fs-base:       1rem;      /* 基本文字サイズ */
  --sp-8:          32px;      /* 余白 */
  /* ... */
}
```

---

## 画像について

- 画像は `assets/images/` に格納
- `.webp` 形式を優先し、`.jpg` / `.png` をフォールバックとして使用
- HTML は `<picture>` タグで記述

```html
<picture>
  <source srcset="assets/images/photo.webp" type="image/webp">
  <img src="assets/images/photo.jpg" alt="説明" loading="lazy" width="520" height="360">
</picture>
```

---

## ブレークポイント

| デバイス | 条件 |
|----------|------|
| スマートフォン | `max-width: 767px` |
| PC | `min-width: 768px` |

---

## 使用フォント

| フォント | 用途 |
|----------|------|
| Zen Kaku Gothic New | 日本語テキスト全般 |
| Plus Jakarta Sans ExtraBold Italic | 欧文アクセント |
