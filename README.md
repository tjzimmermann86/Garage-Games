# Garage Games

Minispiel-Sammlung für die **Lübtheen Garage LAN**.

## Minispiele

| Spiel | Ordner | Status |
|---|---|---|
| **Scherbenwerk** – Glasscherben-Puzzle | [`scherbenwerk/`](scherbenwerk/) | Prototyp (Einzelspieler) |
| **Rohrleitung** – Rohre drehen, Wasser verteilen | [`rohrleitung/`](rohrleitung/) | Prototyp (Einzelspieler) |

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

## Ideen für weitere Minispiele

- Laser & Spiegel, Schiebepuzzle-Rennen
- Fehlersuche, Merk-dir-das-Bild, Schätzen, Simon Says
- Reaktionsduell, Turm stapeln, Tipprennen, Arena-Schubsen
- Team: Blind lotsen, Montagsmaler, Bombe entschärfen
- Party: Freunde-Quiz, Bluff-Runde

## Nächste Schritte

- LAN-Modus: alle Spieler mit demselben Startwert, gemeinsame Rangliste
- Rahmen für die Sammlung: Punktesystem über alle Minispiele, Voting für das nächste Spiel
