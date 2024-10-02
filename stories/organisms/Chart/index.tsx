import React, { type FC } from 'react'
import PropTypes from 'prop-types'
import { choices } from '../../../scripts/tokens/choices'
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
  Legend,
  AreaChart,
  Area
} from 'recharts'

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
