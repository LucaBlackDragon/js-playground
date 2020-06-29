// Type definitions for userService.js
// Project: JavaScript Playground
// Definitions by: Luca Nardi <l.nardi@pluservice.net>
//
// See also:
// https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html
// https://www.typescriptlang.org/docs/handbook/declaration-files/library-structures.html
// https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-function-d-ts.html

export = getUsers;

/**
 * Restituisce l'elenco degli utenti
 */
// declare function getUsers(): getUsers.User[];
// TODO:
// dopo aver convertito getUsers in una funzione asincrona (come indicato in
// userService.js) sostituire la dichiarazione con quella seguente:
declare function getUsers() : Promise<getUsers.User[]>;

declare namespace getUsers {

  /**
   * Sesso dell'utente
   * (come attualmente previsto dalle API di https://randomuser.me)
   */
  export type Gender = "male" | "female";

  /**
   * Dati dell'utente
   */
  export interface User {
    gender: Gender;
    name: Name;
    location: Location;
    email: string;
    login: Login;
    dob: BirthInfo;
    registered: RegistrationInfo;
    phone: string;
    cell: string;
    id: Id;
    picture: Picture;
    nat: string;
  }

  /**
   * Nome e titolo dell'utente
   */
  export interface Name {
    title: string;
    first: string;
    last: string;
  }

  /**
   * Indirizzo (via e numero civico)
   */
  export interface StreetAddress {
    number: number;
    name: string;
  }

  /**
   * Coordinate
   */
  export interface Coordinates {
    latitude: string;
    longitude: string;
  }

  /**
   * Timezone dell'utente
   */
  export interface Timezone {
    offset: string;
    description: string;
  }

  /**
   * Indirizzo completo dell'utente
   */
  export interface Location {
    street: StreetAddress;
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: Coordinates;
    timezone: Timezone;
  }

  /**
   * Dati per il login
   */
  export interface Login {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  }

  /**
   * Data di nascita ed età dell'utente
   */
  export interface BirthInfo {
    date: Date;
    age: number;
  }

  /**
   * Data di registrazione ed anni di registrazione dell'utente
   */
  export interface Registered {
    date: Date;
    age: number;
  }

  /**
   * Identificativo univoco dell'utente
   */
  export interface Id {
    name: string;
    value?: any;
  }

  /**
   * Fotografie/avatar dell'utente in tre qualità: large, medium e thumbnail
   */
  export interface Picture {
    large: string;
    medium: string;
    thumbnail: string;
  }
}
