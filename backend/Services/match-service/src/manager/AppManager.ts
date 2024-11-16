import { User } from "../interfaces/User";

export class AppManager{

    currentUser : User | undefined;
    activeUsers : User[] | undefined;


    constructor(currentUser : User , activeUsers:User[]){
        this.currentUser = currentUser;
        this.activeUsers = activeUsers;
    }

    


}
