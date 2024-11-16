import { User } from "../interfaces/User";

export const calculateWeight = (user : User) : number => {

    if(!user?.ans == undefined) {
        return 0;
    }
    return user.ans;
}