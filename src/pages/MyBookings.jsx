import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Title from '../components/Title'
import { useAppContext } from '../context/AppContext'
import { motion } from 'motion/react'

const MyBookings = () => {
  const { axios, user, currency } = useAppContext()

  const [bookings, setBookings] = useState([])
  const [qrMap, setQrMap] = useState({}) // 🔥 multiple QR

  // 🔥 FETCH BOOKINGS
  const fetchMyBookings = async () => {
    try {
      const { data } = await axios.get('/api/bookings/user')

      if (data.success) {
        setBookings(data.bookings)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Error fetching bookings")
    }
  }

  useEffect(() => {
    user && fetchMyBookings()
  }, [user])

  // 🔥 GENERATE QR
  const getQR = async (bookingId) => {
    try {
      const { data } = await axios.post('/api/bookings/generate-qr', {
        bookingId
      })

      if (data.success) {
        setQrMap(prev => ({
          ...prev,
          [bookingId]: data.qr
        }))
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error("QR failed ❌")
    }
  }

  // 🔥 DELETE BOOKING
  const deleteBooking = async (bookingId) => {
    try {
      const { data } = await axios.post('/api/bookings/delete', {
        bookingId
      })

      if (data.success) {
        toast.success("Deleted ✅")
        fetchMyBookings()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error("Delete failed ❌")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16 text-sm max-w-7xl'
    >

      <Title
        title='My Bookings'
        subtitle='View and manage your bookings'
        align='left'
      />

      <div>
        {bookings.map((booking, index) => (
          <motion.div
            key={booking._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className='grid grid-cols-1 md:grid-cols-5 gap-6 p-6 border rounded-lg mt-5'
          >

            {/* 🚗 CAR */}
            <div className='md:col-span-2'>
              <img
                src={booking.car.image}
                className='w-full aspect-video object-cover rounded'
              />
              <p className='font-medium mt-2'>
                {booking.car.brand} {booking.car.model}
              </p>
              <p className='text-gray-500 text-sm'>
                {booking.car.category} • {booking.car.location}
              </p>
            </div>

            {/* 📄 INFO */}
            <div className='md:col-span-2'>
              <div className='flex gap-2 items-center'>
                <span className='bg-gray-100 px-3 py-1 rounded'>
                  Booking #{index + 1}
                </span>

                <span className={`px-3 py-1 text-xs rounded-full ${
                  booking.status === "confirmed"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}>
                  {booking.status}
                </span>
              </div>

              <p className='mt-3'>
                📅 {booking.pickupDate.split('T')[0]} → {booking.returnDate.split('T')[0]}
              </p>

              <p className='mt-2'>
                📍 {booking.car.location}
              </p>

              {/* 🔥 ACTION BUTTONS */}
              <div className='flex gap-3 mt-4'>

                {booking.status === "confirmed" && (
                  <button
                    onClick={() => getQR(booking.bookingId)}
                    className='bg-green-600 text-white px-4 py-2 rounded'
                  >
                    Pay Now
                  </button>
                )}

                <button
                  onClick={() => deleteBooking(booking.bookingId)}
                  className='bg-red-500 text-white px-4 py-2 rounded'
                >
                  Delete
                </button>

              </div>
            </div>

            {/* 💰 RIGHT SIDE (PRICE + QR) */}
            <div className='md:col-span-1 flex flex-col items-center justify-center gap-3'>

              <div className='text-right'>
                <p>Total Price</p>
                <h1 className='text-xl font-bold text-primary'>
                  {currency}{booking.price}
                </h1>
                <p className='text-sm text-gray-500'>
                  {booking.createdAt.split('T')[0]}
                </p>
              </div>

              {/* 🔥 QR RIGHT SIDE */}
              {qrMap[booking.bookingId] && (
                <>
                  <p className='text-xs text-gray-500'>Scan to Pay</p>
                  <img
                    src={qrMap[booking.bookingId]}
                    className='w-28 border p-1 rounded'
                  />
                </>
              )}

            </div>

          </motion.div>
        ))}
      </div>

    </motion.div>
  )
}

export default MyBookings