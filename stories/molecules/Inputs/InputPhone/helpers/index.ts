export interface PhoneCountry {
  /** ISO 3166-1 alpha-2 country code. */
  code: string
  name: string
  /** International dialing prefix, including +. */
  dialCode: string
  /** Optional custom flag (defaults to an emoji generated from `code`). */
  flag?: string
  /** Minimum national number length used by the component's basic validation. */
  minLength?: number
  /** Maximum national number length used to limit input. */
  maxLength?: number
  /** Optional digit grouping, e.g. [3, 3, 4]. */
  formatGroups?: number[]
}

/**
 * Extend this list or pass `countryOptions` to PhoneInput to use a custom list.
 * Country names are intentionally kept in English so that search works well with
 * international names; replace them with localized names in your own project if needed.
 */
export const countries: PhoneCountry[] = [
  { code: 'CO', name: 'Colombia', dialCode: '+57', minLength: 10, maxLength: 10, formatGroups: [3, 3, 4] },
  { code: 'US', name: 'United States', dialCode: '+1', minLength: 10, maxLength: 10, formatGroups: [3, 3, 4] },
  { code: 'CA', name: 'Canada', dialCode: '+1', minLength: 10, maxLength: 10, formatGroups: [3, 3, 4] },
  { code: 'MX', name: 'Mexico', dialCode: '+52', minLength: 10, maxLength: 10, formatGroups: [2, 4, 4] },
  { code: 'AR', name: 'Argentina', dialCode: '+54', minLength: 10, maxLength: 11 },
  { code: 'BR', name: 'Brazil', dialCode: '+55', minLength: 10, maxLength: 11 },
  { code: 'CL', name: 'Chile', dialCode: '+56', minLength: 9, maxLength: 9 },
  { code: 'PE', name: 'Peru', dialCode: '+51', minLength: 9, maxLength: 9 },
  { code: 'EC', name: 'Ecuador', dialCode: '+593', minLength: 8, maxLength: 9 },
  { code: 'VE', name: 'Venezuela', dialCode: '+58', minLength: 10, maxLength: 10 },
  { code: 'BO', name: 'Bolivia', dialCode: '+591', minLength: 7, maxLength: 8 },
  { code: 'PY', name: 'Paraguay', dialCode: '+595', minLength: 9, maxLength: 9 },
  { code: 'UY', name: 'Uruguay', dialCode: '+598', minLength: 8, maxLength: 9 },
  { code: 'PA', name: 'Panama', dialCode: '+507', minLength: 8, maxLength: 8 },
  { code: 'CR', name: 'Costa Rica', dialCode: '+506', minLength: 8, maxLength: 8 },
  { code: 'GT', name: 'Guatemala', dialCode: '+502', minLength: 8, maxLength: 8 },
  { code: 'SV', name: 'El Salvador', dialCode: '+503', minLength: 8, maxLength: 8 },
  { code: 'HN', name: 'Honduras', dialCode: '+504', minLength: 8, maxLength: 8 },
  { code: 'NI', name: 'Nicaragua', dialCode: '+505', minLength: 8, maxLength: 8 },
  { code: 'CU', name: 'Cuba', dialCode: '+53', minLength: 8, maxLength: 8 },
  { code: 'DO', name: 'Dominican Republic', dialCode: '+1', minLength: 10, maxLength: 10 },
  { code: 'PR', name: 'Puerto Rico', dialCode: '+1', minLength: 10, maxLength: 10 },
  { code: 'ES', name: 'Spain', dialCode: '+34', minLength: 9, maxLength: 9 },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', minLength: 10, maxLength: 10 },
  { code: 'FR', name: 'France', dialCode: '+33', minLength: 9, maxLength: 9 },
  { code: 'DE', name: 'Germany', dialCode: '+49', minLength: 7, maxLength: 13 },
  { code: 'IT', name: 'Italy', dialCode: '+39', minLength: 9, maxLength: 11 },
  { code: 'PT', name: 'Portugal', dialCode: '+351', minLength: 9, maxLength: 9 },
  { code: 'NL', name: 'Netherlands', dialCode: '+31', minLength: 9, maxLength: 9 },
  { code: 'BE', name: 'Belgium', dialCode: '+32', minLength: 8, maxLength: 9 },
  { code: 'CH', name: 'Switzerland', dialCode: '+41', minLength: 9, maxLength: 9 },
  { code: 'AT', name: 'Austria', dialCode: '+43', minLength: 7, maxLength: 13 },
  { code: 'IE', name: 'Ireland', dialCode: '+353', minLength: 7, maxLength: 10 },
  { code: 'SE', name: 'Sweden', dialCode: '+46', minLength: 7, maxLength: 10 },
  { code: 'NO', name: 'Norway', dialCode: '+47', minLength: 8, maxLength: 8 },
  { code: 'DK', name: 'Denmark', dialCode: '+45', minLength: 8, maxLength: 8 },
  { code: 'FI', name: 'Finland', dialCode: '+358', minLength: 7, maxLength: 12 },
  { code: 'PL', name: 'Poland', dialCode: '+48', minLength: 9, maxLength: 9 },
  { code: 'UA', name: 'Ukraine', dialCode: '+380', minLength: 9, maxLength: 9 },
  { code: 'RU', name: 'Russia', dialCode: '+7', minLength: 10, maxLength: 10 },
  { code: 'TR', name: 'Turkey', dialCode: '+90', minLength: 10, maxLength: 10 },
  { code: 'IL', name: 'Israel', dialCode: '+972', minLength: 8, maxLength: 9 },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', minLength: 9, maxLength: 9 },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', minLength: 9, maxLength: 9 },
  { code: 'EG', name: 'Egypt', dialCode: '+20', minLength: 10, maxLength: 10 },
  { code: 'MA', name: 'Morocco', dialCode: '+212', minLength: 9, maxLength: 9 },
  { code: 'ZA', name: 'South Africa', dialCode: '+27', minLength: 9, maxLength: 9 },
  { code: 'NG', name: 'Nigeria', dialCode: '+234', minLength: 7, maxLength: 10 },
  { code: 'KE', name: 'Kenya', dialCode: '+254', minLength: 9, maxLength: 10 },
  { code: 'IN', name: 'India', dialCode: '+91', minLength: 10, maxLength: 10 },
  { code: 'PK', name: 'Pakistan', dialCode: '+92', minLength: 10, maxLength: 10 },
  { code: 'BD', name: 'Bangladesh', dialCode: '+880', minLength: 10, maxLength: 10 },
  { code: 'CN', name: 'China', dialCode: '+86', minLength: 11, maxLength: 11 },
  { code: 'JP', name: 'Japan', dialCode: '+81', minLength: 10, maxLength: 10 },
  { code: 'KR', name: 'South Korea', dialCode: '+82', minLength: 9, maxLength: 11 },
  { code: 'SG', name: 'Singapore', dialCode: '+65', minLength: 8, maxLength: 8 },
  { code: 'MY', name: 'Malaysia', dialCode: '+60', minLength: 9, maxLength: 10 },
  { code: 'TH', name: 'Thailand', dialCode: '+66', minLength: 9, maxLength: 9 },
  { code: 'VN', name: 'Vietnam', dialCode: '+84', minLength: 9, maxLength: 10 },
  { code: 'ID', name: 'Indonesia', dialCode: '+62', minLength: 8, maxLength: 12 },
  { code: 'PH', name: 'Philippines', dialCode: '+63', minLength: 10, maxLength: 10 },
  { code: 'AU', name: 'Australia', dialCode: '+61', minLength: 9, maxLength: 9 },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64', minLength: 8, maxLength: 10 }
]
