/**
 * data.ts
 * -----------
 * The "content database" of the site. Keeping data separate from the
 * rendering code is the core idea you will practice in this project:
 * the pages in src/pages/ read this data and turn it into HTML.
 */
import type { BandMember, BandEvent, ContactInfo, GalleryPicture } from './types'

export const bandName = 'ReBop Hot'

export const bandTagline = 'Ready to dance?'

export const bandIntro =
  'Die neunköpfige Swing- & Jump-Blues-Combo ReBop Hot aus den Regionen ' +
  'Karlsruhe/Kraichgau/Pfalz bringt mit Rhythmusgruppe, Bläsersatz, Sängerin ' +
  'und zwei Sängern Vintage Dance Music auf die Bühne.'

export const bandDescription = [
  'Der Swing der 1930er Jahre geht Tänzerinnen und Tänzern ebenso in die ' +
    'Beine wie der Jump-Blues aus den 1940er und 50er Jahren.',
  'Der Jump-Blues, eine (meist) schnellere Spielart des Blues, entstand als ' +
    'explosive Mischung aus Blues, Swing und Jazz. Er integriert einen ' +
    'dominanten Bläsersatz, ist tanzbar und gilt für viele als Vorläufer ' +
    'des Rock\u2019n\u2019Roll.',
  'Zum Repertoire der Band gehören Standards von George Gershwin bis Ray ' +
    'Charles, aber auch weniger bekannte Titel von Größen wie Sam Butera, ' +
    'Louis Jordan oder Wynona Carr.',
].join('\n\n')

export const bandMembers: BandMember[] = [
  { name: 'Ilse', role: 'Gesang', email: 'Ilse@ReBopHot.de' },
  { name: 'Jakob', role: 'Gesang + Gitarre', email: 'Jakob@ReBopHot.de' },
  { name: 'Martin', role: 'Gesang + Tenor Sax.', email: 'Martin@ReBopHot.de' },
  { name: 'Elisabeth', role: 'Klavier', email: 'Elisabeth@ReBopHot.de' },
  { name: 'Jonas', role: 'Es Alt Sax.', email: 'Jonas@ReBopHot.de' },
  { name: 'Anette', role: 'Bariton Sax.', email: 'Anette@ReBopHot.de' },
  { name: 'Mathias', role: 'Posaune', email: 'Mathias@ReBopHot.de' },
  { name: 'Hans', role: 'Bass', email: 'Hans@ReBopHot.de' },
  { name: 'Heiko', role: 'Drums', email: 'Heiko@ReBopHot.de' },
]

/**
 * Events are stored with ISO date strings so we can sort them and
 * split them into upcoming / past at runtime (see src/pages/termine.ts).
 */
export const events: BandEvent[] = [
  {
    date: '2026-10-28',
    title: 'Weingut Klenert',
    location: 'Kraichtal',
    time: 'ab 18.00h',
  },
  {
    date: '2026-09-28',
    title: 'Benefizkonzert auf dem Oktoberfest der Automeile Husarenlager',
    location: 'Karlsruhe-Knielingen',
    time: 'ab ca. 13.00h',
    note: 'Durch den Verzicht auf unsere Gage unterstützen wir die Arbeit des Fördervereins zur Unterstützung der onkologischen Abteilung der Kinderklinik Karlsruhe e.V. (FUoKK).',
  },
  {
    date: '2026-09-26',
    title: 'Herbstmarkt',
    location: 'Gaggenau, Anne-Maßen Platz',
    time: 'ab 16.00h',
    admission: 'Eintritt frei',
  },
  {
    date: '2026-09-04',
    title: 'Jazzclub 77 Weinstadt Wiesloch e.V.',
    location: 'Bahnhofstraße 9 · 69168 Wiesloch',
    time: 'Einlass 19.30h, Konzertbeginn ca. 20.30h',
    admission: 'Eintritt: € 13,– / Clubmitglieder € 10,–',
    note: 'Achtung: Begrenzte Plätze! Der Jazzclub in Wiesloch ist eine urige/kuschelige Location – also kommt frühzeitig.',
  },
  {
    date: '2026-08-30',
    title: 'Open-Air Sommer',
    location: 'Kurparkbühne Bad Schönborn',
    time: 'ab 18.00h',
    admission: 'Eintritt frei!',
    note: 'Ein bunter Mix aus Swing, Jazz und Jump-Blues. Zu unserer Vintage Dance Music ist Tanzen ausdrücklich erwünscht!',
  },
  {
    date: '2025-09-28',
    title: 'Augustiner Biergarten – Bad Cannstatt',
    location: 'Königsplatz 1 · 70372 Stuttgart, im Kurpark Bad Cannstatt',
    time: '15.00h – 18.00h',
    admission: 'Eintritt frei – Hutsammlung',
    cancelled: true,
  },
  {
    date: '2025-08-09',
    title: 'Kurpark Bad Schönborn',
    location: 'Kurparkbühne',
    time: '18.00h – 21.00h',
    note: 'Unser erstes Konzert im Kurpark Bad Schönborn-Mingolsheim. Petticoat und Hawaiihemd welcome!',
    admission: 'Eintritt frei',
  },
  {
    date: '2025-07-27',
    title: 'Stadtfest Rastatt',
    location: 'Bühne vor der St. Alexander Kirche, 76437 Rastatt',
    time: '13.00h – 15.00h',
    admission: 'Eintritt frei',
  },
  {
    date: '2024-12-01',
    title: 'Weihnachtsmarkt Rastatt',
    location: '76437 Rastatt',
    time: '18.00h – 20.00h',
    note: 'Christmas meets Vintage Dance Music: swingende Weihnachtsmusik und ein bunter Mix aus Swing, Jazz und Jump-Blues.',
  },
  {
    date: '2024-11-30',
    title: 'Adventsmarkt Gaggenau',
    location: 'Gaggenau',
    time: '18.00h – 20.00h',
    note: 'Swingin\u2019 Christmas mit ReBop Hot und den Swing-Größen der 1930er bis 1950er.',
  },
  {
    date: '2024-08-16',
    title: 'Swingin\u2019 Biergarten im Gasthaus Rheinebene',
    location: 'Unterer Legel 1b, 76287 Rheinstetten-Mörsch',
    time: 'ab 18.30h',
    admission: 'Eintritt frei – Hutspende',
    note: 'Eine Veranstaltung des Jazzclub Rheinstetten e.V.',
  },
  {
    date: '2024-07-21',
    title: 'Stadtfest Rastatt',
    location: 'Bühne am Marktplatz, 76437 Rastatt',
    time: '14.00h – 16.00h',
    admission: 'Eintritt frei',
  },
]

export const contact: ContactInfo = {
  city: 'Karlsruhe',
  country: 'GERMANY',
  phone: '+49 151 65 98 76 54',
  email: 'kontakt@rebophot.de',
  facebookUrl: 'https://www.facebook.com/Re-Bop-Hot-100555619167395',
}

/** Placeholder "photos" for the gallery page (CSS gradients instead of files). */
export const galleryPictures: GalleryPicture[] = [
  { title: 'Herbstmarkt Gaggenau', gradient: 'linear-gradient(135deg, #d4a94e, #7a4a1e)' },
  { title: 'Jazzclub Wiesloch', gradient: 'linear-gradient(135deg, #8e2f2f, #2a1010)' },
  { title: 'Kurpark Bad Schönborn', gradient: 'linear-gradient(135deg, #3e6b4f, #16301f)' },
  { title: 'Weihnachtsmarkt Rastatt', gradient: 'linear-gradient(135deg, #4a6b8e, #101c2a)' },
  { title: 'Stadtfest Rastatt', gradient: 'linear-gradient(135deg, #b3542f, #3a1a0a)' },
  { title: 'Biergarten-Konzert', gradient: 'linear-gradient(135deg, #c9a24b, #584a12)' },
  { title: 'Vintage Dance Music', gradient: 'linear-gradient(135deg, #6b3e6b, #1f0f1f)' },
  { title: 'Benefizkonzert', gradient: 'linear-gradient(135deg, #2f6b8e, #0a1a2a)' },
  { title: 'On Stage', gradient: 'linear-gradient(135deg, #8e5a2f, #2a1a0a)' },
]
