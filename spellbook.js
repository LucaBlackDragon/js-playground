/**
 * Questo file contiene un assortimento di funzioni utilizzate nel resto del
 * programma. Estenderlo a piacere!
 */

/**
 * Genera un colore a caso in formato HEX (e.g. #3666f3)
 * @returns {string} rappresentazione HEX del colore
 */
export function randomColor() {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
}

/**
 * Genera un numero intero compreso fra min (incluso) e max (escluso)
 * @param {number} max Valore massimo
 * @param {number} [min] Valore minimo (default = 0)
 * @returns {number} Numero intero random
 * @see https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
export function getRandomInt(max, min = 0) {
  min = Math.ceil(min);
  max = Math.floor(max);
  // il max è escluso e il min è incluso
  return Math.floor(Math.random() * (max - min)) + min;
}