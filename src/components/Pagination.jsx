import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { setPage } from "../redux/bookingsSlice"

export const Pagination = () => {
  const dispatch = useDispatch()
  const { pagination, bookings, filters } = useSelector(state => state.bookings)

  // Calculate total pages
  const filteredBookings = bookings.filter(b => 
    (filters.service === "All" || b.serviceName === filters.service) &&
    (filters.status === "All" || b.status === filters.status) &&
    (!filters.search || b.userName.toLowerCase().includes(filters.search.toLowerCase())) &&
    (!filters.startDate || new Date(b.date) >= new Date(filters.startDate)) &&
    (!filters.endDate || new Date(b.date) <= new Date(filters.endDate))
  )

  const totalPages = Math.ceil(filteredBookings.length / pagination.perPage)

  return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        disabled={pagination.page === 1}
        onClick={() => dispatch(setPage(pagination.page - 1))}
        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span className="px-3 py-1">
        Page {pagination.page} of {totalPages || 1}
      </span>

      <button
        disabled={pagination.page === totalPages || totalPages === 0}
        onClick={() => dispatch(setPage(pagination.page + 1))}
        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}