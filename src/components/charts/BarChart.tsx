import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { formatCurrency } from '@/lib/utils'

interface BarChartProps {
  data: { timestamp: number; pnl: number }[]
}

export function BarChart({ data }: BarChartProps) {
  const chartData = data.map((d) => ({
    date: new Date(d.timestamp).toLocaleDateString(),
    pnl: d.pnl,
    fill: d.pnl >= 0 ? 'hsl(142, 76%, 36%)' : 'hsl(0, 84%, 60%)',
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={chartData}>
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
          formatter={(value: number) => [formatCurrency(value), 'P&L']}
        />
        <Bar dataKey="pnl" fill="fill" />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
