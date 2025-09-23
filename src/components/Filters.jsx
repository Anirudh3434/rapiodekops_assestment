import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setFilter } from "../redux/bookingsSlice"

export const Filters = () => {
  const dispatch = useDispatch()
  const filters = useSelector(state => state.bookings.filters)

  const inputClass =
    "border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"

  const selectClass =
    "border border-gray-300 rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"

  return (
    <div className="flex flex-wrap gap-4 mb-6 items-center">
      <select
        value={filters.service}
        onChange={e => dispatch(setFilter({ service: e.target.value }))}
        className={selectClass}
      >
        <option value="All">All Services</option>
        <option value="Cleaning">Cleaning</option>
        <option value="Repair">Repair</option>
        <option value="Delivery">Delivery</option>
      </select>

      <select
        value={filters.status}
        onChange={e => dispatch(setFilter({ status: e.target.value }))}
        className={selectClass}
      >
        <option value="All">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Confirmed">Confirmed</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      <input
        type="date"
        value={filters.startDate || ""}
        onChange={e => dispatch(setFilter({ startDate: e.target.value }))}
        className={inputClass}
      />

      <input
        type="date"
        value={filters.endDate || ""}
        onChange={e => dispatch(setFilter({ endDate: e.target.value }))}
        className={inputClass}
      />

      <input
        type="text"
        placeholder="Search by User"
        value={filters.search}
        onChange={e => dispatch(setFilter({ search: e.target.value }))}
        className={`${inputClass} flex-1 min-w-[200px]`}
      />
    </div>
  )
}