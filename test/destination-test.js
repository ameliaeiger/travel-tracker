import chai from 'chai';
const expect = chai.expect;

import Destination from '../src/Destination.js';

describe('Destination', () => {
    
    let destination;
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
        {
        id: 3,
        destination: "Sydney, Austrailia",
        estimatedLodgingCostPerDay: 130,
        estimatedFlightCostPerPerson: 950,
        image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "opera house and city buildings on the water with boats"
        }
    ];
    
    destination = new Destination(destinations[0])

  });


    it('should be a function', function () {
        expect(Destination).to.be.a('function');
    });

    it('should hold an id', function () {
        expect(destination.id).to.equal(1);
    });

    it('should hold a destination', function () {
        expect(destination.destination).to.equal("Lima, Peru");
    });

    it('should hold lodging cost per day', function () {
        expect(destination.estimatedLodgingCostPerDay).to.equal(70);
    });

    it('should hold flight cost per person', function () {
        expect(destination.estimatedFlightCostPerPerson).to.equal(400);
    });

    it('should hold an image', function () {
        expect(destination.image).to.equal("https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80");
    });

    it('should hold alt text', function () {
        expect(destination.alt).to.equal("overview of city buildings with a clear sky");
    });

});
