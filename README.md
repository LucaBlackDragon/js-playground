# JavaScript Playground

Mini-progetto per svolgere esercizi sul JavaScript

## Istruzioni per l'utilizzo

- Installa [Git for Windows](https://git-scm.com/download/win)

- Installa la versione LTS di [Node.js](https://nodejs.org/)

- Clona il repository aprendo il terminale in una cartella a piacere (e.g. `C:\Progetti`) ed eseguendo il comando:
  
  ```sh
  git clone https://github.com/LucaBlackDragon/js-playground.git
  ```

  Il comando creerà una cartella "js-playground".<br>
  Volendo si può specificare un nome diverso per la cartella di destinazione:
  
  ```sh
  git clone https://github.com/LucaBlackDragon/js-playground.git NomeDellaCartella
  ```

- Entra nella cartella in cui hai scaricato il repository e crea un nuovo branch con un nome a piacere, ad esempio:
  
  ```sh
  git checkout -b esercizi-nardil
  ```

- Entra nella cartella del repository ed esegui il comando:

  ```sh
  npm install
  ```

  per installare le dipendenze del progetto

- Avvia il server di sviluppo con il comando:

  ```sh
  npm start
  ```

- Apri nel browser l'indirizzo mostrato nel terminale (e.g. http://localhost:1234)

- Segui i commenti nel codice del file [index.js](./index.js) per svolgere gli esercizi

- Buon divertimento!

- Per committare le modifiche durante o alla fine dello sviluppo, usa i seguenti comandi:

  ```sh
  git add .
  git commit -m "Il mio messaggio di commit"
  ```
  
- Alla fine, pubblica le modifiche nel repository con il comando:

  ```sh
  git push -u origin esercizi-nardil
  ```

  (sostituendo `esercizi-nardil` con il nome del tuo branch)

Grazie a [Parcel](https://parceljs.org/), la pagina si aggiorna automaticamente ogni volta che i file vengono modificati
