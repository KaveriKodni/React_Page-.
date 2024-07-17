import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function truncatepara(para) {
    const div = document.createElement('div');
    div.innerHTML = para;
    const temp = div.textContent || div.innerText || "";
    return temp.length > 120 ? temp.slice(0, 120) + " . . ." : temp;
}

function Body() {
    const apiurl = "https://api.tvmaze.com/search/shows?q=all";
    const [items, setItems] = useState([]);
    const image = "https://dummyimage.com/300";

    async function fetchData(url) {
        const res = await fetch(url);
        const items = await res.json();
        setItems(items);
    };

    useEffect(() => {
        fetchData(apiurl);
    }, []);

    return (
      
        <div id="movie-div" className="width">
            {items.length > 0 ? (
                items.map((item, index) => (
                    <div key={item.show.id} className="details">
                        {item.show.image ?
                            <img src={item.show.image.medium} alt={item.show.name} /> : <img src='https://dummyimage.com/300' alt='Dummy image' />
                        }
                        <div className="inner-div">
                            <h3 id="head">{item.show.name}</h3>
                            <p id="para">{truncatepara(item.show.summary)}</p>
                            <Link className='btn' to={`/summary/${item.show.id}`}>Book Ticket</Link>
                        </div>
                    </div>
                ))
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
}

export { Body, truncatepara };
