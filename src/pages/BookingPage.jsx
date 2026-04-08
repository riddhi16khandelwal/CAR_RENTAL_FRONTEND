import React, { useState } from "react";
import axios from "axios";

const BookingPage = ({ car }) => {
  const [qr, setQr] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [txnId, setTxnId] = useState("");

  const pickupDate = "2026-04-05";
  const returnDate = "2026-04-07";

  // 🚗 CREATE BOOKING
  const handleBooking = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/bookings/create`,
        {
          car: car._id, // ✅ FIXED (dynamic id)
          pickupDate,
          returnDate,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      if (res.data.success) {
        setBookingId(res.data.bookingId);
        alert("Booking Created ✅");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Booking failed ❌");
    }
  };

  // 💳 GENERATE QR
  const generateQR = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/bookings/generate-qr`,
        { bookingId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      if (res.data.success) {
        setQr(res.data.qr);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 💳 VERIFY PAYMENT
  const confirmPayment = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/bookings/verify-payment`,
        {
          bookingId,
          transactionId: txnId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      alert(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Car Booking</h2>

      <button onClick={handleBooking}>
        Book Car
      </button>

      {bookingId && (
        <>
          <br /><br />
          <button onClick={generateQR}>
            Generate QR
          </button>
        </>
      )}

      {qr && (
        <>
          <h3>Scan & Pay</h3>

          <img src={qr} alt="QR Code" width={200} />

          <br /><br />

          <input
            type="text"
            placeholder="Enter Transaction ID"
            value={txnId}
            onChange={(e) => setTxnId(e.target.value)}
          />

          <br /><br />

          <button onClick={confirmPayment}>
            Confirm Payment
          </button>
        </>
      )}
    </div>
  );
};

export default BookingPage;