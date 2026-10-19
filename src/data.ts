/**
 * data.ts
 * -----------
 * The "content database" of the site. Keeping data separate from the
 * rendering code is the core idea you will practice in this project:
 * the pages in src/pages/ read this data and turn it into HTML.
 */
import type {
  BandMember,
  BandEvent,
  ContactInfo,
  GallerySection,
} from './types'

export const bandName = 'ReBop Hot'

export const bandTagline = 'Ready to dance?'

export const bandIntro =
  'Die neunköpfige Swing- & Jump-Blues-Combo ReBop Hot aus den Regionen ' +
  'Karlsruhe/Kraichgau/Pfalz bringt mit Rhythmusgruppe, Bläsersatz, Sängerin ' +
  'und zwei Sängern Vintage Dance Music auf die Bühne – tanzbar von Jive über ' +
  'Lindy-Hop bis Boogie-Woogie.'

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
  {
    name: 'Ilse',
    role: 'Gesang',
    email: 'Ilse@ReBopHot.de',
    photo: {
      src: '/images/mitglieder/ilse.png',
      alt: 'Porträt von Ilse (Gesang)',
      width: 480,
      height: 753,
      position: '50% 20%',
    },
  },
  {
    name: 'Jakob',
    role: 'Gesang + Gitarre',
    email: 'Jakob@ReBopHot.de',
    photo: {
      src: '/images/mitglieder/jakob.png',
      alt: 'Porträt von Jakob (Gesang + Gitarre)',
      width: 480,
      height: 562,
      position: '50% 20%',
    },
  },
  {
    name: 'Martin',
    role: 'Gesang + Tenor Sax.',
    email: 'Martin@ReBopHot.de',
    photo: {
      src: '/images/mitglieder/martin.png',
      alt: 'Porträt von Martin (Gesang + Tenor Sax.)',
      width: 480,
      height: 587,
      position: '50% 20%',
    },
  },
  {
    name: 'Elisabeth',
    role: 'Klavier',
    email: 'Elisabeth@ReBopHot.de',
    photo: {
      src: '/images/mitglieder/elisabeth.png',
      alt: 'Porträt von Elisabeth (Klavier)',
      width: 480,
      height: 593,
      position: '50% 20%',
    },
  },
  {
    name: 'Jonas',
    role: 'Es Alt Sax.',
    email: 'Jonas@ReBopHot.de',
    photo: {
      src: '/images/mitglieder/jonas.png',
      alt: 'Porträt von Jonas (Es Alt Sax.)',
      width: 480,
      height: 724,
      position: '50% 20%',
    },
  },
  {
    name: 'Anette',
    role: 'Bariton Sax.',
    email: 'Anette@ReBopHot.de',
    photo: {
      src: '/images/mitglieder/anette.png',
      alt: 'Porträt von Anette (Bariton Sax.)',
      width: 480,
      height: 698,
      position: '50% 20%',
    },
  },
  {
    name: 'Mathias',
    role: 'Posaune',
    email: 'Mathias@ReBopHot.de',
    photo: {
      src: '/images/mitglieder/mathias.png',
      alt: 'Porträt von Mathias (Posaune)',
      width: 480,
      height: 641,
      position: '50% 20%',
    },
  },
  {
    name: 'Hans',
    role: 'Bass',
    email: 'Hans@ReBopHot.de',
    photo: {
      src: '/images/mitglieder/hans.png',
      alt: 'Porträt von Hans (Bass)',
      width: 480,
      height: 591,
      position: '50% 20%',
    },
  },
  {
    name: 'Heiko',
    role: 'Drums',
    email: 'Heiko@ReBopHot.de',
    photo: {
      src: '/images/mitglieder/heiko.png',
      alt: 'Porträt von Heiko (Drums)',
      width: 480,
      height: 561,
      position: '50% 20%',
    },
  },
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
    photo: {
      src: '/images/termine/klenert-2026.png',
      alt: 'Hügel-Swing im Weingut Klenert in Kraichtal',
      width: 1536,
      height: 1024,
    },
  },
  {
    date: '2026-09-28',
    title: 'Benefizkonzert auf dem Oktoberfest der Automeile Husarenlager',
    location: 'Karlsruhe-Knielingen',
    time: 'ab ca. 13.00h',
    note: 'Durch den Verzicht auf unsere Gage unterstützen wir die Arbeit des Fördervereins zur Unterstützung der onkologischen Abteilung der Kinderklinik Karlsruhe e.V. (FUoKK).',
    photo: {
      src: '/images/termine/husarenlager-fuokk.jpg',
      alt: 'Logo des Fördervereins zur Unterstützung der onkologischen Abteilung der Kinderklinik Karlsruhe e.V. (FUoKK)',
      width: 1369,
      height: 1169,
    },
  },
  {
    date: '2026-09-26',
    title: 'Herbstmarkt',
    location: 'Gaggenau, Anne-Maßen Platz',
    time: 'ab 16.00h',
    admission: 'Eintritt frei',
    photo: {
      src: '/images/termine/herbstmarkt-gaggenau.png',
      alt: 'Flyer zum Herbstmarkt in Gaggenau',
      width: 1536,
      height: 1024,
    },
  },
  {
    date: '2026-09-04',
    title: 'Jazzclub 77 Weinstadt Wiesloch e.V.',
    location: 'Bahnhofstraße 9 · 69168 Wiesloch',
    time: 'Einlass 19.30h, Konzertbeginn ca. 20.30h',
    admission: 'Eintritt: € 13,– / Clubmitglieder € 10,–',
    note: 'Achtung: Begrenzte Plätze! Der Jazzclub in Wiesloch ist eine urige/kuschelige Location – also kommt frühzeitig.',
    photo: {
      src: '/images/termine/jazzclub-wiesloch.jpg',
      alt: 'Der Jazzclub 77 Weinstadt in Wiesloch',
      width: 988,
      height: 547,
    },
  },
  {
    date: '2026-08-30',
    title: 'Open-Air Sommer',
    location: 'Kurparkbühne Bad Schönborn',
    time: 'ab 18.00h',
    admission: 'Eintritt frei!',
    note: 'Ein bunter Mix aus Swing, Jazz und Jump-Blues. Zu unserer Vintage Dance Music ist Tanzen ausdrücklich erwünscht!',
    photo: {
      src: '/images/termine/kurpark-bad-schoenborn.png',
      alt: 'Die Kurparkbühne im Kurpark Bad Schönborn',
      width: 1070,
      height: 418,
    },
  },
  {
    date: '2025-09-28',
    title: 'Augustiner Biergarten – Bad Cannstatt',
    location: 'Königsplatz 1 · 70372 Stuttgart, im Kurpark Bad Cannstatt',
    time: '15.00h – 18.00h',
    admission: 'Eintritt frei – Hutsammlung',
    cancelled: true,
    photo: {
      src: '/images/termine/augustiner-abgesagt.jpg',
      alt: 'Hinweisbild: Der Termin im Augustiner Biergarten Bad Cannstatt wurde abgesagt',
      width: 720,
      height: 360,
    },
  },
  {
    date: '2025-08-09',
    title: 'Kurpark Bad Schönborn',
    location: 'Kurparkbühne',
    time: '18.00h – 21.00h',
    note: 'Unser erstes Konzert im Kurpark Bad Schönborn-Mingolsheim. Petticoat und Hawaiihemd welcome!',
    admission: 'Eintritt frei',
    photo: {
      src: '/images/termine/kurpark-bad-schoenborn.png',
      alt: 'Die Kurparkbühne im Kurpark Bad Schönborn',
      width: 1070,
      height: 418,
    },
  },
  {
    date: '2025-07-27',
    title: 'Stadtfest Rastatt',
    location: 'Bühne vor der St. Alexander Kirche, 76437 Rastatt',
    time: '13.00h – 15.00h',
    admission: 'Eintritt frei',
    photo: {
      src: '/images/termine/stadtfest-rastatt.jpg',
      alt: 'Das Stadtfest Rastatt am Marktplatz (Foto: Stadt Rastatt)',
      width: 1600,
      height: 415,
    },
  },
  {
    date: '2024-12-01',
    title: 'Weihnachtsmarkt Rastatt',
    location: '76437 Rastatt',
    time: '18.00h – 20.00h',
    note: 'Christmas meets Vintage Dance Music: swingende Weihnachtsmusik und ein bunter Mix aus Swing, Jazz und Jump-Blues.',
    photo: {
      src: '/images/termine/weihnachtsmarkt-rastatt.jpeg',
      alt: 'Der Weihnachtsmarkt in Rastatt',
      width: 837,
      height: 919,
    },
  },
  {
    date: '2024-11-30',
    title: 'Adventsmarkt Gaggenau',
    location: 'Gaggenau',
    time: '18.00h – 20.00h',
    note: 'Swingin\u2019 Christmas mit ReBop Hot und den Swing-Größen der 1930er bis 1950er.',
    photo: {
      src: '/images/termine/adventsmarkt-gaggenau.jpeg',
      alt: 'Der Adventsmarkt in Gaggenau',
      width: 1600,
      height: 1065,
    },
  },
  {
    date: '2024-08-16',
    title: 'Swingin\u2019 Biergarten im Gasthaus Rheinebene',
    location: 'Unterer Legel 1b, 76287 Rheinstetten-Mörsch',
    time: 'ab 18.30h',
    admission: 'Eintritt frei – Hutspende',
    note: 'Eine Veranstaltung des Jazzclub Rheinstetten e.V.',
    photo: {
      src: '/images/termine/rheinstetten-jazzclub.png',
      alt: 'Logo des Jazzclub Rheinstetten e.V.',
      width: 1535,
      height: 590,
    },
  },
  {
    date: '2024-07-21',
    title: 'Stadtfest Rastatt',
    location: 'Bühne am Marktplatz, 76437 Rastatt',
    time: '14.00h – 16.00h',
    admission: 'Eintritt frei',
    photo: {
      src: '/images/termine/stadtfest-rastatt.jpg',
      alt: 'Das Stadtfest Rastatt am Marktplatz (Foto: Stadt Rastatt)',
      width: 1600,
      height: 415,
    },
  },
]

export const contact: ContactInfo = {
  city: 'Karlsruhe',
  country: 'GERMANY',
  phone: '+49 151 65 98 76 54',
  email: 'kontakt@rebophot.de',
  facebookUrl: 'https://www.facebook.com/Re-Bop-Hot-100555619167395',
}

/**
 * The real photos from www.rebophot.de, downloaded into public/images/.
 * Grouped by event: each section has a short heading and its pictures.
 * Credits: band photos by Dominik Frank (2018/2022 shooting),
 * concert photos by the venues/band. Private learning use only.
 */
export const gallerySections: GallerySection[] = [
  {
    title: 'Band-Shooting 2022',
    pictures: [
      {
        title: 'ReBop Hot 2022',
        src: '/images/band-2022.jpg',
        alt: 'Die Band ReBop Hot vor einer Wand, Fotoshooting August 2022',
        width: 1920,
        height: 1275,
      },
    ],
  },
  {
    title: 'Band-Shooting 2018',
    pictures: [
      {
        title: 'ReBop Hot 2018',
        src: '/images/band-2018.png',
        alt: 'Die Band ReBop Hot, Fotoshooting November 2018',
        width: 1920,
        height: 1154,
      },
    ],
  },
  {
    title: 'Band-Porträts',
    pictures: [
      {
        title: 'Gesang: Ilse, Jakob und Martin',
        src: '/images/gesang.jpg',
        alt: 'Die Sängerin und die zwei Sänger von ReBop Hot',
        width: 1920,
        height: 1172,
      },
      {
        title: 'Bläsersatz',
        src: '/images/blaesersatz.jpg',
        alt: 'Der Bläsersatz von ReBop Hot mit Saxophonen und Posaune',
        width: 1920,
        height: 1189,
      },
    ],
  },
  {
    title: 'Badenweiler 2024',
    pictures: [
      {
        title: 'Kur- und Festspielhaus Badenweiler 2024',
        src: '/images/badenweiler-1.jpg',
        alt: 'ReBop Hot auf der Konzertmuschel in Badenweiler, Juli 2024',
        width: 1920,
        height: 1277,
      },
      {
        title: 'Kur- und Festspielhaus Badenweiler 2024',
        src: '/images/badenweiler-2.jpg',
        alt: 'Konzert in der Konzertmuschel Badenweiler, Juli 2024',
        width: 1920,
        height: 1277,
      },
      {
        title: 'Kur- und Festspielhaus Badenweiler 2024',
        src: '/images/badenweiler-3.jpg',
        alt: 'Konzert in der Konzertmuschel Badenweiler, Juli 2024',
        width: 1920,
        height: 1277,
      },
    ],
  },
  {
    title: 'Bruchsal 2024',
    pictures: [
      {
        title: 'Genuss- und Gläserklang Bruchsal 2024',
        src: '/images/bruchsal-1.jpg',
        alt: 'Open-Air-Konzert im Luisenpark Bruchsal, Juni 2024',
        width: 1920,
        height: 1081,
      },
      {
        title: 'Genuss- und Gläserklang Bruchsal 2024',
        src: '/images/bruchsal-3.jpg',
        alt: 'Open-Air-Konzert im Luisenpark Bruchsal, Juni 2024',
        width: 1920,
        height: 1081,
      },
    ],
  },
  {
    title: 'Bad Herrenalb 2022',
    pictures: [
      {
        title: 'Sonntagskonzert im Kurpark Bad Herrenalb 2022',
        src: '/images/kurpark-2022.jpg',
        alt: 'Sonntagskonzert in der Kurhaus-Konzertmuschel Bad Herrenalb, Juli 2022',
        width: 1815,
        height: 875,
      },
    ],
  },
  {
    title: 'Tempel Karlsruhe 2019',
    pictures: [
      {
        title: "Swingin' Charlie im Tempel Karlsruhe 2019",
        src: '/images/tempel-2019.jpg',
        alt: "ReBop Hot in Action beim Swingin' Charlie im Kulturzentrum Tempel Karlsruhe, Oktober 2019",
        width: 1920,
        height: 485,
      },
    ],
  },
]
