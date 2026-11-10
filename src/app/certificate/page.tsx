import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Noto_Serif_JP, Onest } from "next/font/google";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { PrintButton } from "./print-button";

// Certificate fonts (Figma `Suka2Jepang/Certificate/*`). They are loaded only on this route.
const onest = Onest({ subsets: ["latin"] });
const notoSerifJP = Noto_Serif_JP({ subsets: ["latin"], weight: ["400", "600", "700"] });

// ponytail: static dummy data (standard persona). Move to /certificate/[id] and fetch once the test-result API exists.
const cert = {
  no: "SJ-26104817",
  issued: "20 October 2026",
  name: "Budi Santoso",
  kana: "ブディ・サントソ",
  dob: "12 May 2003",
  testDate: "15 October 2026",
  mode: "Online",
};

const tests = [
  {
    jp: "模擬試験",
    en: "Mock Test · N4 level",
    cells: [
      { jp: "文法", en: "Grammar", score: 70 },
      { jp: "聴解", en: "Listening", score: 60 },
    ],
  },
  {
    jp: "会話テスト",
    en: "Conversation Test · AI-assessed",
    cells: [
      { jp: "流暢さ", en: "Fluency", score: 55 },
      { jp: "習熟度", en: "Mastery", score: 60 },
      { jp: "対話力", en: "Interaction", score: 50 },
      { jp: "文脈理解", en: "Context", score: 65 },
      { jp: "合計", en: "Total Score", score: 57.5, total: true },
    ],
  },
];

// The document title becomes the default file name in "Save as PDF".
export const metadata: Metadata = { title: `Certificate ${cert.no} — Suka2Jepang` };

function Jp({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span lang="ja" className={cn(notoSerifJP.className, className)}>
      {children}
    </span>
  );
}

function Label({ jp, en }: { jp: string; en: string }) {
  return (
    <>
      <Jp className="block text-sm font-semibold text-secondary-foreground">{jp}</Jp>
      <span className="block text-xs text-muted-foreground">{en}</span>
    </>
  );
}

function Field({ jp, en, value }: { jp: string; en: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <dt>
        <Label jp={jp} en={en} />
      </dt>
      <dd className="text-lg font-medium">{value}</dd>
    </div>
  );
}

// Seigaiha (青海波) security band, drawn as SVG circles so the PDF stays vector.
// Chrome prints CSS background images and SVG <pattern> fills as blurry, wrongly scaled bitmaps.
// Rows every R/2, odd rows shifted by R, drawn top to bottom so each row covers the lower half of the row above.
// Only scales that reach the 44px band are drawn (the body covers the rest), which keeps the PDF small.
const R = 11; // px; one scale is 2R ≈ 5.8mm wide
const [W, H, BAND] = [794, 1123, 44 + R]; // A4 210×297mm in CSS px; band = sheet padding p-11 + R
const scales = Array.from({ length: Math.ceil(H / (R / 2)) + 2 }, (_, row) =>
  Array.from({ length: Math.ceil(W / (2 * R)) + 1 }, (_, col) => [col * 2 * R + (row % 2 ? 0 : R), (row * R) / 2]),
)
  .flat()
  .filter(([x, y]) => Math.min(x, W - x, y, H - y) < BAND);

function Seigaiha() {
  return (
    <svg aria-hidden className="absolute inset-0 size-full fill-white stroke-primary/28">
      {scales.map(([x, y]) =>
        [R, 0.7 * R, 0.4 * R].map((r) => <circle key={`${x},${y},${r}`} cx={x} cy={y} r={r} />),
      )}
    </svg>
  );
}

export default function CertificatePage() {
  return (
    <main className="flex flex-1 flex-col items-center gap-6 bg-canvas-mist px-4 py-8 print:p-0">
      {/* A4, no browser margin: the sheet carries its own border band. */}
      <style>{"@page { size: A4; margin: 0; }"}</style>

      <div className="flex w-full max-w-[210mm] items-center justify-between gap-4 print:hidden">
        <Link
          href="/job-apply/for-you"
          className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Kembali
        </Link>
        <PrintButton />
      </div>

      {/* ponytail: fixed zoom steps fit the A4 sheet on screen (375px: 0.43). Read on mobile through "Unduh PDF" or pinch zoom. */}
      <article
        lang="en"
        className={cn(
          onest.className,
          "relative flex h-[297mm] w-[210mm] shrink-0 overflow-hidden bg-white p-11 text-foreground shadow-sm [-webkit-print-color-adjust:exact] [print-color-adjust:exact] [zoom:0.43] sm:[zoom:0.76] md:[zoom:0.92] lg:[zoom:1] print:shadow-none print:[zoom:1]!",
        )}
      >
        <Seigaiha />
        <div className="relative flex flex-1 flex-col justify-between border-2 border-primary bg-white p-8">
            <div className="flex flex-col gap-5">
              <header className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image src="/brand/suka2jepang.png" alt="Suka2Jepang" width={52} height={40} loading="eager" />
                  <span className="h-10 w-px bg-border" aria-hidden />
                  <Image src="/brand/timedoor.png" alt="Timedoor" width={140} height={28} loading="eager" />
                </div>
                <dl className="grid grid-cols-2 gap-4">
                  <Field jp="証明書番号" en="Certificate No." value={cert.no} />
                  <Field jp="発行日" en="Date of Issue" value={cert.issued} />
                </dl>
              </header>

              <div className="flex flex-col items-center gap-1 text-center">
                <h1>
                  <Jp className="block text-5xl leading-tight font-bold tracking-[0.08em] text-secondary-foreground">
                    成績証明書
                  </Jp>
                  <span className="block text-xl font-medium">Certificate of Scores</span>
                </h1>
                <p className="text-lg font-medium text-muted-foreground">
                  Suka2Jepang Job Matching Test · 就職マッチングテスト
                </p>
              </div>

              <section className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="flex items-baseline gap-2">
                    <Jp className="text-sm font-semibold text-secondary-foreground">氏名</Jp>
                    <span className="text-xs text-muted-foreground">Name</span>
                  </p>
                  <p className="text-3xl font-bold tracking-tight text-secondary-foreground">{cert.name}</p>
                  <Jp className="text-sm text-muted-foreground">{cert.kana}</Jp>
                </div>
                <dl className="grid grid-cols-3 gap-4">
                  <Field jp="生年月日" en="Date of Birth" value={cert.dob} />
                  <Field jp="受験日" en="Test Date" value={cert.testDate} />
                  <Field jp="受験方法" en="Test Mode" value={cert.mode} />
                </dl>
              </section>

              {tests.map((test) => (
                <section key={test.en} className="flex flex-col gap-2">
                  <h2 className="flex items-baseline gap-2">
                    <Jp className="text-xl font-bold text-secondary-foreground">{test.jp}</Jp>
                    <span className="text-lg font-medium text-muted-foreground">{test.en}</span>
                  </h2>
                  {/* The muted background shows through the 2px gaps as the table rules. */}
                  <dl className="grid auto-cols-fr grid-flow-col gap-0.5 bg-muted p-0.5">
                    {test.cells.map((cell) => (
                      <div key={cell.en} className="flex flex-col gap-0.5">
                        <dt className={cn("px-3 py-2", cell.total ? "bg-blush-light" : "bg-canvas-mist")}>
                          <Label jp={cell.jp} en={cell.en} />
                        </dt>
                        <dd
                          className={cn(
                            "flex-1 px-3 py-3 text-lg font-medium whitespace-nowrap text-muted-foreground",
                            cell.total ? "bg-blush-light" : "bg-white",
                          )}
                        >
                          <span className={cn("text-xl text-foreground tabular-nums", cell.total && "font-bold")}>
                            {cell.score}
                          </span>{" "}
                          / 100
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ))}
            </div>

            <footer className="flex flex-col gap-8">
              {/* The seal is stamped over the end of the issuer name, as on a Japanese document. */}
              <div className="relative self-start pr-14">
                <Label jp="発行者" en="Issued by" />
                <p className="mt-2 text-xs text-muted-foreground">LPK Timedoor Indonesia</p>
                <p className="text-lg font-medium">PT Timedoor Indonesia</p>
                <span
                  aria-hidden
                  className={cn(
                    notoSerifJP.className,
                    "absolute top-0 right-0 grid -rotate-4 grid-cols-2 gap-1 rounded-sm border-[3px] border-primary p-3 text-3xl leading-none font-bold text-primary",
                  )}
                >
                  {/* Read right column first: 認定之印 */}
                  <span>之</span>
                  <span>認</span>
                  <span>印</span>
                  <span>定</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                <Jp className="leading-relaxed">
                  本証明書は、Suka2Jepangが就職マッチングを目的として発行するものであり、日本語能力試験（JLPT）の公式な認定書ではありません。
                </Jp>
                <p className="leading-normal">
                  This certificate is issued by Suka2Jepang for job matching purposes. It is not an official
                  Japanese-Language Proficiency Test (JLPT) certificate.
                </p>
              </div>
            </footer>
          </div>
      </article>
    </main>
  );
}
