import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class SavedList extends Component {
  constructor(props) {
    super(props);
  }

  returnHome = _ => this.props.history.push("/");

  render() {
    return (
      <div className="saved-list">
        <h3>Saved Movies:</h3>
        {this.props.list.map(movie => (
          <span key={movie.props.children} className="saved-movie">
            {movie}
          </span>
        ))}
        <Link to="/" onClick={this.returnHome}>
          <div className="home-button">Home</div>
        </Link>
      </div>
    );
  }
}
