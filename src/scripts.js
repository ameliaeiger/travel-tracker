// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// Libraries
const dayjs = require('dayjs');

// Imports
import { allTravelersData, allTripsData, allDestinationsData } from './apiCalls';
import './css/styles.css';
import './images/turing-logo.png'
import DestinationRepo from './DestinationRepo';
import Destination from './Destination';
import TravelerRepo from './TravelerRepo';
import Traveler from './Traveler';
import TripRepo from './TripRepo.js';

// GLOBALs
let travelerTrips = document.getElementById("traveler-trips-display-past");
let destinationSelect = document.getElementById("destination-options");
let startDate = document.getElementById("date-input-start");
let endDate = document.getElementById("date-input-end");


Promise.all([allTravelersData, allTripsData, allDestinationsData])
    .then(data => {

        let travelersRepo = new TravelerRepo(data[0].travelers);
        let tripsRepo = new TripRepo(data[1].trips);
        let destinationsRepo = new DestinationRepo(data[2].destinations);


        travelerDataHelper(travelersRepo, tripsRepo, destinationsRepo);

        //CURRENTLY TESTING
        addDestinationOptions(destinationsRepo);

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
        createImageNodes(travelerDestinations);

        // TESTING: findPastTrips -- not complete. save for later use.
        traveler.findPastTrips();

    }

    function createImageNodes(travelerDestinations) {
        travelerDestinations.forEach(function(destination, index){
            // Create element for each image
            let imageNode = document.createElement("img");
            let classString = `img${index}`
            imageNode.classList.add(classString)
            imageNode.classList.add("traveler-image");
            imageNode.src = destination.image;
            imageNode.alt = destination.alt;
            travelerTrips.appendChild(imageNode);

            // let imageHTML = document.createTextNode(`src = "${destination.image}" alt = "${destination.alt}`);
            // let stuff = imageNode.appendChild(imageHTML);
            // travelerTrips.appendChild(stuff);

            // Create element for text -- save for later use
            // let text = `Destination: ${destination.destination} Image: ${destination.image} Alt: ${destination.alt}`
            // let newText = document.createTextNode(text);

            // Append -- save for later use
            // travelerTrips.appendChild(newText);
        });
    };

    function displayDestinationImages(classString, imageHTML) {
        let node = document.querySelector(classString);
        node.innerHTML = imageHTML;
    };
    
    function addDestinationOptions(destinationsRepo) {
        let destinations = destinationsRepo.destinations
        let destinationList = destinations.map(destination => {
            return destination.destination
        });
        let sortedList = destinationList.sort((a, b) => {
            let splitA = a.split(",")
            let countryA = splitA[1]
            let splitB = b.split(",")
            let countryB = splitB[1]
            
            if (countryA > countryB){
                return 1
            } else {
                return -1
            }
        });
        sortedList.forEach(destination => {
            let node = document.createElement("option")
            node.value = destination
            node.innerText = destination
            destinationSelect.appendChild(node)
        });
    };

    


