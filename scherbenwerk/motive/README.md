# Motive für Scherbenwerk

Hier liegen die Puzzlebilder. Welche Bilder geladen werden, steht in `motive.json`.

## Bild hinzufügen

1. Screenshot als `.jpg`, `.png` oder `.webp` in diesen Ordner legen, mit genau dem Dateinamen aus `motive.json` (z. B. `counter-strike-16.jpg`).
2. Committen und pushen. Vercel baut automatisch neu.

Bilder, die in der Liste stehen, aber noch fehlen, werden übersprungen. Gibt es weniger als 5 Bilder, füllt das Spiel die übrigen Runden mit den eingebauten Motiven auf.

## Tipps für gute Puzzlebilder

- Mindestens 1200 px breit. Das Spiel schneidet die Bildmitte im Format 4:3 aus, Ränder von 16:9-Screenshots fallen weg.
- Viele Farben und Details über das ganze Bild verteilt. Große einfarbige Flächen (Himmel, Wüste) machen die Teile schwer unterscheidbar.
- Ohne HUD, Menüs oder Text, das wirkt ruhiger.

## Neues Spiel ergänzen

Einen Eintrag in `motive.json` hinzufügen:

```json
{ "datei": "dateiname.jpg", "name": "Name im Spiel" }
```
