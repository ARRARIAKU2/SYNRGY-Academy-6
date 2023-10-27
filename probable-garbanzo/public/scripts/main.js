const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class SearchFeature {
  constructor() {
    this.form = document.querySelector("#search-form");
    this.tanggal = document.querySelector("#tanggal");
    this.waktu = document.querySelector("#waktu");

    this.tanggal.value = params.tanggal;
    this.waktu.value = params.waktu;
  }

  _populateCars = (cars) => {
    return cars.map((car) => {
      const isPositive = getRandomInt(0, 1) === 1;
      const timeAt = new Date();
      const mutator = getRandomInt(1000000, 100000000);
      const availableAt = new Date(
        timeAt.getTime() + (isPositive ? mutator : -1 * mutator)
      ).toISOString();

      return {
        ...car,
        availableAt,
      };
    });
  };

  async fetchCars() {
    const carsLocal = window.localStorage.getItem("cars");
    if (carsLocal) {
      return JSON.parse(carsLocal);
    }

    const response = await fetch(
      "https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json"
    );
    const body = this._populateCars(await response.json());
    window.localStorage.setItem("cars", JSON.stringify(body));
    return body;
  }

  async filterCars() {
    const cars = await this.fetchCars();
    const tanggal = this.tanggal.value;
    const waktu = this.waktu.value;

    const availableCars = cars.filter((car) => {
      const carTanggal = car.availableAt.split("T")[0];
      const carWaktu = new Date(car.availableAt).getHours();

      if (carTanggal === tanggal && carWaktu <= +waktu) {
        return true;
      }
      return false;
    });
    return availableCars;
  }
}

class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    return `
      <div style="border: 1px solid black; margin: 1rem;">
        <p>id: <b>${this.id}</b></p>
        <p>plate: <b>${this.plate}</b></p>
        <p>manufacture: <b>${this.manufacture}</b></p>
        <p>model: <b>${this.model}</b></p>
        <p>available at: <b>${this.availableAt}</b></p>
        <img src="${this.image}" alt="${this.manufacture}" width="64px">
      </div>
    `;
  }
}

class Main {
  constructor() {
    this.result = document.querySelector("#result");
  }

  init() {
    const searchFeature = new SearchFeature();
    searchFeature.filterCars().then((availableCars) => {
      Car.init(availableCars);
      const cars = Car.list.map((car) => car.render());
      this.result.innerHTML = cars.join("\n");
    });
  }
}

const main = new Main();
main.init();
