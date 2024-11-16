import { v4 as uuid4 } from "uuid";

export interface User{
    readonly uuid : string
    name : string
    age : number
    ans: number
    location : string
}
