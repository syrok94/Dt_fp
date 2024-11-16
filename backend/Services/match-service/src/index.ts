import { activeUsers } from "./data/activeUserData";
import { User } from "./interfaces/User";
import { v4 as uuid4 } from "uuid";
import { getLocation } from "./libs/getGeoLocation";
import { AppManager } from "./manager/AppManager";


let currUser: User = {
    uuid: uuid4(),
    userName: "avinash",
    ans: 12
}

let app : AppManager = new AppManager(currUser, activeUsers);


let potMatch: User | undefined = app.findMatch();

console.log(potMatch);
