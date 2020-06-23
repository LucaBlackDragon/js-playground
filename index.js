// vedi https://www.chartjs.org/docs/latest/ per i dettagli
import Chart from 'chart.js';

import { makeLinearSequence, getAge } from './spellbook.js';
import people from './people';

console.log(`${people.length} utenti caricati in memoria`);

const ctx = document.getElementById('chart').getContext('2d');

// Grafico di esempio: vittime del JavaScript dal 1995 a oggi

const yearOfJavaScriptBirth = 1995;

const yearsOfJavaScript = makeLinearSequence(getAge(yearOfJavaScriptBirth) + 1, yearOfJavaScriptBirth);

// in mancanza di dati ufficiali, si stima che le vittime del JavaScript
// (in milioni) siano circa pari al quadrato degli anni trascorsi dalla sua
// invenzione:
const victimsOfJavaScript = yearsOfJavaScript.map(year => getAge(yearOfJavaScriptBirth, year) ** 2);

const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: yearsOfJavaScript.map(year => year.toString()),
    datasets: [
      {
        label: 'Vittime del JavaScript (in milioni di sviluppatori)',
        backgroundColor: 'rgba(255, 99, 132, 0.9)',
        borderColor: 'rgb(255, 99, 132)',
        data: victimsOfJavaScript
      },
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});
