import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { formatCurrency } from '@/lib/utils'

interface LineChartProps {
  data: { timestamp: number; value: number }[]
  color?: string
  label?: string
}

export function LineChart({ data, color = 'hsl(188, 94%, 45%)', label = 'Value' }: LineChartProps) {
  const chartData = data.map((d) => ({
    date: new Date(d.timestamp).toLocaleDateString(),
    value: d.value,
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 17%)" />
        <XAxis
          dataKey="date"
          stroke="hsl(215, 20%, 65%)"
          tick={{ fill: 'hsl(215, 20%, 65%)', fontSize: 12 }}
        />
        <YAxis
          stroke="hsl(215, 20%, 65%)"
          tick={{ fill: 'hsl(215, 20%, 65%)', fontSize: 12 }}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(222, 47%, 8%)',
            border: '1px solid hsl(217, 33%, 17%)',
            borderRadius: '8px',
          }}
          formatter={(value: number) => [formatCurrency(value), label]}
        />
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}
