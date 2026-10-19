# Mitglieder-Bilder

Porträt-Bilder der Bandmitglieder, heruntergeladen von
https://rebophot.de/band1 (Stand 19.10.2026). Breite je 480 px
(Höhe siehe Tabelle) — ausreichend für die 80×80-px-Kreise auf der
Band-Seite, auch auf Retina-Displays.

| Datei | Größe | Mitglied |
|---|---|---|
| `ilse.png` | 480×753 | Ilse (Gesang) |
| `jakob.png` | 480×562 | Jakob (Gesang + Gitarre) |
| `martin.png` | 480×587 | Martin (Gesang + Tenor Sax.) |
| `elisabeth.png` | 480×593 | Elisabeth (Klavier) |
| `jonas.png` | 480×724 | Jonas (Es Alt Sax.) |
| `anette.png` | 480×698 | Anette (Bariton Sax.) |
| `mathias.png` | 480×641 | Mathias (Posaune) |
| `hans.png` | 480×591 | Hans (Bass) |
| `heiko.png` | 480×561 | Heiko (Drums) |

## Bildausschnitt im Kreis konfigurieren

Die Karten auf der Band-Seite zeigen das Bild als 80×80-px-Kreis
(`object-cover`). Da die Porträts höher als breit sind, schneidet
`object-cover` standardmäßig das **Zentrum** des Bildes aus — dabei kann
das Gesicht abgeschnitten werden. Der sichtbare Ausschnitt lässt sich pro
Mitglied über das optionale `position`-Feld in `src/data.ts` steuern
(wird als CSS `object-position` gerendert):

```ts
photo: {
  src: '/images/mitglieder/ilse.png',
  alt: 'Porträt von Ilse (Gesang)',
  width: 480,
  height: 753,
  position: '50% 20%', // X% Y% — Y=0% oberer Rand, Y=50% Mitte, Y=100% unterer Rand
},
```

- `Y = 0%` zeigt den **obersten** 480-px-Streifen des Bildes (Gesicht
  bei Porträts meist ganz oben → guter Startwert).
- `Y = 50%` wäre die Mitte (CSS-Standard, wenn `position` fehlt).
- `Y = 100%` zeigt den untersten Bildrand.
- X analog horizontal (bei diesen Porträts fast immer `50%`).

Feinjustierung: Im Browser DevTools am `<img>` der Karte
`object-position` testen und den passenden Wert in `src/data.ts`
übernehmen. Faustregel für die Y-Prozentzahl eines Punkts in
Bildpixeln: `Y% = (y_px − 240) / (H − 480) × 100` (240 = halbe
Sichtfensterhöhe, H = Bildhöhe in px).
