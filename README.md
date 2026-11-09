# Garage Games

Minispiel-Sammlung für die **Lübtheen Garage LAN**.

## Minispiele

| Spiel | Ordner | Status |
|---|---|---|
| **Scherbenwerk** – Glasscherben-Puzzle | [`scherbenwerk/`](scherbenwerk/) | Prototyp (Einzelspieler) |
| **Rohrleitung** – Rohre drehen, Wasser verteilen | [`rohrleitung/`](rohrleitung/) | Prototyp (Einzelspieler) |
| **Laser & Spiegel** – Spiegel klappen, Kristalle treffen | [`laser/`](laser/) | Prototyp (Einzelspieler) |
| **Murmelglas** – Anzahl schätzen | [`murmeln/`](murmeln/) | Prototyp (Einzelspieler) |
| **Farbfolge** – Simon Says mit Zusatzregeln | [`farbfolge/`](farbfolge/) | Prototyp (Einzelspieler) |
| **Merkbild** – Bild merken, Fragen beantworten | [`merkbild/`](merkbild/) | Prototyp (Einzelspieler) |
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
  | 1 | Wasser + Lecks live | Gartenschlauch 5 × 5 · Regenrinne 7 × 4, Pumpe am Rand · Ölwanne 6 × 5 ohne Ecken |
  | 2 | Wasser + Lecks live | Waschanlage 6 × 6 · Tankstelle 8 × 5, zwei Pumpen · Werkbank 7 × 6 mit Betonblöcken |
  | 3 | nur Wasser live | Kühlkreislauf 7 × 7 · Auspuffstrang 9 × 5, Pumpe am Rand · Ringleitung 7 × 7 mit Loch |
  | 4 | Wasser auf Knopfdruck | Hydraulik 7 × 7 · Bremsleitung 8 × 6, zwei Pumpen · Hebebühne 8 × 7 mit Betonblöcken |
  | 5 | Wasser auf Knopfdruck | Hauptleitung 8 × 8 · Stadtnetz 10 × 6, zwei Pumpen · Kreuzung 9 × 9 in Kreuzform |

- Steuerung: Klick oder Mausrad dreht ein Rohr, Rechtsklick andersrum. `F`, Mittelklick oder langes Drücken schraubt ein Rohr fest. Ab Runde 4 prüft „Wasser marsch“ (`Leertaste`) das Netz.
- Punkte: 4 pro Rohr, −25 pro Fehlversuch bei „Wasser marsch“, Zeitbonus unter der Zielzeit. Gesamt-Zielzeit etwa 11 Minuten, ähnlich wie Scherbenwerk.

**Starten:** `rohrleitung/index.html` im Browser öffnen.

### Laser & Spiegel

Ein Klick klappt einen Spiegel von / nach \. Ziel: Jeder Kristall wird von einem Laserstrahl getroffen. 5 Runden von 6 × 5 bis 10 × 9, mit Attrappen-Spiegeln, Betonblöcken und in manchen Varianten zwei oder drei Lasern. 3 Varianten pro Runde (ab Runde 2), jedes Feld wird neu erzeugt und ist immer lösbar.

### Murmelglas

Schätzen, wie viele Teile im Glas sind. Volltreffer (bis 2 % daneben) gibt 150 Punkte, ab 40 % daneben 0. Gläser (Einmachglas, Bonbonvase, Flasche, Kanister), Inhalte (Murmeln, Muttern, Kronkorken, Stahlkugeln) und Füllhöhe wechseln. Später ist das Glas nur wenige Sekunden zu sehen, dann kommt ein Tuch darüber.

### Farbfolge

Simon Says mit 4 Feldern. Ab Stufe 5, 9, 13 und 17 kommt je eine Zusatzregel dazu (Tempo, Sechs Felder, Nur Ton, Rückwärts, Mischen), in jedem Spiel in anderer Reihenfolge. Ein Fehler oder 6 Sekunden Pause = raus. Rekord wird im Browser gespeichert.

### Merkbild

Ein Bild ist 3–5 Sekunden zu sehen, danach kommen 2–5 Fragen (Anzahl, Farbe, Position, war etwas da?). Drei Szenen (Straße, Hafen, Werkstatt) mit zufällig verteilten Objekten. 25 Punkte pro richtiger Antwort, 10 Bonus unter 4 Sekunden.

### Startampel

5 Runden mit je 3 Versuchen. Signalarten: Startampel, Grünes Licht, Täuschung, Piep, Zahlenblitz, Zielscheibe und Gemischt, pro Runde zufällig aus einem Pool. Zu früh geklickt oder unter 100 ms = Fehlstart = raus.

### Turmbau

Blöcke hängen am Kran und werden mit Klick/Leertaste fallen gelassen. Überstehendes wird abgeschnitten, genau getroffen gibt „Perfekt“ (3 in Folge machen den Block breiter). Alle 6 Etagen wechselt der Kranmodus (Laufkatze, Pendel, Kranfahrt), später kommt Wind. Reihenfolge und Material wechseln pro Spiel.

### Schubsarena

Gegen 3–6 Bots auf einer schrumpfenden Plattform. Rollen mit WASD/Pfeiltasten, Rammstoß mit der Leertaste. Arenen: Scheibe, Quadrat, Sechseck, Ring mit Loch, teils mit Glatteis, Prellböcken oder schweren Gegnern. Nach 75 Sekunden verschwindet die Plattform ganz. Platzpunkte 10/6/4/3/2/1.

## Technik

Die neuen Spiele nutzen gemeinsame Bausteine aus [`shared/`](shared/) (`garage.css` für die Optik, `garage.js` für Canvas, Zufall, Sound und Startkarten). Scherbenwerk und Rohrleitung sind noch eigenständige Dateien.

## Ideen für weitere Minispiele

- Schiebepuzzle-Rennen, Fehlersuche, Tipprennen
- Team: Blind lotsen, Montagsmaler, Bombe entschärfen
- Party: Freunde-Quiz, Bluff-Runde

## Nächste Schritte

- LAN-Modus: alle Spieler mit demselben Startwert, gemeinsame Rangliste
- Rahmen für die Sammlung: Punktesystem über alle Minispiele, Voting für das nächste Spiel
