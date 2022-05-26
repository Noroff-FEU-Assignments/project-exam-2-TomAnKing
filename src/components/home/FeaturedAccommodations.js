import { Link } from "react-router-dom";
import AccommodationItem from "../accommodations/AccommodationItem";

function FeaturedAccommotadions({ hotels }) {
  const style = "featuredItem";
  return (
    <div className="featuredContainer">
      <h3>Recently added accommodations</h3>
      <div className="featuredAccommodations">
        {hotels.slice(0, 3).map((hotel) => {
          return (
            <Link to={`accommodations/${hotel.id}`} key={hotel.id}>
              <AccommodationItem hotel={hotel} styling={style} />
            </Link>
          );
        })}
      </div>
      <Link to={"/accommodations"} className="allBtn">
        All Accommodations
      </Link>
    </div>
  );
}

export default FeaturedAccommotadions;
