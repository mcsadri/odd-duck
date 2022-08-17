'use strict';

//console.log('On the other side of the screen, it all looks so easy.');

// Global variables
let voteCount = 0; // user's product vote counter
let maxVotes = 5; // maximum number of product voting rounds
let displayQty = 3; // number of products to be displayed at one time for voting
let newProducts = [];
let allProducts = [ // array of new Product objects where object name equals name of img asset
    new Product('bag.jpg'), new Product('banana.jpg'), new Product('bathroom.jpg'), new Product('boots.jpg'),
    new Product('breakfast.jpg'), new Product('bubblegum.jpg'), new Product('chair.jpg'), new Product('cthulhu.jpg'),
    new Product('dog-duck.jpg'), new Product('dragon.jpg'), new Product('pen.jpg'), new Product('pet-sweep.jpg'),
    new Product('scissors.jpg'), new Product('shark.jpg'), new Product('sweep.png'), new Product('tauntaun.jpg'),
    new Product('unicorn.jpg'), new Product('water-can.jpg'), new Product('wine-glass.jpg'),
];

let shown  = [];
for (let i = 0; i < allProducts.length; i++) {
    shown.push(allProducts[i].countShown);
}

let votes  = [];
for (let i = 0; i < allProducts.length; i++) {
    votes.push(allProducts[i].countVoted);
}

// Product constructor
function Product(fileName) { // accepts new product as a filename e.g. bag.jpg
    this.name = fileName.substring(0, fileName.indexOf('.')); // name of product dervived from file name
    this.filePath = `img/${fileName}`; // storage location of product image file
    this.countShown = 0; // counts number of times the product has been displayed for voting
    this.countVoted = 0; // counts number of times the product has been chosen by the user
    newProducts.push(this);
}

// function to return a random index for allProducts array
function rPG() { // the notorious Random Product Generator (this isn't nearly as clever as I think it is)
    // returns a whole number 0 - index of last item in allProducts array
    return Math.floor(Math.random() * allProducts.length);
}

// Event listener for product voting buttons
let buttons = [document.getElementById('voteButton0'), document.getElementById('voteButton1'), document.getElementById('voteButton2')];
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', loadImages);}

// Event handler to show new image
function loadImages(event) {

    let products = []; // array to hold selected products to be displayed to user for voting

    // generate disaplyQty number of randomly selected unique product images to be displayed to user
    while (products.length < displayQty) {
        let index = rPG();
        while (!products.includes(allProducts[index])) {
            products.push(allProducts[index]);
        }
    }

    // display each of the selected products and insert attribute values
    for (let i = 0; i < products.length; i++) {
        let img = document.getElementById(`productImage${i}`);
        img.src = products[i].filePath;
        img.alt = products[i].name;
        img.title = products[i].name;
        newProducts[i].countShown++;
    }

    // logic to increment vote counters
    if (event){
        let target = event.target.alt;
        //newProducts[newProducts.indexOf(target)].countVoted++;
        voteCount++;

        console.log('target ' + target);
        //console.log(event.target);

        // logic for when voting rounds have been completed:
        if (voteCount === maxVotes) {
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].removeEventListener('click', loadImages);
            }
        }
    }

    console.log(voteCount);
    console.log('shown ' + shown);
    console.log('votes ' + votes);
}

loadImages();
