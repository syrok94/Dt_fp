import { User } from "../interfaces/User";
import { calculateWeight } from "../libs/calculateWeight";
export class AppManager {

    currentUser: User;
    activeUsers: User[];

    constructor(currentUser: User, activeUsers: User[]) {
        this.currentUser = currentUser;
        this.activeUsers = activeUsers;
    }


    findMatch = () : User => {
        let potentialMatch = null;
        let score = Infinity;

        this.activeUsers?.forEach((user: User) => {
            if (Math.abs(calculateWeight(this.currentUser) - calculateWeight(user)) <= score) {
                score = calculateWeight(user);
                potentialMatch = user;
            }
        });

        if (potentialMatch == null) return this.currentUser;

        return potentialMatch;
    }

}
