const choices = {
  color: {
    brand: {
      // Primary
      alizarinCrimson: '#F95450',
      guardsmanOrangeRed: '#F95450',
      tabasco: '#F95450',
      chablis: '#FFF4F4',
      turquoise: '#63BBAE',
      pinkLight: '#FFC2C2',
      orangeRedGradient: 'linear-gradient(270deg, #E86241 0%, #F95450 100%) 0% 0% no-repeat padding-box',
      orangeRedGradientButton: 'linear-gradient(270deg, #E86241 0%, #F95450 100%) 0% 0% no-repeat padding-box',
      // Secondary
      deepCerulean: '#F95750',
      orangeRedLagoon: '#E86241',
      orangeRedStone: '#00586C',
      blue: '#011E41',
      foam: '#E4F7FC',
      // Neutral
      mineShaft: '#1A1A1A',
      doveGray: '#666666',
      silver: '#C4C4C4',
      mercury: '#E5E5E5',
      wildSand: '#F5F5F5',
      alabaster: '#F9F9F9',
      white: '#FFFFFF',
      // Campaigns
      heavyMetal: '#212322',
      schoolBusYellow: '#FEDD00',
      // Feedback
      japaneseLaurel: '#1B8900',
      red: '#F80000',
      fuelYellow: '#F0A92E',
      meteor: '#CC870F',
      // Text
      lust: '#da291c',
      easternorangeRed: '#F95750',
      steel: '#666666',
      paleSlate: '#c4c4c4',
      bokaraGray: '#1A1A1A',
      indiaOrangeRed: '#1a8900',
      kuCrimson: '#EE0000',
      // Backgrounds
      lilyWhite: '#e4f7fc',
      whiteSmoke: '#f5f5f5',
      sweetPink: '#ec938d',
      // Icons
      kellyOrangeRed: '#24ba00',
      // Loaders
      backgroundLoader: '#f3f3f3',
      foreGroundLoader: '#ecebeb',
      // Tags
      orangeRedTag: '#E86241',
      orangeTag: '#e07c00'
    },
    base: {
      mineShaft: '#1A1A1A',
      white: '#FFFFFF',
      transparent: 'transparent'
    }
  },
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
    '5xl': '3.5rem'
  },
  fontFamily: {
    sans: ['Open Sans']
  },
  fontSize: {
    base: '16px',
    xs: '0.688rem',
    '2xs': '0.625rem',
    sm: '0.75rem',
    md: '0.875rem',
    lg: '1rem',
    xl: '1.125rem',
    '2xl': '20px',
    '3xl': '1.5rem',
    '5xl': '1.875rem',
    '6xl': '3rem',
    '9xl': '5.862rem',
    '10xl': '12.5rem'
  },
  fontSizeTitles: {
    base: '16px',
    '3xs': '0.75rem',
    '2xs': '0.875rem',
    xs: '1rem',
    sm: '1.125rem',
    md: '1.25rem',
    'md2': '1.375rem',
    lg: '1.5rem',
    xl: '1.75rem',
    '2xl': '1.875rem'
  },
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
  letterSpacing: {
    tightest: '-.075rem',
    tighter: '-.05rem',
    tight: '-.025rem',
    normal: '0',
    wider: '.05rem',
    widest: '.25rem'
  },
  boxShadow: {
    none: 'none',
    xs: '4px -6px 18px rgba(0, 0, 0, 0.05)',
    '2xs': '0px 4px 8px rgba(27, 33, 56, 0.06)',
    sm: '4px 4px 18px rgba(0, 0, 0, 0.12)',
    md: '0px 16px 24px rgba(0, 0, 0, 0.14), 0px 6px 30px rgba(0, 0, 0, 0.12), 0px 8px 10px rgba(0, 0, 0, 0.2)',
    lg: '-1px 7px 18px -2px rgba(0, 0, 0, 0.12)',
    xl: '0px 4px 8px rgba(27, 33, 56, 0.06)'
  },
  filter: {
    none: 'none',
    xs: 'drop-shadow(20px 20px 80px #1b21380d)'
  },
  borderRadius: {
    none: '0',
    '2xs': '0.25rem',
    xs: '0.375rem',
    sm: '0.625rem',
    md: '0.75rem',
    lg: '1.25rem',
    full: '624.938rem'
  },
  borderWidth: {
    none: '0',
    xs: '0.063rem',
    md: '0.094rem',
    lg: '0.125rem',
    xl: '0.188rem'
  },
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
  width:{
    maxDesktop:'1160px',
    maxMobile: '960px'
  },
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
    99999: '99999'
  }
}


module.exports = choices