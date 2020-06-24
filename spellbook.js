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
