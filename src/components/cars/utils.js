
// converting documents into array of objects
export const  firebaseLooper = (snapshot) => {
  let fetchData = [];

  // Within each snapshot, comes with default forEach() - not js function
  // forEach just works like regular forEach to access array of data/objects in
  // docs property of snapshot

  // document has a method call - data()
  
  snapshot.forEach( doc => {
    fetchData.push({
      // adding objects into an array & its id
      ...doc.data(),
      id: doc.id
    })
  })

  return fetchData;
}