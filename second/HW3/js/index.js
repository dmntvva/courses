'use strict';

/**
 * Class
 * @constructor
 * @param size - size of pizza
 * @param type - type of pizza
 * @throws {PizzaException} - in case of improper use
 */
function Pizza(size, type) {
    this.size = size;
    this.type = type;
    this.ingredients = [];
    if (size === undefined || type === undefined) {
        throw new PizzaException(`Required two arguments, given: ${arguments.length}`)
    }
    if (!Pizza.allowedSizes.includes(this.size.name)) {
        throw new PizzaException('Invalid size');
    }
    if (!Pizza.allowedTypes.includes(this.type.name)) {
        throw new PizzaException('Invalid type');
    }
}

Pizza.prototype.addExtraIngredient = function(ingredient) {
    if (arguments.length !== 1) {
        throw new PizzaException(`Required one argument, given: ${arguments.length}`);
    }
    if (ingredient === undefined) {
        throw new PizzaException('Invalid ingredient');
    }
    if (!Pizza.allowedExtraIngredients.includes(ingredient.name) && ingredient.name === undefined) {
        throw new PizzaException('Invalid ingredient');
    }
    if (this.type.name === Pizza.allowedTypes[0] && ingredient.name === Pizza.allowedExtraIngredients[2]) {
        throw new PizzaException('Invalid ingredient');
    }
    if (!this.ingredients.includes(ingredient)) {
        this.ingredients.push(ingredient);
    } else {
        throw new PizzaException('Duplicate ingredient');
    }
}
Pizza.prototype.removeExtraIngredient = function(ingredient) {
    if (arguments.length !== 1) {
        throw new PizzaException(`Required one argument, given: ${arguments.length}`);
    }
    if (ingredient === undefined) {
        throw new PizzaException('Invalid ingredient');
    }
    if (!Pizza.allowedExtraIngredients.includes(ingredient.name) && ingredient.name === undefined) {
        throw new PizzaException('Invalid ingredient');
    }
    if (this.ingredients.includes(ingredient)) {
        this.ingredients = this.ingredients.filter((ingr) => ingr !== ingredient);
    } else {
        throw new PizzaException('Invalid ingredient');
    }
    return this.ingredients;
}
Pizza.prototype.getExtraIngredients = function() {
    return this.ingredients.map(function(ingr) {
        return ingr.name;
    });
}
Pizza.prototype.getSize = function() {
    return this.size.name;
}
Pizza.prototype.getPrice = function() {
    return `${this.size.price + this.type.price+this.ingredients.map(function(ingr) {
        return ingr.price;
    }).reduce(function(prev,next){
        return prev+next;
    })}`;
}
Pizza.prototype.getPizzaInfo = function() {
    return `Size: ${this.getSize()}, type: ${this.type.name}; extra ingredients: ${this.getExtraIngredients().join(', ')}; price: ${this.getPrice()} UAH.`;
}

Pizza.allowedSizes = ['SMALL', 'MEDIUM', 'LARGE'];
Pizza.allowedTypes = ['VEGGIE', 'MARGHERITA', 'PEPPERONI'];
Pizza.allowedExtraIngredients = ['TOMATOES', 'CHEESE', 'MEAT'];

/* Sizes, types and extra ingredients */
Pizza.SIZE_S = {
    name: Pizza.allowedSizes[0],
    price: 50,
}
Pizza.SIZE_M = {
    name: Pizza.allowedSizes[1],
    price: 75,
}
Pizza.SIZE_L = {
    name: Pizza.allowedSizes[2],
    price: 100,
}

Pizza.TYPE_VEGGIE = {
    name: Pizza.allowedTypes[0],
    price: 50,
}
Pizza.TYPE_MARGHERITA = {
    name: Pizza.allowedTypes[1],
    price: 60,
}
Pizza.TYPE_PEPPERONI = {
    name: Pizza.allowedTypes[2],
    price: 70,
}

Pizza.EXTRA_TOMATOES = {
    name: Pizza.allowedExtraIngredients[0],
    price: 5,
}
Pizza.EXTRA_CHEESE = {
    name: Pizza.allowedExtraIngredients[1],
    price: 7,
}
Pizza.EXTRA_MEAT = {
    name: Pizza.allowedExtraIngredients[2],
    price: 9,
}

/**
 * Provides information about an error while working with a pizza.
 * details are stored in the log property.
 * @constructor
 */
function PizzaException(log) {
    this.log = log;
}

/* It should work */
//small pizza, type: veggie
// let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
// // add extra meat
// pizza.addExtraIngredient(Pizza.EXTRA_MEAT);
// // check price
// console.log(`Price: ${pizza.getPrice()} UAH`); //=> Price: 109 UAH
// // add extra corn
// pizza.addExtraIngredient(Pizza.EXTRA_CHEESE);
// // add extra corn
// pizza.addExtraIngredient(Pizza.EXTRA_TOMATOES);
// // check price
// console.log(`Price with extra ingredients: ${pizza.getPrice()} UAH`); // Price: 121 UAH
// // check pizza size
// console.log(`Is pizza large: ${pizza.getSize() === Pizza.SIZE_L}`); //=> Is pizza large: false
// // remove extra ingredient
// pizza.removeExtraIngredient(Pizza.EXTRA_CHEESE);
// console.log(`Extra ingredients: ${pizza.getExtraIngredients().length}`); //=> Extra ingredients: 2
// console.log(pizza.getPizzaInfo()); //=> Size: SMALL, type: VEGGIE; extra ingredients: MEAT,TOMATOES; price: 114UAH.

//examples of errors
// let pizza = new Pizza(Pizza.SIZE_S); // => Required two arguments, given: 1

// let pizza = new Pizza(Pizza.SIZE_S, Pizza.SIZE_S); // => Invalid type

let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
pizza.addExtraIngredient(Pizza.EXTRA_CHEESE);
pizza.addExtraIngredient(Pizza.EXTRA_CHEESE); // => Duplicate ingredient

// let pizza = new Pizza(Pizza.SIZE_S, Pizza.TYPE_VEGGIE);
// pizza.addExtraIngredient(Pizza.EXTRA_MEAT); // => Invalid ingredient