import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Cell,
} from 'recharts'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[var(--color-surface-900)] text-[var(--color-surface-50)] text-[12px] font-semibold px-3 py-2 rounded-xl shadow-lg">
      <p className="opacity-60 text-[11px] mb-0.5">{label}</p>
      <p>{payload[0].value} lamaran</p>
    </div>
  )
}

export default function MonthlyChart({ data, dark }) {
  const max = Math.max(...data.map((d) => d.count), 1)
  const currentMonth = new Date().toLocaleString('id-ID', { month: 'short' })

  // Warna grid dan axis menyesuaikan mode
  const gridColor  = dark ? '#2e2e50' : '#e8e8f0'
  const tickColor  = dark ? '#9090b0' : '#6b6b80'
  const cursorFill = dark ? '#1e1e35' : '#f2f2f7'

  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={data} barCategoryGap="30%" margin={{ top: 4, right: 4, bottom: 0, left: -28 }}>
        <CartesianGrid vertical={false} stroke={gridColor} strokeDasharray="3 3" />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 11, fill: tickColor, fontWeight: 600 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 11, fill: tickColor }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: cursorFill, radius: 8 }} />
        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
          {data.map((entry) => (
            <Cell
              key={entry.label}
              fill={
                entry.label === currentMonth
                  ? '#5c7cff'
                  : entry.count === max && max > 0
                    ? '#7b9bff'
                    : dark ? '#2a3366' : '#e0eaff'
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
