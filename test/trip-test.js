import chai from 'chai';
const expect = chai.expect;

import Trip from '../src/Trip.js';

describe('Trip', () => {
    
    let trip;
    let travelerTrips;
    let destinations;

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
    ],

    travelerTrips = [
        {
            id: 1,
            userID: 1,
            destinationID: 49,
            travelers: 1,
            date: "2020/09/16",
            duration: 8,
            status: "approved",
            suggestedActivities: [ ]
        },
        {
            id: 2,
            userID: 2,
            destinationID: 25,
            travelers: 5,
            date: "2021/10/04",
            duration: 18,
            status: "approved",
            suggestedActivities: [ ]
        },
        {
            id: 4,
            userID: 1,
            destinationID: 14,
            travelers: 2,
            date: "2022/12/25",
            duration: 10,
            status: "approved",
            suggestedActivities: [ ]
            },
        {
            id: 3,
            userID: 2,
            destinationID: 22,
            travelers: 4,
            date: "2023/10/22",
            duration: 17,
            status: "pending",
            suggestedActivities: [ ]
        },
    ];

    trip = new Trip(travelerTrips[0]);



  });


    it('should be a function', function () {
        expect(Trip).to.be.a('function');
    });

    it('should hold a trip id', function () {
        expect(trip.id).to.equal(1);
    });

    it('should have a userID', function () {
        expect(trip.userID).to.equal(1);
    });

    it('should have a destinationID', function () {
        expect(trip.destinationID).to.equal(49);
    });

    it('should have a number of travelers', function () {
        expect(trip.travelers).to.equal(1);
    });

    it('should have a start date', function () {
        expect(trip.date).to.equal("2020/09/16");
    });

    it('should have a duration', function () {
        expect(trip.duration).to.equal(8);
    });

    it('should have a status', function () {
        expect(trip.status).to.equal("approved");
    });

    it('should have an array for suggested activities', function () {
        expect(trip.suggestedActivities).to.deep.equal([]);
    });

    it('should find trip cost', function () {

        trip.getTripCost(destinations[0])

        expect(trip.tripCost).to.equal(1056);
    });

    it('should find trip category', function () {

        trip.getTripCategory(destinations[0])

        expect(trip.category).to.equal("past");
    });

});