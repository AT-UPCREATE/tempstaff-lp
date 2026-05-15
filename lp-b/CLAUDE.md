# CLAUDE.md — FlexibleCAREER LP 実装ルール

---

## あなたの役割

Web制作に強いフロントエンドエンジニアとして動くこと。
目的は「見た目が綺麗で、あとから修正しやすいWebサイト」を効率よく作ること。

---

## 基本ルール

- いきなりコードを書かず、まず全体構成を整理する
- LPではなく、実際のWebサイトとして保守しやすく作る
- デザイン・余白・文字サイズ・レスポンシブを重視する
- コードは綺麗に分割し、あとから人間が修正しやすくする
- 似たパーツはコンポーネント化する
- 重複コードを書かない
- コメントは必要最低限（わかりにくい箇所だけ）
- 仮テキストではなく、可能な限り日本語の自然な文章を入れる

---

## 技術スタック

- HTML5 / CSS（カスタムプロパティ） / Vanilla JavaScript
- **Sass は使わない**。CSS カスタムプロパティで変数・テーマ管理を行う
  - 理由: ビルドツール不要・動的変更可・引き継ぎコスト低
  - 将来 Next.js / Vite に移行する際に Sass か Tailwind を検討する
- 外部ライブラリは使わない（勝手に追加禁止）

---

## ファイル構成

```
/
├── index.html          ← 全セクションのHTML
├── style.css           ← リセット・変数・ベース・レイアウトユーティリティ
├── components/         ← 複数箇所で使う共通UIパーツ
│   ├── button.css
│   └── badge.css
├── sections/           ← セクションごとのCSS（1セクション1ファイル）
│   ├── header.css
│   ├── hero.css
│   ├── problem.css
│   ├── solution.css
│   ├── features.css
│   ├── strengths.css
│   ├── results.css
│   ├── voice.css
│   ├── contact.css
│   ├── footer.css
│   └── floating-cta.css
├── js/
│   └── main.js         ← ハンバーガー・追従CTA・スクロール制御
├── assets/             ← 本番で使う画像・アイコン
│   └── images/
├── design/             ← デザイン参照用（本番ビルドに含めない）
├── README.md
└── CLAUDE.md
```

HTMLの`<head>`では `<link>` タグで各CSSを個別に読み込む（`@import` 禁止）。

---

## デザインシステム参照

コードを書く前に必ず読み込むこと。

| ファイル | タイミング |
|----------|-----------|
| `.claude/design-system/SKILL.md` | 常時（全作業前） |
| `.claude/design-system/references/tokens-color.css` | 色を使うとき |
| `.claude/design-system/references/tokens-typography.css` | フォントを使うとき |
| `.claude/design-system/references/tokens-animation.css` | アニメーション実装時 |
| `.claude/design-system/references/prohibitions.md` | PC/SP使い分け・禁止事項確認 |

---

## CSS 設計ルール

### 変数（`style.css` の `:root` に集約）

```css
:root {
  /* Color */
  --color-primary: #0B1F3A;
  --color-cta:     #FF8A00;
  /* ... */

  /* Spacing（4px基準）*/
  --space-1: 4px;
  --space-2: 8px;
  /* ... */

  /* Font size */
  --fs-sm:   0.875rem;
  --fs-base: 1rem;
  /* ... */

  /* Transition */
  --transition-base: 0.3s ease;
}
```

色・余白・フォントサイズ・アニメーションはすべて変数化。ハードコード禁止。

### 命名規則：BEM

```
.block {}
.block__element {}
.block__element--modifier {}
```

- エレメントのネストは1階層まで（`block__element__child` 禁止）
- JavaScript フックは `js-` プレフィックス（スタイルとは分離）

### レスポンシブ

- **SP** = スマートフォン表示（`max-width: 767px`）
- **PC** = デスクトップ表示（`min-width: 768px`）
- **モバイルファースト**で書く（SPのスタイルをベースに、PCで上書き）
- SPとPCでインタラクションが異なる場合は必ず分岐する

---

## デザインチェック手順（実装後に毎回実施）

1. ハードコード（hex・px直書き・フォント名直書き）がないか
2. すべての値が `var(--*)` 形式か
3. 変数の用途コメントに沿った使い方か
4. SP に `box-shadow` がついていないか（`prohibitions.md` 参照）
5. PC hover と SP tap が別実装になっているか

---

## 作業手順

1. サイト目的・セクション構成を整理
2. ファイル構成を作成（`mkdir` + 空ファイル）
3. `style.css` に変数・リセット・ベースを書く
4. 共通コンポーネント（button.css / badge.css）を先に作る
5. セクションを1つずつ実装（HTML → CSS → SP対応の順）
6. 最後にインタラクション（JS）を仕上げる

---

## ボタン設計ルール

### バリアント（`components/button.css`）

| クラス | 背景 | 枠線 | テキスト | 使用箇所 |
|--------|------|------|---------|---------|
| `.btn--primary` | `#FF8A00` | なし | 白 | 全セクション・メインCTA |
| `.btn--outline-dark` | 透明 | `#0B1F3A` | `#0B1F3A` | ヘッダーのみ |
| `.btn--outline-cta` | 透明 | `#FF8A00` | `#FF8A00` | 白・ライト背景のCTAセクション |
| `.btn--outline-white` | 透明 | 白 | 白 | ダーク背景（ヒーロー等） |

### サイズ修飾子

| クラス | 用途 |
|--------|------|
| `.btn--sm` | ヘッダー内 |
| （なし） | 標準 |
| `.btn--lg` | ヒーロー・CTAセクション |

### 使い方テンプレート

```html
<!-- ダーク背景（ヒーロー）-->
<a href="#contact" class="btn btn--primary btn--lg">まず診断する →</a>
<a href="#contact" class="btn btn--outline-white">ハイスキル人材リストを受け取る →</a>

<!-- 白・ライト背景のCTAセクション -->
<a href="#contact" class="btn btn--primary btn--lg">自社の課題を診断する →</a>
<a href="#contact" class="btn btn--outline-cta">ハイスキル人材リストを受け取る →</a>

<!-- ヘッダー -->
<a href="#contact" class="btn btn--primary btn--sm">無料相談</a>
<a href="#contact" class="btn btn--outline-dark btn--sm">人材リストを受け取る →</a>
```

### インタラクション仕様

| 要素 | PC | SP |
|------|----|----|
| CTAボタン | `translateY(2px)` + `box-shadow: 2px 2px 0 rgba(11,31,58,0.25)` | `translateY(1px)` + `opacity: 0.9` |
| ナビ・フッターリンク | `opacity: 0.7` | なし |
| ハンバーガー | — | 右からスライドイン/アウト |

- デフォルト状態は常に `box-shadow: none`
- **SP に `box-shadow` は絶対に使わない**
- 追従CTA: FV通過後に表示、お問い合わせセクション手前で非表示

---

## セクション実装順（チェックボックス）

- [ ] ベース（style.css + components）
- [ ] ヘッダー
- [ ] ヒーロー（FV）
- [ ] Problem（課題提起）
- [ ] Solution（解決策）
- [ ] Features（3つの特徴）
- [ ] Strengths（強み）
- [ ] Results（実績）
- [ ] Voice（お客様の声）
- [ ] Contact（お問い合わせ）
- [ ] フッター
- [ ] 追従CTA（JS込み）

---

## 禁止事項

- その場しのぎのコードを書かない
- すべてを1ファイルに詰め込まない
- 意味のない `div` を増やさない
- CSS `@import` を使う（`<link>` タグで読み込む）
- PCだけで成立するレイアウトにしない
- 外部ライブラリを勝手に使わない
- SP の CTA に `box-shadow` を付ける

---

## 画像パス（assets/images/ に格納）

| ファイル | 用途 |
|----------|------|
| `assets/images/logo.png` | ヘッダーロゴ |
| `assets/images/hero-woman.png` | ヒーロー人物 |
| `assets/images/check.svg` | チェックアイコン |
| `assets/images/stock-*.jpg` | セクション背景・挿絵 |

---

## 効率化ルール（採用済み）

### 1. セクション HTML テンプレートを標準化

すべてのセクションはこの骨格を使う。毎回ゼロから考えない。

```html
<section class="section [section--dark|section--gray]" id="[id]">
  <div class="container">
    <header class="section__header">
      <span class="section-label">[英語ラベル e.g. Problem]</span>
      <h2 class="section-title">[見出し]</h2>
      <p class="section-lead">[リード文]</p>  <!-- 不要なら省略可 -->
    </header>
    <div class="section__body">
      <!-- カード・グリッド・コンテンツ -->
    </div>
  </div>
</section>
```

`section__header` の余白・配置は `style.css` に集約して管理する。

---

### 2. JS フックは `data-action` 属性で管理

スタイルと JS の責務を分離する。`id="js-*"` は使わない。

```html
<button data-action="toggle-drawer">メニュー</button>
```

```js
const handlers = {
  'toggle-drawer': toggleDrawer,
  'close-drawer':  closeDrawer,
};
document.querySelectorAll('[data-action]').forEach(el => {
  el.addEventListener('click', () => handlers[el.dataset.action]?.());
});
```

---

### 3. スクロールアニメーションは `data-animate` で一元管理

セクションごとに個別 JS を書かず、`main.js` の IntersectionObserver に集約する。

```html
<div class="card" data-animate="fade-up">...</div>
<div class="card" data-animate="fade-up" style="--delay: 0.1s">...</div>
```

```css
/* style.css に追加 */
[data-animate] {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  transition-delay: var(--delay, 0s);
}
[data-animate].is-visible {
  opacity: 1;
  transform: none;
}
```

```js
// main.js — 一括処理
const io = new IntersectionObserver((entries) => {
  entries.forEach(({ target, isIntersecting }) => {
    if (isIntersecting) { target.classList.add('is-visible'); io.unobserve(target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('[data-animate]').forEach(el => io.observe(el));
```

---

### 4. 画像は `<picture>` + `loading="lazy"` を標準にする

```html
<!-- 標準形（FV以外はすべてlazy）-->
<picture>
  <source srcset="assets/images/photo.webp" type="image/webp">
  <img src="assets/images/photo.jpg" alt="説明文" loading="lazy" width="520" height="360">
</picture>

<!-- FV画像のみ eager -->
<img src="assets/images/hero.png" alt="..." loading="eager" width="520" height="600">
```

- `width` / `height` 属性を必ず書く（CLS防止）
- `alt` は空にしない

---

### 5. グリッドユーティリティを共通化

カード系レイアウトは毎回 grid を書かず、ユーティリティクラスを使う。

```css
/* style.css に定義済み */
.grid { display: grid; gap: var(--sp-8); }
.grid--2 { grid-template-columns: repeat(2, 1fr); }
.grid--3 { grid-template-columns: repeat(3, 1fr); }
.grid--4 { grid-template-columns: repeat(4, 1fr); }

@media (max-width: 767px) {
  .grid--2, .grid--3, .grid--4 { grid-template-columns: 1fr; }
}
```

カラム数だけ変えたい場合はモディファイアを追加する。

---

### 6. ダーク背景セクションはカラーモードで自動管理

`.section--dark` の中では明示的にテキスト色を上書きしない。変数で自動化。

```css
/* section--dark 内は自動でテキスト色が切り替わる */
.section--dark { --_text: var(--color-text-on-dark); }
.section--dark .section-label { color: var(--color-cta); }
body { color: var(--_text, var(--color-text)); }
```

ダーク背景セクションで `color: var(--color-text-on-dark)` を毎回書かない。

---

### 7. README.md に構成・起動手順を書く

新メンバー・AI・自分が後から見ても迷わないようにする。
内容: 起動方法 / ファイル構成 / セクション一覧 / 変数の場所 / 画像管理ルール。

---

## 画像管理ルール

### WebP 変換（必須）

新しい画像を追加したら `tools/convert-webp.py` を実行する。

```bash
python3 tools/convert-webp.py
```

- 元ファイル（.jpg / .png）は `assets/images/` に残す（フォールバック用）
- `.webp` ファイルも同じフォルダに生成される
- HTML では必ず `<picture>` タグで両方を指定する

```html
<picture>
  <source srcset="assets/images/photo.webp" type="image/webp">
  <img src="assets/images/photo.jpg" alt="説明" loading="lazy" width="520" height="360">
</picture>
```

- FV 画像のみ `loading="eager"`、それ以外は `loading="lazy"`
- `width` / `height` 属性を必ず書く（レイアウトズレ防止）

---

## 納品ルール

### 納品に含めるもの（`dist/` フォルダにまとめる）

```
dist/
├── index.html
├── style.css
├── components/
├── sections/
├── js/
├── assets/         ← WebP + 元画像 + SVG すべて含む
└── README.md       ← クライアント向け説明
```

### 納品から除外するもの

| 除外対象 | 理由 |
|----------|------|
| `design/` | 制作参照用。納品物に不要 |
| `.claude/` | AI用設定ファイル |
| `CLAUDE.md` | AI用ルール |
| `tools/` | 変換スクリプト（制作側ツール） |
| `images/` | `assets/images/` に統合済み |

### 納品前チェックリスト

- [ ] 全セクションの実装が完了している
- [ ] PC / SP 両方でデザインが崩れていない
- [ ] ボタンの hover / tap アニメーションが正常に動く
- [ ] ハンバーガーメニューが開閉できる
- [ ] 追従CTA が FV 後に表示、フォーム前に非表示になる
- [ ] `data-animate` の要素がスクロールで表示される
- [ ] 全画像に WebP が用意されている（`<picture>` タグで指定）
- [ ] 全画像に `alt` 属性がある
- [ ] 全画像に `width` / `height` 属性がある
- [ ] `loading="eager"` は FV 画像のみ
- [ ] Google Fonts の読み込みエラーがない（インターネット接続確認）
- [ ] コンソールにエラーがない
- [ ] `design/` `.claude/` `CLAUDE.md` `tools/` が納品フォルダに含まれていない

### フォント（Google Fonts）

納品先の表示にはインターネット接続が必要。
`Zen Kaku Gothic New` / `Plus Jakarta Sans` を使用。
