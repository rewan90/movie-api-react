import React from "react";
import MediaItem from "../MediaItem/MediaItem";
import useTrending from "../../Hooks/useTrending";


export default function Home() {
  
    let { trendingMovies, trendingTv, trendingPeople  } = useTrending();


  return (
    <>
      <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="border w-25 mb-3"></div>
            <h2 className="h5">
              Trending Movies <br /> To watch Right Now{" "}
            </h2>
            <p className="py-2 text-muted"> Most watched Movies Now</p>
            <div className="border w-100 mt-3"></div>
          </div>
        </div>
        {trendingMovies.filter((movie)=>movie.poster_path!==null).slice(0,10).map((item, index) => (
          <MediaItem key={index} item={item} />
        ))}
      </div>

      <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="border w-25 mb-3"></div>
            <h2 className="h5">
            Trending Tv <br /> To watch Right Now{" "}
            </h2>
            <p className="py-2 text-muted"> Most watched Tv Now</p>
            <div className="border w-100 mt-3"></div>
          </div>
        </div>
        {trendingTv.filter((tv)=>tv.poster_path!==null).slice(0,10).map((item, index) => (
          <MediaItem key={index} item={item} />
        ))}
      </div>

      <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="border w-25 mb-3"></div>
            <h2 className="h5">
            Trending People <br />
            </h2>
            <p className="py-2 text-muted"> Most Trending People</p>
            <div className="border w-100 mt-3"></div>
          </div>
        </div>
        {trendingPeople.filter((person)=>person.profile_path!==null).slice(0,10).map((item, index) => (
          <MediaItem key={index} item={item} />
        ))}
      </div>
    </>
  );
}
