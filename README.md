# Garage Games

Minispiel-Sammlung für die **Lübtheen Garage LAN**.

## Menü und Warteraum

Die Startseite ist das Spielmenü:

- **Start:** Name und Avatar wählen über den runden Avatar-Knopf: 30 Charaktere (15 Männer, 15 Frauen), 12 Hintergrundfarben oder „passend“, dazu freigespielte Kopfbedeckungen. Jeder Name ist nur einmal vergeben, ein belegter Name wird sofort angezeigt. War man vorher in einem Turnier (z. B. nach einem Absturz), erscheint **„Wieder beitreten“**.
- **Spiel erstellen:** Name des Spiels, „Offen für alle“ oder „Nur mit Einladung“, maximale Spielerzahl.
- **Spiel beitreten:** Liste der offenen Spiele oder Beitritt mit 4-stelligem Code. Einladungen erscheinen oben im Menü mit „Annehmen“ / „Ablehnen“.
- **Einstellungen:** Hell (Pastell, Standard) oder Dunkel, Auflösung der Spiele, Vollbild, Gesamt-, Musik- und Effektlautstärke, Name und Avatar.
- **Spiel beenden:** verlässt den Warteraum, stoppt die Musik und schließt das Fenster, wenn der Browser es erlaubt.

### Kopfbedeckungen freispielen

Die Avatare starten ohne Kopfbedeckung. Acht Stück lassen sich freispielen und dann in der Avatar-Auswahl aufsetzen:

| Kopfbedeckung | So bekommt man sie |
|---|---|
| Mütze | Ein Minispiel zu Ende spielen |
| Basecap | 5 Minispiele zu Ende spielen |
| Stirnband | 3 verschiedene Minispiele spielen |
| Kopfhörer | Alle 6 Minispiele spielen |
| Bauhelm | Ein Turnier bis zur Siegerehrung spielen |
| Partyhut | 15 Minispiele zu Ende spielen |
| Zylinder | Im Turnier aufs Siegerpodest kommen |
| Krone | Ein Turnier gewinnen |

Der Fortschritt wird pro Rechner im Browser gespeichert (`shared/progress.js`).

### Turnier im Warteraum

Der Gastgeber stellt ein:

| Einstellung | Möglichkeiten |
|---|---|
| Modus | **Abstimmung:** Jeder hat so viele Stimmen, wie Spiele gespielt werden, und verteilt sie frei (auch mehrere auf ein Spiel). Die Spiele mit den meisten Stimmen werden gespielt, bei Gleichstand entscheidet der Zufall.<br>**Gastgeber wählt:** Der Gastgeber hakt die Spiele selbst an.<br>**Zufall:** Vor jeder Runde wird ein zufälliges Spiel gezogen (nie zweimal dasselbe direkt hintereinander). |
| Anzahl Spiele | 1–6 bei Abstimmung, 1–10 bei Zufall |
| Wertung | **Punkte addieren:** Die Punkte aller Spiele werden zusammengezählt.<br>**Platzwertung:** Pro Spiel 10, 8, 6, 5, 4, 3, 2, 1 Punkte nach Platz, jedes Spiel zählt gleich. |

Ablauf: Warteraum → (Abstimmung) → Zwischenstand → Gastgeber startet das nächste Spiel → 3-Sekunden-Countdown bei allen → Minispiel mit derselben Variante → Ergebnis wird automatisch gemeldet → zurück zum Zwischenstand. Der Gastgeber entscheidet, wann es weitergeht. Wer noch spielt, wird beim nächsten Start mitgenommen. Am Ende zeigt das **Siegerpodest** die Plätze 1–3, die übrigen darunter, plus die Tabelle aller Ergebnisse.

### Server einrichten (für mehrere Rechner)

Der Warteraum läuft über die Vercel-Funktion `api/lobby.js` mit einer Redis-Datenbank von Upstash (kostenloser Tarif reicht):

1. In Vercel das Projekt öffnen → **Storage** → **Create Database** → **Upstash for Redis** → mit dem Projekt verbinden.
2. Neu deployen. Vercel setzt `KV_REST_API_URL` und `KV_REST_API_TOKEN` automatisch.
3. Im Menü steht oben rechts dann „Server verbunden“.

Ohne Datenbank läuft das Menü im **Offline-Modus**: Räume sind nur im selben Browser sichtbar (zum Testen mit mehreren Tabs).

## Minispiele

| Spiel | Ordner | Status |
|---|---|---|
| **Scherbenwerk** – Glasscherben-Puzzle | [`scherbenwerk/`](scherbenwerk/) | Prototyp (Einzelspieler) |
| **Rohrleitung** – Rohre drehen, Wasser verteilen | [`rohrleitung/`](rohrleitung/) | Prototyp (Einzelspieler) |
| **Farbfolge** – Simon Says mit Zusatzregeln | [`farbfolge/`](farbfolge/) | Prototyp (Einzelspieler) |
| **Startampel** – Reaktionstest, Fehlstart = raus | [`startampel/`](startampel/) | Prototyp (Einzelspieler) |
| **Turmbau** – Blöcke stapeln | [`turmbau/`](turmbau/) | Prototyp (Einzelspieler) |
| **Schubsarena** – Kugeln von der Plattform schubsen | [`schubsarena/`](schubsarena/) | Prototyp (gegen Bots) |

### Scherbenwerk

Ein Bild ist in Glasscherben zersprungen und muss wieder zusammengesetzt werden.

- Die Teile sind Voronoi-Zellen: eckig und unterschiedlich groß. Motive und Bruchlinien werden bei jedem Spiel neu erzeugt. 8 eingebaute Motive (Abendsee, Leuchtturm, Rosette, Ballonfest, Korallenriff, Skyline, Polarlicht, Herbstwald), dazu eigene Bilder aus `scherbenwerk/motive/`.
- Drei Bruchmuster, pro Runde zufällig: **Klassischer Bruch**, **Einschlag** (kleine Splitter um einen Punkt, große am Rand), **Längsbruch** (lange, schmale Scherben).
- Die Teile liegen in Ablagen links und rechts vom Brett. Was nicht hineinpasst, wartet im Stapel und taucht auf, sobald Platz frei wird.
- 5 Runden mit steigender Schwierigkeit:

  | Runde | Varianten (eine wird pro Spiel gezogen) |
  |---|---|
  | 1 | 8 Teile, mit Umrissen |
  | 2 | 14 oder 16 Teile, mit Umrissen |
  | 3 | 22 Teile ohne Umrisse · 20 Teile ohne Umrisse, Vorlage verschwindet nach 30 s |
  | 4 | 28 Teile verdreht · 30 Teile, Vorlage verschwindet nach 15 s |
  | 5 | 38 Teile verdreht · 34 Teile verdreht, Vorlage weg nach 40 s · 44 Teile, Vorlage weg nach 25 s |

- Steuerung: Ziehen zum Ablegen. Klick, Rechtsklick, Mausrad oder `R` dreht ein Teil um 90°.
- Punkte: 10 pro Teil, −15 pro Fehler (Teil an falscher Stelle aufs Brett gelegt), Zeitbonus unter der Zielzeit.

**Starten:** `scherbenwerk/index.html` im Browser öffnen. Keine Installation nötig.

### Rohrleitung

Die Pumpe in der Mitte läuft, aber die Rohre sind verdreht. Ziel: Wasser zu jedem Hahn bringen, ohne dass irgendwo etwas ausläuft.

- Jedes Netz ist ein zufällig erzeugter Baum aus Rohren, dadurch immer lösbar. Dazu zieht jedes Spiel pro Runde eine von drei Varianten.
- 5 Runden mit steigender Schwierigkeit:

  | Runde | Hilfe | Varianten (eine wird pro Spiel gezogen) |
  |---|---|---|
  | 1 | Wasser + Lecks live | Gartenschlauch 4 × 4 · Regenrinne 5 × 3, Pumpe am Rand · Ölwanne 5 × 4 ohne Ecken |
  | 2 | Wasser + Lecks live | Waschanlage 5 × 5 · Tankstelle 6 × 4, zwei Pumpen · Werkbank 6 × 5 mit Betonblöcken |
  | 3 | Wasser + Lecks live | Kühler 6 × 6 · Bremsleitung 7 × 5, zwei Pumpen · Hebebühne 6 × 6 mit Betonblöcken |
  | 4 | nur Wasser live | Hydraulik 6 × 6 · Auspuffstrang 8 × 5, Pumpe am Rand · Motorblock 7 × 6 ohne Ecken |
  | 5 | nur Wasser live | Kühlkreislauf 7 × 7 · Stadtnetz 9 × 5, zwei Pumpen · Ringleitung 7 × 7 mit Loch |

- Steuerung: Klick oder Mausrad dreht ein Rohr, Rechtsklick andersrum. `F`, Mittelklick oder langes Drücken schraubt ein Rohr fest.
- Punkte: 4 pro Rohr, Zeitbonus unter der Zielzeit. Gesamt-Zielzeit etwa 6 Minuten.

**Starten:** `rohrleitung/index.html` im Browser öffnen.

### Farbfolge

Simon Says mit 4 Feldern. Ab Stufe 5, 9, 13 und 17 kommt je eine Zusatzregel dazu (Tempo, Sechs Felder, Nur Ton, Rückwärts, Mischen), in jedem Spiel in anderer Reihenfolge. Ein Fehler oder 6 Sekunden Pause = raus. Rekord wird im Browser gespeichert.

### Startampel

5 Runden mit je 3 Versuchen. Signalarten: Startampel, Grünes Licht, Täuschung, Piep, Zahlenblitz, Zielscheibe und Gemischt, pro Runde zufällig aus einem Pool. Zu früh geklickt oder unter 100 ms = Fehlstart = raus.

### Turmbau

Blöcke hängen am Kran und werden mit Klick/Leertaste fallen gelassen. Überstehendes wird abgeschnitten, genau getroffen gibt „Perfekt“ (3 in Folge machen den Block breiter). Alle 6 Etagen wechselt der Kranmodus (Laufkatze, Pendel, Kranfahrt), später kommt Wind. Reihenfolge und Material wechseln pro Spiel.

### Schubsarena

Gegen 3–6 Bots auf einer schrumpfenden Plattform. Rollen mit WASD/Pfeiltasten, Rammstoß mit der Leertaste. Arenen: Scheibe, Quadrat, Sechseck, Ring mit Loch, teils mit Glatteis, Prellböcken oder schweren Gegnern. Nach 75 Sekunden verschwindet die Plattform ganz. Platzpunkte 10/6/4/3/2/1.

## Technik

Gemeinsame Bausteine liegen in [`shared/`](shared/): `garage.css` (Optik), `garage.js` (Canvas, Zufall, Sound, Einstellungen, Menümusik, Seed aus der URL) und `lobby-core.js` (Räume, Einladungen, Online-Liste, Abstimmung, Wertung; läuft auf dem Server und im Offline-Modus), `net.js` (Verbindung und Spieler-Identität) und `avatars.js` (Gesichter).

## Ideen für weitere Minispiele

- Schiebepuzzle-Rennen, Fehlersuche, Tipprennen
- Team: Blind lotsen, Montagsmaler, Bombe entschärfen
- Party: Freunde-Quiz, Bluff-Runde

## Nächste Schritte

- LAN-Modus: alle Spieler mit demselben Startwert, gemeinsame Rangliste
- Rahmen für die Sammlung: Punktesystem über alle Minispiele, Voting für das nächste Spiel
