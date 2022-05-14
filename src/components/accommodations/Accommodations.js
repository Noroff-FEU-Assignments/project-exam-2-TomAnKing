import { Link } from "react-router-dom";
import AccommodationItem from "./AccommodationItem";
import React from "react";

class Accommodations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hotels: props.hotels,
      hasRefreshed: false,
    };
  }

  search(val, hotels) {
    let results = hotels.filter((hotel) =>
      hotel.title.rendered.toLowerCase().includes(val)
    );

    this.setState({
      hasRefreshed: true,
    });

    return results;
  }
  render() {
    const hotels =
      this.state.hotels.length || this.state.hasRefreshed
        ? this.state.hotels
        : this.props.hotels;

    hotels.sort((a, b) => (a.title.rendered > b.title.rendered ? 1 : -1));

    return (
      <>
        <div className="container">
          <h1>Accommodations</h1>
          <div className="hotels">
            <div className="searchHotel">
              <h2>Search accommodations</h2>
              <input
                type="search"
                placeholder="Search..."
                className="search"
                onKeyUp={(e) =>
                  this.setState({
                    hotels: this.search(e.target.value, this.props.hotels),
                  })
                }
              ></input>
              <h2>From</h2>
              <input type="date"></input>
              <h2>To</h2>
              <input type="date"></input>
            </div>
            {hotels.map((hotel) => {
              return (
                <Link to={`${hotel.id}`} key={hotel.id}>
                  <AccommodationItem hotel={hotel} />
                </Link>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Accommodations;
