console.log('home.js');
const elH1 = document.getElementById('heading1');
const button = document.getElementById('button-submit');

const carListContainer = document.getElementById('car-list-container');

async function getDetailCars(carId) {
  const response = await fetch(`/cars/${carId}`);
}

function renderList() {
  carListContainer.innerHTML = `
        <div>
            id mobil: ${car.id}
            <button type="button" onclick="getDetailCars(${car.id})"></button>
        </div>
    `;
}
