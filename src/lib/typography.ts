/**
 * Typography Tokens & Utility Constants
 * Strictly derived from DESIGN.md (Tokens — Typography & Type Scale)
 * 
 * Sources of truth:
 * - DESIGN.md (lines 79–101 & 514–537)
 * - src/app/globals.css (:root variables & @layer utilities .type-*)
 */

export const TYPOGRAPHY = {
  /** 10px / 700 / leading 1.5 / tracking +0.05em uppercase */
  microLabel: "type-micro-label",
  
  /** 11px / 500 / leading 1.5 / normal */
  navLabel: "type-nav-label",
  
  /** 12px / 500 / leading 1.33 / normal */
  caption: "type-caption",
  
  /** 13px / 500 / leading 1.5 / normal */
  statLabel: "type-stat-label",
  
  /** 14px / 400 / leading 1.43 / normal */
  body: "type-body",
  
  /** 14px / 600 / leading 1 / normal */
  label: "type-label",
  
  /** 14px / 500 / leading 1.43 / normal */
  button: "type-button",
  
  /** 15px / 400 / leading 1.5 / normal */
  description: "type-description",
  
  /** 16px / 500 / leading 1.5 / normal */
  input: "type-input",
  
  /** 16px / 400 / leading 1.625 / normal */
  bodyLong: "type-body-long",
  
  /** 18px / 700 / leading 1.56 / normal */
  blockTitle: "type-block-title",
  
  /** 20px / 600 / leading 1.4 / normal */
  sectionTitle: "type-section-title",
  
  /** 20px / 700 / leading 1.25 / normal */
  statValue: "type-stat-value",
  
  /** 22–28px fluid (clamp(1.375rem,1rem+1.6vw,1.75rem)) / 700 / leading 1.25 */
  pageTitle: "type-page-title",
  
  /** 26px / 700 / leading 1.25 / tracking -0.05em */
  cardDisplay: "type-card-display",
  
  /** 36px -> 48px -> 54px fluid / 700 / leading 1.0 / tracking -0.025em */
  heroDisplay: "type-hero-display",
  
  /** Noto Sans JP 16px / 600 / leading 1.5 / tracking -0.025em */
  jpKicker: "type-jp-kicker",
  
  /** Noto Sans JP 48px / 700 / leading 1.25 / tracking -0.025em */
  jpGreeting: "type-jp-greeting",
} as const;

export type TypographyRole = keyof typeof TYPOGRAPHY;
