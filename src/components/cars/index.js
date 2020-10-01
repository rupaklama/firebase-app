import React, { Component, Fragment } from 'react';
import { firebaseLooper } from './utils';

// firestore db
import { carsCollection, employeeRef } from '../../api/firebase';

class Cars extends Component {
  state = {
    cars: null,
  };

  // .get() - to access all the documents inside a single collection using promise
  // In the world of firebase, when you bring something back from the db, these are call - snapshots
  // Snapshot is different kind of data information for a particular document that we get from firebase
  componentDidMount() {
    carsCollection.get()
      .then(snapshot => {
        // firebaseLooper to convert objects to an array
        const cars = firebaseLooper(snapshot);
        this.setState({ cars });
        
      })
      .catch(e => {
        console.log(e);
      });

      // .get() - to access a single collection inside document using promise
      // querySnapshot is same as snapshot like above
      employeeRef.get().then((querySnapshot) => {
        const employees = firebaseLooper(querySnapshot);
        console.log(employees);
      })
  }

  // function returning function
  handleCarData = cars =>
    cars
      ? cars.map((data, i) => (
          <tr key={i}>
            <th>{data.id}</th>
            <th>{data.brand}</th>
            <th>{data.color}</th>
            <th>{data.price}</th>
          </tr>
        ))
      : null;

  render() {
    return (
      <Fragment>
        <table className="table table-light">
          <thead>
            <tr>
              <th>ID</th>
              <th>Brand</th>
              <th>Color</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{this.handleCarData(this.state.cars)}</tbody>
        </table>
      </Fragment>
    );
  }
}

export default Cars;
