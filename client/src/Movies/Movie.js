import React, { Component } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = { movie: null, error: "Loading movie information..." };
  }

  componentDidMount() {
    let id;
    if (this.props.match && this.props.match.params.id) {
      id = this.props.match.params.id;
    } else {
      this.setState({
        error: "ERROR 404: Movie not found"
      });
    }
    this.fetchMovie(id);
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => {
        this.setState(() => ({ movie: response.data }));
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  render() {
    if (!this.state.movie) {
      return <div>{this.state.error}</div>;
    }

    const { title, director, metascore, stars } = this.state.movie;
    return (
      <div className="save-wrapper">
        <MovieCard
          title={title}
          director={director}
          metascore={metascore}
          stars={stars}
        />
        <div onClick={this.saveMovie} className="save-button">
          Save
        </div>
      </div>
    );
  }
}
