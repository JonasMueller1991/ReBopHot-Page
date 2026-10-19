# Termin-Bilder

Die echten Bilder von https://rebophot.de/veranstaltungen (Stand 19.10.2026),
unter exakt den untenstehenden Dateinamen in diesem Ordner. Die Maße in
`src/data.ts` wurden an die realen Bildgrößen angepasst (Breiten > 1600 px
wurden auf 1600 px verkleinert, Seitenverhältnis beibehalten, kein Upscaling).

| Datei | Größe | Termin |
|---|---|---|
| `klenert-2026.png` | 1536×1024 | 28.10.26 Weingut Klenert, Kraichtal |
| `husarenlager-fuokk.jpg` | 1369×1169 | 28.09.26 Benefizkonzert Oktoberfest Husarenlager (FUoKK-Logo) |
| `herbstmarkt-gaggenau.png` | 1536×1024 | 26.09.26 Herbstmarkt Gaggenau (Flyer) |
| `jazzclub-wiesloch.jpg` | 988×547 | 04.09.26 Jazzclub 77 Weinstadt Wiesloch e.V. |
| `kurpark-bad-schoenborn.png` | 1070×418 | 30.08.26 Open-Air Sommer, Kurparkbühne Bad Schönborn (auch 09.08.25) |
| `augustiner-abgesagt.jpg` | 720×360 | 28.09.25 Augustiner Biergarten Bad Cannstatt (abgesagt) |
| `stadtfest-rastatt.jpg` | 1600×415 | 27.07.25 + 21.07.24 Stadtfest Rastatt (Foto: Stadt Rastatt) |
| `weihnachtsmarkt-rastatt.jpeg` | 837×919 | 01.12.24 Weihnachtsmarkt Rastatt |
| `adventsmarkt-gaggenau.jpeg` | 1600×1065 | 30.11.24 Adventsmarkt Gaggenau |
| `rheinstetten-jazzclub.png` | 1535×590 | 16.08.24 Swingin' Biergarten, Gasthaus Rheinebene (Jazzclub Rheinstetten e.V.) |

## Download-Notizen (falls die Bilder erneut benötigt werden)

Die folgenden Original-URLs sind signiert und laufen ca. Mitte November 2026
ab. Achtung: Die URLs für `kurpark-bad-schoenborn.png` und
`rheinstetten-jazzclub.png` in dieser Liste waren/defekt (CloudFront
AccessDenied) — frische URLs liefert ein Blick in den HTML-Quelltext von
https://rebophot.de/veranstaltungen. Beim Download außerdem beachten:

- `User-Agent`- und `Referer: https://rebophot.de/`-Header mitschicken,
  sonst antwortet das CDN mit 403.
- **Kein** `Accept: image/webp`-Header senden — sonst liefert das CDN
  WebP-Re-Encodes trotz `.jpg`/`.png`-Endung.
- Die drei defekten URL-Beispiele von damals:
  - `stadtfest-rastatt.jpg`: Im Pfad fehlte ein `+` — korrekt ist
    `...Stadtfest+2019_...Rastatt+Heike+Die%C3%83-elberb-2d962c7c-2880w.jpg`.

| Datei | Termin | Original-URL |
|---|---|---|
| `klenert-2026.png` | 28.10.26 Weingut Klenert, Kraichtal | https://cdn.website-editor.net/s/5272fe7ac5ba4e51945e65145b872eae/dms3rep/multi/28.10.26-H%C3%BCgel-Swing_Klenert_quer.png?dm-skip-opt=true&Expires=1794608895&Signature=I~6CrLoq7lc3xuDt-zviIR~yLPCK0vdSico7psr8R5~h1wpUjB~0VVZduAPrqA03jJ~6tabY5dto0-~T8sbJjN9yZwgkIkqJQpduoVH8arND6rv5M7edU45RfEqYBee1mBFsBIe2w~MEpEBclm-iO3p5w5liHnjgpYbcxWyznwnkIkOUmfitHfvWjo~LSzz4HuAXlnFGuLj700sUZVwhiAJXPnBhJxiqEqV6ZtEJoRsG~YHq0zBGjqOgBAUX-eMhBoyTHYBDwo3qIp6~S6brT6hX42k6lvoocAJ7IR9467UNzjUwdgjIBh2hxVAMMiotTslT~csYer4kosuvpg57Zw__&Key-Pair-Id=K2NXBXLF010TJW |
| `husarenlager-fuokk.jpg` | 28.09.26 Benefizkonzert Oktoberfest Husarenlager (FUoKK-Logo) | https://le-cdn.website-editor.net/s/5272fe7ac5ba4e51945e65145b872eae/dms3rep/multi/opt/Logo+F%C3%B6rderverein+Onkologie+Kinderklinik+KA-2880w.jpg?Expires=1794608895&Signature=VwJWe6b7iTSibfvS2qPtjQGSOTx76O-WVCOQch3IG9fDpuMhjzEmUu4kaY765MrPowl86ZzVly1XsTqvlRvi5~CgI5YbHhiVq~l6H1zmcd-kPcbJB4wZLPiU2sU3bqN2rppk0iDdBSofxkoYz-K8siR33W~5ZPk1dIGcVCOr7FIaZq2GSu4WwwESLaSNVhCgHobACf2Uixlp59wLCkzL7wHCkOVBh9KFDOUGqb50fWTP78mHrZOgJqDko0MPv8tdTdv~IBDuA4tVg4LKkNYJnDrrPv0MxIovDMP6VcN-hJCyczuogA~waBANoPKhdn24k2q~2xCDmiwZLF09d9lkhg__&Key-Pair-Id=K2NXBXLF010TJW |
| `herbstmarkt-gaggenau.png` | 26.09.26 Herbstmarkt Gaggenau (Flyer) | https://le-cdn.website-editor.net/s/5272fe7ac5ba4e51945e65145b872eae/dms3rep/multi/opt/05.09.26_Flyer+Herbstmarkt_A5+quer-1920w.png?Expires=1794608895&Signature=j-rK8xnUM~8CiD3DFaGm5lxg8g3mjsl6rx3uSsHFZnVjAiquqNyNjldTajrng5K9~u6IEfihy2l1c3vX421vjDbjBl3mZJKUdIE5FNZ2IFIq2qKBzX4bZCLLULn4bdneAunEbiwD-j8vbL3h-cLBxDZxDFZ5jJCF0vxqdVYg-ZKPqGOJ6EW00XLd0dN2xmSgGlLxoKXEyzGvFLCQWIfG6JyxFHVEfMdEhAv3TWX-58K1pjyLSSDOzZk2QCMc5NnIIGvQfRekh6LBdnkC-1VUgffJXbK7S6dqqd5vR2ewRdllIBT40c5NOvK4D5VSNdaobRp6pabfogYeA1dcNcTzMw__&Key-Pair-Id=K2NXBXLF010TJW |
| `jazzclub-wiesloch.jpg` | 04.09.26 Jazzclub 77 Weinstadt Wiesloch e.V. | https://le-cdn.website-editor.net/s/5272fe7ac5ba4e51945e65145b872eae/dms3rep/multi/opt/Jazzclub-Wiesloch-2311b157-1920w.jpg?Expires=1794608895&Signature=YtF7wCeEWjga93gglesAkvqiRC8e0Z8C2wUkOCByu2sxNu1okdUXaMlwK7yeIA~f0dmHXtZsA3BzX3Sw9ZVxH1QkeK129in5WD1iqQ5fF4o5Eimd0RP-kZwEubHdvtUV8TmvrBVCkUCOWP8RsQZsqIug6CpFWZPClTASGTLYZI8gO2iJDB-zPT5jrL553qXPLqAVophabPUyEKaiKJYVZi3ZUVIk~8C4HIlO5H6XaqVrDVBMF3TWo7eAF3x1BLVY6C00pysxdrbjs4akqqM9Urzi4ig4PFj3pU7arnOsAPZBooPFJuNO-48w~zUgKBQNgmHr2Hsm76FrqQ~pPoX7XA__&Key-Pair-Id=K2NXBXLF010TJW |
| `kurpark-bad-schoenborn.png` | 30.08.26 Open-Air Sommer, Kurparkbühne Bad Schönborn (auch 09.08.25) | https://le-cdn.website-editor.net/s/5272fe7ac5ba4e51945e65145b872eae/dms3rep/multi/opt/Kurpark-Bad-Sch-C3-B6nborn-1920w.png?Expires=1794608895&Signature=iZBrcABsQhNkiOoNxEwzlypUB46wvHcbxkhPf0bmTd36Mb0TrgQm3suBt~dYKONkMhcqlzNxaRq4DczsMDoMZqXSAnaXw0ptHfV8PezlJxAr-Vt4NQWvNJZsPHNHCbH-p3V2iDsD1G97OU2JYA3GFbD5SPBpk2DL3mayLc7mTZVQHSCS9W6V8vh~hgJ6KnEUoLUvOCir9H0XsOOr8tsVYaXYhecmCt3xJGjc12YS1-FeVleJ07oj2ucx7BKWkoPryTD4aBPgiHLWE~0IqUDBzZ5BLlNEgWCbFTA2PzOscGd1htmLfDXPk3Kz0Te-pAtywLkM9te9F8YbMd21X-cg__&Key-Pair-Id=K2NXBXLF010TJW |
| `augustiner-abgesagt.jpg` | 28.09.25 Augustiner Biergarten Bad Cannstatt (abgesagt) | https://le-cdn.website-editor.net/s/5272fe7ac5ba4e51945e65145b872eae/dms3rep/multi/opt/abgesagt-1920w.jpg?Expires=1794608895&Signature=MZwfteR5fiXjj9bq0sYsm33ydrJAHyTR7ABflgmYofxFWMcFbs5Hj9O1LBBgPqEKDw90hKBLbVV1NxwPAgrmViJbuPLWMHs2KDMMpkmA1H18Qt3DFrc3g4ciCkfwDEvuMbO98DDX0mvkksHqDpMr0mMKX9VA2HcXC3JE-2XX1Y2C5BCFodcdsgGX1oGpxJMolSRaKEQyR7jMQlqJrZhS1kziFchhpp0uOh5YJ6UChfeYo8KdTWbZ-yMaMoozohDpa4fFfsGEhOCUqMHdLxzzKhNrEp4YJGFHPLJx5GFKYEpGXURk0BCp4M4SfAZEAlJ8LwCROcU3u5E04SVzuYn0dw__&Key-Pair-Id=K2NXBXLF010TJW |
| `stadtfest-rastatt.jpg` | 27.07.25 + 21.07.24 Stadtfest Rastatt (Foto: Stadt Rastatt) | https://le-cdn.website-editor.net/s/5272fe7ac5ba4e51945e65145b872eae/dms3rep/multi/opt/Headerbild+Inhaltsseite_Stadtfest+2019_Marktplatz+Menschen_Foto+Stadt+Rastatt+Heike+Die%C3%83-elberb-2d962c7c-2880w.jpg?Expires=1794608895&Signature=DcDXF6hT91LWFLnGgqejjVppsJ7EWoITOmBQhgGjHhYJ1uaw7NXW~82MLAJmeBb1oFcgYcV~yx1CY7iO0BwScFO0l6qFoN3x0NsCvCQkF2maOfGfQgoRPmDwtUaINTKRKoORwPft8hjJRER0uPomleWhTDmm~0Bk4C0bHUPZT8bCyRdIpFjptRXMvHfpBq9JENDLWDMODtK2sYVkvHf-LusBGPTijED26WGNt8hNrL02A-f18rOW0wwS97UERUhzdp-MVE7KO55wPdKq~wC9Aboy8N4fO9RQwsQtRglDsqiBVxXO-SKm2oE0YkkEYS3enjR~IihNmHMk4fuRJKnv-A__&Key-Pair-Id=K2NXBXLF010TJW |
| `weihnachtsmarkt-rastatt.jpeg` | 01.12.24 Weihnachtsmarkt Rastatt | https://le-cdn.website-editor.net/s/5272fe7ac5ba4e51945e65145b872eae/dms3rep/multi/opt/120519-1aa10159-9577d6b0-13424693-0fe8df54-1920w.jpeg?Expires=1794608895&Signature=jnUFvuNUCOe0wbMkW436~NWaEbfptnuWGS0bwo-jd2a7nthUt8nyv33pU8Ee-bcOewL8G5xBpycPDxKIJJgl9e0FmzeZ4PYgjD4fRki3-vcvFU3pnfFxZkWzhZpPPzGCMxbWkeSJfBA3Vdb-h0987KP71XmIC3VhpXvGklShh0g2uezm05DXP0b~Y9z3v1dfDQX22G6UzLL-iviyrMGHnrd8GwgKPlCBKtJEyzJ3C~0dU17kz~9K8xtUSNNZOpYsQbXkUoOIov1m8ZJ3DQdrHZOJIF86cBvQzly3i8W6A6Xw8ZSvbP8IqM4gJ04qkI0EK4C4YrjppslfifryQWfPBQ__&Key-Pair-Id=K2NXBXLF010TJW |
| `adventsmarkt-gaggenau.jpeg` | 30.11.24 Adventsmarkt Gaggenau | https://le-cdn.website-editor.net/s/5272fe7ac5ba4e51945e65145b872eae/dms3rep/multi/opt/120488-2303a09d-3265e516-1920w.jpeg?Expires=1794608895&Signature=VqrrLmFkUEgeV5vxlV~rXyCXJA3VzSfCcXLZV8FDLXLdueRigm39aEOCJLIebd00cPTD53tMquqoDCK7Mwl72a-Z13B19nfHr0l4bAjnElBLK-LFsB1lZ-m6Uaf-tybb61os6HKgIozpQK6OJAzFwbMamUx2F4i5BjeVPJaylsDGOxmt7r3zSGHyMul-sJmKibYJ19YUUFWZh0BYu5t9OJQFMUuXji7D1ZF7aJ1czxF0hHzQMJMonLa2pPeEiJ3ZZHZ07DDQkISkEgESNHc70V0LsIxWagozlUG77Hal~Qxc2RfCcoLevSFMxuTMiD3N9wlbdzc5m5d5~JUz9DqbrA__&Key-Pair-Id=K2NXBXLF010TJW |
| `rheinstetten-jazzclub.png` | 16.08.24 Swingin' Biergarten, Gasthaus Rheinebene (Jazzclub Rheinstetten e.V.) | https://le-cdn.website-editor.net/s/5272fe7ac5ba4e51945e65145b872eae/dms3rep/multi/opt/Jazzclub-Rhe-Logo_v3_farbe_transparent-1920w.png?Expires=1794608895&Signature=AH7JpufuEnrVQ7Mexni10OMChyhhafzZ5GkQAlUB1rd8k3CJbWIbrlBuZNHTRA~47ObMIcnUAYgS52SUpd~e8AdJY2dY6FI2u1STOtrHJdppRhbNYViWeGGd2D9TKuV0p7MTnrkdd9Ib1U6Zf0qFThD6pkMJSwtIzpB9flXEv4nyadzusoyIedCQrLBATRWYM08RAMcAhIqhzmxBMr4VWMuNrRGxaommXFzmy3CugL7PkFJuCz~kYrifO7sUeM5sRri~T2g2vW4HhxdoejZEP-tTHwDSgM0uklJ-AnnH7Lqz3pUqggSISEcKAa38~aVXck4tRW6wllEGCOCln2WSw__&Key-Pair-Id=K2NXBXLF010TJW |

Hinweis: Beim Download ggf. Browser-Header mitschicken (`User-Agent`/
`Referer: https://rebophot.de/`), die CDN-URLs antworteten auf plain
`curl` mit 403.
