'use strict';

//console.log('On the other side of the screen, it all looks so easy.');

// Global variables
let voteCount = 0;
let maxVotes = 10;

// Product constructor
function Product(name) {
    this.name = name;
    this.filePath = `img/${this.name}.jpg`;
    this.countShown = 0;
    this.countVoted = 0;
}

let allProducts = [
    new Product('bag'), new Product('banana'), new Product('bathroom'), new Product('boots'),
    new Product('breakfast'), new Product('bubblegum'), new Product('chair'), new Product('cthulhu'),
    new Product('dog-duck'), new Product('dragon'), new Product('pen'), new Product('pet-sweep'),
    new Product('scissors'), new Product('shark'), new Product('sweep'), new Product('tauntaun'),
    new Product('unicorn'), new Product('water-can'), new Product('wine-glass'),
];

// return a random index inside allProducts array
function randomImage() {
    // return a number 0 - index of last item in allProducts array
    return Math.floor(Math.random() * allProducts.length);
}

// Event listener for id=productButton
let button = document.getElementById('productButton');
button.addEventListener('click', showNewImage);

// Event handler to show new image
function showNewImage() {
    // DOM manipulation
    // Get a random product
    let product = allProducts[randomImage()];
    // select the img
    let img = document.getElementById('productImage1');
    // Make the img the product and assign img attributes
    img.src = `assets/${product.name}.jpg`;
    img.alt = product.name;
    img.title = product.name;
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
