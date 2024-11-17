import { v4 as uuid4 } from "uuid";

export interface User {
    readonly uuid: string
    firstName?: string
    lastName?: string
    userName: string
    email?: string
    age?: number
    mobileNo?: string
    ans: number[]
    gender?: string
    city?: string
    state?: string
    country?: string
    latitude?: number
    longitude?: number
}
