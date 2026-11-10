export type VisaType = "tokutei_ginou" | "gijinkoku" | "unknown";

export type IndustrySector =
  | "pengolahan_makanan"
  | "kaigo"
  | "restoran"
  | "perhotelan"
  | "pertanian"
  | "konstruksi"
  | "manufaktur"
  | "perawatan_mobil"
  | "transportasi"
  | "perikanan"
  | "pergudangan";

export type JapaneseLevel =
  | "belajar"
  | "jft_a2"
  | "jlpt_n5"
  | "jlpt_n4"
  | "jlpt_n3"
  | "jlpt_n2"
  | "jlpt_n1";

export type JobCardStatus =
  | "default"
  | "almost_closed"
  | "exclusive_timedoor"
  | "applied"
  | "restricted_domicile"
  | "closed";

export type SelectionStage =
  | "apply"
  | "interview_timedoor"
  | "interview_tsk"
  | "mensetsu"
  | "naitei";

export interface ShiftInfo {
  name: string;
  time: string;
}

export interface SalaryBreakdown {
  gross: {
    baseSalary: number;
    treatmentAllowance: number;
    specialTreatmentAllowance: number;
    total: number;
  };
  deductions: {
    incomeTax: number;
    socialInsurance: number;
    employmentInsurance: number;
    dormitory: number;
    childSupportContribution: number;
    employeeCoopFee: number;
    total: number;
  };
  netTakeHomeEstimate: number;
  additionalPerks?: {
    nightShift?: string;
    bonus?: string;
    holidayWork?: string;
  };
}

export interface JobRequirement {
  gender: "Pria" | "Wanita" | "Pria & Wanita" | "Bebas";
  ageRange: string;
  japaneseLevel: string;
  nationality: string;
  hijabPolicy: "Boleh" | "Tidak boleh";
  tattooPolicy: "Boleh" | "Tidak boleh";
  japanExperience: "Wajib" | "Tidak wajib" | "Diutamakan mantan magang";
  maritalStatus: "Bebas" | "Belum menikah";
  driverLicense: "Wajib" | "Tidak wajib";
}

export interface JobItem {
  id: string;
  jobCode: string;
  caseCode?: string;
  sector: IndustrySector;
  sectorLabel: string;
  sectorKanji: string;
  title: string;
  companyName: string;
  facilityName?: string;
  location: string;
  prefecture: string;
  salaryGrossDisplay: string;
  hourlyRateDisplay?: string;
  positionsCount: number;
  positionsDisplay: string;
  tags: string[];
  status: JobCardStatus;
  urgencyText?: string;
  applicationDeadline?: string;
  matchScore?: number;
  matchDetails?: {
    label: string;
    matched: boolean;
  }[];
  appliedStageText?: string;
  appliedDate?: string;
  appliedStagesCount?: string;
  salaryBreakdown?: SalaryBreakdown;
  shifts?: ShiftInfo[];
  requirements?: JobRequirement;
  companyPerks?: string[];
  leavePolicy?: {
    annualLeaveDays: number;
    paidLeaveAfterMonths: string;
    leaveAllowancePercent: string;
  };
}

export interface CandidateApplication {
  id: string;
  applicationNumber: string;
  job: JobItem;
  appliedDate: string;
  currentStage: SelectionStage;
  stageStatus: "passed" | "pending" | "scheduled" | "rejected";
  stageBadgeText: string;
  bannerMessage: string;
  actionCtaText: string;
  actionCtaLink: string;
  actionCtaStyle: "primary" | "secondary" | "reapply";
  interviewSchedule?: {
    date: string;
    dayName: string;
    timeWITA: string;
    timeJST: string;
    platform: "Zoom" | "Google Meet";
    meetingLink?: string;
    tskPartnerName?: string;
  };
  rejectionNote?: string;
}

export interface OnboardingPreferences {
  visaType: VisaType;
  sectors: IndustrySector[];
  sswCertificateStatus: string;
  japaneseLevel: JapaneseLevel;
  currentDomicile: "Indonesia" | "Jepang";
  sourceInfo: string;
  whatsappJobAlert: boolean;
}

export interface JobApplicationFormData {
  jobId: string;
  fullName: string;
  katakanaName: string;
  birthDate: string;
  whatsappNumber: string;
  gender: "Laki-laki" | "Perempuan";
  domicile: "Di Indonesia" | "Di Jepang";
  sswCertificate: string;
  japaneseLevel: string;
  lastEducation: string;
  japanExperience: string;
  hasTattoo: boolean;
  smoker: boolean;
  canHandlePork: boolean;
  canNightShift: boolean;
  cvFileName?: string;
  cvFileSize?: string;
  sswCertFileName?: string;
  sswCertFileSize?: string;
  introVideoFileName?: string;
  introVideoFileSize?: string;
  agreedToTerms: boolean;
  lastSavedAt?: string;
}

