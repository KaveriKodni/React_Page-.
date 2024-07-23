import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Booking() {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem("bookings");
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  const [userName, setUserName] = useState('');

  const apiurl = `https://api.tvmaze.com/shows/${id}`;

  async function fetchData(url) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setShow(data);
    } catch (error) {
      console.error("Invalid URL", error);
    }
  }

  useEffect(() => {
    fetchData(apiurl);
  }, [id]);

  const handleBooking = () => {
    if (bookings.length < 20) {
      const newBooking = { movie: show.name, user: userName };
      const updatedBookings = [...bookings, newBooking];
      setBookings(updatedBookings);
      localStorage.setItem("bookings", JSON.stringify(updatedBookings));
      const movieCount = bookings.filter(b => b.movie === show.name).length;
      alert(`${movieCount + 1}) ${show.name} Movie Ticket Booked for ${userName}`);
    } else {
      alert("House Full");
    }
  }

  if (!show) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="width header_div" id='book'>
      <h1>Book Ticket for {show.name}</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleBooking(); }}>
        <div>
          <label>Movie Name : </label>
          <input type="text" value={show.name} readOnly />
        </div>
        <div>
          <label>Your Name : </label>
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />
        </div>
        <button className='btn' type="submit">Book Ticket</button>
      </form>
    </div>
  );
}

export default Booking;
