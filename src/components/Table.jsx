import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { confirmBooking, cancelBooking } from "../redux/bookingsSlice"
import dayjs from "dayjs"
import { Check, X } from "lucide-react"

export const Table = () => {
  const dispatch = useDispatch()
  const { bookings, filters, pagination } = useSelector(state => state.bookings)

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
        return "bg-green-200 text-green-800"
      case "Cancelled":
        return "bg-red-200 text-red-800"
      case "Pending":
        return "bg-yellow-200 text-yellow-900"
      default:
        return "bg-gray-200 text-gray-700"
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
          {paginatedBookings.map(b => {
            const isConfirmed = b.status === "Confirmed"
            const isCancelled = b.status === "Cancelled"

            return (
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
                    disabled={isConfirmed || isCancelled}
                    className={`flex items-center gap-1 px-4 py-2 rounded-full font-semibold transition ${
                      isConfirmed || isCancelled
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-green-100 text-green-800 hover:bg-green-200"
                    }`}
                  >
                    <Check size={16} />
                    Confirm
                  </button>
                  <button
                    onClick={() => dispatch(cancelBooking(b.id))}
                    disabled={isConfirmed || isCancelled}
                    className={`flex items-center gap-1 px-4 py-2 rounded-full font-semibold transition ${
                      isConfirmed || isCancelled
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-red-100 text-red-800 hover:bg-red-200"
                    }`}
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {paginatedBookings.length === 0 && (
        <div className="p-4 text-center text-gray-500">No bookings found.</div>
      )}
    </div>
  )
}