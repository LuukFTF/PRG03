function upperFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

let dish = 'spaghetti';

let capitalizeDish = upperFirstLetter(dish);

console.log(dish, capitalizeDish)