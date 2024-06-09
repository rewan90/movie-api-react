

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';


export default function ItemDetails() {
  const { id, media_type } = useParams();
  const [itemDetails, setItemDetails] = useState({});
  const imageUrl = `https://image.tmdb.org/t/p/w500${itemDetails.poster_path || itemDetails.profile_path}`;

  async function fetchItemDetails(id, media_type) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=5af61a54f0e0e113f176038044d88b89`
    );
    setItemDetails(response.data);
  }

  useEffect(() => {
    fetchItemDetails(id, media_type);
  }, [id, media_type]);

  return (
    <>
  <Helmet>
    <title>{itemDetails.title || itemDetails.name}</title>
  </Helmet>
    <div className="row">
      <div className="col-md-3">
        <img src={imageUrl} alt="" className="w-100" />
      </div>
      <div className="col-md-9">
        <h1>{itemDetails.title || itemDetails.name}</h1>
        <p className="">{itemDetails.overview}</p>
        <p className=""> Release Date : {itemDetails.release_date || itemDetails.first_air_date}</p>
        <p className=""> Vote Average :{itemDetails.vote_average}</p>
        <p className=""> Vote Count :{itemDetails.vote_count}</p>
        <p className=""> Popularity :{itemDetails.popularity}</p>
        <p className=""> Original Language :{itemDetails.original_language}</p>
        <p className=""> Original Title :{itemDetails.original_title}</p>
        <p className=""> Status :{itemDetails.status}</p>
        <p className=""> In Production :{itemDetails.in_production}</p>
        <p className=""> Last Air Date :{itemDetails.last_air_date}</p>
        <p className=""> Budget :{itemDetails.budget}</p>
        <p className=""> Revenue :{itemDetails.revenue}</p>
      </div>
    </div>
    </>

  );
}