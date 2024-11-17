import { activeUsers } from "./data/activeUserData";
import { User } from "./interfaces/User";
import { v4 as uuid4 } from "uuid";
import { getLocation } from "./libs/getGeoLocation";
import { AppManager } from "./manager/AppManager";
import { calculateWeight } from "./libs/calculateWeight";


let currUser: User = {
    uuid: uuid4(),
    userName: "avinash",
    ans: [1,0,1,0,0]
}

let app : AppManager = new AppManager(currUser, activeUsers);


let potMatch: User = app.findMatch();

console.log(potMatch);
console.log(calculateWeight(currUser));
console.log(calculateWeight(potMatch));
