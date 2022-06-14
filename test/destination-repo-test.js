import chai from 'chai';
const expect = chai.expect;

import DestinationRepo from '../src/DestinationRepo.js';
import Destination from '../src/Destination.js';


describe('DestinationRepo', () => {

    let destRepo;
    let destinations;
    let destinationIDs;
    


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

        destinationIDs = [1, 2];

        destRepo = new DestinationRepo(destinations);

    });

        it('should be a function', function () {
            expect(DestinationRepo).to.be.a('function');
        });

        it('should hold data', function () {
            expect(destRepo.destinations).to.equal(destinations);
        });

        it('should get destinations when given an array of IDs', function () {
            expect(destRepo.getDestById(destinationIDs)).to.deep.equal(destinations);
        });

        it('should get destination ID when given a city name', function () {
            expect(destRepo.getDestByName("Lima")).to.deep.equal(1);
        });
        
});
