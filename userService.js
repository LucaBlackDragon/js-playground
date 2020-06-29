import users from './users.js';

/**
 * Restituisce l'elenco degli ipotetici utenti della nostra applicazione
 */
export default function getUsers() {

  return users;

  // TODO:
  // convertire questa funzione in una funzione asincrona e richiedere i dati
  // dalle API effettuando una chiamata http GET a questo URL:
  // https://randomuser.me/api/?results=500
  // invece che importare i dati dal file users.js
  //
  // Per le chiamate http, i più coraggiosi possono utilizzare il JavaScript
  // "puro" ovvero l'antico e terribile oggetto XMLHttpRequest:
  // https://www.taniarascia.com/how-to-connect-to-an-api-with-javascript/
  //
  // Oppure si può optare per la più moderna Fetch API introdotta da WHATWG/W3C
  // (ed implementata ormai da tutti i browser più moderni):
  // https://developer.mozilla.org/it/docs/Web/API/Fetch_API/Using_Fetch
  //
  // Generalmente però si utilizzano librerie ad hoc, ad esempio Axios:
  // https://github.com/axios/axios
  // Dopo averla installata utilizzando npm, importarla con l'istruzione:
  // import axios from 'axios';
  // (oppure con la sintassi CommonJs suggerita dalla documentazione)
  // 
  // NB: Fetch API e Axios (e molte librerie simili) offrono un'API asincrona
  //     (ovvero basata sulle Promise), mentre l'antico e terribile oggetto
  //     XMLHttpRequest è ancora basato sul vecchio pattern delle callback
  //     (questa è solo una delle tante caratteristiche che lo rendono antico e
  //     terribile), quindi se si sceglie di utilizzarlo bisogna "wrappare" il
  //     callback pattern con una Promise, ad es:
  //
  //     function myCallbackPatternStyleFunctionWrappedInAPromise() {
  //       
  //       let resolve, reject;
  //       const promiseWrapper = new Promise((_resolve, _reject) => {
  //         resolve = _resolve; 
  //         reject = _reject; 
  //       });
  //       
  //       function successCallback (result) { resolve(result); }
  //       function errorCallback (err) { reject(err); }
  //       
  //       myCallbackPatternStyledFunction(arg1, arg2, successCallback, errorCallback);
  //       
  //       return promiseWrapper;
  //
  //     }
  //
  // NB2: Una volta resa asincrona la funzione getUsers, aggiornare anche la sua
  //      interfaccia nel file userService.d.ts (è già pronta e commentata)
  
}
