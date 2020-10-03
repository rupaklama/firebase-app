import React, { Component, Fragment } from 'react';
import { firebaseLooper } from './utils';

import Form from './Form';

// firestore db
import { carsCollection } from '../../api/firebase';

class Cars extends Component {
  state = {
    cars: null,
    start: 0,
    end: 100
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
      .orderBy('price', 'asc') // timestamp
      // filtering method - also try: startAfter & endBefore
      .startAt(this.state.start) // field values to start this query at, in order of the query's order by
      .endAt(this.state.end)
      // .limit(2) // max number of items to return from particular document
      // .limitToLast(2) // last two items in particular document
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
    carsCollection.doc('sss')
      .get()
      .then(snapshot => {
        // snapshot.exists to find out if we have particular data
        // firestore don't display any error message if we don't have particular data
        // console.log(snapshot)
        // if (!snapshot.exists) {
        //   return console.log('sorry no record found :(')
        // }
      }).catch( e => {
        console.log(e)
      })

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

  sortResults = (values) => {
    this.setState({
      start: values[0],
      end: values[1]
    }, () => {
      // with setState, you can run a callback
      this.getAllTheCars()
    })
  }
  render() {
    return (
      <Fragment>

        <Form />
        <br />
        <button onClick={() => this.sortResults([100, 200])}>100-200</button>
        <button onClick={() => this.sortResults([300, 400])}>300-400</button>
        <button onClick={() => this.sortResults([500, 1000])}>500-1000</button>
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
