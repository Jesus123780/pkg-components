const createDecisions = (themeChoices) => {
  const {
    color: {
      brand,
      base,
      gradient,
      text: textTokens,
      surface
    },
    boxShadow,
    borderWidth,
    borderRadius,
    filter,
    fontFamily,
    fontSize,
    fontSizeTitles,
    fontWeight,
    lineHeight,
    letterSpacing,
    opacity,
    spacing,
    width,
    zIndex
  } = themeChoices

  const decisions = {
    // ==========================================
    // COLORS
    // ==========================================

    color: {
      // ========================================
      // BASE
      // ========================================

      base: {
        black: base.mineShaft,
        white: base.white,
        transparent: base.transparent
      },

      // ========================================
      // LOADERS
      // ========================================

      loaders: {
        background: brand.backgroundLoader,
        foreGround: brand.foreGroundLoader
      },

      // ========================================
      // PRIMARY — RED BRAND
      // ========================================

      primary: {
        red: brand.alizarinCrimson,
        red2: brand.guardsmanRed,
        redDark: brand.tabasco,

        redHeader: brand.redGradient,
        redQtyButton: brand.redGradientButton,

        redBg: brand.chablis,
        redLight: brand.pinkLight,
        redDarker: brand.darkerRed,

        disabled: brand.paleSlate,

        gradient: gradient.brand
      },

      // ========================================
      // SECONDARY — BLUE / CYAN
      // ========================================

      secondary: {
        blue: brand.deepCerulean,
        blue2: brand.blueLagoon,
        blueDark: brand.blueStone,
        blueBg: brand.foam,

        cyan: brand.vividCyan,
        electricBlue: brand.electricBlue
      },

      // ========================================
      // NEUTRAL COLORS
      // ========================================

      neutral: {
        black: brand.mineShaft,
        gray: brand.mercury,
        grayLight: brand.wildSand,
        grayDark: brand.doveGray,
        graySilver: brand.silver,
        grayWhite: brand.alabaster,
        white: brand.white,

        background: surface.background,
        surface: surface.primary,
        elevated: surface.elevated,
        border: surface.border,
        borderStrong: surface.borderStrong
      },

      // ========================================
      // CAMPAIGNS
      // ========================================

      campaigns: {
        red: brand.lust,
        black: brand.heavyMetal,

        blue: brand.blueTag,
        orange: brand.campaignOrange,
        orangeDark: brand.orangeTag,
        orangeInk: brand.campaignOrangeInk,

        yellow: brand.schoolBusYellow,
        yellowInk: brand.schoolBusYellowInk,

        turquoise: brand.turquoise,
        pink: brand.campaignPink,
        violet: brand.campaignViolet,

        electricBlue: brand.electricBlue,
        vibrantGreen: brand.vibrantGreen
      },

      // ========================================
      // FEEDBACK
      // ========================================

      feedback: {
        successLight: brand.kellyGreen,
        successDark: brand.japaneseLaurel,
        successBg: brand.whiteIce,

        errorLight: brand.red,
        errorDark: brand.kuCrimson,

        warningLight: brand.fuelYellow,
        warningDark: brand.meteor,
        warningInk: brand.fuelYellowInk,

        info: brand.blueLagoon,
        infoBg: brand.foam
      },

      // ========================================
      // GRADIENTS
      // ========================================

      gradients: {
        shimmer: gradient.shimmer,
        skeleton: gradient.skeleton,

        brand: gradient.brand,
        sunset: gradient.sunset,
        ocean: gradient.ocean,
        fresh: gradient.fresh,
        candy: gradient.candy
      },

      // ========================================
      // TEXT
      // ========================================

      text: {
        primary: textTokens.primary,
        secondary: textTokens.secondary,

        grayLight: brand.steel,
        inactive: textTokens.disabled,

        black: brand.bokaraGray,

        // Constant white, independent of theme
        white: '#FFFFFF',

        success: textTokens.success,
        error: textTokens.error,
        warning: textTokens.warning,

        crispyMintGreen: brand.crispyMintGreen,

        link: textTokens.link,
        tertiary: textTokens.tertiary,
        disabled: textTokens.disabled
      },

      // ========================================
      // BACKGROUNDS
      // ========================================

      background: {
        primary: brand.lust,
        primaryLight: brand.chablis,

        secondary: brand.deepCerulean,
        secondaryLight: brand.foam,

        gray: surface.tertiary,
        grayLight: surface.secondary,

        white: surface.primary,

        overline: brand.overline,
        selection: brand.selection,

        pink: brand.sweetPink,

        success: brand.pigmentGreen,
        successLight: brand.whiteIce,

        whiteIce: brand.whiteIce,
        surfaceHover: brand.surfaceHover,

        elevated: surface.elevated,
        border: surface.border
      },

      // ========================================
      // ICONS
      // ========================================

      icons: {
        primary: brand.alizarinCrimson,
        secondary: brand.deepCerulean,

        gray: brand.doveGray,
        grayLight: brand.silver,

        black: brand.mineShaft,

        // Remains white in both themes
        white: '#FFFFFF',

        success: brand.kellyGreen,
        error: brand.red,
        warning: brand.fuelYellow,

        cyan: brand.vividCyan,
        orange: brand.campaignOrange,
        pink: brand.vibrantPink,
        violet: brand.vibrantPurple
      }
    },

    // ==========================================
    // FONT FAMILY
    // ==========================================

    fontFamily: {
      sans: fontFamily.sans,
      regular: fontFamily.regular,
      medium: fontFamily.medium,
      bold: fontFamily.bold
    },

    // ==========================================
    // FONT SIZE
    // ==========================================

    fontSize: {
      base: fontSize.base,
      xs: fontSize.xs,
      '2xs': fontSize['2xs'],
      sm: fontSize.sm,
      md: fontSize.md,
      lg: fontSize.lg,
      xl: fontSize.xl,
      '2xl': fontSize['2xl'],
      '3xl': fontSize['3xl'],
      '5xl': fontSize['5xl'],
      '6xl': fontSize['6xl'],
      '9xl': fontSize['9xl'],
      '10xl': fontSize['10xl']
    },

    // ==========================================
    // SPACING
    // ==========================================

    spacing: {
      none: spacing.none,
      xs: spacing.xs,
      sm: spacing.sm,
      md: spacing.md,
      lg: spacing.lg,
      xl: spacing.xl,
      '2xl': spacing['2xl'],
      '3xl': spacing['3xl'],
      '4xl': spacing['4xl'],
      '5xl': spacing['5xl'],
      '6xl': spacing['6xl'],
      '7xl': spacing['7xl'],
      '8xl': spacing['8xl'],
      '9xl': spacing['9xl'],
      '10xl': spacing['10xl']
    },

    // ==========================================
    // TITLE FONT SIZE
    // ==========================================

    fontSizeTitles: {
      base: fontSizeTitles.base,
      '2xs': fontSizeTitles['2xs'],
      '3xs': fontSizeTitles['3xs'],
      xs: fontSizeTitles.xs,
      sm: fontSizeTitles.sm,
      md: fontSizeTitles.md,
      md2: fontSizeTitles.md2,
      lg: fontSizeTitles.lg,
      xl: fontSizeTitles.xl,
      '2xl': fontSizeTitles['2xl']
    },

    // ==========================================
    // FONT WEIGHT
    // ==========================================

    fontWeight: {
      none: fontWeight.none,
      hairline: fontWeight.hairline,
      thin: fontWeight.thin,
      light: fontWeight.light,
      normal: fontWeight.normal,
      medium: fontWeight.medium,
      semibold: fontWeight.semibold,
      bold: fontWeight.bold,
      extrabold: fontWeight.extrabold,
      black: fontWeight.black
    },

    // ==========================================
    // LINE HEIGHT
    // ==========================================

    lineHeight: {
      none: lineHeight.none,
      xs: lineHeight.xs,
      '2xs': lineHeight['2xs'],
      sm: lineHeight.sm,
      md: lineHeight.md,
      lg: lineHeight.lg,
      xl: lineHeight.xl,
      '2xl': lineHeight['2xl'],
      '3xl': lineHeight['3xl'],
      '4xl': lineHeight['4xl'],
      '5xl': lineHeight['5xl'],
      '6xl': lineHeight['6xl'],
      '9xl': lineHeight['9xl'],
      '10xl': lineHeight['10xl']
    },

    // ==========================================
    // LETTER SPACING
    // ==========================================

    letterSpacing: {
      tightest: letterSpacing.tightest,
      tighter: letterSpacing.tighter,
      tight: letterSpacing.tight,
      normal: letterSpacing.normal,
      wider: letterSpacing.wider,
      widest: letterSpacing.widest
    },

    // ==========================================
    // BOX SHADOW
    // ==========================================

    boxShadow: {
      none: boxShadow.none,
      xs: boxShadow.xs,
      '2xs': boxShadow['2xs'],
      sm: boxShadow.sm,
      md: boxShadow.md,
      lg: boxShadow.lg,
      xl: boxShadow.xl,

      red_rose: boxShadow.redRose,
      red: boxShadow.red,
      blue: boxShadow.blue
    },

    // ==========================================
    // FILTER
    // ==========================================

    filter: {
      none: filter.none,
      xs: filter.xs
    },

    // ==========================================
    // BORDER RADIUS
    // ==========================================

    borderRadius: {
      none: borderRadius.none,
      '2xs': borderRadius['2xs'],
      xs: borderRadius.xs,
      sm: borderRadius.sm,
      md: borderRadius.md,
      lg: borderRadius.lg,
      full: borderRadius.full
    },

    // ==========================================
    // BORDER WIDTH
    // ==========================================

    borderWidth: {
      none: borderWidth.none,
      xs: borderWidth.xs,
      md: borderWidth.md,
      lg: borderWidth.lg,
      xl: borderWidth.xl
    },

    // ==========================================
    // OPACITY
    // ==========================================

    opacity: {
      0: opacity['0'],
      25: opacity['25'],
      40: opacity['40'],
      50: opacity['50'],
      75: opacity['75'],
      100: opacity['100']
    },

    // ==========================================
    // WIDTH
    // ==========================================

    width: {
      maxDesktop: width.maxDesktop,
      maxMobile: width.maxMobile
    },

    // ==========================================
    // Z INDEX
    // ==========================================

    zIndex: {
      auto: zIndex.auto,
      '-2': zIndex['-2'],
      '-1': zIndex['-1'],
      0: zIndex['0'],
      5: zIndex['5'],
      10: zIndex['10'],
      20: zIndex['20'],
      30: zIndex['30'],
      40: zIndex['40'],
      50: zIndex['50'],
      999: zIndex['999'],
      9999: zIndex['9999'],
      99999: zIndex['99999'],
      high: zIndex.high,
      modal: zIndex.modal,
      toast: zIndex.toast
    }
  }

  return decisions
}

module.exports = createDecisions
