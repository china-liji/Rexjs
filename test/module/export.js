export let a = 1, b = 2;

export const c = 3;

const d = 4;

export default class {}

export function myFunction(){};

export class MyClass {}

export { a as x, b as y, d };

export * from "./a.js"

export { i as z } from "./a.js"


export const { A1, B1 } = new function(){

this.A1 = 11

this.B1 = 22;

}();