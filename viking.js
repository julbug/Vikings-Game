// Soldier
class Soldier {

    constructor(theHealthArg, theStrengthArg) {
        this.health = theHealthArg;
        this.strength = theStrengthArg;
        }
        attack(){
            return this.strength;
        }
        receiveDamage(theDamageArg){
            this.health -= theDamageArg;
        }
  }

// Viking
class Viking extends Soldier{

    constructor(theNameArg, theHealthArg, theStrengthArg){
        super (theHealthArg, theStrengthArg);
        this.name = theNameArg;
        }

        receiveDamage(amount){
            super.receiveDamage(amount);
            if (this.health > 0){
            return `${this.name} has received ${amount} points of damage`
            } else {
            return `${this.name} has died in act of combat`
        }      
    }

        battleCry = function(){
            return 'Odin Owns You All!'
        }
}


// Saxon
class Saxon extends Soldier{

    receiveDamage(amountOfDmg){
        super.receiveDamage(amountOfDmg);
        if (this.health > 0){
        return `A Saxon has received ${amountOfDmg} points of damage`
        } else {
        return "A Saxon has died in combat"
    }      
}
}


// War
class War {

    constructor() {
        this.vikingArmy = [];
        this.saxonArmy = [];
    }

    addViking(viking) {
        this.vikingArmy.push(viking);
    }

    addSaxon(saxon) {
        this.saxonArmy.push(saxon);
    }

    removeDeadBodies = (whichArmy) => {
        whichArmy.forEach((eachSoldier, ind)=>{
          if(eachSoldier.health <=0){
            whichArmy.splice(ind, 1);
          }
        })
      }
    
      generateRandomSoldier = (whichArmy) => {
        let randomSoldierNumber = Math.floor(Math.random() * whichArmy.length);
        let randomSoldier = whichArmy[randomSoldierNumber];
        return randomSoldier;
      }   

    vikingAttack = () =>{

        let randomViking = this.generateRandomSoldier(this.vikingArmy);
        let randomSaxon = this.generateRandomSoldier(this.saxonArmy);
        let result = randomSaxon.receiveDamage(randomViking.attack());
        this.removeDeadBodies(this.saxonArmy);
        return result;
      }

    
    saxonAttack = () => {  
        let randomViking = this.generateRandomSoldier(this.vikingArmy);
        let randomSaxon = this.generateRandomSoldier(this.saxonArmy);
        let result = randomViking.receiveDamage(randomSaxon.attack());
        this.removeDeadBodies(this.vikingArmy);
        return result;
      }

    
    showStatus(){

        if (!this.saxonArmy.length) {
            return "Vikings have won the war of the century!";
        } else if (!this.vikingArmy.length) {
            return "Saxons have fought for their lives and survived another day...";
        } else {
            return "Vikings and Saxons are still in the thick of battle.";
        }
    
    }
}


let newWar = new War()

let newName = document.querySelector('.inputName');
let newHealth = document.querySelector('.inputHealth');
let newStrength = document.querySelector('.inputStrength');


document.querySelector('.addVikingBtn').onclick = () =>{
    let newName = document.querySelector('.inputName');
    let newHealth = document.querySelector('.inputHealth');
    let newStrength = document.querySelector('.inputStrength');
    myFunction();
    let viking1 = new Viking(newName.value, newHealth.value, newStrength.value);
    newWar.addViking(viking1);
    for(i=0;i<5;i++){
        viking1[i]
        console.log(viking1[i])
    }
    updateStatus();
}


function myFunction(){
    document.querySelector('.viking').style.visibility = 'visible'
}


let vikingsTurn = true;

document.querySelector(".attack-btn").onclick = function(){
   
    if(vikingsTurn === true){
    newWar.vikingAttack();
    } else if (vikingsTurn !== true){
    newWar.saxonAttack();
    } 
    changeButtonText();
    vikingsTurn = !vikingsTurn;
    updateStatus();
    showStatusOfWar();

};

function changeButtonText(){
    let changeBtnText = document.querySelector(".attack-btn button")
    if(changeBtnText.innerText === "Viking Attack"){
    changeBtnText.innerText = "Saxon Attack";
    } else if (changeBtnText.innerText === "Saxon Attack"){
    changeBtnText.innerText = "Viking Attack";
    } 
};


function updateStatus(){    
    for(let i = 0; i < 5; i++){
        let vikingName = document.querySelectorAll('.name span')[i];
        let vikingHealth = document.querySelectorAll('.health span')[i];
        let vikingStrength = document.querySelectorAll('.strength span')[i];
       

        if(newWar.vikingArmy[i]){
            vikingName.innerText = newWar.vikingArmy[i].name;
            vikingHealth.innerText = newWar.vikingArmy[i].health;
            vikingStrength.innerText = newWar.vikingArmy[i].strength;
        } else {
            vikingName.innerText = "RIP"
            vikingHealth.innerText = "RIP";
            vikingStrength.innerText = "RIP";
        } 

    }
    for(let i = 0; i < 5; i++){
         let saxonHealth = document.querySelectorAll('.health2 span')[i];
         let saxonStrength = document.querySelectorAll('.strength2 span')[i];

         if(newWar.saxonArmy[i]){
            saxonHealth.innerText = newWar.saxonArmy[i].health;
            saxonStrength.innerText = newWar.saxonArmy[i].strength;
         } else {
            saxonHealth.innerText = "RIP";
            saxonStrength.innerText = "RIP";
         } 
        
          // if there are this many saxons then run the next two lines, otherwise do the next to line but saxonHealth.innerText = dead
    }
};

  updateStatus();

  function showStatusOfWar () {
    const status = document.querySelector('.status span');
    status.innerText = newWar.showStatus();
  }