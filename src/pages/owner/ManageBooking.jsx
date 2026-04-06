import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import toast from "react-hot-toast"

const ManageBooking = () => {

  const { currency, axios } = useAppContext()
  const [bookings, setBookings] = useState([])

  // 🔥 FETCH OWNER BOOKINGS
  const fetchOwnerBookings = async () => {
    try {
      const { data } = await axios.get('/api/bookings/owner')

      if (data.success) {
        setBookings(data.bookings)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  // 🔥 CHANGE BOOKING STATUS
  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post('/api/bookings/change-status', {
        bookingId,
        status
      })

      if (data.success) {
        toast.success(data.message)
        fetchOwnerBookings()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchOwnerBookings()
  }, [])

  return (
    <div className='px-4 pt-10 md:px-10 w-full'>

      <Title
        title="Manage Bookings"
        subTitle="Track all customer bookings, approve or cancel requests, and manage booking statuses."
      />

      <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
        <table className="w-full border-collapse text-left text-sm text-gray-600">

          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Date Range</th>
              <th className="p-3 font-medium">Total</th>
              <th className="p-3 font-medium max-md:hidden">Payment</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length > 0 ? bookings.map((booking, index) => (

              <tr key={index} className="border-t border-borderColor text-gray-500">

                {/* 🚗 CAR */}
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={booking.car?.image}
                    alt=""
                    className="h-12 w-12 rounded-md object-cover"
                  />
                  <p className="font-medium max-md:hidden">
                    {booking.car?.brand} {booking.car?.model}
                  </p>
                </td>

                {/* 📅 DATE */}
                <td className="p-3 max-md:hidden">
                  {booking.pickupDate?.split("T")[0]} to{" "}
                  {booking.returnDate?.split("T")[0]}
                </td>

                {/* 💰 PRICE */}
                <td className="p-3">
                  {currency}{booking.price}
                </td>

                {/* 💳 PAYMENT */}
                <td className="p-3 max-md:hidden">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                    {booking.paymentStatus || "Pending"}
                  </span>
                </td>

                {/* 🔄 STATUS */}
                <td className="p-3">
                  {booking.status === "pending" ? (
                    <select
                      onChange={e => changeBookingStatus(booking.bookingId, e.target.value)} // ✅ FIX
                      value={booking.status}
                      className="px-2 py-1.5 mt-1 border rounded-md outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-500"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {booking.status}
                    </span>
                  )}
                </td>

              </tr>

            )) : (
              <tr>
                <td colSpan="5" className="text-center p-6">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>
  )
}

export default ManageBooking


// import React, { useEffect, useState } from 'react'
// import Title from '../../components/owner/Title'
// import { useAppContext } from '../../context/AppContext'
// import toast from "react-hot-toast"

// const ManageBooking = () => {

//   const { currency, axios } = useAppContext()
//   const [bookings, setBookings] = useState([])

//   // 🔥 FETCH OWNER BOOKINGS
//   const fetchOwnerBookings = async () => {
//     try {
//       const { data } = await axios.get('/api/bookings/owner')

//       if (data.success) {
//         setBookings(data.bookings)
//       } else {
//         toast.error(data.message)
//       }

//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   // 🔥 CHANGE BOOKING STATUS (FIXED)
//   const changeBookingStatus = async (bookingId, status) => {
//     try {
//       const { data } = await axios.post(
//         '/api/bookings/change-status',
//         { bookingId, status }
//       )

//       if (data.success) {
//         toast.success(data.message)
//         fetchOwnerBookings() // 🔥 refresh list
//       } else {
//         toast.error(data.message)
//       }

//     } catch (error) {
//       toast.error(error.message)
//     }
//   }

//   useEffect(() => {
//     fetchOwnerBookings()
//   }, [])

//   return (
//     <div className='px-4 pt-10 md:px-10 w-full'>

//       <Title
//         title="Manage Bookings"
//         subTitle="Approve or cancel booking requests"
//       />

//       <div className="max-w-4xl w-full rounded-md overflow-hidden border mt-6">
//         <table className="w-full text-left text-sm text-gray-600">

//           <thead className="text-gray-500">
//             <tr>
//               <th className="p-3">Car</th>
//               <th className="p-3 max-md:hidden">Date</th>
//               <th className="p-3">Total</th>
//               <th className="p-3 max-md:hidden">Payment</th>
//               <th className="p-3">Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {bookings.length > 0 ? bookings.map((booking) => (

//               <tr key={booking._id} className="border-t text-gray-500">

//                 {/* 🚗 CAR */}
//                 <td className="p-3 flex items-center gap-3">
//                   <img
//                     src={booking.car?.image}
//                     className="h-12 w-12 rounded-md object-cover"
//                   />
//                   <p className="font-medium max-md:hidden">
//                     {booking.car?.brand} {booking.car?.model}
//                   </p>
//                 </td>

//                 {/* 📅 DATE */}
//                 <td className="p-3 max-md:hidden">
//                   {booking.pickupDate?.split("T")[0]} to{" "}
//                   {booking.returnDate?.split("T")[0]}
//                 </td>

//                 {/* 💰 PRICE */}
//                 <td className="p-3">
//                   {currency}{booking.price}
//                 </td>

//                 {/* 💳 PAYMENT */}
//                 <td className="p-3 max-md:hidden">
//                   <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
//                     {booking.paymentStatus}
//                   </span>
//                 </td>

//                 {/* 🔥 STATUS */}
//                 <td className="p-3">
//                   {booking.status === "pending" ? (
//                     <select
//                       onChange={(e) =>
//                         changeBookingStatus(booking.bookingId, e.target.value)
//                       }
//                       value={booking.status}
//                       className="px-2 py-1 border rounded-md"
//                     >
//                       <option value="pending">Pending</option>
//                       <option value="confirmed">Confirm</option>
//                       <option value="cancelled">Cancel</option>
//                     </select>
//                   ) : (
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                         booking.status === "confirmed"
//                           ? "bg-green-100 text-green-600"
//                           : "bg-red-100 text-red-600"
//                       }`}
//                     >
//                       {booking.status}
//                     </span>
//                   )}
//                 </td>

//               </tr>

//             )) : (
//               <tr>
//                 <td colSpan="5" className="text-center p-6">
//                   No bookings found
//                 </td>
//               </tr>
//             )}
//           </tbody>

//         </table>
//       </div>

//     </div>
//   )
// }

// export default ManageBooking