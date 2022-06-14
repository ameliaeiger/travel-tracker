const dayjs = require("dayjs");

class Trip {
    constructor(tripData) {
        this.id = tripData.id;
        this.userID = tripData.userID;
        this.destinationID = tripData.destinationID;
        this.travelers = tripData.travelers;
        this.date = tripData.date;
        this.duration = tripData.duration;
        this.status = tripData.status;
        this.suggestedActivities = [];
        this.tripCost = 0;
        this.category = "";
    }
    getTripCost(destination) {
        let sumLodging = destination.estimatedLodgingCostPerDay * this.duration;
        let sumFlight = destination.estimatedFlightCostPerPerson * this.travelers;
        let totalSum = sumLodging + sumFlight;
        this.tripCost = totalSum * 1.1;
      };
      getTripCategory = () => {
        if (this.status === "pending") {
          return (this.category = "pending");
        } else if (dayjs().isAfter(dayjs(this.date))) {
          return (this.category = "past");
        } else if (dayjs().isSame(dayjs(this.date))) {
          return (this.category = "present");
        } else if (dayjs().isBefore(dayjs(this.date))) {
          return (this.category = "upcoming");
        }
      };
}

export default Trip;