import { User } from "./interfaces/User";
import { v4 as uuid4 } from "uuid";

let a: User = {uuid: uuid4(), name: "Bobby", age: 24, ans: 12, location: "pune" };

console.log(`User is ${a.uuid}, age is ${a.age}, location is ${a.location}`);