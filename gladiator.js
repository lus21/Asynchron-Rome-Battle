const x = 10;
const gladiators = [];
let stopWar = false;
const Gladiator = function (name, health, power, speed) {
    const randomHealth = Math.floor(Math.random() * 20) + 80,
          randomSpeed = Math.floor((Math.random() * 3+2)*1000)/1000;
    this.name = faker.name.findName();
    this.health = randomHealth;
    this.power = Math.floor((Math.random() * 3+2)*10)/10;
    this.speed = randomSpeed;
    this.initialHealth = randomHealth;
    this.initialSpeed = randomSpeed;
}

function generateGladiators() {
    for (let i = 0; i<x; i++) {
        const randomGladiator = new Gladiator();
        gladiators.push(randomGladiator)
    }
}
generateGladiators();

function hitGladiator(gladiatorIndex){
    if (stopWar) {
        return;
    }
    if (gladiators.length == 1) { 
        console.log(gladiators[0].name + " won the battle with health x" + gladiators[0].health);
        stopWar = true;
        return;
    }
    const currentGladiator = gladiators[gladiatorIndex],
          randomGladiatorIndex = randomGladiatorIndexFunction(gladiatorIndex);
          randomGladiator = gladiators[randomGladiatorIndex];
    console.log(currentGladiator.name + " x " +  currentGladiator.health + " hits "  + randomGladiator.name + " x " +  randomGladiator.health + " with power" + currentGladiator.power);
    randomGladiator.health = randomGladiator.health - currentGladiator.power;
    randomGladiator.speed = (randomGladiator.initialSpeed*(randomGladiator.health/randomGladiator.initialHealth)).toFixed(3);
    if (randomGladiator.health <= 0){
        gladiatorDie(randomGladiatorIndex);
    } else if (15 <= randomGladiator.health && randomGladiator.health <= 30) {
        randomGladiator.speed = (randomGladiator.speed)*3;
    }
    setTimeout(hitGladiator, 5000/gladiators[gladiatorIndex].speed, gladiatorIndex);
};
function gladiatorDie(gladiatorIndex) {
    stopWar = true;
    console.log(gladiators[gladiatorIndex].name + " dying");
    const CaesarDecision = Math.floor(Math.random() * 2); //0-Finish him(gladiator leaves the arena), 1- "Live" (gladiator recovers and get +50 health points)
    const logCaesarDecision = CaesarDecision ? "Caesar showed 👍| " +  gladiators[gladiatorIndex].name : "Caesar showed 👎 to " + gladiators[gladiatorIndex].name;    
    if(CaesarDecision == 0){
        gladiators.splice(gladiatorIndex, 1);
        if (gladiators.length == 1) { 
            console.log(gladiators[0].name + " won the battle with health x" + gladiators[0].health);
            stopWar = true;
        }
    } else if(CaesarDecision == 1){
        gladiators[gladiatorIndex].health += 50;
    }
    console.log(logCaesarDecision);
    stopWar = false;
    start();
}
console.log(gladiators);
function randomGladiatorIndexFunction(gladiatorIndex) {
    randomIndex = Math.floor(Math.random()*gladiators.length);
    if (randomIndex == gladiatorIndex) {
        randomGladiatorIndexFunction();
    }
    return randomIndex;
} 
function start () {
    if (stopWar) {
        return;
    }
    if (gladiators.length == 1) { 
        console.log(gladiators[0].name + " won the battle with health x" + gladiators[0].health);
        stopWar = true;
        return;
    }
    gladiators.forEach(function(gladiator, index) {
        hitGladiator(index);
    });
}
start();