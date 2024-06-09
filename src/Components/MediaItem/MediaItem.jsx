import React from 'react';
import { Link } from 'react-router-dom';
const MediaItem = ({ item } ) => {
const imageUrl = (`https://image.tmdb.org/t/p/w500${item.poster_path || item.profile_path}`);


  return (
    <div className="col-md-2">
        
      <div className="media-item position-relative">
      <Link to={`/itemdetails/${item.id}/${item.media_type}`}>

      <img src={imageUrl} alt="" className="w-100" />

        <h4 className="my-2">
          {item.title} {item.name}
        </h4>
        </Link>

        <p className="">{item.overview}</p>
        <div className="vote p-2 text-white position-absolute top-0 end-0">
         { item.vote_average? item.vote_average.toFixed(1) : item.popularity.toFixed(1) } 
           </div>
        <p>{item.release_date}</p>
      </div>
    </div>
  );
};

export default MediaItem;


