# prohibitions.md — 横断禁止ルール

複数のトークンファイルをまたぐルールと、絶対に守るべき禁止事項を記載する。

---

## 絶対禁止：ハードコード

- hex カラー値（例: `#FF8A00`）を直接CSSに書くことを禁止。必ず `--ds-color-*` 変数を使うこと
- フォント名（例: `'Zen Kaku Gothic New'`）を直接書くことを禁止。必ず `--ds-font-*` 変数を使うこと
- transition値（例: `0.3s ease`）を直接書くことを禁止。必ず `--ds-*-transition` 変数を使うこと

---

## PC と SP の使い分け（必ず分離すること）

| 要素 | PC ホバー | SP タップ |
|------|-----------|-----------|
| CTA ボタン | `translateY(var(--ds-cta-pc-hover-translate-y))` + `box-shadow` | `translateY(var(--ds-cta-sp-tap-translate-y))` + `opacity: 0.9` |
| 沈み込み量 | 2〜3px | 1px のみ |
| transition | `var(--ds-cta-pc-transition)` (0.3s) | `var(--ds-cta-sp-transition)` (0.15s) |
| box-shadow | あり | **禁止** |

- PC の CTA アニメーション値を SP に流用することを禁止
- SP の CTA に `box-shadow` を追加することを禁止

---

## ナビ・フッターリンクに禁止する表現

- `translateY` による沈み込みは禁止（CTAボタン専用）
- `box-shadow` による影は禁止（CTAボタン専用）
- ホバー時は `opacity: var(--ds-nav-hover-opacity)` のみとすること

---

## デフォルト時に box-shadow を追加することを禁止

- CTAボタン・ナビ・フッター すべてのデフォルト状態は `box-shadow: none`
- ホバー/タップ時にのみ shadow を付与すること

---

## 追従CTAの表示制御ルール

- FV（ファーストビュー）を通過後にのみ表示
- お問い合わせセクションの手前で非表示にすること
- この条件は PC・SP 共通

---

## フォントの使い分けルール

### チェック手順（この順番で確認すること）

1. **対象テキストが日本語か欧文かを確認する**
2. **日本語 → `var(--ds-font-ja)` を使う。欧文・数字 → `var(--ds-font-en)` を使う**
3. **ExtraBold italic（`--ds-font-weight-extrabold` + `--ds-font-style-italic`）は `var(--ds-font-en)` との組み合わせのみ使用可**

- 日本語テキストに `--ds-font-en` を使うことを禁止
- 欧文テキストに `--ds-font-weight-extrabold` を使う場合は、必ず `--ds-font-style-italic` も併用すること
