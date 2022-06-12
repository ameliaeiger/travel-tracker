import Traveler from './Traveler.js'

class TravelerRepo {
    constructor(data){
        this.travelers = data;
    }
    getTraveler(id){
        return this.travelers.find(traveler => traveler.id === id)
    }
}

export default TravelerRepo;