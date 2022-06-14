import chai from 'chai';
const expect = chai.expect;

import TravelerRepo from '../src/TravelerRepo.js';

describe('TravelerRepository', () => {
    
    let travelerRepo
    let travelers


    beforeEach( () => {
        travelers= [
            {
            id: 1,
            name: "Ham Leadbeater",
            travelerType: "relaxer"
            },
            {
            id: 2,
            name: "Rachael Vaughten",
            travelerType: "thrill-seeker"
            },
            {
            id: 3,
            name: "Sibby Dawidowitsch",
            travelerType: "shopper"
            },
        ],

        travelerRepo = new TravelerRepo(travelers);

  });

    it('should be a function', function () {
        expect(TravelerRepo).to.be.a('function');
    });

    it('should return a traveler when given an ID', function () {
        expect(travelerRepo.getTraveler(1)).to.deep.equal(travelers[0]);
    });

});
