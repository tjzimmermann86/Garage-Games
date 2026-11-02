# Garage Games

Minispiel-Sammlung für die **Lübtheen Garage LAN**.

## Minispiele

| Spiel | Ordner | Status |
|---|---|---|
| **Scherbenwerk** – Glasscherben-Puzzle | [`scherbenwerk/`](scherbenwerk/) | Prototyp (Einzelspieler) |

### Scherbenwerk

Ein Bild ist in Glasscherben zersprungen und muss wieder zusammengesetzt werden.

- Die Teile sind Voronoi-Zellen: eckig und unterschiedlich groß. Motive und Bruchlinien werden bei jedem Spiel neu erzeugt (Abendsee, Leuchtturm, Rosette, Ballonfest, Korallenriff).
- Die Teile liegen in Ablagen links und rechts vom Brett. Was nicht hineinpasst, wartet im Stapel und taucht auf, sobald Platz frei wird.
- 5 Runden mit steigender Schwierigkeit:

  | Runde | Teile | Umrisse | Drehen |
  |---|---|---|---|
  | 1 | 8 | ja | nein |
  | 2 | 14 | ja | nein |
  | 3 | 22 | nein | nein |
  | 4 | 28 | nein | ja |
  | 5 | 38 | nein | ja |

- Steuerung: Ziehen zum Ablegen. Klick, Rechtsklick, Mausrad oder `R` dreht ein Teil um 90°.
- Punkte: 10 pro Teil, −15 pro Fehler (Teil an falscher Stelle aufs Brett gelegt), Zeitbonus unter der Zielzeit.

**Starten:** `scherbenwerk/index.html` im Browser öffnen. Keine Installation nötig.

## Ideen für weitere Minispiele

- Rohrleitung, Laser & Spiegel, Schiebepuzzle-Rennen
- Fehlersuche, Merk-dir-das-Bild, Schätzen, Simon Says
- Reaktionsduell, Turm stapeln, Tipprennen, Arena-Schubsen
- Team: Blind lotsen, Montagsmaler, Bombe entschärfen
- Party: Freunde-Quiz, Bluff-Runde

## Nächste Schritte

- LAN-Modus: alle Spieler mit demselben Startwert, gemeinsame Rangliste
- Rahmen für die Sammlung: Punktesystem über alle Minispiele, Voting für das nächste Spiel
