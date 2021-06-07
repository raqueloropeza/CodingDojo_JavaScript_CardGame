class Card{
    constructor(name, cost){
        this.name = name;
        this.cost = cost; 
    }

    showCard(){
        console.log(`Name: ${this.name}, Cost: ${this.cost}`)
    }

}

//Unit class inherits from Card class and has default power and resilience of 0. Units are played to gain control of the board and will battle with units played by an opponent.

class Unit extends Card {
    constructor(name, cost, power=0, res=0){
        super(name, cost);
        this.power = power; 
        this.res = res; 
    }


    showStats(){
        const card = super.showCard(); 
        console.log(`Power: ${this.power}, Resilience: ${this.res}`)
    }

    attack(target) {
        target.res -= this.power;
        console.log(`${this.name} attacked ${target.name} with ${this.power}. ${target.name} now has ${target.res} resilience.`)
        //reduce target res by power
    }
}

//Effect class inherits from Card class and has additional attributes text, stat, and magnitude.
//Effect cards increase or decrease either the power or the resilience of the "Unit" that they target

class Effect extends Card {
    constructor(name, cost, text, stat, magnitude){
        super(name, cost);
        this.text = text; 
        this.stat = stat;
        this.magnitude = magnitude;

    }
    play (target) {
        if (target instanceof Unit){
            if (this.stat == "resilience"){
                target.res += this.magnitude
                console.log(`${this.name} was played to ${this.text}.  ${target.name} now has ${target.res} resilience.`)
            }
            else{
                target.power += this.magnitude
                console.log(`${this.name} was played to ${this.text}.  ${target.name} now has ${target.power} power.`)
            }
        }
        else {
            throw new Eror( "Target must be a unit!");
        }
    }

}

const unit1 = new Unit("Red Belt Ninja", 3, 3, 4)
const unit2 = new Unit ("Black Belt Ninja", 3, 5, 4)
const effect1 = new Effect("Hard Algorithm", 2, "Increase target's resilience by 3", "resilience", 3)
const effect2 = new Effect("Unhandled Promise Rejection", 1, "reduce target's resilience by 2", "resilience", -2)
const effect3 = new Effect("Pair Programming", 3, "increase target's power by 2", "power", 2)

unit1.showStats();
unit2.showStats();
effect1.play(unit1);
effect2.play(unit1);
effect3.play(unit1);
unit1.showStats();
unit2.showStats();
unit1.attack(unit2);
unit2.showStats()
