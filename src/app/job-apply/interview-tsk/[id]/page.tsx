"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Video,
  Check,
  ChevronDown,
  ChevronUp,
  Volume2,
  Copy,
  ExternalLink,
  AlertTriangle,
  Sparkles,
  X,
  Share2,
  CheckCircle2,
} from "lucide-react";
import { MOCK_JOBS, MOCK_APPLICATIONS } from "@/lib/mock-data";
import { PushableButton } from "@/components/common/pushable-button";
import { AudioRecorderWidget } from "@/components/job-apply/audio-recorder-widget";

// Question interface
interface QuestionItem {
  id: number;
  kanjiWithFurigana: React.ReactNode;
  plainJapanese: string;
  romajiReading: string;
  indonesianMeaning: string;
  tips: string;
  initialTrained: boolean;
  sampleAnswer: {
    japanese: string;
    romaji: string;
    indonesian: string;
  };
  keyVocabulary: { word: string; meaning: string }[];
}

export default function InterviewTskPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center p-8 text-sm text-[#64748B]">
          Memuat portal interview TSK...
        </div>
      }
    >
      <InterviewTskContent />
    </React.Suspense>
  );
}

function InterviewTskContent() {
  const params = useParams();
  const id = (params?.id as string) || "pm-012";

  // Match application or job
  const matchedApp =
    MOCK_APPLICATIONS.find(
      (app) => app.job.id.toLowerCase() === id.toLowerCase()
    ) || MOCK_APPLICATIONS[0];

  const job =
    MOCK_JOBS.find((j) => j.id.toLowerCase() === id.toLowerCase()) ||
    matchedApp.job ||
    MOCK_JOBS[0];

  // Schedule details (from mock or default)
  const schedule = matchedApp.interviewSchedule || {
    date: "21 Okt 2026",
    dayName: "Rabu",
    timeWITA: "10.00 WITA",
    timeJST: "11.00 JST",
    platform: "Zoom" as const,
    meetingLink: "https://zoom.us/j/9876543210",
    tskPartnerName: "TSK 'You'",
  };

  // State for trained questions (IDs of trained questions)
  const [trainedQuestions, setTrainedQuestions] = useState<number[]>([1, 2, 3]);

  // State for expanded question drawers
  const [expandedQuestionId, setExpandedQuestionId] = useState<number | null>(1);

  // State for audio playing of question pronunciation
  const [speakingQuestionId, setSpeakingQuestionId] = useState<number | null>(null);

  // State for Day-H Checklist
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    c1: true, // Koneksi internet stabil
    c2: true, // Zoom sudah terpasang & dicoba
    c3: false, // Pakaian rapi (kemeja polos)
    c4: false, // Latar belakang polos & terang
    c5: false, // Masuk 10 menit lebih awal
    c6: true, // Siapkan catatan jikoshoukai
  });

  // Modals state
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [customNote, setCustomNote] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 7 Standard Japanese Interview Questions
  const QUESTIONS: QuestionItem[] = [
    {
      id: 1,
      kanjiWithFurigana: (
        <span>
          <ruby>
            自<rt className="text-[10px] font-bold text-[#C12121]">じ</rt>
          </ruby>
          <ruby>
            己<rt className="text-[10px] font-bold text-[#C12121]">こ</rt>
          </ruby>
          <ruby>
            紹<rt className="text-[10px] font-bold text-[#C12121]">しょう</rt>
          </ruby>
          <ruby>
            介<rt className="text-[10px] font-bold text-[#C12121]">かい</rt>
          </ruby>
          をしてください
        </span>
      ),
      plainJapanese: "自己紹介をしてください",
      romajiReading: "じこしょうかい · Jikoshoukai",
      indonesianMeaning: "Perkenalkan diri",
      tips: "Nama, asal, umur, pengalaman, dan alasan ingin ke Jepang. Maksimal 1 menit.",
      initialTrained: true,
      sampleAnswer: {
        japanese:
          "初めまして、ブディと申します。インドネシアのバリ島出身で、今年23歳です。大学で食品加工を専攻し、衛生管理とチームワークを学びました。特定技能として日本の高い品質基準を現場で吸収し、貴社に貢献したいと考えております。どうぞよろしくお願いいたします。",
        romaji:
          "Hajimemashite, Budi to moushimasu. Indoneshia no Bari-tou shusshin de, kotoshi nijuusan-sai desu. Daigaku de shokuhin kakou o senkou shi, eisei kanri to chiimuwaaku o manabimashita. Tokutei Ginou toshite Nihon no takai hinshitsu kijun o genba de kyuushuu shi, kisha ni kouken shitai to kangaete orimasu. Douzo yoroshiku onegai itashimasu.",
        indonesian:
          "Perkenalkan, nama saya Budi. Berasal dari Bali, Indonesia, tahun ini berusia 23 tahun. Mengambil konsentrasi pengolahan makanan, memahami standar sanitasi dan kerja tim. Ingin berkontribusi di perusahaan Bapak/Ibu melalui visa Tokutei Ginou. Mohon bimbingannya.",
      },
      keyVocabulary: [
        { word: "食品加工", meaning: "Pengolahan makanan" },
        { word: "衛生管理", meaning: "Manajemen sanitasi" },
        { word: "特定技能", meaning: "Tokutei Ginou (SSW)" },
      ],
    },
    {
      id: 2,
      kanjiWithFurigana: (
        <span>
          なぜ
          <ruby>
            日<rt className="text-[10px] font-bold text-[#C12121]">に</rt>
          </ruby>
          <ruby>
            本<rt className="text-[10px] font-bold text-[#C12121]">ほん</rt>
          </ruby>
          で
          <ruby>
            働<rt className="text-[10px] font-bold text-[#C12121]">はたら</rt>
          </ruby>
          きたいですか
        </span>
      ),
      plainJapanese: "なぜ日本で働きたいですか",
      romajiReading: "なぜにほんではたらきたいですか · Naze Nihon de hatarakitai desu ka",
      indonesianMeaning: "Kenapa ingin kerja di Jepang?",
      tips: "Jawab dengan alasan pribadi yang konkret, bukan hanya soal gaji.",
      initialTrained: true,
      sampleAnswer: {
        japanese:
          "日本の食品製造における厳しい衛生基準や、5S（整理・整頓・清掃・清潔・躾）を現場で直接学びたいからです。将来はその技術と経験を活かして、日系企業や食品業界で長く活躍したいと考えています。",
        romaji:
          "Nihon no shokuhin seizou ni okeru kibishii eisei kijun ya, 5S o genba de chokusetsu manabitai kara desu. Shourai wa sono gijutsu to keiken o ikashite, nikkei kigyou ya shokuhin gyoukai de nagaku katsuyaku shitai to kangaete imasu.",
        indonesian:
          "Karena ingin mempelajari standar sanitasi ketat serta budaya 5S langsung di lini produksi Jepang. Di masa depan, keahlian ini ingin saya jadikan modal karir jangka panjang di industri terkait.",
      },
      keyVocabulary: [
        { word: "衛生基準", meaning: "Standar kebersihan/sanitasi" },
        { word: "5S運動", meaning: "Budaya kerja 5S Jepang" },
      ],
    },
    {
      id: 3,
      kanjiWithFurigana: (
        <span>
          どうしてこの
          <ruby>
            会<rt className="text-[10px] font-bold text-[#C12121]">かい</rt>
          </ruby>
          <ruby>
            社<rt className="text-[10px] font-bold text-[#C12121]">しゃ</rt>
          </ruby>
          を
          <ruby>
            選<rt className="text-[10px] font-bold text-[#C12121]">えら</rt>
          </ruby>
          びましたか
        </span>
      ),
      plainJapanese: "どうしてこの会社を選びましたか",
      romajiReading: "このかいしゃをえらびました · Kono kaisha o erabimashita ka",
      indonesianMeaning: "Kenapa memilih perusahaan ini?",
      tips: "Sebut hal dari lembar loker: produk makanan beku, asrama, atau pelatihan.",
      initialTrained: true,
      sampleAnswer: {
        japanese:
          `貴社は${job.companyName}として高品質な食品製造で定評があり、外国人スタッフへの実務研修や住環境（寮制度）が充実している点に感銘を受けました。安心して長く働ける環境で全力を尽くしたいです。`,
        romaji:
          `Kisha wa ${job.companyName} toshite kouhinshitsu na shokuhin seizou de teihyou ga ari, gaikokujin sutaffu e no jitsumu kenshuu ya jukankyou ga juujitsu shite iru ten ni kanmei o ukemashita.`,
        indonesian:
          `Perusahaan memiliki reputasi tinggi dalam produk makanan berkualitas, serta menyediakan fasilitas asrama dan pelatihan terstruktur yang membuat saya yakin dapat mendedikasikan diri secara optimal.`,
      },
      keyVocabulary: [
        { word: "高品質", meaning: "Kualitas tinggi" },
        { word: "寮制度", meaning: "Fasilitas asrama karyawan" },
      ],
    },
    {
      id: 4,
      kanjiWithFurigana: (
        <span>
          どれくらい
          <ruby>
            日<rt className="text-[10px] font-bold text-[#C12121]">に</rt>
          </ruby>
          <ruby>
            本<rt className="text-[10px] font-bold text-[#C12121]">ほん</rt>
          </ruby>
          で
          <ruby>
            働<rt className="text-[10px] font-bold text-[#C12121]">はたら</rt>
          </ruby>
          きたいですか
        </span>
      ),
      plainJapanese: "どれくらい日本で働きたいですか",
      romajiReading: "どれくらいにほんで · Dore kurai Nihon de hatarakitai desu ka",
      indonesianMeaning: "Berapa lama ingin kerja di Jepang?",
      tips: "Perusahaan suka kandidat yang berencana lama, misalnya 5 tahun atau lebih.",
      initialTrained: false,
      sampleAnswer: {
        japanese:
          "まずは特定技能1号の満期である5年間、しっかりと責任を持って働きたいと考えております。その後、機会をいただけるなら特定技能2号への移行も目指し、さらに長く貴社で貢献したいです。",
        romaji:
          "Mazu wa Tokutei Ginou 1-gou no manki de aru gonenkan, shikkari to sekinin o motte hatarakitai to kangaete orimasu. Sono go, kikai o itadakeru nara Tokutei Ginou 2-gou e no ikou mo mezashi, sara ni nagaku kisha de kouken shitai desu.",
        indonesian:
          "Pertama, ingin menuntaskan masa penuh 5 tahun Tokutei Ginou 1 dengan dedikasi tinggi. Setelah itu, bila diberi kesempatan, ingin melanjutkan ke Tokutei Ginou 2 untuk berkarir lebih panjang.",
      },
      keyVocabulary: [
        { word: "満期", meaning: "Masa penuh/jatuh tempo" },
        { word: "特定技能2号", meaning: "SSW Tingkat 2 (jangka panjang)" },
      ],
    },
    {
      id: 5,
      kanjiWithFurigana: (
        <span>
          <ruby>
            家<rt className="text-[10px] font-bold text-[#C12121]">か</rt>
          </ruby>
          <ruby>
            族<rt className="text-[10px] font-bold text-[#C12121]">ぞく</rt>
          </ruby>
          は
          <ruby>
            応<rt className="text-[10px] font-bold text-[#C12121]">おう</rt>
          </ruby>
          <ruby>
            援<rt className="text-[10px] font-bold text-[#C12121]">えん</rt>
          </ruby>
          してくれていますか
        </span>
      ),
      plainJapanese: "家族は応援してくれていますか",
      romajiReading: "かぞくはおうえん · Kazoku wa ouen shite kurete imasu ka",
      indonesianMeaning: "Apakah keluarga mendukung?",
      tips: "Jawab jujur, sebutkan orang tua sudah setuju.",
      initialTrained: false,
      sampleAnswer: {
        japanese:
          "はい、両親も私の日本で働きたいという目標を深く理解し、心から応援してくれています。生活費や健康管理についても家族と事前にしっかり相談して合意を得ています。",
        romaji:
          "Hai, ryoushin mo watashi no Nihon de hatarakitai to iu mokuhyou o fukaku rikai shi, kokoro kara ouen shite kurete imasu. Seikatsuhi ya kenkou kanri ni tsuite mo kazoku to jizen ni shikkari soudan shite goui o ete imasu.",
        indonesian:
          "Ya, kedua orang tua saya sangat memahami tujuan saya bekerja di Jepang dan memberikan dukungan penuh. Rencana hidup dan kesehatan sudah didiskusikan secara matang bersama keluarga.",
      },
      keyVocabulary: [
        { word: "両親", meaning: "Kedua orang tua" },
        { word: "心から応援", meaning: "Mendukung sepenuh hati" },
      ],
    },
    {
      id: 6,
      kanjiWithFurigana: (
        <span>
          <ruby>
            長<rt className="text-[10px] font-bold text-[#C12121]">ちょう</rt>
          </ruby>
          <ruby>
            所<rt className="text-[10px] font-bold text-[#C12121]">しょ</rt>
          </ruby>
          と
          <ruby>
            短<rt className="text-[10px] font-bold text-[#C12121]">たん</rt>
          </ruby>
          <ruby>
            所<rt className="text-[10px] font-bold text-[#C12121]">しょ</rt>
          </ruby>
          を
          <ruby>
            教<rt className="text-[10px] font-bold text-[#C12121]">おし</rt>
          </ruby>
          えてください
        </span>
      ),
      plainJapanese: "長所と短所を教えてください",
      romajiReading: "ちょうしょとたんしょ · Chousho to tansho o oshiete kudasai",
      indonesianMeaning: "Kelebihan dan kekurangan",
      tips: "Siapkan satu kelebihan dengan contoh, dan satu kekurangan yang sedang diperbaiki.",
      initialTrained: false,
      sampleAnswer: {
        japanese:
          "私の長所は、真面目で几帳面に作業をやり遂げる責任感です。短所は一度に多くの作業を抱え込みやすい点ですが、現在は優先順位をつけてチェックリストで確認しながら作業を進めるよう意識しています。",
        romaji:
          "Watashi no chousho wa, majime de kichoumen ni sagyou o yaritogeru sekininkan desu. Tansho wa ichido ni tooku no sagyou o kakaekomiyasui ten desu ga, genzai wa yuusen-juni o tsukete chekkurisuto de kakunin shinagara sagyou o susumeru you ishiki shite imasu.",
        indonesian:
          "Kelebihan saya adalah ketelitian dan rasa tanggung jawab dalam menuntaskan tugas secara rapi. Kekurangan saya adalah terkadang tergesa bila memegang banyak tugas sekaligus, tetapi kini saya selalu menyusun skala prioritas dengan checklist harian.",
      },
      keyVocabulary: [
        { word: "長所・短所", meaning: "Kelebihan & kekurangan" },
        { word: "責任感", meaning: "Rasa tanggung jawab" },
      ],
    },
    {
      id: 7,
      kanjiWithFurigana: (
        <span>
          <ruby>
            夜<rt className="text-[10px] font-bold text-[#C12121]">や</rt>
          </ruby>
          <ruby>
            勤<rt className="text-[10px] font-bold text-[#C12121]">きん</rt>
          </ruby>
          は
          <ruby>
            大<rt className="text-[10px] font-bold text-[#C12121]">だい</rt>
          </ruby>
          <ruby>
            丈<rt className="text-[10px] font-bold text-[#C12121]">じょう</rt>
          </ruby>
          <ruby>
            夫<rt className="text-[10px] font-bold text-[#C12121]">ぶ</rt>
          </ruby>
          ですか
        </span>
      ),
      plainJapanese: "夜勤は大丈夫ですか",
      romajiReading: "やきんはだいじょうぶ · Yakin wa daijoubu desu ka",
      indonesianMeaning: "Bisa shift malam?",
      tips: "Loker ini punya shift 17:45–02:30. Pastikan kamu siap.",
      initialTrained: false,
      sampleAnswer: {
        japanese:
          "はい、体力に自信があり、体調管理にも注意を払っておりますので、夜勤やシフト勤務にも全く問題ございません。睡眠リズムを整えて常に万全の体調で業務に臨みます。",
        romaji:
          "Hai, tairyoku ni jishin ga ari, taichou kanri ni mo chuui o haratte orimasu node, yakin ya shifuto kinmu ni mo mattaku mondai gozaimasen. Suimin rizumu o totonoete tsune ni banzen no taichou de gyoumu ni nozomimasu.",
        indonesian:
          "Ya, saya terbiasa menjaga stamina dan pola istirahat dengan disiplin, sehingga sama sekali tidak ada kendala untuk bertugas pada shift malam. Saya selalu siap dalam kondisi fisik prima.",
      },
      keyVocabulary: [
        { word: "夜勤", meaning: "Shift kerja malam" },
        { word: "体調管理", meaning: "Manajemen kebugaran fisik" },
      ],
    },
  ];

  // Toggle question trained status
  const toggleTrained = (questionId: number) => {
    setTrainedQuestions((prev) => {
      const exists = prev.includes(questionId);
      if (exists) {
        showToast("Status diubah ke 'Belum dilatih'");
        return prev.filter((q) => q !== questionId);
      } else {
        showToast("Bagus! Status diubah ke 'Sudah dilatih'");
        return [...prev, questionId];
      }
    });
  };

  // Toggle checklist item
  const toggleChecklist = (key: string) => {
    setChecklist((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const checklistCompletedCount = Object.values(checklist).filter(Boolean).length;
  const totalChecklistCount = Object.keys(checklist).length;

  // Japanese Speech Synthesis (Native pronunciation)
  const speakJapanese = (text: string, questionId: number) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      showToast("Fitur audio browser tidak didukung di perangkat ini.");
      return;
    }

    window.speechSynthesis.cancel();

    if (speakingQuestionId === questionId) {
      setSpeakingQuestionId(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = 0.9; // clear, learner pace

    utterance.onstart = () => setSpeakingQuestionId(questionId);
    utterance.onend = () => setSpeakingQuestionId(null);
    utterance.onerror = () => setSpeakingQuestionId(null);

    window.speechSynthesis.speak(utterance);
  };

  // Generate .ics file for calendar export
  const downloadIcsFile = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Suka2Jepang//Job Apply Calendar//ID",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "SUMMARY:Interview TSK Tokutei Ginou - PT Hatanaka Shokuhin",
      "DESCRIPTION:Sesi wawancara resmi bersama TSK You untuk penempatan Kagoshima. Durasi 20 menit, bahasa Jepang.\\n\\nLink Zoom: https://zoom.us/j/9876543210\\nPasscode: SUKA2JP",
      "LOCATION:Zoom Cloud Meetings (Online)",
      "DTSTART:20261021T020000Z", // 10:00 WITA = 02:00 UTC
      "DTEND:20261021T023000Z",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Interview_TSK_Suka2Jepang.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("File kalender (.ics) berhasil diunduh!");
    setIsCalendarModalOpen(false);
  };

  // Google Calendar URL
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "Interview TSK - " + job.companyName
  )}&dates=20261021T020000Z/20261021T023000Z&details=${encodeURIComponent(
    `Sesi wawancara TSK resmi Tokutei Ginou.\nDurasi 20 menit dalam Bahasa Jepang.\n\nLink Zoom: ${schedule.meetingLink}\nMeeting ID: 987 6543 2100\nPasscode: SUKA2JP`
  )}&location=${encodeURIComponent("Zoom Cloud Meetings")}`;

  // Handle Reschedule submit
  const submitReschedule = () => {
    if (!rescheduleReason) {
      showToast("Peringatan: Silakan pilih salah satu alasan pengajuan jadwal ulang.");
      return;
    }
    const message = `Halo Admin Timedoor, saya ingin mengajukan jadwal ulang Interview TSK untuk lowongan "${job.title}" (${job.companyName}).\nAlasan: ${rescheduleReason}.\nCatatan: ${customNote || "-"}.\nMohon informasi ketersediaan jadwal berikutnya. Terima kasih.`;
    const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
    setIsRescheduleModalOpen(false);
    showToast("Permohonan reschedule diteruskan ke WhatsApp Admin Timedoor.");
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0A0A0A] text-white text-sm font-medium px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Back Link */}
        <div>
          <Link
            href="/job-apply/my-applications"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#C12121] hover:text-[#A31D1D] transition-colors group"
          >
            <span className="w-4 h-4 flex items-center justify-center shrink-0 group-hover:-translate-x-0.5 transition-transform">
              <ArrowLeft className="w-4 h-4" />
            </span>
            <span>Lamaran saya</span>
          </Link>
        </div>

        {/* HERO CARD: Dark Scheduled Session Card */}
        <section className="bg-[#18181B] border border-neutral-800 rounded-[16px] p-6 text-white shadow-md relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Left: Date Badge + Schedule Information */}
            <div className="flex items-start sm:items-center gap-4">
              {/* Red Calendar Date Badge */}
              <div className="bg-[#C12121] text-white rounded-[12px] w-[72px] h-[72px] flex flex-col items-center justify-center shrink-0 shadow-sm select-none">
                <span className="text-[11px] font-bold tracking-wider text-white/90 leading-none">
                  OKT
                </span>
                <span className="text-2xl font-black leading-tight my-0.5">
                  21
                </span>
                <span className="text-[11px] font-medium text-white/90 leading-none">
                  Rabu
                </span>
              </div>

              {/* Text Info */}
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400">
                  <span>Interview TSK</span>
                  <span>·</span>
                  <span className="text-white/90 font-medium">
                    {job.title}
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span>
                    {schedule.timeWITA} · {schedule.timeJST} · {schedule.platform}
                  </span>
                </h1>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
                  Dengan TSK &quot;You&quot; untuk {job.companyName}, {job.location}. Durasi sekitar 20 menit, bahasa Jepang.
                </p>
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsZoomModalOpen(true)}
                className="bg-white text-[#0A0A0A] font-bold hover:bg-neutral-100 active:scale-[0.98] px-5 py-2.5 rounded-[8px] text-sm flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer select-none"
              >
                <Video className="w-4 h-4 text-[#C12121]" />
                <span>Buka link Zoom</span>
              </button>

              <button
                type="button"
                onClick={() => setIsCalendarModalOpen(true)}
                className="border border-white/25 text-white font-medium hover:bg-white/10 active:scale-[0.98] px-4 py-2.5 rounded-[8px] text-sm flex items-center justify-center gap-2 transition-all cursor-pointer select-none"
              >
                <Calendar className="w-4 h-4 text-neutral-300" />
                <span>Tambah ke kalender</span>
              </button>
            </div>
          </div>
        </section>

        {/* 2-COLUMN MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: 7 Questions Module (col-span-8) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Header outside the cards */}
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-base sm:text-lg font-bold text-[#0A0A0A]">
                Latihan pertanyaan yang sering ditanya
              </h2>

              <span className="text-xs sm:text-sm font-semibold text-[#64748B] bg-slate-100 px-3 py-1 rounded-full">
                {trainedQuestions.length} dari {QUESTIONS.length} sudah dilatih
              </span>
            </div>

            {/* Questions List */}
            <div className="space-y-3.5">
              {QUESTIONS.map((q) => {
                const isTrained = trainedQuestions.includes(q.id);
                const isExpanded = expandedQuestionId === q.id;
                const isSpeaking = speakingQuestionId === q.id;

                return (
                  <div
                    key={q.id}
                    className="bg-white border border-[#E5E7EB] rounded-[16px] p-5 shadow-xs transition-all hover:border-slate-300 space-y-3.5"
                  >
                    {/* Top Row: Japanese Question Title & Badge */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="text-base sm:text-[17px] font-bold text-[#0A0A0A] leading-relaxed flex items-center gap-2 flex-wrap">
                          <span className="font-mono">{q.kanjiWithFurigana}</span>
                          <button
                            type="button"
                            onClick={() => speakJapanese(q.plainJapanese, q.id)}
                            className={`p-1 rounded-full transition-colors ${
                              isSpeaking
                                ? "bg-red-100 text-[#C12121] animate-pulse"
                                : "text-neutral-400 hover:text-[#C12121] hover:bg-neutral-100"
                            }`}
                            title="Dengarkan pengucapan penutur asli"
                            aria-label="Dengarkan audio Jepang"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Reading Subtitle */}
                        <div className="text-xs text-[#64748B] font-medium">
                          {q.romajiReading} · {q.indonesianMeaning}
                        </div>
                      </div>

                      {/* Status Badge Toggle */}
                      <button
                        type="button"
                        onClick={() => toggleTrained(q.id)}
                        className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full transition-all cursor-pointer border select-none ${
                          isTrained
                            ? "bg-[#FEE2E2] text-[#C12121] border-[#FECDD3] hover:bg-red-200"
                            : "bg-slate-100 text-[#64748B] border-slate-200 hover:bg-slate-200"
                        }`}
                        title="Klik untuk ubah status latihan"
                      >
                        {isTrained ? "Sudah dilatih" : "Belum"}
                      </button>
                    </div>

                    {/* Tips Box */}
                    <div className="bg-[#F9FAFB] rounded-lg p-3 text-xs sm:text-sm text-[#475569] border border-slate-100/90 leading-relaxed">
                      <span className="font-bold text-[#0A0A0A]">Tips: </span>
                      <span>{q.tips}</span>
                    </div>

                    {/* Expandable Model Answer & Vocab Drawer */}
                    <div>
                      <button
                        type="button"
                        onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                        className="text-xs font-bold text-[#C12121] hover:text-[#A31D1D] flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>
                          {isExpanded
                            ? "Tutup contoh jawaban"
                            : "Lihat contoh jawaban & pola kalimat"}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="mt-3.5 pt-3.5 border-t border-slate-100 space-y-3 animate-in fade-in duration-200">
                          {/* Sample Answer Box */}
                          <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-3.5 space-y-2">
                            <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                              <span className="flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                                <span>Contoh Jawaban Percakapan (Kaiwa)</span>
                              </span>
                              <button
                                type="button"
                                onClick={() => speakJapanese(q.sampleAnswer.japanese, 990 + q.id)}
                                className="text-amber-800 hover:text-amber-950 flex items-center gap-1 text-[11px] font-semibold"
                              >
                                <Volume2 className="w-3 h-3" />
                                <span>Dengar jawaban</span>
                              </button>
                            </div>

                            <p className="text-sm font-medium text-neutral-900 leading-relaxed font-mono">
                              &ldquo;{q.sampleAnswer.japanese}&rdquo;
                            </p>

                            <p className="text-xs text-neutral-600 italic">
                              {q.sampleAnswer.romaji}
                            </p>

                            <div className="pt-1.5 border-t border-amber-200/50 text-xs text-neutral-700">
                              <span className="font-semibold text-neutral-900">Artinya: </span>
                              {q.sampleAnswer.indonesian}
                            </div>
                          </div>

                          {/* Key Vocabularies */}
                          {q.keyVocabulary.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 pt-1">
                              <span className="text-[11px] font-bold text-[#64748B]">
                                Kosakata Kunci:
                              </span>
                              {q.keyVocabulary.map((vocab, vIdx) => (
                                <span
                                  key={vIdx}
                                  className="inline-flex items-center gap-1 bg-slate-100 text-slate-800 text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-slate-200"
                                >
                                  <span className="font-bold text-neutral-900">{vocab.word}</span>
                                  <span className="text-neutral-500">({vocab.meaning})</span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar Widgets (col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            {/* WIDGET 1: Checklist Hari H */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-[#0A0A0A]">
                  Checklist hari H
                </h3>
                <span className="text-xs font-semibold text-[#64748B] bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {checklistCompletedCount}/{totalChecklistCount} siap
                </span>
              </div>

              <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-5 shadow-xs space-y-3">
                {[
                  { key: "c1", label: "Koneksi internet stabil" },
                  { key: "c2", label: "Zoom sudah terpasang & dicoba" },
                  { key: "c3", label: "Pakaian rapi (kemeja polos)" },
                  { key: "c4", label: "Latar belakang polos & terang" },
                  { key: "c5", label: "Masuk 10 menit lebih awal" },
                  { key: "c6", label: "Siapkan catatan jikoshoukai" },
                ].map((item) => {
                  const isChecked = checklist[item.key];
                  return (
                    <label
                      key={item.key}
                      onClick={() => toggleChecklist(item.key)}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer select-none"
                    >
                      <div
                        className={`w-5 h-5 rounded-[5px] flex items-center justify-center transition-all ${
                          isChecked
                            ? "bg-[#C12121] text-white border border-[#C12121] shadow-xs"
                            : "border border-[#D1D5DC] bg-white hover:border-[#C12121]"
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <span
                        className={`text-sm ${
                          isChecked
                            ? "font-medium text-[#0A0A0A]"
                            : "text-[#64748B]"
                        }`}
                      >
                        {item.label}
                      </span>
                    </label>
                  );
                })}

                {/* All items checked banner */}
                {checklistCompletedCount === totalChecklistCount && (
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 p-2.5 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Luar biasa! Seluruh kesiapan hari H lengkap.</span>
                  </div>
                )}
              </div>
            </div>

            {/* WIDGET 2: Rekam Latihan Jikoshoukai (In-Browser Web Audio API) */}
            <AudioRecorderWidget
              jobTitle={job.title}
              candidateName="Budi Santoso"
            />

            {/* WIDGET 3: Reschedule Notice Card ("Tidak bisa hadir?") */}
            <div className="bg-[#FFF1F2] border border-[#FECDD3] rounded-[16px] p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-sm font-bold text-[#9F1239]">
                <AlertTriangle className="w-4 h-4 text-[#C12121] shrink-0" />
                <span>Tidak bisa hadir?</span>
              </div>

              <p className="text-xs text-[#881337] leading-relaxed">
                Kabari admin paling lambat 1 hari sebelumnya. Jadwal yang diundur bisa membuat loker terisi kandidat lain.
              </p>

              <div>
                <button
                  type="button"
                  onClick={() => setIsRescheduleModalOpen(true)}
                  className="text-xs font-bold text-[#C12121] hover:text-[#9F1239] hover:underline inline-flex items-center gap-1 transition-colors cursor-pointer pt-1"
                >
                  <span>Minta jadwal ulang</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: Zoom Details Modal */}
      {isZoomModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-[20px] max-w-md w-full p-6 shadow-2xl space-y-5 border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0A0A0A]">
                    Ruangan Sesi Zoom
                  </h3>
                  <p className="text-xs text-[#64748B]">Interview TSK - Suka2Jepang</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsZoomModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#64748B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Meeting ID:</span>
                <span className="font-mono font-bold text-[#0A0A0A]">
                  987 6543 2100
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Passcode:</span>
                <span className="font-mono font-bold text-[#0A0A0A]">SUKA2JP</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Jadwal:</span>
                <span className="font-semibold text-[#0A0A0A]">
                  {schedule.date} · {schedule.timeWITA} ({schedule.timeJST})
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <PushableButton
                href={schedule.meetingLink}
                size="lg"
                fullWidth
                className="w-full"
              >
                <div className="flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  <span>Buka Aplikasi Zoom Sekarang</span>
                </div>
              </PushableButton>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `Meeting ID: 987 6543 2100\nPasscode: SUKA2JP\nLink: ${schedule.meetingLink}`
                  );
                  showToast("Detail tautan Zoom disalin ke clipboard!");
                }}
                className="w-full py-2 text-xs font-semibold text-[#64748B] hover:text-[#0A0A0A] flex items-center justify-center gap-1.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Informasi Meeting</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Add to Calendar Modal */}
      {isCalendarModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-[20px] max-w-md w-full p-6 shadow-2xl space-y-5 border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#C12121] flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0A0A0A]">
                    Tambah ke Kalender
                  </h3>
                  <p className="text-xs text-[#64748B]">Pilih aplikasi kalender favoritmu</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCalendarModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#64748B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsCalendarModalOpen(false)}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-[#C12121] hover:bg-red-50/40 transition-all text-sm font-semibold text-[#0A0A0A] group"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                    G
                  </span>
                  <span>Google Calendar</span>
                </div>
                <ExternalLink className="w-4 h-4 text-[#64748B] group-hover:text-[#C12121]" />
              </a>

              <button
                type="button"
                onClick={downloadIcsFile}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-[#C12121] hover:bg-red-50/40 transition-all text-sm font-semibold text-[#0A0A0A] group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-neutral-800 text-white flex items-center justify-center font-bold text-xs">
                    .ics
                  </span>
                  <span>Apple Calendar / Outlook (.ics)</span>
                </div>
                <ExternalLink className="w-4 h-4 text-[#64748B] group-hover:text-[#C12121]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Reschedule Request Modal */}
      {isRescheduleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-[20px] max-w-md w-full p-6 shadow-2xl space-y-5 border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-[#C12121] flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0A0A0A]">
                    Ajukan Jadwal Ulang
                  </h3>
                  <p className="text-xs text-[#64748B]">Interview TSK - Timedoor</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsRescheduleModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#64748B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 leading-relaxed">
              <strong>Peringatan:</strong> Pengunduran jadwal bergantung pada kuota ketersediaan pewawancara TSK di Jepang dan dapat memperpanjang proses seleksi.
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-[#0A0A0A] block">
                Pilih Alasan Utama:
              </label>

              {[
                "Kondisi kesehatan mendadak / sakit",
                "Bentrok jadwal ujian / tugas penting",
                "Gangguan teknis perangkat / koneksi internet",
                "Kendala mendesak keluarga",
              ].map((reason) => (
                <label
                  key={reason}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs font-medium text-[#1E2939]"
                >
                  <input
                    type="radio"
                    name="rescheduleReason"
                    value={reason}
                    checked={rescheduleReason === reason}
                    onChange={(e) => setRescheduleReason(e.target.value)}
                    className="accent-[#C12121] w-4 h-4"
                  />
                  <span>{reason}</span>
                </label>
              ))}

              <div className="pt-2">
                <label className="text-xs font-bold text-[#0A0A0A] block mb-1.5">
                  Catatan Tambahan (Opsional):
                </label>
                <textarea
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Contoh: Saya bisa dijadwalkan ulang pada Kamis sore atau Jumat..."
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:border-[#C12121] focus:ring-1 focus:ring-[#C12121] focus:outline-none min-h-[75px]"
                />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <PushableButton
                onClick={submitReschedule}
                size="lg"
                fullWidth
                className="w-full"
              >
                <div className="flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  <span>Kirim Permohonan via WhatsApp</span>
                </div>
              </PushableButton>

              <button
                type="button"
                onClick={() => setIsRescheduleModalOpen(false)}
                className="w-full py-2 text-xs font-semibold text-[#64748B] hover:text-[#0A0A0A]"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
