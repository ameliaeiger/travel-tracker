// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import { allTravelersData, allTripsData, allDestinationsData } from './apiCalls';
import './css/styles.css';
import DestinationRepo from './DestinationRepo';
import Destination from './Destination';
import TravelerRepo from './TravelerRepo';
import Traveler from './Traveler';
import TripRepo from './TripRepo.js';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


Promise.all([allTravelersData, allTripsData, allDestinationsData])
    .then(data => {

        let travelersRepo = new TravelerRepo(data[0].travelers);
        let tripsRepo = new TripRepo(data[1].trips);
        let destinationsRepo = new DestinationRepo(data[2].destinations);


        travelerDataHelper(travelersRepo, tripsRepo, destinationsRepo);

        // console.log("----Travelers Repository: ", travelersRepo);
        // console.log("----Destinations Repository: ", destinationsRepo);
        // console.log("----Trips Repository: ", tripsRepo);
    })


    // TRAVELER

    function travelerDataHelper(travelersRepo, tripsRepo, destinationsRepo){
        let travelerData = tripsRepo.returnAllUserTrips(5);
        let traveler = travelersRepo.createNewTraveler(5, travelerData);

        let keys = traveler.getDestinationIDs();
        let travelerDestinations = destinationsRepo.getDestById(keys);
        traveler.getDestinationData(travelerDestinations);

    }

    function destinationDataHelper() {

    }

    


