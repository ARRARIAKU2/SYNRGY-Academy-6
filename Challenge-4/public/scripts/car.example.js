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
      <div class="d-flex flex-lg-column row-gap-lg-1">
        <img src="${this.image}" alt="${this.manufacture}" class="result-image" />
        <p class="mt-lg-4">${this.type}</p>
        <p class="fw-bold fs-5">Rp. ${this.rentPerDay}/Day</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus
          voluptatum, praesentium distinctio blanditiis odit error!
        </p>
        <div><span class="me-lg-2"><i class="bi bi-people-fill"></i></span>${this.capacity} Orang</div>
        <div><span class="me-lg-2"><i class="bi bi-gear"></i></span>${this.transmission}</div>
        <div><span class="me-lg-2"><i class="bi bi-calendar"></i></span>${this.year}</div>
      </div>
      <button class="btn btn-success">Pilih Mobil</button>`
  }
}
