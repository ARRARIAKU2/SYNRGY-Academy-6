class App {
  constructor() {
    // this.offCanvass = document.getElementById("offCanvass");
    this.date = document.getElementById("tanggal");
    this.time = document.getElementById("jemput");
    this.passenger = document.getElementById("jmlPenumpang");
    this.typeDriver = document.getElementById("driver");
    this.loadButton = document.getElementById("btn-search");
    this.carContainerElement = document.getElementById("cars-container");
  }

  async init() {
    await this.load();

    // Register click listener
    this.loadButton.onclick = this.run;
  }

  run = () => {
    this.clear();
    // this.offCanvass.style.display = "none";
    const filter = {
      dateTime: new Date(`${this.date.value}T${this.time.value}`),
      passenger: this.passenger.value,
      typeDriver: this.typeDriver.value,
    };

    if (
      this.date == "" ||
      this.time == "" ||
      this.passenger == "" ||
      this.typeDriver == ""
    ) {
      alert("Please fill all fields");
    } else {
      Car.list.forEach((car) => {
        const timeCarJSON = new Date(car.availableAt).getTime();
        if (
          timeCarJSON >= filter.dateTime.getTime() &&
          car.available == true &&
          car.capacity >= filter.passenger
        ) {
          const node = document.createElement("div");
          node.classList.add(
            "d-flex",
            "flex-lg-column",
            "card-car-result",
            "row-gap-lg-2"
          );
          node.innerHTML = car.render();
          this.carContainerElement.appendChild(node);
        }
      });
    }
  };

  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
