import { User } from "./User";

let a: User = new User("Bobby", 12);

console.log(`User is ${a.name}, and weight is ${a.calculateWeight()}`);