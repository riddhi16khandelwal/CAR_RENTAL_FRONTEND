import React, { useState } from "react";
import axios from "axios";

const BookingPage = () => {
  const [qr, setQr] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [txnId, setTxnId] = useState("");

  // 🔥 IMPORTANT (replace these)
  const carId = "PUT_REAL_CAR_ID_HERE";
  const pickupDate = "2026-04-05";
  const returnDate = "2026-04-07";

  // 🚗 CREATE BOOKING
  const handleBooking = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/bookings/create",
        {
          car: carId,
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
        setQr(res.data.qr);
        setBookingId(res.data.bookingId);
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
        "http://localhost:5000/api/bookings/verify-payment",
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