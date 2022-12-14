'use strict';

//console.log('On the other side of the screen, it all looks so easy.');

// Global variables
let voteCount = 0; // user's product vote counter
let maxVotes = 5; // maximum number of product voting rounds
let displayQty = 3; // number of products to be displayed at one time for voting
let allProducts = [ // eslint-disable-line
    // array of Product constructor calls where argumment value equals name of img asset
    new Product('bag.jpg'), new Product('banana.jpg'), new Product('bathroom.jpg'), new Product('boots.jpg'),
    new Product('breakfast.jpg'), new Product('bubblegum.jpg'), new Product('chair.jpg'), new Product('cthulhu.jpg'),
    new Product('dog-duck.jpg'), new Product('dragon.jpg'), new Product('pen.jpg'), new Product('pet-sweep.jpg'),
    new Product('scissors.jpg'), new Product('shark.jpg'), new Product('sweep.png'), new Product('tauntaun.jpg'),
    new Product('unicorn.jpg'), new Product('water-can.jpg'), new Product('wine-glass.jpg'),
];
let lastDisplayed = []; // array to hold the products that were previously displayed for voting to be used for comparison on the nextr round to avoid repeating images on subsequent voting rounds

// Product constructor
function Product(fileName) { // accepts new product as a filename e.g. bag.jpg
    this.name = fileName.substring(0, fileName.indexOf('.')); // name of product dervived from file name
    this.filePath = `img/${fileName}`; // storage location of product image file
    this.countShown = 0; // counts number of times the product has been displayed for voting
    this.countVoted = 0; // counts number of times the product has been chosen by the user
}

// function to return a random index for allProducts array
function rPG() { // the notorious Random Product Generator (this isn't nearly as clever as I think it is)
    let products = []; // array to hold selected products to be displayed to user for voting
    // generate disaplyQty number of randomly selected unique product images to be displayed to user
    while (products.length < displayQty) {
        // returns a whole number 0 - index of last item in allProducts array
        let index = Math.floor(Math.random() * allProducts.length);
        // prevent repeating a product that's 1) already in this voting round or 2) displayed in the previous voting round
        while (!products.includes(allProducts[index]) && !lastDisplayed.includes(allProducts[index])) {
            // add randomly selected product to this voting round
            products.push(allProducts[index]);
            // increment display counter for randomly selected product
            allProducts[index].countShown++;
        }
    }

    // display each of the selected products and insert attribute values
    for (let i = 0; i < products.length; i++) {
        let img = document.getElementById(`productImage${i}`);
        img.src = products[i].filePath;
        img.alt = products[i].name;
        img.title = products[i].name;
    }
    lastDisplayed = products;
}

// function to display View Results button after voteCount === maxVotes, and add event listener for said button
function displayButton() {
    // display button viewResultsBtn
    document.getElementById('viewResults').innerHTML = '<input type="button" id="viewResultsBtn" value="View Results"/>';
    // event listener to invoke renderResults when button is clicked
    let viewResultsBtn = document.getElementById('viewResultsBtn');
    viewResultsBtn.addEventListener('click', renderResults);
}

// function to render chart of voting results
function renderChart() {
    let productNames = [];
    let voted  = [];
    let shown  = [];
    for (let i = 0; i < allProducts.length; i++) {
        productNames.push(allProducts[i].name);
        voted.push(allProducts[i].countVoted);
        shown.push(allProducts[i].countShown);
    }

    // chart to display voting results - based on code example from https://www.chartjs.org/docs/latest/getting-started/usage.html
    const ctx = document.getElementById('chartVotes').getContext('2d');
    const chartVotes = new Chart(ctx, { // eslint-disable-line
        type: 'bar',
        data: {
            labels: productNames,
            datasets: [{
                label: '# of Votes',
                data: voted,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            },
            {
                label: '# of Displays',
                data: shown,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    });
}

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

// for lab 13:
// Steps for local storage:
// 	1. Setting items
// 		a. JSON.stringify()  - turns javascript object into JSON object
// 		b. localStorage.setItem("key", "value")
// 	2. Getting items
// 		a. localStorage.getItem("key")
//      b. JSON.parse(variable)

// function setAllProducts()
function setItems(key, value){
    // step 1a
    let stringifyVersion = JSON.stringify(value);
    // step 1b
    localStorage.setItem(key, stringifyVersion);
}

// function getAllProducts()
function getItems(key) {
    // step 2a
    let stringifyVersion = localStorage.getItem(key);

    // step 2b
    let parsedVersion = JSON.parse(stringifyVersion);

    return parsedVersion;
}

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////


// Event listener for product voting buttons
let buttons = [document.getElementById('voteButton0'), document.getElementById('voteButton1'), document.getElementById('voteButton2')];
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', voteCounter);
}

// Event handler to increment vote trackers & remove event listener after maxVotes is reached
function voteCounter(event) {
    // invoke the getAllProducts() function here
    if (getItems('allProducts')){ // brings in item only if it already exists
        allProducts = getItems('allProducts');
    }
    console.log(allProducts);

    // increment vote counters on a user slection
    if (event){
        voteCount++;
        let target = event.target.alt;
        for (let i = 0; i < allProducts.length; i++) {
            if (target === allProducts[i].name) {
                allProducts[i].countVoted++;
                // function call to update local storage with vote
                break;
            }
        }
        // when voting rounds have been completed remove the event handler, display Print Results button, and exit the function
        if (voteCount === maxVotes) {
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].removeEventListener('click', voteCounter);
                document.getElementById('productButtons').innerHTML = '';
            }
            // invoke the setItems function here
            setItems('allProducts', allProducts);

            displayButton();
            return;
        }
    }
    // get new products to display
    rPG();


}

// event handler to display voting results
function renderResults() { // function solution in part via Brandon Mizutani @ https://github.com/bran2miz/bus-mall/blob/lab-11-bus-mall/js/app.js
    // remove button since the event listener is out of scope in a different function
    document.getElementById('viewResults').innerHTML = '';
    // display voting results chart
    renderChart();
    // create unordered list to hold voting results
    let votingResults = document.getElementById('viewResults');
    let ul = document.createElement('ul');
    votingResults.appendChild(ul);
    // create list items to display voting results for each product
    for (let i = 0; i < allProducts.length; i++) {
        let li = document.createElement('li');
        li.textContent = `${allProducts[i].name} had ${allProducts[i].countVoted} votes, and was seen ${allProducts[i].countShown} times.`;
        // set element ID for even numbered products to apply color shading
        if (i % 2 === 0){
            li.setAttribute('id', 'shaded');
        }
        ul.appendChild(li);
    }
}

voteCounter();
