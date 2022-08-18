'use strict';

//console.log('On the other side of the screen, it all looks so easy.');

// Global variables
let voteCount = 0; // user's product vote counter
let maxVotes = 5; // maximum number of product voting rounds
let displayQty = 3; // number of products to be displayed at one time for voting
let prodObjs = []; // arrary of product objects
let allProducts = [ // eslint-disable-line
    // array of Product constructor calls where argumment value equals name of img asset
    new Product('bag.jpg'), new Product('banana.jpg'), new Product('bathroom.jpg'), new Product('boots.jpg'),
    new Product('breakfast.jpg'), new Product('bubblegum.jpg'), new Product('chair.jpg'), new Product('cthulhu.jpg'),
    new Product('dog-duck.jpg'), new Product('dragon.jpg'), new Product('pen.jpg'), new Product('pet-sweep.jpg'),
    new Product('scissors.jpg'), new Product('shark.jpg'), new Product('sweep.png'), new Product('tauntaun.jpg'),
    new Product('unicorn.jpg'), new Product('water-can.jpg'), new Product('wine-glass.jpg'),
];


// Product constructor
function Product(fileName) { // accepts new product as a filename e.g. bag.jpg
    this.name = fileName.substring(0, fileName.indexOf('.')); // name of product dervived from file name
    this.filePath = `img/${fileName}`; // storage location of product image file
    this.countShown = 0; // counts number of times the product has been displayed for voting
    this.countVoted = 0; // counts number of times the product has been chosen by the user
    prodObjs.push(this);
}

// function to return a random index for allProducts array
function rPG() { // the notorious Random Product Generator (this isn't nearly as clever as I think it is)

    let products = []; // array to hold selected products to be displayed to user for voting

    // generate disaplyQty number of randomly selected unique product images to be displayed to user
    while (products.length < displayQty) {
        // returns a whole number 0 - index of last item in allProducts array
        let index = Math.floor(Math.random() * prodObjs.length);
        while (!products.includes(prodObjs[index])) {
            products.push(prodObjs[index]);
            prodObjs[index].countShown++;
        }
    }

    // display each of the selected products and insert attribute values
    for (let i = 0; i < products.length; i++) {
        let img = document.getElementById(`productImage${i}`);
        img.src = products[i].filePath;
        img.alt = products[i].name;
        img.title = products[i].name;
    }
}

// Event listener for product voting buttons
let buttons = [document.getElementById('voteButton0'), document.getElementById('voteButton1'), document.getElementById('voteButton2')];
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', voteCounter);
}

// Event handler to increment vote trackers & remove event listener after maxVotes is reached
function voteCounter(event) {

    // logic to increment vote counters
    if (event){
        voteCount++;
        let target = event.target.alt;
        console.log('target ' + target);

        for (let i = 0; i < prodObjs.length; i++) {
            if (target === prodObjs[i].name) {
                prodObjs[i].countVoted++;
                //console.log('prodObjs[i] = ' +  )
                break;
            }
        }

        // logic for when voting rounds have been completed to remove the event handler
        if (voteCount === maxVotes) {
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].removeEventListener('click', voteCounter);
            }
        }
    }

    rPG();

    console.log('voteCount ' + voteCount);

    let shown  = [];
    for (let i = 0; i < prodObjs.length; i++) {
        shown.push(prodObjs[i].countShown);
    }
    console.log('shown ' + shown);

    let votes  = [];
    for (let i = 0; i < prodObjs.length; i++) {
        votes.push(prodObjs[i].countVoted);
    }
    console.log('votes ' + votes);
}

voteCounter();
