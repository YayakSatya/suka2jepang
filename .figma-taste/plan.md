# Plan: Suka2Jepang · Job Matching Test Certificate (A4)

## Run
- Figma file: https://www.figma.com/design/bA02pQyLJLgjQULIGguYtz/Suka2Jepang-LMS (fileKey `bA02pQyLJLgjQULIGguYtz`)
- Target: frame `A4 - 1` (`7912:5144`) on `Page 12`, currently empty, 1190×1684 (A4 595×842 pt at 2×). Rename to `Certificate/A4`.
- Frames: one A4 portrait document. No Desktop 1920 / Mobile 390 page: this is a print/PDF document at a fixed size, not a responsive page.
- Design options: 1. Content mode: dummy (every dummy layer marked).
- Decisions confirmed by the user (2026-11-09):
  - Labels in Japanese + English (JLPT style). Indonesian is not used on the document.
  - Score report only: no pass/fail, no `CERTIFIED` badge, no checkmark medallion. The draft's badge conflicted with Conversation 57.5 (< 60 counts as fail in the DESIGN.md score scale).
  - Every score is shown as `x / 100`, including totals (`57.5 / 100`, with a decimal point because the labels are English).
  - Extra fields: katakana name, date of birth, test date and mode, and a verification QR. The disclaimer that this is not an official JLPT certificate is always included.
- How skill steps are adapted (reason: a single fixed-size print document, not a marketing page):
  - Step 3 `deal.mjs` is skipped. Its compositions are web page sections; the document follows the JLPT certificate structure below.
  - Step 7 Unsplash is skipped. A certificate has no photographs; the picture floor does not apply.
  - Step 5 does not run `foundations.figma.js`. Its layout modes and type sizes are for 1920/390 web pages. The build creates a small single-mode collection for the document instead (see below), unless the file already holds Suka2Jepang variables, in which case it binds to those.
  - Audit: the 1920 layout-guide checks and the picture floor are ignored, with these reasons in the report. Ruled table lines are allowed (a document table; the same exception as form fields).
- Existing system: none known locally (no `.figma-taste/design-system.json`). The build reads the file first (`getLocalVariableCollectionsAsync`, local text styles, `search_design_system "Suka2Jepang"`, any logo component).

## Inventories
- Subject inventory:
  1. Hinomaru red `#C12121`, the product's only action colour ("merah matahari terbit")
  2. Hanko: a red square seal (角印) stamped half over the issuer's name, the Japanese way to sign a document
  3. Seigaiha (青海波) wave pattern, a traditional pattern and the security band of a printed certificate
  4. The JLPT certificate structure: bilingual label pairs, a ruled horizontal score table, certificate number top right, issue date and seal at the bottom
  5. JLPT N4, the level of the mock test
  6. AI conversation test with four criteria: fluency, mastery, interaction, context
  7. LPK Timedoor Indonesia, the issuer behind Suka2Jepang
  8. Katakana name: how a Japanese employer reads an Indonesian candidate's name
  9. Bilingual Kicker (DESIGN.md): Japanese label above, translation below
  10. Reader: an HR officer at a Japanese company screening SSW candidates
- System inventory (document only):
  - States: one static document. Long-name edge case: a 30+ character name must still fit on one line at 44px (it may drop to 36px), and the katakana line must fit on one line.
  - Repeated units: field (JP label, EN label, value) ×5; score cell (Kind = Part | Total) ×8; score table ×2; seal ×1.

## Argument
- Header: proves who issued it and which document it is. Wordmark on the left, certificate number on the right.
- Title: names the document in two languages. 成績証明書 / Certificate of Scores, then the test name.
- Identity: who the scores belong to. Name and katakana are dominant; date of birth, test date and test mode are secondary.
- Mock Test table: the JLPT N4 mock result as JLPT reports it, sections as columns and the total last.
- Conversation Test table: the same table shape with the four AI criteria plus the total, so the two tests read side by side.
- Score note: one line saying each score is out of 100, so no reader assumes the JLPT scale (/60, /180).
- Verify + Issue: the QR and URL let an employer check the certificate; issue date, issuer and seal make it formal.
- Disclaimer (required): not an official JLPT certificate, in JP and EN.

## Direction deal
- No `deal.mjs`: web compositions do not apply (see Run).
- Direction: Japanese official document. Calm, ruled, white paper, one red, generous margins.
- Idea: *On this certificate, the **hanko seal and the seigaiha band** become **the proof of authenticity that a JLPT certificate gets from its guilloche and its seal**.* The JLPT certificate itself uses guilloche and a corporate seal, not seigaiha in Hinomaru red; a generic course certificate uses a gold ribbon and a laurel. The idea belongs to Suka2Jepang's red and to a Japanese document.
- Structure (top to bottom, all inside `Certificate/Body`, auto layout vertical):
  1. `Header` row (SPACE_BETWEEN): wordmark | certificate number
  2. `Title` stack, centred (the one centred moment)
  3. `Identity`: name row full width, then a three-column row (DOB | test date | test mode)
  4. `Scores/Mock` table, 3 columns
  5. `Scores/Conversation` table, 5 columns
  6. `Scores/Note`
  7. `Close` row (SPACE_BETWEEN): verify block (QR + text) | issue block (date, issuer, seal)
  8. `Disclaimer`
- Root frame structure (a deliberate overlap, so the root has absolute children):
  - `Certificate/A4` 1190×1684, fill `cert/paper`, no auto layout
    - `free/pattern`: seigaiha vector covering the whole page, locked. Its colour shows only in the 64px band, because the body covers the centre.
    - `Certificate/Body` at x 64, y 64, 1062×1556, fill `cert/paper`, stroke 2px inside `cert/accent`, padding 48 all sides, so the content is 966 wide at x 112 (≈ 20 mm print margin). Vertical auto layout; groups separated by `space/section` (48), `SPACE_BETWEEN` on the main axis so `Close` + `Disclaimer` sit at the bottom.
- Seigaiha generation (in `use_figma`, one vector): scales of radius R = 16 with three concentric arcs (r 16, 11, 6). Centres every 2R horizontally; each row is R/2 lower than the last and odd rows are shifted R horizontally. Each row is drawn after the previous one so its upper halves overlap it. Build one SVG `<path>` string in JS (arc commands, `fill="none"`, stroke 1.5) and use `figma.createNodeFromSvg`, then bind the stroke to `cert/pattern`. Use a plain frame with a white fill per scale only if the overlap looks wrong in the screenshot. Fallback: concentric arcs without the overlap (a simple scale pattern).
- Score table (JLPT shape): a horizontal row of `Certificate/ScoreCell` instances, FILL width each, so the columns share the width equally.
  - `ScoreCell`: vertical auto layout. Top part (`cell/head`): JP label (Label JP) above EN label (Label EN), padding 16/20, fill `cert/surface`. Bottom part (`cell/score`): score text (Score), padding 20, fill `cert/paper`.
  - Kind = Total: ground `cert/accent-tint` in both parts, Score Total style, label 合計 / Total.
  - Lines: the table frame has a 2px `cert/rule` stroke; the cells have 2px `cert/rule` strokes on the right and between head and score (individual stroke weights). No radius on the table. JLPT tables are square.

## References
- None given by the user. Structure adopted from the public JLPT "Certificate of Result and Scores" (from knowledge, not extracted): bilingual JP/EN label pairs, a ruled horizontal score table with sections as columns and the total last, certificate number top right, issue date with a red corporate seal at the bottom, and a fine security border.
- Not taken: JLPT's exact title (認定結果及び成績に関する証明書), its issuer names, its logo, its seal text, its /60 and /180 scales. Nothing on the document may suggest it is issued by the Japan Foundation or JEES.

## Design system decisions
- First, read the file. If `Suka2Jepang` collections or styles exist, bind to them and add only missing roles inside them.
- Otherwise create one collection `Suka2Jepang · certificate`, mode `A4`. Values come from DESIGN.md:
  - Colour: `cert/paper` #FFFFFF · `cert/ink` #0A0A0A · `cert/ink-heading` #171717 · `cert/muted` #737373 (4.7:1 on white) · `cert/rule` #D1D5DC · `cert/surface` #F9FAFB · `cert/accent` #C12121 · `cert/accent-tint` #FCF4F4 · `cert/pattern` #C12121 at 28% (tune after the screenshot; must stay visible on a laser print)
  - Space: `space/xs` 8 · `space/s` 12 · `space/m` 16 · `space/l` 24 · `space/xl` 32 · `space/section` 48 · `space/page` 64
  - Stroke: `border/rule` 2 · `border/seal` 4
  - Radius: `radius/none` 0 · `radius/seal` 6
  - Code syntax on every variable (`--cert-paper` …), scopes set (fill / stroke / gap / radius); no ALL_SCOPES.
- Text styles `Suka2Jepang/Certificate/*`: 6 sizes, 2 families. Sizes are 2× print points; the minimum is 18 px = 9 pt.

  | Style | Family / weight | px (pt) | Line height | Tracking |
  | --- | --- | --- | --- | --- |
  | Title JP | Noto Serif JP Bold | 72 (36) | 120% | 8% |
  | Name | Onest Bold | 44 (22) | 120% | -2% |
  | Title EN | Onest Medium | 32 (16) | 130% | -1% |
  | Section JP | Noto Serif JP Bold | 32 (16) | 130% | 0 |
  | Score | Onest Medium, tnum | 32 (16) | 120% | 0 |
  | Score Total | Onest Bold, tnum | 32 (16) | 120% | 0 |
  | Value | Onest Medium | 26 (13) | 140% | 0 |
  | Section EN | Onest Medium | 26 (13) | 140% | 0 |
  | Label JP | Noto Serif JP SemiBold | 22 (11) | 140% | 0 |
  | Kana | Noto Serif JP Regular | 22 (11) | 140% | 0 |
  | Label EN | Onest Regular | 18 (9) | 140% | 0 |
  | Note | Onest Regular | 18 (9) | 150% | 0 |
  | Note JP | Noto Serif JP Regular | 18 (9) | 160% | 0 |

  Score `/ 100` suffix: a second text range in `cert/muted` at the same size (a range colour override, not a new style).
- Font deviation, flagged to the user: DESIGN.md sets Onest + Noto Sans JP. This document uses **Noto Serif JP (Mincho)** for Japanese headings and labels, because official Japanese documents and the JLPT certificate are set in Mincho. Kana uses it too, so the document has two families. Fallback, if Noto Serif JP is missing in Figma: Noto Sans JP everywhere. Verify with `listAvailableFontsAsync()`: Onest Regular/Medium/Bold, Noto Serif JP Regular/SemiBold/Bold.
- Layout grid on `Certificate/Body`: 6 columns, stretch, margin 48, gutter 24, colour #FF0000 at 10%.
- Components (on a small `Certificate · Components` section beside the A4 frame):
  - `Certificate/Field`: text props `Label JP`, `Label EN`, `Value`; vertical, gap `space/xs`.
  - `Certificate/ScoreCell`: variants Kind = Part | Total; text props `Label JP`, `Label EN`, `Score`.
  - `Certificate/Seal`: 128×128 square, stroke `border/seal` `cert/accent`, radius `radius/seal`, 2×2 GRID of kanji in Noto Serif JP Bold 44, colour `cert/accent`, rotation −4°. Kanji layout (read right column first, top to bottom): top-right 認, bottom-right 定, top-left 之, bottom-left 印 (認定之印, "seal of certification"). No organisation name inside the seal.
- Vertical budget (content area y 112 → 1572, 1460 px): header 48 · title ≈ 190 · identity ≈ 200 · mock ≈ 210 · conversation ≈ 210 · note 28 · close ≈ 170 · disclaimer ≈ 110 = ≈ 1166, plus 7 gaps of 48 = 1502. That is 42 px over: drop the gaps to `space/l`/`space/xl` where groups are related (table → note 16, mock → conversation 32) before cutting any type size.

## Copy deck
Header
- Wordmark: `Suka2Jepang` (Onest Bold 32, `cert/ink-heading`). Use the real logo component if the file has one.
- Certificate number: Label JP `証明書番号` · Label EN `Certificate No.` · Value `SJ-26104817` (dummy; the format follows the draft's `SJ-xxxxxxxx` and needs confirmation)

Title (centred)
- `成績証明書`
- `Certificate of Scores`
- `Suka2Jepang Job Matching Test · 就職マッチングテスト` (Value style, `cert/muted`)

Identity
- Name: `氏名` / `Name` / `Budi Santoso` (dummy) with kana `ブディ・サントソ` (dummy)
- `生年月日` / `Date of Birth` / `14 March 2001` (dummy)
- `受験日` / `Test Date` / `15 October 2026` (dummy)
- `受験方法` / `Test Mode` / `Online`

Scores/Mock
- Section heading: `模擬試験` + `Mock Test · JLPT N4 level`
- Cells: `文法` / `Grammar` / `70 / 100` (dummy) · `聴解` / `Listening` / `60 / 100` (dummy) · Total `合計` / `Mock Test Score` / `65 / 100` (dummy)

Scores/Conversation
- Section heading: `会話テスト` + `Conversation Test · AI-assessed`
- Cells: `流暢さ` / `Fluency` / `55 / 100` · `習熟度` / `Mastery` / `60 / 100` · `対話力` / `Interaction` / `50 / 100` · `文脈理解` / `Context` / `65 / 100` · Total `合計` / `Conversation Score` / `57.5 / 100` (all dummy)

Scores/Note
- `得点は各100点満点です。` then `Each score is out of 100.`

Close / Verify (left)
- QR 144×144 encoding `https://suka2jepang.com/verify/SJ-26104817` (dummy domain)
- `証明書の照会` / `Verify this certificate`
- `suka2jepang.com/verify/SJ-26104817` (Note style, dummy)

Close / Issue (right; the seal overlaps the end of the issuer name by about 40%, absolute inside a `free/issuer` frame)
- `発行日` / `Date of Issue` / `20 October 2026` (dummy)
- `発行者` / `Issued by` / `Suka2Jepang` with `LPK Timedoor Indonesia` on the next line (real)
- Seal `認定之印`

Disclaimer (Note JP, then Note, `cert/muted`, full width)
- `本証明書は、Suka2Jepangが就職マッチングを目的として発行するものであり、日本語能力試験（JLPT）の公式な認定書ではありません。`
- `This certificate is issued by Suka2Jepang for job matching purposes. It is not an official Japanese-Language Proficiency Test (JLPT) certificate.`

## Images
- No photographs.
- `image/qr`: real QR. In the build, try `npx --yes qrcode@1.5.4 -t svg -o .figma-taste/qr.svg "https://suka2jepang.com/verify/SJ-26104817"` (needs network), then `createNodeFromSvg`. If that fails, use a 144×144 `image/qr` slot with the `cert/surface` fill and a `Dummy` mark. Never draw a fake QR that does not scan.

## Dummy content
- Header: certificate number `SJ-26104817`
- Identity: `Budi Santoso`, `ブディ・サントソ`, `14 March 2001`, `15 October 2026`
- Scores/Mock: 70, 60, 65
- Scores/Conversation: 55, 60, 50, 65, 57.5
- Close: QR target and URL `suka2jepang.com/verify/…` (domain not confirmed), issue date `20 October 2026`
- Real (unmarked): Suka2Jepang, LPK Timedoor Indonesia, JLPT N4 level, the test names, the four conversation criteria, the disclaimer

## Build checklist (after the build)
1. Audit (`audit.min.figma.js`, ROOT_IDS = [`7912:5144`]): fix every structure FAIL (unbound fills, strokes, gaps and radius; text without a style; default names; useless wrappers). Ignore the 1920 guide and the picture floor, with the reason in the report.
2. Screenshot at 2400 and run the short critique: is the name the dominant element; do the two tables read alike; is the band visible but quiet; does the seal overlap the issuer name the Japanese way; does every line of Japanese fit on one line.
3. Report the open items for the user: the certificate number format, the verify domain, export format (PDF recommended for A4 vector print; JPG only for sharing in chat).
