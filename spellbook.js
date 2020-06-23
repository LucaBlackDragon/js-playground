/**
 * Crea un array contenente una sequenza di numeri lunga length
 * in cui il primo valore è startingValue (default 0) e i valori
 * successivi sono ottenuti aggiungendo increment (default 1) ad
 * ogni passo, fino a riempire l'array.
 * Ad esempio, `makeNumberSequence(10)` genera un array contenente
 * i numeri da 0 a 9; `makeNumberSequence(5, 1, 2)` genera un array
 * contenente le cifre dispari (1, 3, 5, 7, 9)
 * @param {number} length          lunghezza della sequenza
 * @param {number} [startingValue] valore iniziale (default 0)
 * @param {number} [increment]     passo della sequenza (default 1)
 * @returns {number[]} sequenza di numeri
 */
export function makeLinearSequence(length, startingValue = 0, increment = 1) {
  return [...Array(length).keys()].map(i => startingValue + (i * increment));
}

/**
 * Calcola l'età all'anno di riferimento a partire dall'anno di nascita.
 * Se l'anno di riferimento non viene specificato, viene utilizzato per default
 * l'anno corrente
 * @param {number} yearOfBirth Anno di nascita
 * @param {number} currentYear Anno di riferimento rispetto a cui calcolare l'età (default: anno corrente)
 * @returns {number} età
 */
export function getAge(yearOfBirth, currentYear = new Date().getFullYear()) {
  return Math.max(0, currentYear - yearOfBirth);
}
