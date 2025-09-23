import React from "react"
import { Filters } from "../components/Filters"
import { Table } from "../components/Table"
import { Pagination } from "../components/Pagination"
import { Dashboard } from "../components/Dashboard"
import { ChartStatus } from "../components/ChartStatus"
import { ChartService } from "../components/ChartService"

export const AdminPanel = () => {
  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Service Bookings Admin Panel
        </h1>
        <p className="text-gray-500 mt-1">
          Manage all service bookings, view statistics, and update statuses easily.
        </p>
      </header>

      {/* Dashboard stats */}
      <section className="mb-6">
        <Dashboard />
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ChartStatus />
        <ChartService />
      </section>

      {/* Filters */}
      <section className="mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Filters />
        </div>
      </section>

      {/* Bookings Table */}
      <section className="mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Table />
        </div>
      </section>

      {/* Pagination */}
      <section className="flex justify-center">
        <Pagination />
      </section>
    </div>
  )
}