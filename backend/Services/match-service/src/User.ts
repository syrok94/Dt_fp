export class User{
    name : string;
    ans: number;
    constructor(name: string, ans: number) {
        this.name=name;
        this.ans = ans;
    }

    calculateWeight() {
        return this.ans;
    }

}
