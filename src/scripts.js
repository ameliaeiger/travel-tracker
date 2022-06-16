// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// LIBRARIES
const dayjs = require('dayjs');
import MicroModal from 'micromodal'; 

// IMPORTS
import { allTravelersData, allTripsData, allDestinationsData, postData, fetchData } from './apiCalls';
import DestinationRepo from './DestinationRepo';
import Destination from './Destination';
import TravelerRepo from './TravelerRepo';
import Traveler from './Traveler';
import TripRepo from './TripRepo.js';
import Trip from './Trip.js';
import './css/styles.css';
import './images/turing-logo.png';

// GLOBALS
let currentTraveler;
let travelerRepo;
let tripRepo;
let destRepo;
let allPastDestinations;
let allFutureDestinations;
let allPendingDestinations;

const travelerPastTrips = document.getElementById("traveler-trips-display-past");
const travelerFutureTrips = document.getElementById("traveler-trips-display-upcoming");
const travelerPendingTrips = document.getElementById("traveler-trips-display-pending");
const destinationSelect = document.getElementById("destination-options");
const annualCost = document.getElementById("annual-cost");
const newTripForm = document.getElementById("new-trip-request");
const startDate = document.getElementById("date-input-start");
const endDate = document.getElementById("date-input-end");
const destinationInput = document.getElementById("destination-options");
const numTravelers = document.getElementById("num-travelers");
const submit = document.getElementById("submit");
const confirmBooking = document.getElementById("confirm-booking");
const proposedTripContainer = document.getElementById("proposed-trip-container");
const proposedTrip = document.getElementById("proposed-trip");
const proposedTripTotal = document.getElementById("total-cost");
const lodgingCost = document.getElementById("lodging-cost");
const proposedTripSum = document.getElementById("trip-sum");
const flightCost = document.getElementById("flight-cost");
const requestLogin = document.getElementById("request-login");
const login = document.getElementById("confirm-login-button");
const username = document.getElementById("username");
const password = document.getElementById("password");
const welcomeUser = document.getElementById("welcome-user");

// EVENT LISTENERS
// window.addEventListener("load", toggleLogin);
submit.addEventListener("click", submitTrip);
requestLogin.addEventListener("click", toggleLogin);
login.addEventListener("click", loginUser);
confirmBooking.addEventListener("click", postTrip);
newTripForm.addEventListener("input", validateForm);

// FUNCTIONS
Promise.all([allTravelersData, allTripsData, allDestinationsData])
    .then(data => {

        let objects = data[1].trips.map(trip => new Trip(trip))
        tripRepo = new TripRepo(objects);

        travelerRepo = new TravelerRepo(data[0].travelers);
        // tripRepo = new TripRepo(data[1].trips);
        destRepo = new DestinationRepo(data[2].destinations);
        addDestinationOptions(destRepo);
        toggleLogin()
});

function toggleLogin() {
    MicroModal.show("modal-1");
};

function validateUsername(username) {
    const usernameWord = username.substring(0, 8);
    const usernameID = username.substring(8);
    if (username === "") {
      alert("Username required");
    } else if (
      usernameWord === "traveler" &&
      usernameID <= 50 &&
      usernameID >= 1
    ) {
      return usernameID;
    } else {
      alert("Username not found!");
    }
  };

function validatePassword(password) {
    if (password === "") {
      alert("Please enter a password");
    } else if (password !== "travel") {
      alert("Invalid password");
    } else if (password === "travel") {
      return true;
    };
  };

function loginUser(event) {
    event.preventDefault();
    const userID = validateUsername(username.value);
    const passwordValid = validatePassword(password.value);
    if (userID === undefined || !passwordValid) {
      return;
    };
    fetchData(`http://localhost:3001/api/v1/travelers/${userID}`).then(data => {
      currentTraveler = new Traveler(data.id, data.name, data.travelerType, tripRepo.returnAllUserTrips(data.id));
      console.log(currentTraveler.trips)
        console.log(currentTraveler);
        showAnnualCost();
        renderTraveler(currentTraveler, destRepo, tripRepo);
        MicroModal.close("modal-1");
    });
  };

function submitTrip(e) {
    if (e){
    e.preventDefault();
    }
    let start = dayjs(startDate.value);
    let end = dayjs(endDate.value);
    let destID = destRepo.getDestByName(destinationInput.value);
    let newTripData = {
        "id": tripRepo.trips.length + 1,
        "userID": currentTraveler.id,
        "destinationID": destID,
        "travelers": parseInt(numTravelers.value),
        "date": dayjs(start).format("YYYY/MM/DD"),
        "duration": end.diff(start, "day"),
        "status": "pending",
        "suggestedActivities": [],
        "tripCost": 0,
        "category": "",
    };
    let newTrip = new Trip(newTripData)
    newTrip.getTripCost(destRepo.destinations[destID]);
    let costObject = showTripCost(destRepo.destinations[destID], newTrip)
    animateShowCost(costObject)
    return newTrip
};

function validateForm() {
    if(startDate.value && endDate.value) {
      submit.disabled = false;
    };
  };

function postTrip() {
   let postObj = submitTrip();
   postData(postObj)
    .then(object => {
        fetchData("http://localhost:3001/api/v1/trips").then(data => {
            let objects = data.trips.map(trip => new Trip(trip));
            tripRepo = new TripRepo(objects);
            currentTraveler = new Traveler(currentTraveler.id, currentTraveler.name, currentTraveler.type, tripRepo.returnAllUserTrips(currentTraveler.id));
            renderTraveler(currentTraveler, destRepo, tripRepo);
        });
    });
};

//---        DOM
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
};

function renderTraveler(traveler, destRepo) {
    resetDisplay();
    newTripForm.classList.remove("hidden");
    newTripForm.classList.add("appear");
    welcomeUser.innerHTML = `Welcome, ${traveler.name}!`;
    let pastTrips = [];
    let futureTrips = [];
    let pendingTrips = [];
    traveler.trips.forEach(trip => {
        if(!trip.category){
            trip.getTripCategory()
        };
        if (trip.category == "past"){
            pastTrips.push(trip.destinationID);
        } else if (trip.category == "upcoming"){
            futureTrips.push(trip.destinationID);
        } else if (trip.category == "pending"){
            pendingTrips.push(trip.destinationID);
        };
    });
    allPastDestinations = destRepo.getDestById(pastTrips);
    allFutureDestinations = destRepo.getDestById(futureTrips);
    allPendingDestinations = destRepo.getDestById(pendingTrips);
    createImageNodes(allPastDestinations, "past");
    createImageNodes(allFutureDestinations, "future");
    createImageNodes(allPendingDestinations, "pending");
};

function showAnnualCost() {
    let tripsThisYear = tripRepo.getTripsThisYear(currentTraveler.trips);
    tripsThisYear.forEach(trip => {
        let thisDest = destRepo.getDestByNumber(trip.destinationID);
        trip.getTripCost(thisDest)
    });
    let cost = tripRepo.getAnnualCost(tripsThisYear);
    annualCost.innerHTML = `This Year's Expenses: $${cost}`;
};

// function renderAnimation(){
//     newTripForm.classList.remove("hidden");
//     newTripForm.classList.add("appear");
// };

function animateShowCost(costObj) {
    if (proposedTripContainer.classList.contains("appear")){
        proposedTripContainer.classList.add("hidden");
        proposedTripContainer.classList.remove("appear");    
    };
    newTripForm.classList.add("show-cost");
    proposedTrip.classList.add("increase-margin", "appear");
    proposedTripContainer.classList.remove("hidden");
    // proposedTripContainer.classList.add("appear");
    flightCost.innerText = `Flight Cost: $${costObj.flight}`;
    lodgingCost.innerText = `Lodging Cost: $${costObj.lodging}`;
    proposedTripSum.innerText = `Cost: $${costObj.sum}`;
    proposedTripTotal.innerText = `Total + Agent's Fee: $${costObj.sumFee}`;
};

function addDestinationOptions(destinationsRepo) {
    let destinations = destinationsRepo.destinations;
    let destinationList = destinations.map(destination => {
        return destination.destination;
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
        };
    });
    sortedList.forEach((destination, index) => {
        let node = document.createElement("option");
        node.value = destination;
        node.innerText = destination;
        destinationSelect.appendChild(node);
    });
};

function createImageNodes(trips, when) {
    trips.forEach(function(destination, index){
        let newDiv = document.createElement("div");
        let textNode = document.createElement("p");
        textNode.innerText = destination.destination;
        textNode.classList.add("image-text")
        newDiv.appendChild(textNode);
        let imageNode = document.createElement("img");
        imageNode.classList.add("img");
        imageNode.src = destination.image;
        imageNode.alt = destination.alt;
        imageNode.tabIndex = "0";   
        newDiv.appendChild(imageNode);
        newDiv.classList.add("traveler-image");
        if (when === "past") {
            travelerPastTrips.appendChild(newDiv);
        };
        if (when === "future") {
            travelerFutureTrips.appendChild(newDiv);
        };
        if (when === "pending") {
            travelerPendingTrips.appendChild(newDiv);
        };
    });
};

function showTripCost(destObj, newTrip) {
    let flightCost = destObj.estimatedFlightCostPerPerson * newTrip.travelers;
    let lodgingCost = destObj.estimatedLodgingCostPerDay * newTrip.duration;
    let sum = flightCost + lodgingCost;
    let sumFee =  (flightCost + lodgingCost) * 1.1;
    let object = {
        "flight": flightCost,
        "lodging": lodgingCost,
        "sum": (Math.round(sum * 10) / 10),
        "sumFee": (Math.round(sumFee * 10) / 10),
    };
    return object;
};






//---       Agency
const agencyDashboard = document.getElementById("agency-dashboard");
const agencyTripRequests = document.getElementById("trip-request-agency");
const welcomeMessage = document.getElementById("greeting-text");
const dismissButton = document.getElementById("x-button");
const navbar = document.getElementById("navbar");
const agencyDisplayWrapper = document.getElementById("agency-display-wrapper");
const agencyDisplay = document.getElementById("agency-display");


    //  Agency Event Listeners
dismissButton.addEventListener("click", dismissAgencyGreeting);
navbar.addEventListener("click", function(event) {
    console.log(event.target.value)
    agencyDisplay.innerText = event.target.value
});

// ---       Agency DOM Functions
function renderAgencyDisplay() {
    welcomeUser.innerHTML = `Travel Tracker: Agency Edition`;
    welcomeMessage.innerText += "Welcome! You have 2 new pending requests.";
    agencyDashboard.classList.remove("hidden");
    agencyDashboard.classList.add("appear");
};

function dismissAgencyGreeting() {
    agencyTripRequests.classList.add("hidden");
    agencyDisplayWrapper.classList.remove("hidden");
    agencyDisplayWrapper.classList.add("appear");
};