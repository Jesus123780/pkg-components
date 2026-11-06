
export const choices = {
  color: {
    brand: {
      // ==========================================
      // PRIMARY BRAND — RED
      // ==========================================

      pigmentGreen: '#00C878',
      alizarinCrimson: '#E60023',
      guardsmanRed: '#C90024',
      tabasco: '#A81128',
      chablis: '#FFF0F2',
      turquoise: '#00BFA6',
      whiteIce: '#E5FFF3',
      crispyMintGreen: '#00A651',
      pinkLight: '#FFC0CB',
      darkerRed: '#700018',

      redGradient:
        'linear-gradient(135deg, #FF304B 0%, #E60023 55%, #B90025 100%)',

      redGradientButton:
        'linear-gradient(135deg, #E60023 0%, #C90024 100%)',

      // ==========================================
      // SECONDARY COLORS
      // ==========================================

      deepCerulean: '#2563EB',
      surfaceHover: 'rgba(230, 0, 35, 0.06)',
      blueLagoon: '#00B8E6',
      blueStone: '#006B8F',
      foam: '#E5F8FF',

      // ==========================================
      // NEUTRAL COLORS
      // ==========================================

      mineShaft: '#25262B',
      doveGray: '#5D6470',
      silver: '#AAB2BF',
      overline: 'rgba(37, 38, 43, 0.42)',
      selection: 'rgba(230, 0, 35, 0.12)',
      mercury: '#E1E5EC',
      wildSand: '#F5F6FA',
      alabaster: '#FCFCFE',
      white: '#FFFFFF',

      // ==========================================
      // CAMPAIGNS
      // ==========================================

      heavyMetal: '#202329',
      schoolBusYellow: '#FFC928',
      schoolBusYellowInk: '#332700',

      campaignOrange: '#FF6B00',
      campaignOrangeInk: '#351600',

      campaignPink: '#FF4D8D',
      campaignViolet: '#8B5CF6',

      // ==========================================
      // FEEDBACK
      // ==========================================

      japaneseLaurel: '#087A3E',
      red: '#C90024',
      fuelYellow: '#FFB800',
      meteor: '#A94C00',
      fuelYellowInk: '#302000',

      // ==========================================
      // TEXT
      // ==========================================

      lust: '#D50032',
      easternBlue: '#1D4ED8',
      steel: '#475467',
      paleSlate: '#98A2B3',
      bokaraGray: '#25262B',
      indiaGreen: '#087A3E',
      kuCrimson: '#C90024',

      // ==========================================
      // BACKGROUNDS
      // ==========================================

      lilyWhite: '#E5F8FF',
      whiteSmoke: '#F5F6FA',
      sweetPink: '#FFE5EB',

      // ==========================================
      // ICONS
      // ==========================================

      kellyGreen: '#00C878',

      // ==========================================
      // LOADERS
      // ==========================================

      backgroundLoader: '#F1F3F7',
      foreGroundLoader: '#E1E5EC',

      // ==========================================
      // TAGS
      // ==========================================

      blueTag: '#006B8F',
      orangeTag: '#A94C00',

      // ==========================================
      // ADDITIONAL VIBRANT COLORS
      // ==========================================

      electricBlue: '#2563FF',
      vividCyan: '#00B8E6',
      vibrantPurple: '#8B5CF6',
      vibrantPink: '#FF4D8D',
      vibrantOrange: '#FF6B00',
      vibrantYellow: '#FFC928',
      vibrantGreen: '#00C878'
    },

    // ==========================================
    // TEXT SEMANTIC COLORS
    // ==========================================

    text: {
      primary: '#25262B',
      secondary: '#5D6470',
      tertiary: '#98A2B3',
      disabled: '#98A2B3',
      inverse: '#FFFFFF',
      onPrimary: '#FFFFFF',
      link: '#C90024',
      success: '#087A3E',
      error: '#B42318',
      warning: '#A94C00',
      onWarning: '#302000'
    },

    // ==========================================
    // SURFACE COLORS
    // ==========================================

    surface: {
      background: '#F7F8FC',
      primary: '#FFFFFF',
      elevated: '#FFFFFF',
      secondary: '#F1F3F7',
      tertiary: '#E9EDF4',

      border: '#E1E5EC',
      borderStrong: '#AAB2BF',

      scrim: 'rgba(16, 24, 40, 0.48)'
    },

    // ==========================================
    // GRADIENTS
    // ==========================================

    gradient: {
      shimmer:
        'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.65) 30%, rgba(255,255,255,0) 81%)',

      skeleton:
        '-48px 78px 0 -48px #E1E5EC, -51px 102px 0 -51px #E1E5EC',

      brand:
        'linear-gradient(135deg, #FF304B 0%, #E60023 55%, #B90025 100%)',

      sunset:
        'linear-gradient(135deg, #FF6B00 0%, #FF9D00 100%)',

      ocean:
        'linear-gradient(135deg, #00B8E6 0%, #2563FF 100%)',

      fresh:
        'linear-gradient(135deg, #00C878 0%, #00A651 100%)',

      candy:
        'linear-gradient(135deg, #FF4D8D 0%, #8B5CF6 100%)'
    },

    // ==========================================
    // BASE COLORS
    // ==========================================

    base: {
      mineShaft: '#25262B',
      white: '#FFFFFF',
      black: '#101828',
      transparent: 'transparent'
    }
  },

  // ==========================================
  // SPACING
  // ==========================================

  spacing: {
    none: 0,
    xs: '0.125rem',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    '4xl': '3rem',
    '5xl': '3.5rem',
    '6xl': '4rem',
    '7xl': '5rem',
    '8xl': '6rem',
    '9xl': '7rem',
    '10xl': '8rem'
  },

  // ==========================================
  // FONT FAMILY
  // ==========================================

  fontFamily: {
    sans: ['Open Sans'],
    light: ['PFont-Light'],
    regular: ['PFont-Regular'],
    medium: ['PFont-Medium'],
    bold: ['PFont-Bold']
  },

  // ==========================================
  // FONT SIZE
  // ==========================================

  fontSize: {
    base: '16px',
    xs: '0.688rem',
    '2xs': '0.625rem',
    sm: '0.75rem',
    md: '0.875rem',
    lg: '1rem',
    xl: '1.125rem',
    '2xl': '1.25rem',
    '3xl': '1.5rem',
    '5xl': '1.875rem',
    '6xl': '3rem',
    '9xl': '5.862rem',
    '10xl': '12.5rem'
  },

  // ==========================================
  // TITLE FONT SIZE
  // ==========================================

  fontSizeTitles: {
    base: '16px',
    '3xs': '0.75rem',
    '2xs': '0.875rem',
    xs: '1rem',
    sm: '1.125rem',
    md: '1.25rem',
    md2: '1.375rem',
    lg: '1.5rem',
    xl: '1.75rem',
    '2xl': '1.875rem'
  },

  // ==========================================
  // FONT WEIGHT
  // ==========================================

  fontWeight: {
    none: 0,
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900
  },

  // ==========================================
  // LINE HEIGHT
  // ==========================================

  lineHeight: {
    none: '0.063rem',
    xs: '0.936em',
    '2xs': '0.625rem',
    sm: '1.021rem',
    md: '1.192rem',
    lg: '1.362rem',
    xl: '1.532rem',
    '2xl': '1.703rem',
    '3xl': '2.043rem',
    '4xl': '2.383rem',
    '5xl': '2.553rem',
    '6xl': '4.086rem',
    '9xl': '8rem',
    '10xl': '17.05rem'
  },

  // ==========================================
  // LETTER SPACING
  // ==========================================

  letterSpacing: {
    tightest: '-.075rem',
    tighter: '-.05rem',
    tight: '-.025rem',
    normal: '0',
    wider: '.05rem',
    widest: '.25rem'
  },

  // ==========================================
  // BOX SHADOW
  // ==========================================

  boxShadow: {
    none: 'none',

    xs:
      '0 1px 3px rgba(16, 24, 40, 0.06), 0 1px 2px rgba(16, 24, 40, 0.04)',

    '2xs':
      '0 2px 6px rgba(16, 24, 40, 0.05)',

    sm:
      '0 4px 12px rgba(16, 24, 40, 0.08)',

    md:
      '0 16px 32px rgba(16, 24, 40, 0.12), 0 4px 10px rgba(16, 24, 40, 0.06)',

    lg:
      '0 12px 28px -8px rgba(16, 24, 40, 0.16)',

    xl:
      '0 24px 48px rgba(16, 24, 40, 0.12)',

    redRose:
      '0 0 0 2px rgba(230, 0, 35, 0.20)',

    red:
      '0 0 0 2px rgba(201, 0, 36, 0.22)',

    blue:
      '0 0 0 2px rgba(37, 99, 235, 0.28)'
  },

  // ==========================================
  // FILTER
  // ==========================================

  filter: {
    none: 'none',
    xs: 'drop-shadow(0 8px 24px rgba(16, 24, 40, 0.08))'
  },

  // ==========================================
  // BORDER RADIUS
  // ==========================================

  borderRadius: {
    none: '0',
    '2xs': '0.25rem',
    xs: '0.375rem',
    sm: '0.625rem',
    md: '0.75rem',
    lg: '1.25rem',
    full: '624.938rem'
  },

  // ==========================================
  // BORDER WIDTH
  // ==========================================

  borderWidth: {
    none: '0',
    xs: '0.063rem',
    md: '0.094rem',
    lg: '0.125rem',
    xl: '0.188rem'
  },

  // ==========================================
  // OPACITY
  // ==========================================

  opacity: {
    0: '0',
    20: '0.20',
    25: '0.25',
    30: '0.3',
    35: '0.35',
    40: '0.4',
    45: '0.45',
    50: '0.5',
    55: '0.55',
    75: '0.75',
    100: '1'
  },

  // ==========================================
  // WIDTH
  // ==========================================

  width: {
    maxDesktop: '1366px',
    maxMobile: '960px'
  },

  // ==========================================
  // Z INDEX
  // ==========================================

  zIndex: {
    auto: 'auto',
    '-2': '-2',
    '-1': '-1',
    0: '0',
    5: '5',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    999: '999',
    9999: '9999',
    99999: '99999',
    high: '999999999',
    modal: '99999999999',
    toast: '999999999999999999999'
  }
}

/**
 * darkChoices
 *
 * Dark theme overrides for the `choices` design tokens.
 * Preserves the vibrant brand identity and adapts
 * surfaces, text, gradients and feedback colors
 * for a consistent dark interface.
 *
 * @type {typeof choices}
 */

export const darkChoices = {
  ...choices,

  color: {
    ...choices.color,

    // ==========================================
    // BASE COLORS
    // ==========================================

    base: {
      ...choices.color.base,

      mineShaft: '#F1F3F8',
      white: '#11161D',
      black: '#FFFFFF'
    },

    // ==========================================
    // BRAND COLORS
    // ==========================================

    brand: {
      ...choices.color.brand,

      // ========================================
      // PRIMARY BRAND — RED
      // ========================================

      pigmentGreen: '#00E69A',
      alizarinCrimson: '#E60023',
      guardsmanRed: '#C90024',
      tabasco: '#FF5269',
      chablis: '#391820',
      turquoise: '#35E0C4',
      whiteIce: '#103528',
      crispyMintGreen: '#35D98D',
      pinkLight: '#702D43',
      darkerRed: '#280D15',

      redGradient:
        'linear-gradient(135deg, #FF405B 0%, #E60023 55%, #A90024 100%)',

      redGradientButton:
        'linear-gradient(135deg, #E60023 0%, #A90024 100%)',

      // ========================================
      // SECONDARY COLORS
      // ========================================

      deepCerulean: '#5B8CFF',
      surfaceHover: 'rgba(255, 255, 255, 0.075)',
      blueLagoon: '#00CFFF',
      blueStone: '#247C9E',
      foam: '#102C38',

      // ========================================
      // NEUTRAL COLORS
      // ========================================

      mineShaft: '#F1F3F8',
      doveGray: '#BEC6D3',
      silver: '#8491A3',
      overline: 'rgba(255, 255, 255, 0.16)',
      selection: 'rgba(255, 255, 255, 0.10)',
      mercury: '#303A48',
      wildSand: '#222B36',
      alabaster: '#171D26',
      white: '#11161D',

      // ========================================
      // CAMPAIGNS
      // ========================================

      heavyMetal: '#0F141B',
      schoolBusYellow: '#FFD84D',
      schoolBusYellowInk: '#332700',

      campaignOrange: '#FF8533',
      campaignOrangeInk: '#351600',

      campaignPink: '#FF6BA3',
      campaignViolet: '#A78BFA',

      // ========================================
      // FEEDBACK
      // ========================================

      japaneseLaurel: '#35D98D',
      red: '#FF657B',
      fuelYellow: '#FFD166',
      meteor: '#FF9D42',
      fuelYellowInk: '#302000',

      // ========================================
      // TEXT
      // ========================================

      lust: '#FF7188',
      easternBlue: '#8FB2FF',
      steel: '#BEC6D3',
      paleSlate: '#8491A3',
      bokaraGray: '#F1F3F8',
      indiaGreen: '#6EE7A8',
      kuCrimson: '#FF7188',

      // ========================================
      // BACKGROUNDS
      // ========================================

      lilyWhite: '#102C38',
      whiteSmoke: '#222B36',
      sweetPink: '#391820',

      // ========================================
      // ICONS
      // ========================================

      kellyGreen: '#00E69A',

      // ========================================
      // LOADERS
      // ========================================

      backgroundLoader: '#171D26',
      foreGroundLoader: '#283341',

      // ========================================
      // TAGS
      // ========================================

      blueTag: '#155E75',
      orangeTag: '#A94C00',

      // ========================================
      // ADDITIONAL VIBRANT COLORS
      // ========================================

      electricBlue: '#5B8CFF',
      vividCyan: '#00CFFF',
      vibrantPurple: '#A78BFA',
      vibrantPink: '#FF6BA3',
      vibrantOrange: '#FF8533',
      vibrantYellow: '#FFD84D',
      vibrantGreen: '#00E69A'
    },

    // ==========================================
    // TEXT SEMANTIC COLORS
    // ==========================================

    text: {
      primary: '#F1F3F8',
      secondary: '#BEC6D3',
      tertiary: '#8491A3',
      disabled: 'rgba(241, 243, 248, 0.38)',
      inverse: '#11161D',
      onPrimary: '#FFFFFF',
      link: '#FF7188',
      success: '#6EE7A8',
      error: '#FF8A94',
      warning: '#FFD166',
      onWarning: '#302000'
    },

    // ==========================================
    // SURFACE COLORS
    // ==========================================

    surface: {
      background: '#0F141B',
      primary: '#171D26',
      elevated: '#1D2530',
      secondary: '#222B36',
      tertiary: '#283341',

      border: '#303A48',
      borderStrong: '#586678',

      scrim: 'rgba(0, 0, 0, 0.64)'
    },

    // ==========================================
    // GRADIENTS
    // ==========================================

    gradient: {
      ...choices.color.gradient,

      shimmer:
        'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.10) 30%, rgba(255,255,255,0) 81%)',

      skeleton:
        '-48px 78px 0 -48px #283341, -51px 102px 0 -51px #283341',

      brand:
        'linear-gradient(135deg, #FF405B 0%, #E60023 55%, #A90024 100%)',

      sunset:
        'linear-gradient(135deg, #FF8533 0%, #FFB347 100%)',

      ocean:
        'linear-gradient(135deg, #00CFFF 0%, #5B8CFF 100%)',

      fresh:
        'linear-gradient(135deg, #00E69A 0%, #00A651 100%)',

      candy:
        'linear-gradient(135deg, #FF6BA3 0%, #A78BFA 100%)'
    }
  },

  // ==========================================
  // DARK BOX SHADOWS
  // ==========================================

  boxShadow: {
    ...choices.boxShadow,

    xs:
      '0 1px 3px rgba(0, 0, 0, 0.24)',

    '2xs':
      '0 2px 6px rgba(0, 0, 0, 0.20)',

    sm:
      '0 4px 12px rgba(0, 0, 0, 0.24)',

    md:
      '0 16px 32px rgba(0, 0, 0, 0.32), 0 4px 10px rgba(0, 0, 0, 0.20)',

    lg:
      '0 12px 28px -8px rgba(0, 0, 0, 0.32)',

    xl:
      '0 24px 48px rgba(0, 0, 0, 0.30)',

    redRose:
      '0 0 0 2px rgba(230, 0, 35, 0.30)',

    red:
      '0 0 0 2px rgba(255, 101, 123, 0.28)',

    blue:
      '0 0 0 2px rgba(91, 140, 255, 0.32)'
  },

  // ==========================================
  // DARK FILTER
  // ==========================================

  filter: {
    ...choices.filter,

    xs:
      'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.24))'
  }
}
