import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router'
import query from '../queries/fetchSongs';

class SongList extends Component {
  onSongDelete(id) {
    this.props.mutate({ variables: { id } })
      .then(() => this.props.data.refetch());
  }

  renderSongs() {
    return this.props.data.songs.map( ({ id, title}) => {
      return (
        <li key={id} className="collection-item">
        <Link to={`/songs/${id}`}>
        {title}
        </Link>
        <i
          className="material-icons"
          onClick={ () => this.onSongDelete(id)}
        >delete</i>
        </li>
      )
    })
  }

  render() {
    return (
      <div>
        <div style={{ padding: '10px 20px'}}>List of Songs:</div>
        <ul className="collection">{!this.props.data.loading && this.renderSongs()}</ul>
        {this.props.data.loading && <div>Loading...</div>}
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right"
        >
        <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSon($id: ID){
   deleteSong(id: $id) {
     title
   }
  }
`;

export default graphql(mutation) (
  graphql(query)(SongList)
);
