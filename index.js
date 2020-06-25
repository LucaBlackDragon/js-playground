// @ts-check
// Il mitico commento che fa usare il TypeScript senza usare il TypeScript!
// (più o meno...)

// Importazione del framework CSS-only Mini.css
// Documentazione: https://minicss.org/docs
// (https://parceljs.org/css.html per chi è stupito di importare un file CSS
// in JavaScript)
import './node_modules/mini.css/dist/mini-default.css';

// Importazione della libreria ChartJs
// Documentazione: https://www.chartjs.org/docs/latest/
// Esempi: https://www.chartjs.org/samples/latest/
import Chart from 'chart.js';

// Importazione delle dipendenze interne
import { getRandomInt, randomColor } from './spellbook.js';
import getUsers from './userService.js';

// Impostazioni di default e funzioni helper per ChartJs:

/**
 * Configurazione di default per tutti i grafici della pagina
 * @type {Chart.ChartOptions}
 */
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
};

/**
 * Funzione per creare la configurazione necessaria ad aggiungere un titolo
 * nella regione superiore di un grafico di ChartJs.
 * È possibile fare il merge dell'oggetto ottenuto da questa funzione nella
 * configurazione del grafico che si sta creando (ad esempio usando l'operatore
 * `...`)
 * @param {string} text   Titolo del grafico
 * @returns {Chart.ChartOptions}
 */
const makeTopTitle = (text) => ({
  title: {
    display: true,
    position: 'top',
    text,
    fontSize: 24,
  }
});

/**
 * Funzione di aggiornamento delle statistiche
 * @param {getUsers.User[]} users  Dati degli utenti
 */
const updateStats = (users) => {

  // Aggiorno i contatori degli utenti:

  document.querySelector('#total-users').innerHTML = users.length.toString();

  // TODO:
  // aggiornare le altre componenti del riquadro "Statistiche utenti" tenendo
  // conto che:
  // - la data di nascita e l'età degli utenti si trova nell'oggetto `dob`
  //   (date of birth)
  // - la data di iscrizione e gli anni di iscrizione si trovano nell'oggetto
  //   `registered`

  const currentYear = 2013; //(new Date()).getFullYear();

  // controllo se la stringa `user.registered.date` contiene l'anno corrente ("2020")
  const lastYearUsers = users.filter((user) => {

    const dataDiRegistrazione = user.registered.date;
    return dataDiRegistrazione.indexOf(currentYear) > -1
  });

  document.querySelector('#last-year-users').innerHTML = lastYearUsers.length.toString();

  const sumOfAges = users.reduce((sum, user) => {
    return sum + user.dob.age;
  }, 0);

  const ageMean = sumOfAges / users.length;

  document.querySelector('#mean-users-age').innerHTML = ageMean.toString();

};

/**
 * Funzione di aggiornamento dei grafici
 * @param {getUsers.User[]} users  Dati degli utenti
 */
const updateCharts = (function chartUpdateLogic() {

  // NB:
  // qui utilizzo una IIFE per fare in modo da poter definire alcune variabili e
  // funzioni private che non siano visibili all'esterno (a partire dalla
  // "mappa" dei grafici, ovvero l'oggetto in cui conservo le istanze dei
  // grafici creati con ChartJs)

  // "mappa" (privata) dei grafici della pagina
  // (ad ogni chiave dell'oggetto corrisponderà un grafico della pagina)
  const charts = {};

  /**
   * Recupera il grafico richiesto dalla "mappa" dei charts.
   * Solleva un errore se il grafico non viene trovato
   * @param {string} chartName  Identificativo univoco del grafico
   * @returns {Chart}
   */
  const getChart = (chartName) => {
    if (chartName in charts) return charts[chartName];
    throw new Error(`Grafico "${chartName}" non trovato`);
  };

  /**
   * Funzione che utilizzo internamente per creare o aggiornare i grafici
   * registrandoli nella "mappa" `charts`
   * @param {string} chartName                      Identificativo univoco del grafico
   * @param {string} canvasElementId                Id del <canvas/> che ospita il grafico
   * @param {Chart.ChartConfiguration} chartConfig  Configurazione del grafico
   */
  const createOrUpdateChart = (chartName, canvasElementId, chartConfig) => {

    // NB:
    // dal momento che i grafici sono componenti che vengono generati con il
    // JavaScript, se i dati cambiano bisogna creare/aggiornare/distruggere i
    // grafici con le API previste dalla libreria ChartJs:
    // https://www.chartjs.org/docs/latest/developers/api.html

    if (!(chartName in charts)) {
      // Se il grafico non è presente nella "mappa", lo inizializzo ora con un
      // metodo "iniettato" in segreto negli elementi da ChartJs (infatti il
      // controllo di tipo di TypeScript si insospettirebbe, quindi lo disattivo
      // per questa riga!)
      // @ts-ignore
      const chartContext = document.getElementById(canvasElementId).getContext('2d');
      charts[chartName] = new Chart(chartContext, chartConfig);
    }
    else {
      // Ottengo l'istanza già esistente del grafico
      const chart = getChart(chartName);
      // ChartJs è un caso interessante ed abbastanza tipico in JavaScript:
      // per aggiornare il grafico già esistente non devo invocare il metodo
      // update passando la nuova configurazione, bensì MUTARE la configurazione
      // esistente.
      // Nello specifico, utilizzo splice per rimuovere tutte le labels e tutti
      // i datasets dell'array originale ed inserire quelli nuovi (splice è uno
      // dei metodi degli array che mutano l'array su cui vengono invocati).
      // Inoltre, non invoco splice direttamente, ma utilizzo il metodo apply
      // (disponibile in tutte le funzioni) per poter comporre dinamicamente gli
      // argomenti con cui invocare splice e poter specificare il "this" con cui
      // verrà eseguito (che deve essere l'array stesso):
      const replaceArrayContents = (targetArray, newItemsArray) => {
        // https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
        const spliceArguments = [0, targetArray.length, ...newItemsArray];
        targetArray.splice.apply(targetArray, spliceArguments);
      };
      // NB: sto dando per scontato di voler aggiornare solo labels e datasets;
      //     eventualmente devo aggiungere qui la logica per aggiornare altri
      //     parametri di configurazione
      replaceArrayContents(chart.data.labels, chartConfig.data.labels);
      replaceArrayContents(chart.data.datasets, chartConfig.data.datasets);
      charts[chartName].update();
    }

  };

  /**
   * Funzione che costituirà la "API pubblica" della IIFE e serve ad aggiornare
   * i grafici
   * @param {getUsers.User[]} users  Dati degli utenti
   */
  const updateCharts = (users) => {

    // GRAFICO 1 - Sesso degli utenti

    // TODO:
    // ricavare dai dati degli utenti invece che generare i dati a caso

    // const malesCount = getRandomInt(40, 50);
    // const femalesCount = 100 - malesCount;

    const males = users.filter(user => user.gender === 'male');
    const females = users.filter(user => user.gender === 'female');

    const genderData = [males.length, females.length];

    /** @type {Chart.ChartConfiguration} */
    const userGenderChartConfig = {
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
    };

    createOrUpdateChart('usersGenderChart', 'users-gender', userGenderChartConfig);

    // GRAFICO 2 - Nazionalità degli utenti

    // TODO:
    // ricavare dai dati degli utenti invece che generare i dati a caso

    // const chileCount = getRandomInt(2, 15);
    // const usaCount = getRandomInt(65, 35);
    // const italyCount = 100 - chileCount - usaCount;

    // const nationalityData = [
    //   {
    //     nationality: 'Italy',
    //     count: italyCount,
    //   },
    //   {
    //     nationality: 'United States',
    //     count: usaCount,
    //   },
    //   {
    //     nationality: 'Chile',
    //     count: chileCount,
    //   },
    // ];

    const counters = users.reduce((map, user) => {

      const country = user.location.country;

      if (country in map) {
        map[country]++;
      }
      else {
        map[country] = 1;
      }

      return map;

    }, {});

    const nationalityData = [];
    
    for(let key in counters) {
      const countryData = {
        nationality: key,
        count: counters[key]
      };
      nationalityData.push(countryData)
    }

    nationalityData.sort(function (data1, data2) {
      return data2.count - data1.count;
    });

    /** @type {Chart.ChartConfiguration} */
    const usersNationalityChartConfig = {
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
    };

    createOrUpdateChart('usersNationalityChart', 'users-nationality', usersNationalityChartConfig);

    // GRAFICO 3 - Utenti per fasce di età

    // TODO:
    // ottenere una o più strutture dati per suddividere gli utenti nelle
    // seguenti fasce di età: [0,18),[18,40),[40,65),[65,100+]
    // e generare `labels` e `data` nella configurazione del grafico

    const agesCounters = users.reduce((map, user) => {

      const age = user.dob.age;

      if (age >= 65) map['[65,100+]']++;
      else if (age >= 40) map['[40,65)']++;
      else if (age >= 18) map['[18,40)']++;
      else map['[0-18)']++;

      return map;

    }, {
      '[0-18)': 0,
      '[18,40)': 0,
      '[40,65)': 0,
      '[65,100+]': 0,
    });

    const labels = [];
    const data = [];
    for(let key in agesCounters) {
      labels.push(key);
      data.push(agesCounters[key]);
    }

    /** @type {Chart.ChartConfiguration} */
    const usersAgesChartConfig = {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            backgroundColor: randomColor(),
            data,
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
    };

    createOrUpdateChart('usersAgesChart', 'users-ages', usersAgesChartConfig);

  };

  return updateCharts;

})();

/**
 * Funzione di aggiornamento della lista degli ultimi N utenti
 * @param {getUsers.User[]} users  Dati degli utenti
 */
const updateNewestUsers = (users) => {

  // Evito di andare "in overflow" se gli utenti fossero meno di 20
  const usersToTake = Math.max(20, users.length);

  document.querySelector('#latest-users-count').innerHTML = usersToTake.toString();

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

/**
 * Funzione principale di aggiornamento dei dati della dashboard:
 * @param {getUsers.User[]} users  Dati degli utenti
 */
const updateDashboardData = (users) => {

  // Aggiorno le statistiche:
  updateStats(users);

  // Aggiorno i grafici:
  updateCharts(users);

  // Aggiorno gli ultimi N utenti registrati
  updateNewestUsers(users);

};

/**
 * Funzione di inizializzazione/aggiornamento della dashboard
 */
const refreshDashboard = () => {

  // disabilito temporaneamente il bottone "Aggiorna"
  const refreshButton = document.querySelector('#refresh-button');
  refreshButton.setAttribute('disabled', 'true');

  // inizializzo la dashboard con i dati degli utenti locali:
  updateDashboardData(getUsers());

  // Riabilito il bottone "Aggiorna" dopo 300 ms in modo da dare la percezione
  // del caricamento all'utente anche se getUsers è un metodo sincrono che
  // risponde immediatamente all'invocazione (o forse è solo una scusa per usare
  // il mio amatissimo setTimeout)
  setTimeout(() => refreshButton.removeAttribute('disabled'), 300);

  // TODO:
  // modificare la funzione getUsers (e di conseguenza questa invocazione)
  // come descritto nel file userService.js

};

// Prima invocazione automatica della funzione di inizializzazione:
refreshDashboard();

// Registrazione dell'event listener sul bottone "Aggiorna":
document.querySelector('#refresh-button').addEventListener('click', refreshDashboard);
