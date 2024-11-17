import { qWeight } from "../global/weights";
import { User } from "../interfaces/User";

export const calculateWeight = (user : User) : number => {

    if(!user?.ans == undefined) {
        return 0;
    }

    const score = user.ans.reduce((prev , curr , currIndex)=> prev + qWeight[curr][currIndex] , 0);

    return score;
}