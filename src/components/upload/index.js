import React, { Component } from 'react';
import firebase, { storage } from '../../api/firebase';
import List from './List';
class Upload extends Component {

  state = {
    image: null,
    url: '',
    progress: 0
  }
  handleUpload = (event) => {
    event.preventDefault();
    
    const { image } = this.state;
    // child method - Returns a reference to a relative path from this reference
    // creating dirs - images/users/
    const user = firebase.auth().currentUser;
    storage.ref(`users/${user.uid}/${image.name}`)
    // put method - Uploads data to this reference's location
    .put(image)
    .then( () => {
      console.log('file uploaded')
    })
    .catch( e => console.log(e))
  }

  handleChange = (event) => {
    if(event.target.files[0]) {
      const image = event.target.files[0];
      this.setState({
        image: image
      })
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleUpload}>
          <div className="form-group">
            <label>File</label>
            <input className="form-control" type="file" onChange={this.handleChange} />
          </div>

          <button type="submit" className="btn btn-primary">Upload file</button>
        </form>

        <hr />
        <List />
      </div>
    )
  }
}

export default Upload;