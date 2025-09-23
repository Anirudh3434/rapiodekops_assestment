import React from "react"
import { useSelector } from "react-redux"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"

export const ChartService = () => {
  const { bookings } = useSelector(state => state.bookings)

  const serviceCounts = bookings.reduce((acc, b) => {
    acc[b.serviceName] = (acc[b.serviceName] || 0) + 1
    return acc
  }, {})

  const data = Object.keys(serviceCounts).map(key => ({ name: key, count: serviceCounts[key] }))

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full h-72 md:h-80">
      <h2 className="text-lg font-semibold mb-2 text-gray-700 text-center">Bookings per Service</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#47c480" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}