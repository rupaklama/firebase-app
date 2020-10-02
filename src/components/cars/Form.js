import React, { Component, Fragment } from 'react';

// Reference to Collection
import firebase, { carsCollection, firebaseTimestamp } from '../../api/firebase';

class Form extends Component {
  state = {
    brand: '',
    color: '',
    price: '',
    available: '',
  };

  // to update 
  componentDidMount() {
    carsCollection.doc('VwkZKuGTwfEIspH6fO21').update({
      // updating nested values in objects 
      'dealers.california': false,  // key/value

      // updating an array with new value
      // FieldValue.arrayRemove('Awesome') - to remove element
      'tags': firebase.firestore.FieldValue.arrayUnion('Awesome')

      // cannot duplicate values in array inside firestore
      
    })
  }


  // two ways of adding data to our db - firestore
  // 1. add() method - returns confirmation
  // 2. set() method with doc() before it - returns undefined

  onFormSubmit = event => {
    event.preventDefault();
  
     // add method
    // carsCollection.add({

      // set method to assign customize id instead of auto generated id
      carsCollection.doc().set({
      ...this.state,
      available: this.state.available === 'true' ? true : false,
      price: parseInt(this.state.price),
      createdAt: firebaseTimestamp(),

      // nested object
      dealers: {
        virginia: true,
        washington: false,
        california: true
      },
      // array
      tags: ['Good', 'Comfortable', 'Expensive']
    })
    .then( data => console.log(data))
    .catch(e =>  console.log(e))

    // updated method example
    // carsCollection.doc('whatever').update({
    //   ...this.state,
    //   available: this.state.available === 'true' ? true : false,
    //   price: parseInt(this.state.price)
    // })
  };

  onChangeHandler = event => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <label>Brand</label>
            <input
              type="text"
              className="form-control"
              name="brand"
              onChange={this.onChangeHandler}
            />
          </div>

          <div className="form-group">
            <label>Color</label>
            <input
              type="text"
              className="form-control"
              name="color"
              onChange={this.onChangeHandler}
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="text"
              className="form-control"
              name="price"
              onChange={this.onChangeHandler}
            />
          </div>

          <div className="form-group">
            <label>Available</label>
            <select
              className="form-control"
              name="available"
              onChange={this.onChangeHandler}
            >
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </Fragment>
    );
  }
}

export default Form;
