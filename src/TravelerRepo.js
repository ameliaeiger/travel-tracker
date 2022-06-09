import Traveler from './Traveler.js'

class TravelerRepo {
    constructor(data){
        this.travelers = data;
    }
    getTraveler(id){
        return this.travelers.find(traveler => traveler.id === id)
    }
    createNewTraveler(id, data) {
        return new Traveler(id, data)
    }
}

export default TravelerRepo;