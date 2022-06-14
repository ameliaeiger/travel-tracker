// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// LIBRARIES
const dayjs = require('dayjs');
import MicroModal from 'micromodal'; 
import Glide, { Controls, Breakpoints } from '@glidejs/glide/dist/glide.modular.esm';


// IMPORTS
import { allTravelersData, allTripsData, allDestinationsData, postData } from './apiCalls';
import DestinationRepo from './DestinationRepo';
import Destination from './Destination';
import TravelerRepo from './TravelerRepo';
import Traveler from './Traveler';
import TripRepo from './TripRepo.js';
import Trip from './Trip.js';
import './css/styles.css';
import './images/turing-logo.png';


// GLOBALS
let currentUserID;
let travelerRepo;
let traveler;
let tripRepo;
let destRepo;

const travelerPastTrips = document.getElementById("traveler-trips-display-past");
const travelerFutureTrips = document.getElementById("traveler-trips-display-upcoming");
const travelerPendingTrips = document.getElementById("traveler-trips-display-pending");
const destinationSelect = document.getElementById("destination-options");

//---       Form
const newTripForm = document.getElementById("new-trip-request");
const startDate = document.getElementById("date-input-start");
const endDate = document.getElementById("date-input-end");
const destinationInput = document.getElementById("destination-options");
const numTravelers = document.getElementById("num-travelers");
const submit = document.getElementById("submit");
const confirmBooking = document.getElementById("confirm-booking");
//---       Proposed Trip
const proposedTripContainer = document.getElementById("proposed-trip-container");
const proposedTrip = document.getElementById("proposed-trip");
const proposedTripTotal = document.getElementById("total-cost");
const lodgingCost = document.getElementById("lodging-cost");
const proposedTripSum = document.getElementById("trip-sum");
const flightCost = document.getElementById("flight-cost");

//---       Login
const requestLogin = document.getElementById("request-login");
const login = document.getElementById("confirm-login-button");
const username = document.getElementById("username");
const password = document.getElementById("password");
const welcomeUser = document.getElementById("welcome-user");


// EVENT LISTENERS
window.addEventListener("load", toggleLogin);
submit.addEventListener("click", submitTrip);
requestLogin.addEventListener("click", toggleLogin);
login.addEventListener("click", userLogin);
confirmBooking.addEventListener("click", postTrip);





// FUNCTIONS
//---       Promise All
Promise.all([allTravelersData, allTripsData, allDestinationsData])
    .then(data => {
        travelerRepo = new TravelerRepo(data[0].travelers);
        tripRepo = new TripRepo(data[1].trips);
        destRepo = new DestinationRepo(data[2].destinations);
        addDestinationOptions(destRepo);

        userLogin()

    });

//---       MicroModal
function toggleLogin() {
    MicroModal.show("modal-1");
}

//---        Login
function userLogin() {
    resetDisplay();
    if (username.value == "traveler50" && password.value == "travel"){
        let currentTraveler = travelerRepo.getTraveler(50);
        traveler = new Traveler(currentTraveler.id, currentTraveler.name, currentTraveler.type, tripRepo.returnAllUserTrips);
        currentUserID = currentTraveler.id;
        renderDisplay(traveler, destRepo, tripRepo);
        MicroModal.close("modal-1");
    } else if (username.value == "agency" && password.value == "travel"){
        renderAgencyDisplay();
        MicroModal.close("modal-1");
    } else if (username.value && password.value){
        let currentTraveler = travelerRepo.getTraveler(Math.floor(Math.random() * 50));
        currentUserID = currentTraveler.id;
        traveler = new Traveler(currentTraveler.id, currentTraveler.name, currentTraveler.type, tripRepo.returnAllUserTrips);
        currentUserID = currentTraveler.id;
        renderDisplay(traveler, destRepo, tripRepo);
        MicroModal.close("modal-1");        
    } 
    // else {
    //     let currentTraveler = travelerRepo.getTraveler(1);
    //     currentUserID = currentTraveler.id;
    //     traveler = new Traveler(currentTraveler.id, currentTraveler.name, currentTraveler.type, tripRepo.returnAllUserTrips);
    //     currentUserID = currentTraveler.id;
    //     renderDisplay(traveler, destRepo, tripRepo);
    // };
};

function resetDisplay() {
    welcomeUser.innerHTML = "";
    travelerPastTrips.innerHTML = "";
    travelerFutureTrips.innerHTML = "";
    travelerPendingTrips.innerHTML = "";
    welcomeMessage.innerHTML = "";
    newTripForm.className = "new-trip-request hidden";
    agencyDisplayWrapper.className = "agency-display-wrapper hidden";
    agencyDashboard.className = "agency-dashboard hidden";
    proposedTripContainer.className = "proposed-trip-cost hidden";
}


//---       New Trip
function submitTrip(e) {
    if (e){
    e.preventDefault()
    }
    let start = dayjs(startDate.value);
    let end = dayjs(endDate.value);
    let date = dayjs(start).format("YYYY/MM/DD");
    let duration = end.diff(start, "day");
    let num = numTravelers.value;
    let destName = destinationInput.value;
    let destID = destRepo.getDestByName(destName);
    let destObj = destRepo.destinations[destID];
    let newTripData = {
        "id": tripRepo.trips.length + 1,
        "userID": currentUserID,
        "destinationID": destID,
        "travelers": num,
        "date": date,
        "duration": duration,
        "status": "pending",
        "suggestedActivities": [],
        "tripCost": 0,
        "category": "",
    }
    let newTrip = new Trip(newTripData)
    newTrip.getTripCost(destObj);
    newTrip.getTripCategory(destObj);
    let costObject = showTripCost(destObj, newTrip)
    animateShowCost(costObject)
    return newTrip
};

function postTrip() {
   let postObj = submitTrip();
   console.log("Post Object: ", postObj)
   postData(postObj)
   renderDisplay(traveler, destRepo, tripRepo);


    
}

function showTripCost(destObj, newTrip) {
    let flightCost = destObj.estimatedFlightCostPerPerson * newTrip.travelers;
    let lodgingCost = destObj.estimatedLodgingCostPerDay * newTrip.duration;
    let sum = flightCost + lodgingCost;
    let sumFee =  (flightCost + lodgingCost) * 1.1;
    let object = {
        "flight": flightCost,
        "lodging": lodgingCost,
        "sum": (Math.round(sum * 10) / 10),
        "sumFee": (Math.round(sumFee * 10) / 10)
    };
    return object;
};


//---        DOM
function renderDisplay(traveler, destRepo, tripRepo) {
    // resetDisplay();
    renderTraveler(traveler, destRepo)
};

function renderTraveler() {
    welcomeUser.innerHTML = `Welcome, ${traveler.name}!`;
    renderAnimation();
    let allTrips = tripRepo.returnAllUserTrips(traveler.id);
    let pastTrips = [];
    let futureTrips = [];
    let pendingTrips = [];
    console.log("All Trips: ", allTrips)
    allTrips.forEach(trip => {
        let trippy = new Trip (trip)
        if (trippy.getTripCategory() == "past"){
            pastTrips.push(trip.destinationID);
        } else if (trippy.getTripCategory() == "upcoming"){
            futureTrips.push(trip.destinationID);
        } else {
            pendingTrips.push(trip.destinationID);
        }
    });
    let allPastDestinations = destRepo.getDestById(pastTrips);
    let allFutureDestinations = destRepo.getDestById(futureTrips);
    let allPendingDestinations = destRepo.getDestById(pendingTrips)
    createImageNodes(allPastDestinations, "past");
    createImageNodes(allFutureDestinations, "future");
    createImageNodes(allPendingDestinations, "pending");
};

function renderAnimation(){
    newTripForm.classList.remove("hidden");
    newTripForm.classList.add("appear");
};

function animateShowCost(costObj) {
    if (proposedTripContainer.classList.contains("appear")){
        resetNewTripAnimations();
    };
    newTripForm.classList.add("show-cost");
    proposedTrip.classList.add("increase-margin");
    flightCost.innerText = `Flight Cost: $${costObj.flight}`;
    lodgingCost.innerText = `Lodging Cost: $${costObj.lodging}`;
    proposedTripSum.innerText = `Cost: $${costObj.sum}`;
    proposedTripTotal.innerText = `Total + Agent's Fee: $${costObj.sumFee}`;
    proposedTripContainer.classList.remove("hidden");
    proposedTripContainer.classList.add("appear");
};

function resetNewTripAnimations() {
    proposedTripContainer.classList.add("hidden");
    proposedTripContainer.classList.remove("appear");
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
    sortedList.forEach((destination, index) => {
        let node = document.createElement("option")
        node.value = destination
        node.innerText = destination
        destinationSelect.appendChild(node)
    });
};

function createImageNodes(trips, when) {
    trips.forEach(function(destination, index){
        let imageNode = document.createElement("img");
        let classString = `img${index}`;
        imageNode.classList.add(classString);
        imageNode.classList.add("traveler-image");
        imageNode.src = destination.image;
        imageNode.alt = destination.alt;
        if (when === "past") {
            travelerPastTrips.appendChild(imageNode);
        };
        if (when === "future") {
            travelerFutureTrips.appendChild(imageNode);
        };
        if (when === "pending") {
            travelerPendingTrips.appendChild(imageNode);
        };
        // Create element for text -- save for later use
        // let text = `Destination: ${destination.destination} Image: ${destination.image} Alt: ${destination.alt}`
        // let newText = document.createTextNode(text);
        // Append -- save for later use
        // travelerTrips.appendChild(newText);
    });
};




//---       Agency
const agencyDashboard = document.getElementById("agency-dashboard");
const agencyTripRequests = document.getElementById("trip-request-agency");
const welcomeMessage = document.getElementById("greeting-text");
const dismissButton = document.getElementById("x-button");
const navbar = document.getElementById("navbar");
const agencyDisplayWrapper = document.getElementById("agency-display-wrapper");
const agencyDisplay = document.getElementById("agency-display");


//      Agency Event Listeners
// dismissButton.addEventListener("click", dismissAgencyGreeting);
// navbar.addEventListener("click", function(event) {
//     console.log(event.target.value)
//     agencyDisplay.innerText = event.target.value
// });


//---       Agency DOM Functions
// function renderAgencyDisplay() {
//     welcomeUser.innerHTML = `Travel Tracker: Agency Edition`;
//     welcomeMessage.innerText += "Welcome! You have 2 new pending requests.";

//     agencyDashboard.classList.remove("hidden");
//     agencyDashboard.classList.add("appear");
// }

// function dismissAgencyGreeting() {
//     agencyTripRequests.classList.add("hidden");

//     agencyDisplayWrapper.classList.remove("hidden");
//     agencyDisplayWrapper.classList.add("appear");

// }