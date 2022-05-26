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
      hotel.title.rendered.toLowerCase().includes(val.toLowerCase())
    );

    this.setState({
      hasRefreshed: true,
    });

    return results;
  }

  sortHotels(value) {
    const hotels = this.props.hotels;

    switch (value) {
      case "price ascend":
        hotels.sort((a, b) => (a.acf.price > b.acf.price ? 1 : -1));
        break;
      case "price descend":
        hotels.sort((a, b) => (a.acf.price < b.acf.price ? 1 : -1));
        break;
      case "stars ascend":
        hotels.sort((a, b) => (a.acf.stars > b.acf.stars ? 1 : -1));
        break;
      case "stars descend":
        hotels.sort((a, b) => (a.acf.stars < b.acf.stars ? 1 : -1));
        break;
      default:
        hotels.sort((a, b) => (a.acf.price > b.acf.price ? 1 : -1));
    }

    this.setState({
      hotels: hotels,
    });
  }
  render() {
    const hotels =
      this.state.hotels.length || this.state.hasRefreshed
        ? this.state.hotels
        : this.props.hotels;

    if (!this.props.hotels.length && !this.props.error) {
      return <div className="container">loading .....</div>;
    }

    const style = "hotel";

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
              <select
                id="sortHotels"
                onChange={(e) => this.sortHotels(e.target.value)}
                className="sortHotel"
              >
                <option value="-1">--</option>
                <option value="price ascend">Price Low-High</option>
                <option value="price descend">Price High-Low</option>
                <option value="stars ascend">Stars Low-High</option>
                <option value="stars descend">Stars High-Low</option>
              </select>
            </div>
            {this.props.error ? (
              <p className="emptySearch"> Failed to load</p>
            ) : (
              <></>
            )}
            <p
              className="emptySearch"
              style={{
                display: hotels.length || this.props.error ? "none" : "block",
              }}
            >
              No accommodations matched your search
            </p>
            {hotels.map((hotel) => {
              return (
                <Link to={`${hotel.id}`} key={hotel.id}>
                  <AccommodationItem hotel={hotel} style={style} />
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
