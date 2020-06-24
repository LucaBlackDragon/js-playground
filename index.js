// Documentazione: https://minicss.org/docs
// (https://parceljs.org/css.html per chi è stupito di importare un file CSS
// in JavaScript)
import './node_modules/mini.css/dist/mini-default.css';

// Documentazione: https://www.chartjs.org/docs/latest/
// Esempi: https://www.chartjs.org/samples/latest/
import Chart from 'chart.js';

// Dipendenze interne
import { randomColor } from './spellbook.js';
import localUsers from './users';

// Impostazioni di default e helper per ChartJs:

const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  layout: {
    padding: {
      bottom: 5,
      left: 5,
      right: 5,
      top: 5,
    }
  },
  legend: {
    position: 'left',
  }
}

const makeTopTitle = (text) => ({
  title: {
    display: true,
    position: 'top',
    text,
    fontSize: 24,
  }
});

const getChartContext = (canvasElementId) => document.getElementById(canvasElementId).getContext('2d');

// Funzione principale di aggiornamento dei dati della dashboard:

function updateDashboardData(users) {

  // Aggiorno i contatori degli utenti:
  
  document.querySelector('#total-users').innerHTML = users.length;
  // TODO: aggiornare le altre componenti del riquadro "Statistiche utenti"
  
  // Sesso degli utenti:

  const genderData = [45, 55]; // TODO: ricavare dai dati degli utenti
  
  new Chart(getChartContext('users-gender'), {
    type: 'pie',
    data: {
      labels: ['M', 'F'],
      datasets: [
        {
          data: genderData,
          backgroundColor: [
            '#2b2bff',
            '#ff57ae',
          ]
        }
      ]
    },
    options: {
      ...defaultChartOptions,
      ...makeTopTitle('Sesso degli utenti'),
    }
  });
  
  // Nazionalità degli utenti:

  const nationalityData = [
    {
      nationality: 'Italy',
      count: 32,
    },
    {
      nationality: 'United States',
      count: 58,
    },
    {
      nationality: 'Chile',
      count: 10,
    },
  ]; // TODO: ricavare dai dati degli utenti
  
  new Chart(getChartContext('users-nationality'), {
    type: 'doughnut',
    data: {
      labels: nationalityData.map(({ nationality }) => nationality),
      datasets: [
        {
          data: nationalityData.map(({ count }) => count),
          backgroundColor: nationalityData.map(() => randomColor()),
        }
      ]
    },
    options: {
      ...defaultChartOptions,
      ...makeTopTitle('Nazionalità degli utenti'),
    }
  });

  // Utenti per fasce di età:

  // TODO:
  // ottenere una o più strutture dati per suddividere gli utenti nelle
  // seguenti fasce di età: [0,18),[18,40),[40,65),[65,100+]
  // e generare `labels` e `data` nella configurazione del grafico:
  
  new Chart(getChartContext('users-ages'), {
    type: 'bar',
    data: {
      labels: ['0-100+'], // TODO: sostituire
      datasets: [
        {
          backgroundColor: randomColor(),
          data: [users.length], // TODO: sostituire
        }
      ]
    },
    options: {
      ...defaultChartOptions,
      ...makeTopTitle('Utenti per fasce di età'),
      legend: {
        display: false
      }
    }
  });

  // Ultimi N utenti registrati

  const usersToTake = 20;

  document.querySelector('#latest-users-count').innerHTML = usersToTake;

  // const usersContainer = document.querySelector('#latest-users');

  // TODO:
  // 1. ottenere l'elenco degli ultimi N utenti registrati
  // 2. creare una funzione che accetti come argomento i dati di un utente
  //    e restituisca il seguente albero di nodi HTML:
  //
  //    <div class="card small">
  //      <div class="section">
  //        <h4>{name.first} {name.last}</h4>
  //        <h6>{email}</h6>
  //      </div>
  //      <img src="{picture.large}" class="section media"/>
  //    </div>
  //
  //    utilizzando le funzioni document.createElement e document.appendChild
  // 3. per ciascun utente, utilizzare la funzione ed inserire la card ottenuta
  //    all'interno del <div id="usersContainer"/>, dopo avere eliminato
  //    tutto il contenuto eventualmente già presente all'interno
  //
  // NB:
  // - Per "svuotare" un elemento HTML si può utilizzare il metodo removeChild()
  //   come descritto su MDN:
  //   https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes
  //   Oppure più banalmente "svuotare" la proprietà innerHTML dell'elemento:
  //   usersContainer.innerHTML = '';
  // - L'immagine provvisoria presente nella struttura di esempio della card è
  //   stata ottenuta con il servizio https://dummyimage.com (che consente di
  //   generare un'immagine con un testo a piacere)

};

// Funzione di inizializzazione/aggiornamento della dashboard

function refreshDashboard() {
  // inizializzo la dashboard con i dati degli utenti locali:
  updateDashboardData(localUsers);

  // TODO FINALE:
  // richiedere i dati dalle API effettuando una chiamata http GET a questo URL:
  // https://randomuser.me/api/?results=5000
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
  //     terribile)
}

// Prima invocazione automatica della funzione di inizializzazione:
refreshDashboard();

// Registrazione dell'event listener sul bottone "Aggiorna":
document.querySelector('#refresh-button').addEventListener('click', refreshDashboard);
