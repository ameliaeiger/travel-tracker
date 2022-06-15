const travelersApi = "http://localhost:3001/api/v1/travelers";
const tripsApi = "http://localhost:3001/api/v1/trips";
const destinationsApi = "http://localhost:3001/api/v1/destinations";

const fetchData = (url) => {
    return fetch(url).then(response => response.json())
};

const postData = (postObject) => {
    return fetch("http://localhost:3001/api/v1/trips", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(postObject)
    }).then(response => response.json());
  };

let allTravelersData = fetchData(travelersApi);
let allTripsData = fetchData(tripsApi);
let allDestinationsData = fetchData(destinationsApi);

export {allTravelersData, allTripsData, allDestinationsData, postData, fetchData};