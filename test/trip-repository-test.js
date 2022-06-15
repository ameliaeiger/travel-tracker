import chai from 'chai';
const expect = chai.expect;
const dayjs = require('dayjs');


import TripRepo from '../src/TripRepo';
import Trip from '../src/Trip';
import Traveler from '../src/Traveler';
import Destination from "../src/Destination.js";

describe('TripRepo', () => {
    
    let tripRepo;
    let destinations;
    let travelerTrips;
    let traveler;
    let allTrips;
    let trip;
    let trip1;
    let dest;
    let dest1;

beforeEach( () => {

    
    destinations = [
        {
        id: 1,
        destination: "Lima, Peru",
        estimatedLodgingCostPerDay: 70,
        estimatedFlightCostPerPerson: 400,
        image: "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
        alt: "overview of city buildings with a clear sky"
        },
        {
        id: 2,
        destination: "Stockholm, Sweden",
        estimatedLodgingCostPerDay: 100,
        estimatedFlightCostPerPerson: 780,
        image: "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "city with boats on the water during the day time"
        },
    ];

    dest = new Destination(destinations[0]);
    dest1 = new Destination(destinations[1]);

    travelerTrips = [
        {
            id: 1,
            userID: 1,
            destinationID: 1,
            travelers: 1,
            date: "2022/01/16",
            duration: 8,
            status: "approved",
            suggestedActivities: [ ]
        },
        {
            id: 2,
            userID: 1,
            destinationID: 2,
            travelers: 5,
            date: "2023/10/04",
            duration: 18,
            status: "approved",
            suggestedActivities: [ ]
        },
    ];

    trip = new Trip(travelerTrips[0]);
    trip1 = new Trip(travelerTrips[1]);

    trip.getTripCost(destinations[0]);
    trip1.getTripCost(destinations[1]);
    trip.getTripCategory();
    trip1.getTripCategory();

    allTrips = [
        trip,
        trip1,
    ];

    traveler = new Traveler(1, "Beth", "couch potato", allTrips);
    tripRepo = new TripRepo(traveler.trips);

  });

    it('should be a function', function () {
        expect(TripRepo).to.be.a('function');
    });

    it('should hold traveler trips', function () {
        expect(tripRepo.trips).to.deep.equal(allTrips);
    });

    it('should find the total cost of trips this year for a traveler', function () {

        let thisYear = tripRepo.getTripsThisYear(traveler.trips);

        expect(tripRepo.getAnnualCost(thisYear)).to.equal(1056);
    });
});