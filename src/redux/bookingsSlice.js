import { createSlice } from "@reduxjs/toolkit"
import mockBookings from "../data/mockBookings"

const initialState = {
  bookings: mockBookings, 
  filters: {
    service: "All",
    status: "All",
    startDate: null,
    endDate: null,
    search: ""
  },
  pagination: {
    page: 1,
    perPage: 10
  }
}

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    confirmBooking: (state, action) => {
      const booking = state.bookings.find(b => b.id === action.payload)
      if (booking) booking.status = "Confirmed"
    },
    cancelBooking: (state, action) => {
      const booking = state.bookings.find(b => b.id === action.payload)
      if (booking) booking.status = "Cancelled"
    },
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
      state.pagination.page = 1
    },
    setPage: (state, action) => {
      state.pagination.page = action.payload
    }
  }
})

export const { confirmBooking, cancelBooking, setFilter, setPage } = bookingsSlice.actions
export default bookingsSlice.reducer