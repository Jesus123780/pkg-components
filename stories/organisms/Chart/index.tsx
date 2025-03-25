import React, { useEffect, useRef, type FC } from 'react'
import PropTypes from 'prop-types'
import { choices } from '../../../scripts/tokens/choices'
import { createChart, LineStyle, CrosshairMode, type LineWidth } from 'lightweight-charts'
import { ChartComponent } from '../ChartComponentLightWeight'
import {
  Bar,
  Doughnut,
  Pie,
  Line as LineChartJs
} from 'react-chartjs-2'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { Text } from '../../atoms'
import { areaConfig, newAreaConfig } from '../ChartComponentLightWeight/chartConfig'

interface ChartData {
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    backgroundColor: string[]
    borderColor: string[]
    borderWidth: number
  }>
}

interface ChartOptions {
  indexAxis: string
  elements: {
    bar: {
      borderWidth: number
    }
  }
  responsive: boolean
  plugins: {
    legend: {
      position: string
    }
    title: {
      display: boolean
    }
  }
  type: string
}

const dataTest: ChartData = {
  labels: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio'],
  datasets: [
    {
      label: 'ejemplo',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }
  ]
}

let width: number, height: number, gradient: CanvasGradient

function getGradient (ctx: CanvasRenderingContext2D, chartArea: any) {
  const chartWidth = chartArea.right - chartArea.left
  const chartHeight = chartArea.bottom - chartArea.top

  if (!gradient || width !== chartWidth || height !== chartHeight) {
    // Crea el gradiente si no existe o si cambió el tamaño del gráfico
    width = chartWidth
    height = chartHeight
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top)
    gradient.addColorStop(0, 'blue')
    gradient.addColorStop(0.5, 'yellow')
    gradient.addColorStop(1, 'red')
  }

  return gradient
}

const optionsTest: ChartOptions = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2
    }
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right'
    },
    title: {
      display: true
    }
  },
  type: 'doughnut'
}

interface HorizontalBarChartProps {
  data?: ChartData
  options?: ChartOptions
}

export const HorizontalBarChart: FC<HorizontalBarChartProps> = ({ data, options }) => {
  const chartOptions = {
    ...options,
    plugins: {
      ...options?.plugins
    },
    elements: {
      line: {
        backgroundColor: (context: any) => {
          const { ctx, chartArea } = context.chart
          if (!chartArea) {
            // Si el área del gráfico aún no está lista, usa un color por defecto
            return 'rgba(0, 0, 0, 0.1)'
          }
          return getGradient(ctx, chartArea)
        }
      }
    }
  }
  return (
    <div className='header'>
      <div className='links'></div>
      <LineChartJs data={data ?? dataTest} options={chartOptions} />
    </div>
  )
}

export const HorizontalBarChartJs: FC<HorizontalBarChartProps> = ({ data, options }) => {
  return (
    <div className='header' style={{ width: '100%', height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data as any}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line yAxisId={0} type="monotone" dataKey="pv" stroke={`${choices.color.brand.fuelYellow}`} strokeDasharray="5 5" />
          <Line type="monotone" dataKey="uv" stroke={`${choices.color.brand.kellyGreen}`} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

interface CircleProps {
  data?: ChartData
  options?: ChartOptions
}

export const Circle: FC<CircleProps> = ({ data, options }) => {
  return (
    <div className='header'>
      <div className='links'></div>
      <Pie data={data ?? dataTest} options={options ?? optionsTest} />
    </div>
  )
}

Circle.propTypes = {
  data: PropTypes.any,
  options: PropTypes.any
}

interface DoughnutCharProps {
  data?: ChartData
  options?: ChartOptions
}

export const DoughnutChar: FC<DoughnutCharProps> = ({ data, options }) => {
  return (
    <div className='header'>
      <div className='links'></div>
      <Doughnut data={data ?? dataTest} options={options ?? optionsTest} />
    </div>
  )
}

DoughnutChar.propTypes = {
  data: PropTypes.any,
  options: PropTypes.any
}

interface BarChatProps {
  data?: ChartData
  options?: ChartOptions
}

export const BarChat: FC<BarChatProps> = ({ data, options }) => {
  return (
    <div className='header'>
      <div className='links'></div>
      <Bar data={data ?? dataTest} options={options ?? optionsTest} />
    </div>
  )
}

BarChat.propTypes = {
  data: PropTypes.any,
  options: PropTypes.any
}

export const LightweightChartComponent = () => {
  const chartRef = useRef(null)

  useEffect(() => {
    // Crear el gráfico y asociarlo con el div
    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: chartRef.current.clientHeight
    })

    // Definir los datos y la serie
    const lineSeries = chart.addLineSeries()
    lineSeries.setData([
      { time: 1633072800, value: 70 },
      { time: 1633076400, value: 72 },
      { time: 1633080000, value: 75 },
      { time: 1633083600, value: 80 }
    ])

    // Limpiar el gráfico cuando el componente se desmonte
    return () => {
      chart.remove()
    }
  }, [])

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
}

export const LargeChartComponent = () => {
  const chartRef = useRef(null)

  useEffect(() => {
    // Crear el gráfico y asociarlo con el div
    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: chartRef.current.clientHeight,
      layout: {
        backgroundColor: '#1E1E1E', // Fondo oscuro para la sección del gráfico
        textColor: '#D1D4D7' // Color del texto
      },
      grid: {
        vertLines: {
          color: '#333' // Color de las líneas verticales
        },
        horzLines: {
          color: '#333' // Color de las líneas horizontales
        }
      },
      crosshair: {
        mode: 0 // Modo de cruce (0=por defecto)
      },
      priceScale: {
        borderColor: '#555' // Color de borde del eje Y (de precios)
      },
      timeScale: {
        borderColor: '#555' // Color de borde del eje X (de tiempo)
      }
    })

    // Crear la serie de velas
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#4fff00', // Color para las velas alcistas
      borderUpColor: '#4fff00', // Color de borde para las velas alcistas
      wickUpColor: '#4fff00', // Color de la mecha de las velas alcistas
      downColor: '#ff4976', // Color para las velas bajistas
      borderDownColor: '#ff4976', // Color de borde para las velas bajistas
      wickDownColor: '#ff4976' // Color de la mecha de las velas bajistas
    })

    // Datos de ejemplo para las velas (formato: [tiempo, apertura, cierre, mínimo, máximo])
    const candlestickData = [
      { time: 1633072800, open: 40000, high: 41000, low: 39000, close: 40500 },
      { time: 1633076400, open: 40500, high: 42000, low: 40000, close: 41500 },
      { time: 1633080000, open: 41500, high: 42500, low: 41000, close: 42000 },
      { time: 1633083600, open: 42000, high: 44000, low: 41500, close: 43000 },
      { time: 1633087200, open: 43000, high: 45000, low: 42000, close: 44000 },
      { time: 1633090800, open: 44000, high: 46000, low: 43000, close: 45000 },
      { time: 1633094400, open: 45000, high: 47000, low: 44000, close: 46000 },
      { time: 1633098000, open: 46000, high: 48000, low: 45500, close: 47000 }
    ]

    // Establecer los datos de la serie
    candlestickSeries.setData(candlestickData)

    // Suscripción para el movimiento del cruce (crosshair)
    chart.subscribeCrosshairMove(function (param) {
      if (!param || !param.time) return
      const price = param.seriesData.get(candlestickSeries)
      console.log(`Price at time ${param.time}: Open: ${price.open}, Close: ${price.close}`)
    })

    // Limpiar el gráfico cuando el componente se desmonte
    return () => {
      chart.remove()
    }
  }, [])

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '500px', position: 'relative' }}
    />
  )
}

export const SalesDashboardChart = () => {
  useEffect(() => {
    // Datos proporcionados
    const data = [
      { day: 'Domingos', totalSales: 20000 },
      { day: 'Lunes', totalSales: 0 },
      { day: 'Martes', totalSales: 35001.8 },
      { day: 'Miércoles', totalSales: 0 },
      { day: 'Jueves', totalSales: 1000 },
      { day: 'Viernes', totalSales: 0 },
      { day: 'Sábados', totalSales: 0 }
    ]

    // Convertir los días en un arreglo de fechas o índices (timestamps para un gráfico de líneas)
    const chartData = data.map((item, index) => ({
      time: index, // Usa un índice como "time"
      value: item.totalSales
    }))

    // Crear el gráfico
    const chart = createChart('chart-container', {
      width: 600,
      height: 400,
      crosshair: {
        mode: CrosshairMode.Normal
      }
    })

    // Crear la línea de ventas
    const lineSeries = chart.addLineSeries({
      color: '#4e73df',
      lineStyle: LineStyle.Solid,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 5
    })

    // Establecer los datos en la serie
    lineSeries.setData(chartData.map((item) => ({ time: item.time, value: item.value })))
  }, [])

  return (
    <div id="chart-container" style={{ position: 'relative', width: '600px', height: '400px' }}></div>
  )
}

interface StockMovementsChartProps {
  className?: string
  width?: number
  title?: string
  height?: number
  chartData: Array<{
    date: string
    TotalIn: number
    TotalOut: number
  }>
}

export const StockMovementsChart: FC<StockMovementsChartProps> = ({
  chartData,
  className,
  width = 600,
  height = 400,
  title = ''
}) => {
  const stockOutData = chartData.map((item) => ({
    time: item.date,
    value: item.TotalOut
  }))

  const stockInData = chartData.map((item) => ({
    time: item.date,
    value: item.TotalIn
  }))

  const TotalAdjustment = chartData.map((item) => ({
    time: item.date,
    value: item.TotalAdjustment
  }))

  const dataSets = [
    { name: 'stock_in', data: stockInData, config: areaConfig },
    { name: 'stock_out', data: stockOutData, config: areaConfig },
    { name: 'total_adjustment', data: TotalAdjustment, config: { ...areaConfig, lineColor: 'rgba(187, 160, 6, 0.89)' } }
  ]

  return (
    <div className={className}>
      <Text size='5xl'>
        {title}
      </Text>
      <ChartComponent
        width={width}
        height={height}
        data={dataSets}
        currentPrice={{
          time: Date.now(),
          value: 19.10
        }}
      />
    </div>
  )
}
