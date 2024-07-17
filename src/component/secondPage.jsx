import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function truncatepara(para) {
  const div = document.createElement('div');
  div.innerHTML = para;
  const temp = div.textContent || div.innerText || "";
  return temp;
}

function Summary() {
  

  const { id } = useParams();
  const [show, setShow] = useState(null);

  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem("movies");
    return savedMovies ? JSON.parse(savedMovies) : [];
  });

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

  if (!show) {
    return <h1>Loading...</h1>;
  }

  const bookTicket = (name) => { 
    if (movies.length < 20 ) {
      const moviesName = [...movies, name];
      setMovies(moviesName);
      localStorage.setItem("movies", JSON.stringify(moviesName));
      const movieCount = movies.filter(n => n === name)
      console.log(movieCount.length);
      alert(`${movieCount.length + 1} ${name} Movie Ticket Booked`);
    } else {
      alert("House Full");
    }

  }

  return (
    <>
      <div className="width header_div">
        <h1 className='Second_page_head'>{show.name}</h1>
        {show.image && <img className='page_img' src={show.image.medium} alt={show.name} />}
        <p id='page_para'>{truncatepara(show.summary)}</p>
        <button className='btn btn2' onClick={() => { bookTicket(show.name) }}>Confirm</button>
      </div>
    </>
  );
}

export default Summary;
