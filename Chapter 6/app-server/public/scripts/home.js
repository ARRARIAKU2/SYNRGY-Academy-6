const { resourceLimits } = require("worker_threads");

console.log('home.js');
const elH1 = document.getElementById('heading1');
const button = document.getElementById('button-submit');

const carListContainer = document.getElementById('car-list-container');

async function getDetailCars(carId) {
  // url?carId=xxx
  // pending...
  // loading
  
  const carId = query.carId; // bukan promise
  try {
    
    const response = await fetch(`/cars?carId=${carId}`); // return value
    // const response = await fetch('/users'); // return value
    // const response = await fetch('/transactions'); // return value
    const results = await Promise.all([
      fetch('/carrs'), // array of Promise
      fetch('/users'),
      fetch('/transactions'),
    ]);

    results[0] -> /cars,
    results[1] -> /users,
    resourceLimits[2] -> /transactions

    const data = await response.json();
    console.log('data > ', data);
    containerListCar.innerHTML = renderData(data); // resolve
  } catch (error) {
    alert('error'); //reject
  }
  // fetch('/cars')
  //   .then((res) => {})
  //   .then((res) => {})
  //   .catch((err) => {});

  // addEventListener('submit', () => {});
}

function renderList() {
  carListContainer.innerHTML = `
        <div>
            id mobil: ${car.id}
            <button type="button" onclick="getDetailCars(${car.id})"></button>
        </div>
    `;
}
