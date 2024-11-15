
class User{

    constructor(name, ans){
        this.name = name;
        this.ans = ans;
    }

    calculateWeight(){
        return this.ans;
    }

}

module.exports = User;