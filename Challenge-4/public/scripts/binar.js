function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Binar {
  static populateCars = (cars) => {
    return cars.map((car) => {
      const isPositive = getRandomInt(0, 1) === 1;
      const timeAt = new Date();
      const mutator = getRandomInt(1000000, 100000000);
      const availableAt = new Date(timeAt.getTime() + (isPositive ? mutator : -1 * mutator))

      return {
        ...car,
        availableAt,
      };
    })
  }

  static async listCars(filterer) {
    let cars;
    let cachedCarsString = localStorage.getItem("CARS");

    if (!!cachedCarsString) {
      const cacheCars = JSON.parse(cachedCarsString);
      cars = this.populateCars(cacheCars);
    } else {
      const response = await fetch(
        "https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json"
      );
      const body = await response.json();
      cars = this.populateCars(body)

      localStorage.setItem("CARS", JSON.stringify(cars));
    }

    if (filterer instanceof Function) return cars.filter(filterer);

    return cars;
  }
}

let allCars;

Binar.listCars().then((cars) => {
  allCars = cars;
});

document.getElementById('btn-search').addEventListener('click', function () {
  //ambil data di form
  const selectedDriver = document.getElementById('driver').value;
  const selectedTanggalInput = document.getElementById('tanggal').value; // Get the date input value
  const selectedTanggal = new Date(selectedTanggalInput); // Convert the input value to a Date object
  const selectedJemput = document.getElementById('jemput').value;
  const selectedJmlPenumpang = document.getElementById('jmlPenumpang').value;
  
  
  // mengubah format time di json 
  function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  function filterCars(car) {
    // Extract the date portion of the availableAt property
    const carDate = new Date(car.availableAt);
    // Format the selected date as "yyyy-mm-dd"
    const formattedSelectedTanggal = selectedTanggal.toISOString().split('T')[0];
    // Apply filtering based on the selected criteria

    if (
      formattedSelectedTanggal >= carDate.toISOString().split('T')[0] &&
      selectedJemput >= formatTime(carDate) &&
      selectedJmlPenumpang <= car.capacity
    ) {
      return true; // Include the car in the filtered results
    }
    return false; // Exclude the car from the filtered results
  }

  function createCarElement(car) {
    const carElement = document.createElement('div');
    carElement.classList.add('col-md-4', 'col-sm-6', 'mb-4');
    carElement.innerHTML = `
      <div class="card">
        <img src="${car.image}" class="card-img-top" alt="${car.name}" style="height: 250px">
         <div class="card-body">
            <h5 class="card-title">${car.manufacture} ${car.model}</h5>
            <p class="fst fst-bold">Rp. ${car.rentPerDay} / hari</p>
            <p class="card-text">${car.description}</p>
            <div class=""><i class="fas fa-user"></i>  ${car.capacity} Orang</div>
            <div class=""><i class="fas fa-cogs"></i> ${car.transmission}</div>
            <div class=""><i class="fas fa-calendar"></i> ${car.year}</div>
            <a href="" class="btn btn-success w-100 mt-2 fw-bold" style="font-size: 14px;">Pilih Mobil</a>
          </div>
      </div>
    `;
    return carElement;
  }

  // Get the container where cars will be displayed
  const carsContainer = document.getElementById('cars-container');
  carsContainer.innerHTML = ''; // Clear previous results

  // Filter and display the cars
  const filteredCars = allCars.filter(filterCars);
  filteredCars.forEach((car) => {
    const carElement = createCarElement(car);
    carsContainer.appendChild(carElement);
  });
});
