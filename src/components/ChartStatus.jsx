import React from "react"
import { useSelector } from "react-redux"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts"

export const ChartStatus = () => {
  const { bookings } = useSelector(state => state.bookings)

  const data = [
    { name: "Confirmed", value: bookings.filter(b => b.status === "Confirmed").length },
    { name: "Cancelled", value: bookings.filter(b => b.status === "Cancelled").length },
    { name: "Pending", value: bookings.filter(b => b.status === "Pending").length },
  ]

  const COLORS = ["#47c480", "#f87171", "#facc15"]

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full h-72 md:h-80">
      <h2 className="text-lg font-semibold mb-2 text-gray-700 text-center">Bookings by Status</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}