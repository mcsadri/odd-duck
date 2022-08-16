'use strict';

//console.log('On the other side of the screen, it all looks so easy.');

// Global variables
let voteCount = 0; // user's product vote counter
let maxVotes = 10; // maximum number of product voting rounds
let displayQty = 3; // number of products to be displayed at one time for voting
let allProducts = [ // array of new Product objects where object name equals name of img asset
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
}

// function to return a random index for allProducts array
function rPG() { // the notorious Random Product Generator (this isn't a clever as I think it is)
    // returns a whole number 0 - index of last item in allProducts array
    return Math.floor(Math.random() * allProducts.length);
}

// Event listener for button id=productButton[i]
let buttons = []; // array to hold # of voteButtons = displayQty
for (let i = 0; i < displayQty; i++){
    buttons.push(`document.getElementById('voteButton${i}')`);
}
console.log(buttons);


for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('vote', loadImages);
}


// let button = document.getElementById('voteButton');
// button.addEventListener('vote', loadImages);

// Event handler to show new image
function loadImages() {

    let products = [];

    while (products.length < displayQty) {
        let index = rPG();
        while (!products.includes(allProducts[index])) {
            products.push(allProducts[index]);
        }
    }

    for (let i = 0; i < products.length; i++) {
        let img = document.getElementById(`productImage${i}`);
        img.src = products[i].filePath;
        img.alt = products[i].name;
        img.title = products[i].name;
        products[i].countShown++;
    }

    // logic to increment vote counters
    // product.countVoted++;
    // voteCount++;

    // logic for when voting rounds have been completed:
    // after 10 rounds remove event listener
    if (voteCount === maxVotes) {
        // remove my event listener after 10 runs
        button.removeEventListener('vote', loadImages);
    }

    ///////////////////////////////////////////////////////
    // let product = null;
    // for (let i = 0; i < displayQty; i++) {
    //     // Get a random product
    //     product = allProducts[rPG()];
    //     // select the img
    //     let img = document.getElementById(`productImage${i}`);
    //     // Make the img the product and assign img attributes
    //     img.src = product.filePath;
    //     img.alt = product.name;
    //     img.title = product.name;
    // }
    // // icrement shown product's counter
    // product.clicked++;
    // console.log(product);
    // voteCount++;
    // // logic for when voting rounds have been completed:
    // // after 10 rounds remove event listener
    // if (voteCount === maxVotes) {
    //     // remove my event listener after 10 runs
    //     button.removeEventListener('click', showNewImage);
    ////////////////////////////////////////////////////// }
}

loadImages();
