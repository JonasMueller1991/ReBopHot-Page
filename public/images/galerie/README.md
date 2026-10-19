# Galerie-Bilder

Die komplette Bildergalerie von https://rebophot.de/galerie (Stand
19.10.2026), unter `public/images/galerie/` — ein Unterordner pro
Abschnitt/Shooting, wie auf der Original-Seite. Alle Bilder in
`src/data.ts` (`gallerySections`) referenziert und über die Bildunterschriften
(`title`) bzw. Alternativtexte (`alt`) dokumentiert. Breite max. 1920 px
(wie die `-1920w`-Varianten des CDN), Seitenverhältnisse belassen.

| Unterordner | Abschnitt auf der Original-Seite | Bilder |
|---|---|---|
| `sommertour-2024/` | Sommertour-Plakate 2024 | 2 |
| `badenweiler-2024/` | Kur- und Festspielhaus Badenweiler, 20.07.24 | 4 |
| `fini-resort-2024/` | Donnerstag-Live Konzert im Fini Resort Badenweiler, 18.07.24 | 4 |
| `bruchsal-2024/` | Genuss- und Gläserklang Bruchsal, 14.06.24 | 4 |
| `fotoshooting-2022/` | Fotoshooting August 2022 (Fotos: Dominik Frank) | 3 |
| `bad-herrenalb-2022/` | Sonntagskonzert im Kurpark Bad Herrenalb, 24.07.22 | 5 |
| `fotoshooting-2020/` | Fotoshooting März 2020 (Fotos: Thomas Harlfinger) | 4 |
| `tempel-swingin-charlie-2019/` | Swingin' Charlie, 11.10.19, Kulturzentrum Tempel Karlsruhe | 17 |
| `ego-oberderdingen-2019/` | Eröffnungsfeier E.G.O. Zentrale Oberderdingen, 17.05.19 (© EGO-Gruppe) | 9 |
| `tempel-swing-karlsruhe-2019/` | Swing in Karlsruhe, 22.01.19, Kulturzentrum Tempel | 24 |
| `fotoshooting-2018/` | Fotoshooting November 2018 (Fotos: Dominik Frank) | 3 |

Dateinamen: `<Bildnummer>-<slugifizierter Originalname>.<ext>`; die
Bildnummer erhält die Reihenfolge der Original-Seite.

## Download-Notizen

- Die URLs sind signiert und laufen ca. Mitte November 2026 ab; frische
  URLs liefert der HTML-Quelltext von https://rebophot.de/galerie.
- `User-Agent`- und `Referer: https://rebophot.de/`-Header mitschicken
  (sonst 403), aber **kein** `Accept: image/webp` (sonst liefert das CDN
  WebP-Re-Encodes trotz `.jpg`/`.png`-Endung).
- Die Dateien `public/images/*.jpg`/`*.png` (z.B. `band-2022.jpg`,
  `badenweiler-1.jpg`) sind ältere Kuratierte Downloads derselben Bilder
  (byte-identisch mit den Dateien hier) und werden seit dem Umbau auf
  `galerie/` nicht mehr referenziert — sie können gelöscht werden.
