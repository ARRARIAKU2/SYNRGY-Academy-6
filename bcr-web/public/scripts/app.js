class Component {
  constructor() {}
  render() {}
}

class Car extends Component {
  displayListCar() {}
  filter() {}
  render() {
    return `
            <div>
                <h1>Render dari class Car</h1>
                <div>
                    <form>
                        <input id="manufacture" name="manufacture" />
                        <button type="submit">Cari</button>
                    </form>
                </div>
                <div>
                    list car ada di sini
                </div>
            </div>
        `;
  }
}

const appContainer = document.getElementById('list-cars');
const car = new Car();
appContainer.innerHTML = car.render();
