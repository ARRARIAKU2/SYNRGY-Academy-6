const binar = new Binar()
binar.listCars();

function filterAja(cars) {
   if (tanggal === cars.availableAt) {
   return cars
}
}

const carsYgUdahDiFilter = binar.listCars(filterAja)