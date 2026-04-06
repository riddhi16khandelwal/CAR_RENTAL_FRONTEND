// import React, { useState } from 'react'
// import { assets } from '../assets/assets'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'

// const CarCard = ({ car }) => {
//   const currency = import.meta.env.VITE_CURRENCY
//   const navigate = useNavigate()

//   const [qr, setQr] = useState("")
//   const [bookingId, setBookingId] = useState("")

//   // 🔥 BOOK FUNCTION
//   const handleBooking = async (e) => {
//     e.stopPropagation(); // 🔥 VERY IMPORTANT (prevent card click)

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/bookings/create",
//         {
//           car: car._id,
//           pickupDate: "2026-04-05",
//           returnDate: "2026-04-07",
//         },
//         {
//           headers: {
//             token: localStorage.getItem("token"),
//           },
//         }
//       );

//       console.log("BOOKING RESPONSE:", res.data);

//       if (res.data.success) {
//         setQr(res.data.qr);
//         setBookingId(res.data.bookingId);
//       }

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div
//       onClick={() => {
//         navigate(`/car-details/${car._id}`)
//         scrollTo(0, 0)
//       }}
//       className='group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer bg-white'
//     >

//       {/* Image */}
//       <div className='relative h-48 overflow-hidden'>
//         {car?.image ? (
//           <img src={car.image} className='w-full h-48 object-cover' />
//         ) : (
//           <div className='w-full h-48 bg-gray-200 flex items-center justify-center'>
//             No Image
//           </div>
//         )}
//       </div>

//       {/* Details */}
//       <div className='p-4'>
//         <h3 className='text-lg font-medium'>
//           {car?.brand} {car?.model}
//         </h3>

//         <p className='text-sm text-gray-500'>
//           {currency}{car?.pricePerDay} / day
//         </p>

//         {/* 🔥 BOOK BUTTON */}
//         <button
//           onClick={handleBooking}
//           className='mt-3 w-full bg-primary text-white py-2 rounded-lg'
//         >
//           Book Now
//         </button>

//         {/* 🔥 QR SHOW */}
//         {qr && (
//           <div className='mt-4 text-center'>
//             <p>Scan & Pay</p>
//             <img src={qr} width={150} />
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default CarCard


// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// const CarCard = ({ car }) => {
//   const currency = import.meta.env.VITE_CURRENCY
//   const navigate = useNavigate()

//   const [qr, setQr] = useState("")
//   const [bookingId, setBookingId] = useState("")
//   const [loading, setLoading] = useState(false)

//   // 🔥 BOOK FUNCTION (FIXED)
//   const handleBooking = async (e) => {
//     e.stopPropagation()

//     try {
//       setLoading(true)

//       const res = await fetch(
//         "http://localhost:3000/api/bookings/create",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ FIX
//           },
//           body: JSON.stringify({
//             car: car._id,
//             pickupDate: "2026-04-05",
//             returnDate: "2026-04-07",
//           }),
//         }
//       )

//       const data = await res.json()

//       console.log("FULL RESPONSE:", data)
//       console.log("QR:", data.qr)

//       if (data.success && data.qr) {
//         setQr(data.qr)
//         setBookingId(data.bookingId)
//       } else {
//         alert(data.message || "QR not received ❌")
//       }

//     } catch (err) {
//       console.log(err)
//       alert("Error booking car ❌")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div
//       onClick={() => {
//         navigate(`/car-details/${car._id}`)
//         window.scrollTo(0, 0)
//       }}
//       className="group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer bg-white"
//     >

//       {/* Image */}
//       <div className="relative h-48 overflow-hidden">
//         {car?.image ? (
//           <img src={car.image} className="w-full h-48 object-cover" />
//         ) : (
//           <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
//             No Image
//           </div>
//         )}
//       </div>

//       {/* Details */}
//       <div className="p-4">
//         <h3 className="text-lg font-medium">
//           {car?.brand} {car?.model}
//         </h3>

//         <p className="text-sm text-gray-500">
//           {currency}{car?.pricePerDay} / day
//         </p>

//         {/* 🔥 BOOK BUTTON */}
//         <button
//           onClick={handleBooking}
//           className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg"
//         >
//           {loading ? "Processing..." : "Book Now"}
//         </button>

//         {/* 🔥 QR SHOW */}
//         {qr && (
//           <div className="mt-4 text-center">
//             <p className="text-sm mb-2 font-semibold">Scan & Pay</p>
//             <img src={qr} alt="QR" width={150} />
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default CarCard


import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CarCard = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const handleBooking = async (e) => {
    e.stopPropagation()

    try {
      setLoading(true)

      const res = await fetch(
        "http://localhost:3000/api/bookings/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            car: car._id,
            pickupDate: "2026-04-05",
            returnDate: "2026-04-07",
          }),
        }
      )

      const data = await res.json()

      console.log("FULL RESPONSE:", data)

      if (data.success) {
        alert("Booking Request Sent ✅ (Wait for owner approval)")
      } else {
        alert(data.message || "Booking failed ❌")
      }

    } catch (err) {
      console.log(err)
      alert("Error booking car ❌")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      onClick={() => {
        navigate(`/car-details/${car._id}`)
        window.scrollTo(0, 0)
      }}
      className="group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer bg-white"
    >
      <div className="relative h-48 overflow-hidden">
        {car?.image ? (
          <img src={car.image} className="w-full h-48 object-cover" />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            No Image
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-medium">
          {car?.brand} {car?.model}
        </h3>

        <p className="text-sm text-gray-500">
          {currency}{car?.pricePerDay} / day
        </p>

        <button
          onClick={handleBooking}
          className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          {loading ? "Processing..." : "Book Now"}
        </button>
      </div>
    </div>
  )
}

export default CarCard