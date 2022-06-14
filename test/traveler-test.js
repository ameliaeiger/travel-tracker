import chai from 'chai';
const expect = chai.expect;

import Traveler from '../src/Traveler.js';

describe('Traveler', () => {
    
    let traveler;
    let travelerTrips;

beforeEach( () => {

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
            userID: 1,
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
            userID: 1,
            destinationID: 22,
            travelers: 4,
            date: "2023/10/22",
            duration: 17,
            status: "pending",
            suggestedActivities: [ ]
        },
    ];

    traveler = new Traveler(1, "Beth", "thrill-seeker", travelerTrips);

  });


    it('should be a function', function () {
        expect(Traveler).to.be.a('function');
    });

    it('should hold an id', function () {
        expect(traveler.id).to.equal(1);
    });

    it('should have a name', function () {
        expect(traveler.name).to.equal("Beth");
    });

    it('should have a traveler type', function () {
        expect(traveler.type).to.equal("thrill-seeker");
    });

    it('should hold all traveler trips', function () {
        expect(traveler.trips).to.equal(travelerTrips);
    });

});
