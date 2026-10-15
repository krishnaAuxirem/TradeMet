import { ResponsiveContainer, ComposedChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import type { MarketData } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface CandlestickChartProps {
  data: MarketData[]
}

export function CandlestickChart({ data }: CandlestickChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    date: new Date(d.timestamp).toLocaleDateString(),
    range: [d.low, d.high],
    body: d.close >= d.open ? [d.open, d.close] : [d.close, d.open],
    fill: d.close >= d.open ? 'hsl(142, 76%, 36%)' : 'hsl(0, 84%, 60%)',
  }))

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 17%)" />
        <XAxis
          dataKey="date"
          stroke="hsl(215, 20%, 65%)"
          tick={{ fill: 'hsl(215, 20%, 65%)', fontSize: 12 }}
        />
        <YAxis
          domain={['dataMin - 500', 'dataMax + 500']}
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
          formatter={(value: number) => formatCurrency(value)}
        />
        <Bar dataKey="body" fill="fill" barSize={8} />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
