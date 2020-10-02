import React, { Component, Fragment } from 'react';
import { firebaseLooper } from './utils';

import Form from './Form';

// firestore db
import { carsCollection } from '../../api/firebase';

class Cars extends Component {
  state = {
    cars: null,
  };

  // .get() - to access particular document inside a single collection using promise
  // In the world of firebase, when you bring something back from the db, these are call - snapshots
  // Snapshot is different kind of data information for a particular document that we get from firebase

  // get method
  getAllTheCars = () => {
    carsCollection
    // using 'Where' clause method for query like in sql, we can chain many of it
    // first arg is what we want to query
    // second arg is the comparison operator 
    // third arg is the objects property
      // .where('color', '==', 'red')
      // .where('price', '>=', 100)
      
      // order by method query
      // .orderBy('price', 'desc')
      .orderBy('createdAt', 'desc') // timestamp
      .get()
      .then(snapshot => {
        // firebaseLooper to convert snapshot to an array of objects
        const cars = firebaseLooper(snapshot);
        this.setState({ cars: cars });
      })
      .catch(e => {
        console.log(e);
      });
  };

  componentDidMount() {
    // calling method
    this.getAllTheCars();

    // get doc by id
    // carsCollection.doc('52Su9LbEZkPWTsWdVAta')
    //   .get()
    //   .then(snapshot => {
    //     console.log(snapshot.data())
    //   });

    // .get() - to access a single collection inside document using promise
    // querySnapshot is same as snapshot like above
    // employeeRef.get().then((querySnapshot) => {
    //   const employees = firebaseLooper(querySnapshot);
    //   console.log(employees);
    // })
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

        <Form />
        <hr />

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
