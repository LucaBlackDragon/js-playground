/**
 * Type Definitions dei tipi utilizzati in questo Playground
 * Vedi https://github.com/DefinitelyTyped/DefinitelyTyped per maggiori dettagli
 *
 * ATTENZIONE!
 * Guardare questo file troppo a lungo prima di aver fatto il corso TypeScript
 * può provocare allucinazioni, nausea e perdita di conoscenza nei casi più
 * gravi!
 */

declare namespace PlaygroundTypes {
  
  type Gender = "male" | "female";

  interface User {
    gender: Gender;
    name: Name;
    location: Location;
    email: string;
    login: Login;
    dob: Dob;
    registered: Registered;
    phone: string;
    cell: string;
    id: Id;
    picture: Picture;
    nat: string;
  }

  interface Name {
    title: string;
    first: string;
    last: string;
  }

  interface Street {
    number: number;
    name: string;
  }

  interface Coordinates {
    latitude: string;
    longitude: string;
  }

  interface Timezone {
    offset: string;
    description: string;
  }

  interface Location {
    street: Street;
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: Coordinates;
    timezone: Timezone;
  }

  interface Login {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  }

  interface Dob {
    date: Date;
    age: number;
  }

  interface Registered {
    date: Date;
    age: number;
  }

  interface Id {
    name: string;
    value?: any;
  }

  interface Picture {
    large: string;
    medium: string;
    thumbnail: string;
  }
}

export = PlaygroundTypes;
export as namespace PlaygroundTypes;
