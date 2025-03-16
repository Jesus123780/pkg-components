import {
    ColorType,
    LineStyle,
    LastPriceAnimationMode
} from "lightweight-charts";

export const theme = {
    backgroundColor: "white",
    textColor: "rgba(19, 20, 21, 0.5)",
    gridColor: "rgba(19, 20, 21, 0.1)",
    // used for values grater than first in data array
    lineColorMax: "rgba(57, 192, 135, 1)",
    topColorMax: "rgba(57, 192, 135, .25)",
    bottomColorMax: "rgba(57, 192, 135, 0)",
    markerBorderColorMax: "rgba(57, 192, 135, .1)",
    // used for values lass than first in data array
    lineColorMin: "rgba(224, 93, 50, 1)",
    topColorMin: "rgba(224, 93, 50, .25)",
    bottomColorMin: "rgba(224, 93, 50, 0)",
    markerBorderColorMin: "rgba(224, 93, 50, .1)"
};

// configure chart
export const chartConfig = {
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
};

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
    rightPriceScale: {
        visible: true,
        borderVisible: false
    },
    leftPriceScale: {
        visible: false
    },
    timeScale: {
        visible: false
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
};

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
};

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
};
