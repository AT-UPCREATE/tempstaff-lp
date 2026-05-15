# SKILL.md — パーソルテンプスタッフLP デザインシステム

## 概要

このファイルはLP実装時にAIが従うべきデザインシステムのルールを定義する。
コードを書く前に必ず以下の参照ファイルをすべて読み込み、チェック手順を実施すること。

---

## 参照ファイル一覧

| ファイル | 内容 |
|----------|------|
| `references/tokens-color.css` | カラー変数と用途 |
| `references/tokens-typography.css` | フォントファミリー・ウェイト変数と用途 |
| `references/tokens-animation.css` | アニメーション・インタラクション変数と用途 |
| `references/prohibitions.md` | 複数ファイルをまたぐ横断ルールと禁止事項 |

---

## チェック手順（コードを書く前・レビュー時に必ず実施）

### Step 1: 参照ファイルを読み込む

実装に関係するトークンファイルをすべて読み込む。
カラー変更なら `tokens-color.css`、アニメーション変更なら `tokens-animation.css`、と対象に応じて選択する。

### Step 2: チェック対象のコードを確認する

変更・追加する CSS/HTML の範囲を把握する。

### Step 3: 3点チェックを実施する

#### チェック 1：ハードコードがないか

- hex カラー（`#XXXXXX`）が直接書かれていないか
- フォント名が直接書かれていないか
- transition値・px値が直接書かれていないか

#### チェック 2：`--ds-*` 変数を使っているか

- すべての色・フォント・アニメーション値が `var(--ds-*)` 形式になっているか

#### チェック 3：変数の用途コメントに沿っているか

- 各変数のコメントに記載された用途以外で使っていないか
- 「〜のみ使用可」と書かれた変数を他の箇所で流用していないか

### Step 4: 違反があれば修正する

違反箇所を特定し、対応する `--ds-*` 変数に置き換える。
該当変数がない場合は、新規トークンを追加する前にユーザーに確認すること。

---

## PC / SP 判定チェック（アニメーション実装時）

アニメーション・インタラクションを実装する際は、以下の手順で PC / SP を判定すること。

1. **実装対象が PC か SP かを確認する**（メディアクエリの範囲を確認）
2. **PC の場合 → `--ds-cta-pc-*` 変数を使う**
3. **SP の場合 → `--ds-cta-sp-*` 変数を使う**
4. **禁止事項を `prohibitions.md` で照合する**（SP に box-shadow を追加していないか等）

---

## コンポーネント別インタラクション早見表

| コンポーネント | デフォルト | インタラクション | transition |
|----------------|-----------|-----------------|------------|
| ナビリンク（PC） | 通常テキストカラー | `opacity: 0.7` | `var(--ds-nav-transition)` |
| フッターリンク（PC） | 通常テキストカラー | `opacity: 0.7` | `var(--ds-nav-transition)` |
| CTAボタン（PC） | `box-shadow: none` | `translateY(2px)` + shadow | `var(--ds-cta-pc-transition)` |
| CTAボタン（SP） | `box-shadow: none` | `translateY(1px)` + `opacity: 0.9` | `var(--ds-cta-sp-transition)` |
| 追従CTA（PC/SP）| FV通過後に表示 | CTAボタンと同様 | 同上 |
| ハンバーガーメニュー（SP）| `translateX(100%)` | `translateX(0)` | CSS transition で制御 |

---

## フォント使い分けルール

- 日本語テキスト → `var(--ds-font-ja)`（Zen Kaku Gothic New）
- 欧文・数字 → `var(--ds-font-en)`（Plus Jakarta Sans）
- 欧文の特別強調時のみ → `font-weight: var(--ds-font-weight-extrabold)` + `font-style: var(--ds-font-style-italic)`
