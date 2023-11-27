console.log('home.js');

const elH1: HTMLElement | null = document.getElementById('heading1');
const button: HTMLElement | null = document.getElementById('button-submit');
const carListContainer: HTMLElement | null = document.getElementById('car-list-container');

interface Car {
  id: number;
  // Add other properties as needed
};

async function getDetailCars(car: Car) {
  const response = await fetch(`/cars/${car.id}`);
};

function renderList(car: Car) {
  if (carListContainer) {
    carListContainer.innerHTML = `
        <div>
            id mobil: ${car.id}
            <button type="button" onclick="getDetailCars(${car.id})">Get Details</button>
        </div>
    `;
  };
};
