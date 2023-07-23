const fetchData = () => {
  return new Promise((resolve, reject) => {
    // Simulating an asynchronous operation
    setTimeout(() => {
      const data = { message: "Data fetched successfully" };
      // Simulating a successful response
      if (data) {
        resolve(data); // Resolve the promise with the fetched data
      } else {
        reject("Error fetching data"); // Reject the promise with an error message
      }
    }, 5555); // Simulating a delay of 2 seconds
  });
};

// Consuming the Promise
fetchData()
  .then((data) => {
    console.log(data); // Output: { message: "Data fetched successfully" }
  })
  .catch((error) => {
    console.error(error); // Output: "Error fetching data"
  });