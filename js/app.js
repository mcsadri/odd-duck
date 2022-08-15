'use strict';

//console.log('On the other side of the screen, it all looks so easy.');

// Global variables
let voteCount = 0;
let maxVotes = 10;
let displayQty = 3;

// Product constructor
function Product(fileName) {
    this.name = fileName.substring(0, fileName.indexOf('.'));
    this.fileExt = fileName.split('.').pop(); // split() and pop() solution from https://sebhastian.com/javascript-filename-extension/
    this.filePath = `img/${fileName}`;
    this.countShown = 0;
    this.countVoted = 0;
}

// array of new Product objects where object name equals name of img asset
let allProducts = [
    new Product('bag.jpg'), new Product('banana.jpg'), new Product('bathroom.jpg'), new Product('boots.jpg'),
    new Product('breakfast.jpg'), new Product('bubblegum.jpg'), new Product('chair.jpg'), new Product('cthulhu.jpg'),
    new Product('dog-duck.jpg'), new Product('dragon.jpg'), new Product('pen.jpg'), new Product('pet-sweep.jpg'),
    new Product('scissors.jpg'), new Product('shark.jpg'), new Product('sweep.png'), new Product('tauntaun.jpg'),
    new Product('unicorn.jpg'), new Product('water-can.jpg'), new Product('wine-glass.jpg'),
];

// return a random index inside allProducts array
function randomImage() {
    // return a number 0 - index of last item in allProducts array
    return Math.floor(Math.random() * allProducts.length);
}

// Event listener for id=productButton
let button = document.getElementById('voteButton');
button.addEventListener('click', showNewImage);

// Event handler to show new image
function showNewImage() {
    let product = null;

    for (let i = 0; i < displayQty; i++) {
        // Get a random product
        product = allProducts[randomImage()];
        // select the img
        let img = document.getElementById(`productImage${i}`);
        // Make the img the product and assign img attributes

        // img.src = `img/${product.name}.${product.fileExt}`;
        img.src = product.filePath;
        console.log(product.filePath);
        console.log(product.fileExt);

        img.alt = product.name;
        img.title = product.name;

    }

    // icrement shown product's counter
    product.clicked++;
    console.log(product);
    voteCount++;
    // logic for when voting rounds have been completed:
    // after 10 rounds remove event listener
    if (voteCount === maxVotes) {
        // remove my event listener after 10 runs
        button.removeEventListener('click', showNewImage);
    }
}

showNewImage();
