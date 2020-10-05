import React, { Component } from 'react';
import firebase, { usersRef } from '../../api/firebase';

import { Link } from 'react-router-dom';
class List extends Component {
  state = {
    images: null,
  };

  componentDidMount() {
    // listAll method to display all lists
    usersRef.listAll().then(data => {
      let imagesArray = [];

      data.items.forEach(itemRef => {
        // getting download url for each element
        itemRef.getDownloadURL().then(url => {
          imagesArray.push({
            name: itemRef.name,
            link: url,
          });
          this.setState({ images: imagesArray });
        });
      });
    });
  }
  render() {
    return (
      <div>
        List of uploads
        {this.state.images
          ? this.state.images.map((item, i)=> (
              <div key={i}>
                <strong>{item.name}</strong> - 
                <Link to={{ pathname: item.link }} target="_blank">Open it</Link>
              </div>
            ))
          : null}
      </div>
    );
  }
}

export default List;
