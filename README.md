# Lösung Coding Challenge

In diesem Repro befindet sich meine Lösung zur 'Coding-Aufgabe Node.js' (https://www.maibornwolff.de/coding-challenge-node-js).
Die Anwendung kann mit folgendem Befehl gestartet werden:
```
node index.js
```

- Bsp. Request 'https://localhost:8080/weather?city=Munich&month=2019-12'

## Anmerkungen von David Müller
- In der Datei 'config/cities.ts' sind aktuell alle Städt konfiguriert, die über die API abgefragt werden können.
- Meine Sqlite3 Datenbank mit einigen Testdaten habe ich zu Demozwecken hinzugefügt. (Hier ist natürlich auch ein Seed-Script möglich)
- Auslieferung über http2 gestaltet sich in Kombination mit Express / Node JS aktuell etwas schwierig. 
  Hier ist die Situation für mich unklar. Ich wollte nicht zu viel Zeit in ein Problem investieren, dass wahrscheinlich auf Node.js / Express Seite besteht.
  Ich habe folgende Möglichkeiten ausprobiert und bin zu keinem vorzeigbaren Ergebnis gekommen:
    - spdy
    - http2 mit express-http2-workaround

# Coding Challenge

Die Applikation basiert auf Node.js und Express

- Express
- TypeScript
- SQLite

# Vorbereitung

- Datenbank erstellen

```
sqlite3 db/db.sqlite3 < db/db.sql
```

## Aufgaben

- Holen Sie einmal pro Stunde die Wetterdaten von München, Berlin und Frankfurt von https://openweathermap.org ab.
  Erzeugen Sie sich hierfür einen API-Key.
- Speichern Sie die Temperatur und Luftfeuchtigkeit in der Datenbanktabelle weather.
- Erzeugen Sie eine Schnittstelle, die Ihnen die Durchschnittswerte für Temperatur und Luftfeuchtigkeit zurückgibt

  - für einen einzelnen Tag
  - für jeden Tag eines Monats

  Die Schnittstelle soll JSON-Daten zurückliefern
  Die URLs:

  - https://\<Host>/weather?city=\<city>&day=2018-12-24
  - https://\<Host>/weather?city=\<city>&month=2018-12

  Werden ungültige Parameter übergeben, wird ein "400 Bad Request" zurückgeliefert
  Sind keine Daten vorhanden, wird eine leere Response zurückgeliefert

## Bonus

- Erzeugen Sie eine logs/access.log-Datei in der jede eingehende Anfrage protokolliert wird
- Sorgen Sie dafür dass die Applikation über HTTP2 ausgeliefert wird
- Tritt ein fehler auf, loggen Sie die Information in die Datei logs/error.log
