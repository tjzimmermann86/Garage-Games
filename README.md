# Garage Games

Minispiel-Sammlung für die **Lübtheen Garage LAN**.

## Menü und Warteraum

Die Startseite ist das Spielmenü:

- **Start:** Name und Avatar wählen über den runden Avatar-Knopf: 30 Charaktere (15 Männer, 15 Frauen), 12 Hintergrundfarben oder „passend“, dazu freigespielte Kopfbedeckungen. Jeder Name ist nur einmal vergeben, ein belegter Name wird sofort angezeigt. War man vorher in einem Turnier (z. B. nach einem Absturz), erscheint **„Wieder beitreten“**.
- **Einzelspieler:** Alle Minispiele allein spielen und üben. Pro Spiel werden Highscore und Anzahl der Partien auf dem Rechner gespeichert; ein neuer Highscore wird im Spiel angezeigt.
- **Mehrspieler:** Raum erstellen (Name, „Offen für alle“ oder „Nur mit Einladung“, maximale Spielerzahl) oder Raum beitreten (offene Räume oder 4-stelliger Code). Einladungen erscheinen oben im Menü mit „Annehmen“ / „Ablehnen“.
- **Einstellungen:** Hell (Pastell, Standard) oder Dunkel, Auflösung der Spiele (Automatisch / 720p / 1080p / 1440p), Vollbild, Gesamt-, Musik- und Effektlautstärke, Name und Avatar.
- **Spiel beenden:** verlässt den Warteraum, stoppt die Musik und schließt das Fenster, wenn der Browser es erlaubt.

### Kopfbedeckungen freispielen

Die Avatare starten ohne Kopfbedeckung. Acht Stück lassen sich freispielen und dann in der Avatar-Auswahl aufsetzen:

| Kopfbedeckung | So bekommt man sie |
|---|---|
| Mütze | Ein Minispiel zu Ende spielen |
| Basecap | 5 Minispiele zu Ende spielen |
| Stirnband | 3 verschiedene Minispiele spielen |
| Kopfhörer | Alle 8 Minispiele spielen |
| Bauhelm | Ein Turnier bis zur Siegerehrung spielen |
| Partyhut | 15 Minispiele zu Ende spielen |
| Zylinder | Im Turnier aufs Siegerpodest kommen |
| Krone | Ein Turnier gewinnen |

Der Fortschritt wird pro Rechner im Browser gespeichert (`shared/progress.js`).

### T-Shirts

Das T-Shirt passt sich standardmäßig dem Hintergrund an. Acht Farben sind frei wählbar, zwei Shirts lassen sich freispielen: **Trikot** (ein Turnier gewinnen) und **Ringelshirt** (3 Turniere bis zur Siegerehrung spielen).

### Status-Ringe und Siegerpodest

Im Warteraum bekommt der Avatar einen grünen Ring, wenn der Spieler bereit ist, abgestimmt hat oder sein Ergebnis gemeldet hat, und einen blauen, solange er noch spielt. Bei der Siegerehrung tragen die Plätze 1–3 Gold, Silber und Bronze; Platz 1 grinst, Platz 2 und 3 lächeln.

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
| **Farbschlacht** – Farbkugel-Shooter von oben | [`farbschlacht/`](farbschlacht/) | Prototyp (gegen Bots) |
| **Parklücke** – verschiedene Fahrzeuge einparken | [`parkluecke/`](parkluecke/) | Prototyp (Einzelspieler) |

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

### Farbschlacht

Farbkugel-Shooter von oben, jeder gegen jeden. Jede Karte gibt es in drei Größen: **Klein** (bis 4 Spieler, 3 Minuten), **Mittel** (bis 8, 4 Minuten) und **Groß** (bis 16, 5 Minuten). Man sieht immer nur einen Ausschnitt, unten rechts zeigt eine Übersichtskarte das Ganze. Freie Plätze füllen Bots auf. Im Turnier richtet sich die Größe nach der Zahl der Leute im Raum. Laufen mit WASD, zielen und schießen mit der Maus, Rechtsklick schaut weiter voraus, `R` lädt nach, `E` nimmt eine Waffe auf, `Q`/`1`/`2`/Mausrad wechseln, `Tab` zeigt die Rangliste.

- **Punkte:** Abschuss 100, Abschuss per Kopfschuss 150. Trifft eine Kugel nah an der Mitte der Figur, ist es ein Kopftreffer (doppelter Schaden, Scharfschützengewehr dreifach) mit Einblendung „Kopftreffer!“.
- **Karten:** Wald (Bäume mit Kronen zum Verstecken, Felsen, Teiche, Hütte), Siedlung (Häuser mit Türen und Fenstern, Autos, Zäune), Schützengraben (Gräben mit Sandsäcken, Bunker, Stacheldraht), Lagerhalle (Halle mit Säulen, Container, Kisten). Im Turnier bestimmt der Seed die Karte. Große Karten haben mehr Hütten, Häuserblocks, Gräben bzw. Hallen.
- **Waffen:** Startwaffe nach Wahl mit endlos Nachschub (Pistole, MP, Revolver). Auf der Karte liegen 4/7/12 bessere Waffen (je nach Größe) mit begrenzter Munition (Sturmgewehr, Schrotflinte, Scharfschützengewehr, Minigun). Wer stirbt, lässt sie fallen. Leer geschossene Waffen tauchen nach 25 Sekunden an einem Waffenplatz wieder auf.
- **Zufallsereignisse:** Je nach Karte fahren Autos über die Straßen (Siedlung), schlagen Blitze ein (Wald, Siedlung, Graben), fallen Bomben (Graben, Lagerhalle), explodieren Fässer (Lagerhalle) oder landet ein Versorgungsabwurf mit einer Extrawaffe (alle Karten). Gelbe, rote oder dunkle Warnkreise zeigen vorher, wo es einschlägt, Autos kündigen sich mit einer blinkenden Spur an. Deckung schützt vor Explosionen, der Startschutz auch. Abschüsse durch Ereignisse bringen niemandem Punkte. Häufigkeit: Aus, Selten, Normal oder Oft. Im Einzelspieler auf der Startkarte, im Turnier stellt sie der Gastgeber im Warteraum ein.
- **Einstieg:** 10/16/28 Startpunkte, gewählt wird der weiteste weg von den Gegnern. Danach bis zu 5 Sekunden Schutz, der beim ersten Schuss endet. Nach einem Abschuss geht es nach 3 Sekunden weiter, die Startwaffe kann man währenddessen mit `1`/`2`/`3` wechseln.

### Parklücke

Fünf Stufen, jede zieht eines von sechs bis sieben Szenarien (39 insgesamt), dazu wechseln Lücke, Nachbarn und Hindernisse mit dem Seed. Gas mit `W`/`↑`, bremsen und rückwärts mit `S`/`↓`, lenken mit `A`/`D`, Handbremse mit der Leertaste, `Enter` bricht die Zeit ab und lässt werten.

- **Fahrzeuge:** Kleinwagen (wendig), Traktor (langsam, enger Wendekreis), Bagger (Hinterachslenkung, das Heck schwenkt aus), Bus (sehr lang), LKW (träge), Panzer (Kettenlenkung, dreht auf der Stelle), LKW mit Hänger (Hänger schneidet Kurven und knickt rückwärts ein).
- **Stufen:** 1 = viel Platz, Richtung egal. 2 = erste Vorgaben (rückwärts/vorwärts), eine Kurve oder eine enge Durchfahrt auf dem Weg. 3 = enge Lücken, Wenden auf der Straße, gewundene Strecke mit zwei Kurven und Hindernissen quer im Weg. 4 = Bus im engen Hof wenden, Hänger durch die Durchfahrt, drei Kurven. 5 = Hänger rückwärts in die Bucht, Bus im Hof rückwärts quer, Bus auf der Straße wenden, vier Kurven auf schmaler Strecke.
- **Thema passend zum Fahrzeug:** Der Traktor fährt auf dem Bauernhof zwischen Obstbäumen, Heuballen und Weizenfeldern und parkt im Stall. Der Bagger fährt auf der Baustelle zwischen Betonpollern, Leitwänden, Rohren, Kipper, Betonmischer, Walze und Autokran. LKW im Hafen zwischen Containern und Fässern, Panzer in der Kaserne zwischen Panzersperren und Sandsäcken.
- **Gewundene Strecken:** Auf Hof, Baustelle, Hafen und Kaserne führt ab Stufe 2 eine Strecke mit runden Kurven zur Bucht. Der Rand ist dicht besetzt, einzelne Hindernisse ragen quer in die Strecke. Mit jeder Stufe gibt es mehr Kurven, mehr Querhindernisse und eine schmalere Strecke. Pro Szenario gibt es zwei bis vier geprüfte Anordnungen.
- **Parkrichtung:** Zeigt die Lücke einen Pfeil, muss die Front am Ende in Pfeilrichtung stehen. Falsch herum zählt nicht als eingeparkt.
- **Maßstab:** Straßen und Parkplätze sind an der Fahrzeuggröße ausgerichtet. Ein Fahrstreifen ist 1,8 Autobreiten breit, die Fahrgasse auf dem Parkplatz knapp anderthalb Fahrzeuglängen. Zum Wenden gibt es bei manchen Szenarien eine Seitenstraße.
- **Plätze:** Supermarkt und Busbahnhof (Querparken, mehrere Reihen und Fahrgassen), Altstadt (Längsparken am Bordstein, zwei Fahrstreifen mit Parkstreifen), Wohnstraße (ein Fahrstreifen zwischen beidseitig parkenden Autos, Einfahrten und Mülltonnen), Bauernhof, Baustelle, Hafen und Kaserne (Bucht zwischen Ballen, Absperrungen, Containern oder Sandsäcken), enger Hof zwischen Häusern.
- **Punkte:** Ganz in der Lücke stehen bringt 1.000 Punkte plus bis zu 1.000 Zeitbonus. Wer aneckt, startet wieder am Anfang, die Zeit läuft weiter. Läuft die Zeit ab, gibt es 300 bis 800 Punkte nach dem Anteil des Fahrzeugs in der Lücke, sonst bis zu 300 für die Nähe zur Lücke.
- **Geprüft:** Ein Suchprogramm (Hybrid-A*) hat für die Szenarien mit mehreren Seeds einen anstoßfreien Weg gefunden. Daraus sind auch die Zeitlimits abgeleitet.

## Technik

Gemeinsame Bausteine liegen in [`shared/`](shared/): `garage.css` (Optik), `garage.js` (Canvas, Zufall, Sound, Einstellungen, Menümusik, Seed aus der URL) und `lobby-core.js` (Räume, Einladungen, Online-Liste, Abstimmung, Wertung; läuft auf dem Server und im Offline-Modus), `net.js` (Verbindung und Spieler-Identität) und `avatars.js` (Gesichter).

## Ideen für weitere Minispiele

- Schiebepuzzle-Rennen, Fehlersuche, Tipprennen
- Team: Blind lotsen, Montagsmaler, Bombe entschärfen
- Party: Freunde-Quiz, Bluff-Runde

## Nächste Schritte

- LAN-Modus: alle Spieler mit demselben Startwert, gemeinsame Rangliste
- Rahmen für die Sammlung: Punktesystem über alle Minispiele, Voting für das nächste Spiel
