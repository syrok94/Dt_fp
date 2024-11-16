import {v4 as uuid4} from 'uuid';
import { User } from '../interfaces/User';


export const activeUsers: User[] = [
    { uuid: uuid4(), userName: 'Alice Johnson', age: 28, ans: 42, city: 'New York', latitude: 40.7128, longitude: -74.0060 },
    { uuid: uuid4(), userName: 'Bob Smith', age: 35, ans: 36, city: 'California', latitude: 36.7783, longitude: -119.4179 },
    { uuid: uuid4(), userName: 'Charlie Brown', age: 40, ans: 27, city: 'Texas', latitude: 31.9686, longitude: -99.9018 },
    { uuid: uuid4(), userName: 'David Williams', age: 45, ans: 53, city: 'Florida', latitude: 27.9944, longitude: -81.7603 },
    { uuid: uuid4(), userName: 'Eve Taylor', age: 31, ans: 60, city: 'Washington', latitude: 47.7511, longitude: -120.7401 },
    { uuid: uuid4(), userName: 'Frank Miller', age: 27, ans: 15, city: 'Oregon', latitude: 43.8041, longitude: -120.5542 },
    { uuid: uuid4(), userName: 'Grace Lee', age: 50, ans: 72, city: 'Illinois', latitude: 40.6331, longitude: -89.3985 },
    { uuid: uuid4(), userName: 'Hank Harris', age: 38, ans: 84, city: 'Arizona', latitude: 34.0489, longitude: -111.0937 },
    { uuid: uuid4(), userName: 'Ivy Young', age: 22, ans: 93, city: 'Colorado', latitude: 39.5501, longitude: -105.7821 },
    { uuid: uuid4(), userName: 'Jack Scott', age: 60, ans: 28, city: 'Nevada', latitude: 38.8026, longitude: -116.4194 },
    { uuid: uuid4(), userName: 'Katie Green', age: 33, ans: 19, city: 'Michigan', latitude: 44.3148, longitude: -85.6024 },
    { uuid: uuid4(), userName: 'Luke Evans', age: 26, ans: 49, city: 'Indiana', latitude: 40.2672, longitude: -86.1349 },
    { uuid: uuid4(), userName: 'Mia Clark', age: 30, ans: 77, city: 'Kentucky', latitude: 37.8393, longitude: -84.2700 },
    { uuid: uuid4(), userName: 'Nate Adams', age: 55, ans: 62, city: 'Ohio', latitude: 40.4173, longitude: -82.9071 },
    { uuid: uuid4(), userName: 'Olivia Robinson', age: 41, ans: 84, city: 'North Carolina', latitude: 35.7596, longitude: -79.0193 },
    { uuid: uuid4(), userName: 'Paul Martinez', age: 29, ans: 37, city: 'New Jersey', latitude: 40.0583, longitude: -74.4057 },
    { uuid: uuid4(), userName: 'Quincy White', age: 39, ans: 19, city: 'Georgia', latitude: 33.7490, longitude: -84.3880 },
    { uuid: uuid4(), userName: 'Rachel King', age: 26, ans: 65, city: 'Tennessee', latitude: 35.5175, longitude: -86.5804 },
    { uuid: uuid4(), userName: 'Samuel Lee', age: 48, ans: 58, city: 'Missouri', latitude: 37.9643, longitude: -91.8318 },
    { uuid: uuid4(), userName: 'Sophia Davis', age: 36, ans: 23, city: 'Alabama', latitude: 32.8067, longitude: -86.7911 },
    { uuid: uuid4(), userName: 'Thomas Walker', age: 29, ans: 78, city: 'Minnesota', latitude: 46.7296, longitude: -94.6859 },
    { uuid: uuid4(), userName: 'Tina Martinez', age: 27, ans: 56, city: 'Kansas', latitude: 39.0119, longitude: -98.4842 },
    { uuid: uuid4(), userName: 'Walter Thomas', age: 41, ans: 85, city: 'Virginia', latitude: 37.4316, longitude: -78.6569 },
    { uuid: uuid4(), userName: 'lawdi Robinson', age: 32, ans: 12, city: 'Louisiana', latitude: 30.9843, longitude: -91.9623 },
    { uuid: uuid4(), userName: 'Ursula Robinson', age: 32, ans: 71, city: 'Louisiana', latitude: 30.9843, longitude: -91.9623 },
    // Add more users as needed
];