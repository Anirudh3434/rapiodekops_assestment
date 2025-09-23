import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setFilter } from "../redux/bookingsSlice"

export const Filters = () => {
  const dispatch = useDispatch()
  const filters = useSelector(state => state.bookings.filters)

  const inputClass =
    "border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all shadow-sm hover:shadow-md w-full"

  const selectClass =
    "border border-gray-300 rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all shadow-sm hover:shadow-md w-full"

  return (
    <div className="flex flex-wrap gap-6 mb-6 items-end bg-white p-6 rounded-2xl shadow-lg">
      {/* Service Filter */}
      <div className="flex flex-col min-w-[150px]">
        <label className="text-sm font-medium mb-1 text-gray-600">Service</label>
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
      </div>

      {/* Status Filter */}
      <div className="flex flex-col min-w-[150px]">
        <label className="text-sm font-medium mb-1 text-gray-600">Status</label>
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
      </div>

      {/* From Date */}
      <div className="flex flex-col min-w-[150px]">
        <label className="text-sm font-medium mb-1 text-gray-600">From</label>
        <input
          type="date"
          value={filters.startDate || ""}
          onChange={e => dispatch(setFilter({ startDate: e.target.value }))}
          className={inputClass}
        />
      </div>

      {/* To Date */}
      <div className="flex flex-col min-w-[150px]">
        <label className="text-sm font-medium mb-1 text-gray-600">To</label>
        <input
          type="date"
          value={filters.endDate || ""}
          onChange={e => dispatch(setFilter({ endDate: e.target.value }))}
          className={inputClass}
        />
      </div>

      {/* Search */}
      <div className="flex-1 flex flex-col min-w-[200px]">
        <label className="text-sm font-medium mb-1 text-gray-600">Search</label>
        <input
          type="text"
          placeholder="Search by User"
          value={filters.search}
          onChange={e => dispatch(setFilter({ search: e.target.value }))}
          className={inputClass}
        />
      </div>
    </div>
  )
}