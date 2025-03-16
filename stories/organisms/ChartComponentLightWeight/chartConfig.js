import {
  ColorType,
  LineStyle,
  LastPriceAnimationMode
} from 'lightweight-charts'

export const theme = {
  backgroundColor: 'white',
  textColor: 'rgba(255, 0, 0, 0.5)',
  gridColor: 'rgba(255, 0, 0, 0.1)',
  // used for values greater than first in data array
  lineColorMax: 'rgba(255, 0, 0, 1)',
  topColorMax: 'rgba(255, 0, 0, .25)',
  bottomColorMax: 'rgba(255, 0, 0, 0)',
  markerBorderColorMax: 'rgba(255, 0, 0, .1)',
  // used for values less than first in data array
  lineColorMin: 'rgba(255, 0, 0, 1)',
  topColorMin: 'rgba(255, 0, 0, .25)',
  bottomColorMin: 'rgba(255, 0, 0, 0)',
  markerBorderColorMin: 'rgba(255, 0, 0, .1)'
}

// configure chart
export const chartConfig = {
  layout: {
    background: { type: ColorType.Solid, color: theme.backgroundColor },
    textColor: theme.textColor
  },
  autoSize: false,
  // here should be a dynamic client width value
  width: 375,
  height: 210,
  grid: {
    vertLines: {
      style: LineStyle.LargeDashed,
      color: theme.gridColor
    },
    horzLines: {
      color: theme.gridColor
    }
  },
  rightPriceScale: {
    visible: false
  },
  leftPriceScale: {
    visible: false
  },
  timeScale: {
    visible: false
  },
  crosshair: {
    // hide the horizontal crosshair line
    horzLine: {
      color: theme.lineColorMax,
      style: LineStyle.SparseDotted
    },
    // hide the vertical crosshair label
    vertLine: {
      style: LineStyle.LargeDashed,
      color: theme.textColor
    }
  }
}

// configure chart
export const newChartConfig = {
  layout: {
    background: { type: ColorType.Solid, color: theme.backgroundColor },
    textColor: theme.textColor
  },
  autoSize: true,
  // here should be a dynamic client width value
  width: 375,
  height: 210,
  grid: {
    vertLines: {
      style: LineStyle.LargeDashed,
      color: theme.gridColor
    },
    horzLines: {
      color: theme.gridColor
    }
  },
  priceFormat: {
    type: 'price', // Tipo de formato de precio
    minMove: 1, // Mueve el decimal mínimo (1 para números enteros, 0.01 para 2 decimales, etc.)
    precision: 0 // Cantidad de decimales (0 para enteros, 2 para dos decimales, etc.)
  },
  rightPriceScale: {
    visible: true,
    borderVisible: false
  },
  leftPriceScale: {
    visible: false
  },

  timeScale: {
    visible: true, // Habilita el eje de tiempo
    borderVisible: true, // Muestra la línea divisoria con el gráfico
    timeVisible: true, // Asegura que se muestren los valores de tiempo
    secondsVisible: false, // Evita que se muestren segundos si no es necesario
    tickMarkFormatter: (time) => {
      return new Date(time * 1000).toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric', month: 'short' });
    }
  },
  crosshair: {
    horzLine: {
      visible: false
    },
    vertLine: {
      width: 1.5,
      style: LineStyle.Solid,
      color: theme.textColor
    }
  }
}

// configure line
export const areaConfig = {
  lineWidth: 1,
  lineColor: theme.lineColorMax,
  topColor: theme.topColorMax,
  bottomColor: theme.bottomColorMax,
  crosshairMarkerRadius: 6,
  crosshairMarkerBorderWidth: 6,
  crosshairMarkerBorderColor: theme.markerBorderColorMax,
  crosshairMarkerBackgroundColor: theme.lineColorMax,
  lastPriceAnimation: LastPriceAnimationMode.OnDataUpdate,
  priceLineVisible: false,
  lastValueVisible: false
}

export const newAreaConfig = {
  lineWidth: 1.5,
  lineColor: theme.lineColorMax,
  topColor: theme.topColorMax,
  bottomColor: theme.bottomColorMax,
  crosshairMarkerRadius: 6,
  crosshairMarkerBorderWidth: 6,
  crosshairMarkerBorderColor: theme.markerBorderColorMax,
  crosshairMarkerBackgroundColor: theme.lineColorMax,
  lastPriceAnimation: LastPriceAnimationMode.OnDataUpdate,
  priceLineVisible: false,
  lastValueVisible: false
}
