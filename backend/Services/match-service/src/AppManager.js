const User = require("./User.js");

class AppManager{

    constructor(user1 , users){
        this.user1 = user1;
        this.users = users;
    }

    findMatch(){
        let currentUser = this.user1;
        let users = this.users;

        let potentialMatch = null;

        let prevWeight = Infinity;

        users.forEach(element => {
            let newUser = new User(element.name , element.weight);
            if(Math.abs(currentUser.calculateWeight() - newUser.calculateWeight()) <= prevWeight ){
                prevWeight = Math.abs(currentUser.calculateWeight() - newUser.calculateWeight());
                potentialMatch = element;
            }
        });


        return potentialMatch;
    }


}

module.exports = AppManager;