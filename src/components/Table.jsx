import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { confirmBooking, cancelBooking } from "../redux/bookingsSlice"
import dayjs from "dayjs"

export const Table = () => {
  const dispatch = useDispatch()
  const { bookings, filters, pagination } = useSelector(state => state.bookings)

  // Filter & search logic
  const filteredBookings = bookings
    .filter(b =>
      (filters.service === "All" || b.serviceName === filters.service) &&
      (filters.status === "All" || b.status === filters.status) &&
      (!filters.search || b.userName.toLowerCase().includes(filters.search.toLowerCase())) &&
      (!filters.startDate || new Date(b.date) >= new Date(filters.startDate)) &&
      (!filters.endDate || new Date(b.date) <= new Date(filters.endDate))
    )

  const startIndex = (pagination.page - 1) * pagination.perPage
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + pagination.perPage)

  const getStatusBadge = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-500 text-white"
      case "Cancelled":
        return "bg-red-500 text-white"
      case "Pending":
        return "bg-yellow-400 text-black"
      default:
        return "bg-gray-300"
    }
  }

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left border-b">User Name</th>
            <th className="p-3 text-left border-b">Service Name</th>
            <th className="p-3 text-left border-b">Date/Time</th>
            <th className="p-3 text-left border-b">Status</th>
            <th className="p-3 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedBookings.map(b => (
            <tr
              key={b.id}
              className="text-sm md:text-base hover:bg-gray-50 transition-colors"
            >
              <td className="p-3 border-b">{b.userName}</td>
              <td className="p-3 border-b">{b.serviceName}</td>
              <td className="p-3 border-b">{dayjs(b.date).format("DD/MM/YYYY HH:mm")}</td>
              <td className="p-3 border-b">
                <span className={`px-2 py-1 rounded-full text-sm font-semibold ${getStatusBadge(b.status)}`}>
                  {b.status}
                </span>
              </td>
              <td className="p-3 border-b flex gap-2 justify-center flex-wrap">
                <button
                  onClick={() => dispatch(confirmBooking(b.id))}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  Confirm
                </button>
                <button
                  onClick={() => dispatch(cancelBooking(b.id))}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {paginatedBookings.length === 0 && (
        <div className="p-4 text-center text-gray-500">No bookings found.</div>
      )}
    </div>
  )
}