// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// LIBRARIES
const dayjs = require('dayjs');
import MicroModal from 'micromodal'; 
import Glide, { Controls, Breakpoints } from '@glidejs/glide/dist/glide.modular.esm';


// IMPORTS
import { allTravelersData, allTripsData, allDestinationsData } from './apiCalls';
import DestinationRepo from './DestinationRepo';
import Destination from './Destination';
import TravelerRepo from './TravelerRepo';
import Traveler from './Traveler';
import TripRepo from './TripRepo.js';
import './css/styles.css';
import './images/turing-logo.png';


// GLOBALS
let currentUserID;
let travelerRepo;
let tripRepo;
let destRepo;

const travelerPastTrips = document.getElementById("traveler-trips-display-past");
const destinationSelect = document.getElementById("destination-options");

//---       Form
const newTripForm = document.getElementById("new-trip-request");
const startDate = document.getElementById("date-input-start");
const endDate = document.getElementById("date-input-end");
const destinationInput = document.getElementById("destination-options");
const numTravelers = document.getElementById("num-travelers");
const submit = document.getElementById("submit");
//---       Proposed Trip
const proposedTripContainer = document.getElementById("proposed-trip-container");
const proposedTrip = document.getElementById("proposed-trip");
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





//      ------------    o _____ o    ------------ //


// EVENT LISTENERS
// window.addEventListener("load", toggleLogin);
submit.addEventListener("click", submitTrip);
requestLogin.addEventListener("click", toggleLogin);
login.addEventListener("click", userLogin);


//      ------------    o _____ o    ------------ //


// FUNCTIONS
//---       Promise All
Promise.all([allTravelersData, allTripsData, allDestinationsData])
    .then(data => {

        travelerRepo = new TravelerRepo(data[0].travelers);
        tripRepo = new TripRepo(data[1].trips);
        destRepo = new DestinationRepo(data[2].destinations);
        addDestinationOptions(destRepo);
    });

//---       MicroModal
function toggleLogin() {
    MicroModal.show("modal-1");
    // MicroModal.close("modal-1")
}

//---        Login
function userLogin() {
    resetDisplay();
    if (username.value == "traveler50" && password.value == "travel"){
        currentUserID = 50;
        let currentUser = travelerRepo.getTraveler(currentUserID);
        let allTrips = tripRepo.returnAllUserTrips(currentUser.id);
        let traveler = new Traveler(currentUser.id, currentUser.name, currentUser.travelerType, allTrips, destRepo);
        renderDisplay(traveler, destRepo, tripRepo);
        MicroModal.close("modal-1");
    } else if (username.value == "agency" && password.value == "travel"){
        renderAgencyDisplay();
        MicroModal.close("modal-1");
    } else if (username.value && password.value){
        currentUserID = Math.floor(Math.random() * 50);
        let currentUser = travelerRepo.getTraveler(currentUserID);
        let allTrips = tripRepo.returnAllUserTrips(currentUser.id);
        let traveler = new Traveler(currentUser.id, currentUser.name, currentUser.travelerType, allTrips, destRepo);
        renderDisplay(traveler, destRepo, tripRepo);
        MicroModal.close("modal-1");
    };
};


//---       Agency
const agencyDashboard = document.getElementById("agency-dashboard");
const agencyTripRequests = document.getElementById("trip-request-agency");
const welcomeMessage = document.getElementById("greeting-text");
const dismissButton = document.getElementById("x-button");
const navbar = document.getElementById("navbar");
const agencyDisplayWrapper = document.getElementById("agency-display-wrapper");
const agencyDisplay = document.getElementById("agency-display");


renderAgencyDisplay()
// Agency Event Listeners
dismissButton.addEventListener("click", dismissAgencyGreeting);
navbar.addEventListener("click", function(event) {
    console.log(event.target.value)
    agencyDisplay.innerText = event.target.value
});

//---       Agency DOM Functions

function toggleAgencyView() {

}

function renderAgencyDisplay() {
    welcomeUser.innerHTML = `Travel Tracker: Agency Edition`;
    welcomeMessage.innerText += "Welcome! You have 2 new pending requests.";

    agencyDashboard.classList.remove("hidden");
    agencyDashboard.classList.add("appear");
}

function dismissAgencyGreeting() {
    agencyTripRequests.classList.add("hidden");

    agencyDisplayWrapper.classList.remove("hidden");
    agencyDisplayWrapper.classList.add("appear");

}



function resetDisplay() {
    welcomeUser.innerHTML = "";
    travelerPastTrips.innerHTML = "";
    welcomeMessage.innerHTML = "";
    newTripForm.className = "new-trip-request hidden";
    agencyDisplayWrapper.className = "agency-display-wrapper hidden";
    agencyDashboard.className = "agency-dashboard hidden";
    proposedTripContainer.className = "proposed-trip-cost hidden";


}



//---       New Trip
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
        animateShowCost(costObj);
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
    };
    return object;
};

//---        DOM
function renderDisplay(traveler, destRepo, tripRepo) {
    resetDisplay();
    renderTraveler(traveler, destRepo)
};

function renderTraveler(travObj, destRepo) {
    welcomeUser.innerHTML = `Welcome, ${travObj.name}!`;
    renderAnimation();
    let keys = travObj.pastTripKeys;
    let allPastDestinations = destRepo.getDestById(keys);
    createImageNodes(allPastDestinations);
};

function renderAnimation(){
    newTripForm.classList.remove("hidden");
    newTripForm.classList.add("appear");
}

function animateShowCost(costObj) {
    if (proposedTripContainer.classList.contains("appear")){
        resetNewTripAnimations();
    }
    newTripForm.classList.add("show-cost");
    proposedTrip.classList.add("increase-margin");
    flightCost.innerText = `Flight Cost: $${costObj.flight}`;
    lodgingCost.innerText = `Lodging Cost: $${costObj.lodging}`;
    proposedTripSum.innerText = `Cost: $${costObj.sum}`;
    proposedTripTotal.innerText = `Total + Agent's Fee: $${costObj.sumFee}`;
    proposedTripContainer.classList.remove("hidden");
    proposedTripContainer.classList.add("appear");
}

function resetNewTripAnimations() {
    proposedTripContainer.classList.add("hidden");
    proposedTripContainer.classList.remove("appear");
}


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







//---       GLIDE

// let controls = document.getElementById("left");

// var controlsLeft = document.getElementById("left");
// var controlsRight = document.getElementById("right");
// var first = document.getElementById("first");

// var glide = new Glide('.glide', {
//   type: "carousel",
//   focusAt: 'center',
//   startAt: first,
//   perView: 1
// })

// controlsLeft.addEventListener('click', function (event) {
//   glide.update({
//     type: event.target.value
//   })
// })

// controlsRight.addEventListener('click', function (event) {
//     glide.update({
//       type: event.target.value
//     })
//   })

// glide.mount()

// var input = document.querySelector('.control');
// var first = document.querySelector('.first');
// var slides = document.querySelectorAll(".glide__slide")


// var glide = new Glide('.glide', {
//     type: "carousel"
// })

// input.addEventListener('click', function (event) {
//     console.log("triggered")
//     console.log(event.target.value)

//     if (event.target.value == "left"){
//         glide.index--
//     } else {
//         glide.index++
//         console.log(slides[glide.index])

//     }
//     console.log(glide.index)

// })

// glide.mount({Controls, Breakpoints})
