// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// Libraries
const dayjs = require('dayjs');
import MicroModal from 'micromodal'; 


// Imports
import { allTravelersData, allTripsData, allDestinationsData } from './apiCalls';
import DestinationRepo from './DestinationRepo';
import Destination from './Destination';
import TravelerRepo from './TravelerRepo';
import Traveler from './Traveler';
import TripRepo from './TripRepo.js';
import './css/styles.css';
import './images/turing-logo.png'


// GLOBALS

let currentUserID;
let travelerRepo;
let tripRepo;
let destRepo;

const travelerPastTrips = document.getElementById("traveler-trips-display-past");
const destinationSelect = document.getElementById("destination-options");

//---       Form
const startDate = document.getElementById("date-input-start");
const endDate = document.getElementById("date-input-end");
const destinationInput = document.getElementById("destination-options");
const numTravelers = document.getElementById("num-travelers");
const submit = document.getElementById("submit");
//---       Proposed Trip
const proposedTripTotal = document.getElementById("total-cost");
const lodgingCost = document.getElementById("lodging-cost");
const proposedTripSum = document.getElementById("trip-sum");
const flightCost = document.getElementById("flight-cost");

//---       Login
const requestLogin = document.getElementById("request-login");
const login = document.getElementById("login-button");
const username = document.getElementById("username");
const password = document.getElementById("password");
const welcomeUser = document.getElementById("welcome-user");


// Event Listeners
window.addEventListener("load", toggleLogin);
submit.addEventListener("click", submitTrip);
requestLogin.addEventListener("click", toggleLogin);
login.addEventListener("click", userLogin);

// Promise All
Promise.all([allTravelersData, allTripsData, allDestinationsData])
    .then(data => {

        travelerRepo = new TravelerRepo(data[0].travelers);
        tripRepo = new TripRepo(data[1].trips);
        destRepo = new DestinationRepo(data[2].destinations);

        addDestinationOptions(destRepo);


        // travelerDataHelper(travelersRepo, tripsRepo, destinationsRepo);


        // console.log("----Travelers Repository: ", travelersRepo);
        // console.log("----Destinations Repository: ", destinationsRepo);
        // console.log("----Trips Repository: ", tripsRepo);
    })


// MicroModal
function toggleLogin() {
    MicroModal.show("modal-1");
    // MicroModal.close("modal-1")
}


function userLogin() {
    if (username.value == "traveler50" && password.value == "travel"){
        currentUserID = 50;
        // allTravelersData.then(data => {
        //     let travelerObj = data.travelers.find(traveler => traveler.id == currentUserID);
        //     let allTrips = tripRepo.returnAllUserTrips(travelerObj.id);
        //     let newOne = new Traveler (travelerObj.id, travelerObj.name, travelerObj.travelerType, allTrips);
        //     renderDisplay(tripRepo, destRepo, newOne);
        // });

        console.log(destRepo, travelerRepo, tripRepo)

        let currentUser = travelerRepo.getTraveler(currentUserID);
        let allTrips = tripRepo.returnAllUserTrips(currentUser.id);
        let traveler = new Traveler(currentUser.id, currentUser.name, currentUser.travelerType, allTrips, destRepo);
        renderDisplay(traveler, destRepo, tripRepo);



        MicroModal.close("modal-1");





    } else if (username.value && password.value){
        currentUserID = Math.floor(Math.random() * 50);
        allTravelersData.then(data => {
            let travelerObj = data.travelers.find(traveler => traveler.id == currentUserID);
            let newOne = new Traveler (travelerObj.id, travelerObj.name, travelerObj.travelerType);
            renderTraveler(newOne);
        });
        MicroModal.close("modal-1");
    };
};

function renderDisplay(traveler, destRepo, tripRepo) {
    renderTraveler(traveler, destRepo)
}

function renderTraveler(travObj, destRepo) {
    welcomeUser.innerHTML = `Welcome, ${travObj.name}!`;
    let keys = travObj.pastTripKeys;
    let allPastDestinations = destRepo.getDestById(keys);
    createImageNodes(allPastDestinations);
};


function submitTrip(e) {
    e.preventDefault()
    //  Date
    let start = dayjs(startDate.value);
    let end = dayjs(endDate.value);
    let duration = end.diff(start, "day");

    // Destination
    let dest = destinationInput.value;

    // Number of travelers
    let num = numTravelers.value;

    // Trip Object
    let newTrip = {
        "duration": duration,
        "destination": dest,
        "travelers": num
    }
    allDestinationsData.then(data => {
        data.destinations;
        let costObj = findCost(data.destinations, newTrip);
        console.log(costObj);
        flightCost.innerHTML = `Flight Cost: ${costObj.flight}`;
        lodgingCost.innerHTML = `Lodging Cost: ${costObj.lodging}`;
        proposedTripSum.innerHTML = `Cost: ${costObj.sum}`;
        proposedTripTotal.innerHTML = `Total + Agent's Fee: ${costObj.sumFee}`;
    });
};

function findCost(data, newTrip) {
    console.log(data, newTrip);
    let match = data.filter(destination => destination.destination == newTrip.destination);
    let flightCost = match[0].estimatedFlightCostPerPerson * newTrip.travelers;
    let lodgingCost = match[0].estimatedLodgingCostPerDay * newTrip.duration;
    let sum = flightCost + lodgingCost;
    let sumFee =  (flightCost + lodgingCost) * 1.1;
    let object = {
        "flight": flightCost,
        "lodging": lodgingCost,
        "sum": (Math.round(sum * 10) / 10),
        "sumFee": (Math.round(sumFee * 10) / 10)
    }
    return object;
}




    // TRAVELER

    function travelerDataHelper(travelersRepo, tripsRepo, destinationsRepo){
        let name = travelersRepo.getTraveler(currentUserID).name;
        let travelerData = tripsRepo.returnAllUserTrips(currentUserID);
        let traveler = new Traveler(currentUserID, name, travelerData);

        console.log(travelersRepo)
        console.log(traveler)


        let keys = traveler.getDestinationIDs();
        let travelerDestinations = destinationsRepo.getDestById(keys);
        createImageNodes(travelerDestinations);

        // TESTING: findPastTrips -- not complete. save for later use.
        traveler.findPastTrips();
    }

    function createImageNodes(pastTrips) {
        console.log(pastTrips)
        pastTrips.forEach(function(destination, index){
            // Create element for each image
            let imageNode = document.createElement("img");
            let classString = `img${index}`
            imageNode.classList.add(classString)
            imageNode.classList.add("traveler-image");
            imageNode.src = destination.image;
            imageNode.alt = destination.alt;
            console.log(imageNode)
            travelerPastTrips.appendChild(imageNode);

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

    


