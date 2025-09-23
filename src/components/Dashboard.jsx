import React from "react"
import { useSelector } from "react-redux"
import { CheckCircle, XCircle, Clock, Users } from "lucide-react"

export const Dashboard = () => {
  const { bookings } = useSelector(state => state.bookings)

  const total = bookings.length
  const confirmed = bookings.filter(b => b.status === "Confirmed").length
  const cancelled = bookings.filter(b => b.status === "Cancelled").length
  const pending = bookings.filter(b => b.status === "Pending").length

  const stats = [
    { label: "Total", value: total, icon: <Users className="w-6 h-6 text-white" />, bg: "bg-blue-500" },
    { label: "Confirmed", value: confirmed, icon: <CheckCircle className="w-6 h-6 text-white" />, bg: "bg-green-500" },
    { label: "Cancelled", value: cancelled, icon: <XCircle className="w-6 h-6 text-white" />, bg: "bg-red-500" },
    { label: "Pending", value: pending, icon: <Clock className="w-6 h-6 text-white" />, bg: "bg-yellow-500" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`flex items-center justify-between p-6 rounded-lg shadow-lg ${stat.bg} text-white transition-transform transform hover:scale-105`}
        >
          <div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm">{stat.label}</div>
          </div>
          <div>{stat.icon}</div>
        </div>
      ))}
    </div>
  )
}