const a: number = 1;
const pi: number = 3.14;
const namas: string = 'Anton';
const cities: Array<string> = ['Balikpapan', 'Aceh', 'Lampung'];
const car: object = {
  brand: 'esemka',
  color: 'Blue',
  top_speed_kmh: 330,
};

let angka: number[] = [1, 2, 3, 4, 5]; // Array of numbers
let nama: string[] = ["Alice", "Bob", "Charlie"]; // Array of strings
let mixed: (number | string)[] = [1, "two", 3, "four"]; // Array of numbers or strings
let person: [string, number] = ["Alice", 30];

let numbers: Array<number> = [1, 2, 3, 4, 5]; // Array of numbers
let names: Array<string> = ["Alice", "Bob", "Charlie"]; // Array of strings

let coordinates: Array<[number, number]> = [
  [1, 2],
  [3, 4]
];

let orang: Array<{ name: string, age: number }> = [
  { name: "Alice", age: 30 }, 
  { name: "Bob", age: 25 }
];

type Person = {
  name: string;
  age: number;
};

// Create an array of objects
const people: Person[] = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 },
];

enum Color {
  red = 1,
  green = 2,
  blue = 3
}

let favoriteColor: Color = Color.blue;

