'use client'

import React, { useEffect, useState, useRef, type FC } from 'react'
import { type AreaStyleOptions, createChart, type DeepPartial, type IChartApi, type ISeriesApi, LineType, type SeriesOptionsCommon, type Time } from 'lightweight-charts'
import { theme, newChartConfig } from './chartConfig'

/**
 *
 * @param {*} startValue - first value on chart
 * @param {*} selectedValue - current price value / selected dot value
 */
interface CompareValuesResult {
  percents: number
  delta: number
  isPositive: boolean
}

const compareValues = (startValue: number, selectedValue: number): CompareValuesResult => {
  const percents = (100 * selectedValue) / startValue
  const delta = percents - 100
  return {
    percents: Math.abs(parseFloat(delta.toFixed(2))),
    delta: Math.abs(selectedValue - startValue),
    isPositive: delta >= 0
  }
}
interface ChartComponentProps {
  data: Array<{ name: string, data: Array<{ time: number, value: number }>, config: DeepPartial<AreaStyleOptions & SeriesOptionsCommon> }>
  currentPrice: { time: number | string, value: number }
  width?: number
  height?: number
}

export const ChartComponent: FC<ChartComponentProps> = ({
  data,
  currentPrice,
  width = 800,
  height = 400
}) => {
  /**
   * @var label - state variable that contains data for chart dot, clicked by user
   * @method setLabel - method to update label data
   */
  const [label, setLabel] = useState<{
    time: number | string
    price: number
    delta: number
    isPositive: boolean
    percents: number
  } | null>(null)

  const chartRef = useRef<IChartApi | null>(null)
  const areaSeriesRef = useRef<Record<string, any> | null>(null)

  const chartContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (data.length === 0 || (chartContainerRef.current == null)) return

    // Si ya hay un gráfico, limpiarlo antes de crear uno nuevo
    if (chartRef.current != null) {
      chartRef.current.remove()
      chartRef.current = null
    }

    // Crear el gráfico y guardarlo en el ref
    const chart = createChart(chartContainerRef.current, { ...newChartConfig, width, height })
    chart.applyOptions({ handleScale: false, handleScroll: false })
    chart.timeScale().fitContent()

    // Almacenar referencias de las series
    const seriesRefs: Record<string, any> = {}

    // Iterar sobre los data y crear múltiples AreaSeries
    data.forEach(({
      name,
      data,
      config
    }) => {
      const series = chart.addAreaSeries({
        lineType: LineType.Curved,
        lineWidth: 2,
        ...config
      })
      const array = data.map((item) => ({
        time: (Math.floor(new Date(item.time).getTime() / 1000)) as Time, // Ensure time is of type Time
        value: item.value
      }))
      series.setData(array)
      seriesRefs[name] = series
    })

    areaSeriesRef.current = seriesRefs
    chartRef.current = chart

    // Obtener valores iniciales de la primera serie
    const firstSeriesData = data[0]?.data ?? []
    const startValue = Number.isFinite(firstSeriesData[0]?.value) ? firstSeriesData[0]?.value : 0
    const {
      delta,
      isPositive,
      percents
    } = compareValues(startValue, currentPrice?.value)

    // Setear label inicial
    setLabel({
      time: new Date(currentPrice?.time).toISOString().split('T')[0],
      price: currentPrice?.value,
      delta,
      isPositive,
      percents
    })

    // Función para actualizar el gráfico
    const updateChart = (isPositive: boolean): void => {
      chart.applyOptions({
        crosshair: {
          horzLine: { color: isPositive ? theme.lineColorMax : theme.lineColorMin }
        }
      })

      // Aplicar cambios de estilo a todas las series
      Object.values(seriesRefs).forEach((series) => {
        series.applyOptions({
          lineColor: isPositive ? theme.lineColorMax : theme.lineColorMin,
          topColor: isPositive ? theme.topColorMax : theme.topColorMin,
          bottomColor: isPositive ? theme.bottomColorMax : theme.bottomColorMin,
          crosshairMarkerBorderColor: isPositive
            ? theme.markerBorderColorMax
            : theme.markerBorderColorMin,
          crosshairMarkerBackgroundColor: isPositive
            ? theme.lineColorMax
            : theme.lineColorMin
        })
      })
    }

    // Aplicar la actualización inicial del gráfico
    updateChart(isPositive)

    // Suscribir evento de clic
    chart.subscribeClick((param) => {
      if (param.time === undefined) return

      const firstSeries = seriesRefs[data[0]?.name]
      if (firstSeries === null || firstSeries === undefined) return

      const price = param.seriesData.get(firstSeries as ISeriesApi<'Area'>) as { value: number } | undefined
      const { delta, isPositive, percents } = compareValues(startValue, price?.value ?? 0)
      setLabel({
        time: new Date(Number(param.time) * 1000).toISOString().split('T')[0],
        price: Number(price?.value),
        delta,
        isPositive,
        percents
      })
      updateChart(isPositive)
    })

    // Cleanup: eliminar el gráfico cuando el componente se desmonte
    return () => {
      if (chartRef.current != null) {
        chartRef.current.remove()
        chartRef.current = null
      }
    }
  }, [data, currentPrice])

  // format date to human readable form
  const date = label?.time !== undefined ? label.time : ''

  return (
    <div>
      <div className="date">
        {date}
      </div>
      <div ref={chartContainerRef} title='' />
    </div>
  )
}
