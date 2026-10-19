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
 * The complete photo gallery from www.rebophot.de/galerie, downloaded
 * into public/images/galerie/ (one subfolder per section/shooting).
 * Section order and picture captions follow the original page.
 * Credits: band shootings 2022/2018 by Dominik Frank,
 * Fotoshooting 2020 by Thomas Harlfinger, EGO photos (C) EGO-Gruppe,
 * concert photos by the venues/band. All photos remain the property of the
 * band and their photographers.
 */
export const gallerySections: GallerySection[] = [
  {
    title: 'Sommertour 2024',
    pictures: [
      {
        title: 'Sommertour 2024 – Plakat 2',
        src: '/images/galerie/sommertour-2024/01-sommertour2024-flyer-2-1710a50f.png',
        alt: 'Plakat der ReBop Hot Sommertour 2024',
        width: 482,
        height: 692,
      },
      {
        title: 'Sommertour 2024 – Plakat 1',
        src: '/images/galerie/sommertour-2024/02-sommertour2024-flyer-1-8d3b9bbd.png',
        alt: 'Plakat der ReBop Hot Sommer Tour 2024',
        width: 489,
        height: 694,
      },
    ],
  },
  {
    title: 'Badenweiler 2024',
    pictures: [
      {
        title: 'Kur- und Festspielhaus Badenweiler am 20.07.24',
        src: '/images/galerie/badenweiler-2024/01-badenweiler-2024-179.jpg',
        alt: 'Kur- und Festspielhaus Badenweiler am 20.07.24',
        width: 1920,
        height: 1277,
      },
      {
        title:
          'Kur- und Festspielhaus Badenweiler 2024: Samstag Nachmittag, die Sonne brennt, aber getanzt wurde trotzdem ;-)',
        src: '/images/galerie/badenweiler-2024/02-badenweiler-2024-154.jpg',
        alt: 'Kur- und Festspielhaus Badenweiler am 20.07.24',
        width: 1920,
        height: 1277,
      },
      {
        title: 'Kur- und Festspielhaus Badenweiler am 20.07.24',
        src: '/images/galerie/badenweiler-2024/03-badenweiler-2024-171.jpg',
        alt: 'Kur- und Festspielhaus Badenweiler am 20.07.24',
        width: 1920,
        height: 1277,
      },
      {
        title: 'Kur- und Festspielhaus Badenweiler am 20.07.24',
        src: '/images/galerie/badenweiler-2024/04-badenweiler-2024-28130-29.jpg',
        alt: 'Kur- und Festspielhaus Badenweiler am 20.07.24',
        width: 1657,
        height: 1207,
      },
    ],
  },
  {
    title: 'Fini Resort Badenweiler 2024',
    pictures: [
      {
        title: 'Donnerstag-Live Konzert im Fini Resort Badenweiler, 18.07.24',
        src: '/images/galerie/fini-resort-2024/01-badenweiler-2024-2843-29.jpg',
        alt: 'Donnerstag-Live Konzert Fini Resort Badenweiler, 18.07.24',
        width: 1920,
        height: 1058,
      },
      {
        title:
          'Fini Resort Badenweiler 2024: wir haben die Open-Air Saison im Fini-Resort eröffnet',
        src: '/images/galerie/fini-resort-2024/02-fini-tisch.jpg',
        alt: 'Donnerstag-Live Konzert im Fini Resort Badenweiler, 18.07.24',
        width: 1920,
        height: 1130,
      },
      {
        title: 'Donnerstag-Live Konzert im Fini Resort Badenweiler, 18.07.24',
        src: '/images/galerie/fini-resort-2024/03-badenweiler-2024-2881-29.jpg',
        alt: 'Donnerstag-Live Konzert im Fini Resort Badenweiler, 18.07.24',
        width: 1920,
        height: 1277,
      },
      {
        title: 'Fini Resort Badenweiler 2024: ein voller Erfolg!',
        src: '/images/galerie/fini-resort-2024/04-badenweiler-2024-28123-1-29.jpg',
        alt: 'Donnerstag-Live Konzert im Fini Resort Badenweiler, 18.07.24',
        width: 1920,
        height: 1079,
      },
    ],
  },
  {
    title: 'Bruchsal 2024',
    pictures: [
      {
        title: 'Genuss- und Gläserklang Bruchsal, 14.06.24',
        src: '/images/galerie/bruchsal-2024/01-gug-150624-6-ed215631.jpg',
        alt: 'Genuss- und Gläserklang Bruchsal, 14.06.24',
        width: 1920,
        height: 1081,
      },
      {
        title: 'Genuss- und Gläserklang 14.06.24',
        src: '/images/galerie/bruchsal-2024/02-gug-150624-3-45d2e7f8.jpg',
        alt: 'Genuss- und Gläserklang 14.06.24',
        width: 1372,
        height: 972,
      },
      {
        title: 'Genuss- und Gläserklang Bruchsal 2024: super Stimmung',
        src: '/images/galerie/bruchsal-2024/03-gug-150624-1-ed49dea0-8ef1d9c0.jpg',
        alt: 'Genuss- und Gläserklang Bruchsal 14.06.24',
        width: 1920,
        height: 1081,
      },
      {
        title: 'Genuss- und Gläserklang Bruchsal 2024: liebevolles Ambiente',
        src: '/images/galerie/bruchsal-2024/04-gug-150624-4-6b4b82f7.jpg',
        alt: 'Genuss- und Gläserklang Bruchsal, 14.06.24',
        width: 1920,
        height: 1081,
      },
    ],
  },
  {
    title: 'Band-Shooting 2022',
    pictures: [
      {
        title: 'ReBop Hot 2022 – Band vor der Wand',
        src: '/images/galerie/fotoshooting-2022/01-band-vor-wand-8er-bearbeitet.jpg',
        alt: 'Die Band ReBop Hot vor einer Wand, Fotoshooting August 2022',
        width: 1920,
        height: 1275,
      },
      {
        title: 'ReBop Hot 2022 – auf der Treppe',
        src: '/images/galerie/fotoshooting-2022/02-auf-treppe-7f52d9c7.png',
        alt: 'Die Band ReBop Hot auf einer Treppe, Fotoshooting August 2022',
        width: 1920,
        height: 1766,
      },
      {
        title: 'ReBop Hot 2022 – Band vor der Wand',
        src: '/images/galerie/fotoshooting-2022/03-band-vor-wand-beaarbeitet.jpg',
        alt: 'Die Band ReBop Hot vor einer Wand, Fotoshooting August 2022',
        width: 1920,
        height: 1275,
      },
    ],
  },
  {
    title: 'Bad Herrenalb 2022',
    pictures: [
      {
        title: 'Sonntagskonzert Bad Herrenalb 2022 – Bild 1',
        src: '/images/galerie/bad-herrenalb-2022/01-dsc-0217-282-29-003a634a.jpg',
        alt: 'Sonntagskonzert Bad Herrenalb 2022, Bild 1',
        width: 1815,
        height: 875,
      },
      {
        title: 'Sonntagskonzert Bad Herrenalb 2022 – Bild 2',
        src: '/images/galerie/bad-herrenalb-2022/02-dsc-0225-2.jpg',
        alt: 'Sonntagskonzert Bad Herrenalb 2022, Bild 2',
        width: 1920,
        height: 1136,
      },
      {
        title: 'Sonntagskonzert Bad Herrenalb 2022 – Bild 3',
        src: '/images/galerie/bad-herrenalb-2022/03-dsc-0243-282-29.jpg',
        alt: 'Sonntagskonzert Bad Herrenalb 2022, Bild 3',
        width: 1749,
        height: 1051,
      },
      {
        title: 'Sonntagskonzert Bad Herrenalb 2022 – Bild 4',
        src: '/images/galerie/bad-herrenalb-2022/04-dsc-0093-43fb16dd-d5fab13b.jpg',
        alt: 'Sonntagskonzert Bad Herrenalb 2022, Bild 4',
        width: 1567,
        height: 1190,
      },
      {
        title: 'Sonntagskonzert Bad Herrenalb 2022 – Bild 5',
        src: '/images/galerie/bad-herrenalb-2022/05-dsc-0215-2.jpg',
        alt: 'Sonntagskonzert Bad Herrenalb 2022, Bild 5',
        width: 1920,
        height: 1275,
      },
    ],
  },
  {
    title: 'Band-Shooting 2020',
    pictures: [
      {
        title: 'Band-Shooting 2020 – Bild 1',
        src: '/images/galerie/fotoshooting-2020/01-img-20200308-wa0006-5dd6fa39-96049c99.jpg',
        alt: 'Band-Shooting 2020, Bild 1',
        width: 1600,
        height: 902,
      },
      {
        title: 'Band-Shooting 2020 – Bild 2',
        src: '/images/galerie/fotoshooting-2020/02-img-20200308-wa0005-5695960c-d395c619.jpg',
        alt: 'Band-Shooting 2020, Bild 2',
        width: 1600,
        height: 904,
      },
      {
        title: 'Band-Shooting 2020 – Bild 3',
        src: '/images/galerie/fotoshooting-2020/03-img-20200308-wa0007.jpg',
        alt: 'Band-Shooting 2020, Bild 3',
        width: 1600,
        height: 1200,
      },
      {
        title: 'Band-Shooting 2020 – Bild 4',
        src: '/images/galerie/fotoshooting-2020/04-1280863-bearbeitetneu-1a8330ad-c0c134bf.jpg',
        alt: 'Band-Shooting 2020, Bild 4',
        width: 1920,
        height: 1910,
      },
    ],
  },
  {
    title: 'Swingin\u2019 Charlie – Tempel Karlsruhe 2019',
    pictures: [
      {
        title: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019 – Bild 1',
        src: '/images/galerie/tempel-swingin-charlie-2019/01-20191011-193006414-ios.jpg',
        alt: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019, Bild 1',
        width: 1920,
        height: 1350,
      },
      {
        title: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019 – Bild 2',
        src: '/images/galerie/tempel-swingin-charlie-2019/02-img-4840-2.jpg',
        alt: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019, Bild 2',
        width: 1920,
        height: 1296,
      },
      {
        title: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019 – Bild 3',
        src: '/images/galerie/tempel-swingin-charlie-2019/03-screenshot-2019-11-11-12-44-36-282-29.png',
        alt: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019, Bild 3',
        width: 533,
        height: 400,
      },
      {
        title: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019 – Bild 4',
        src: '/images/galerie/tempel-swingin-charlie-2019/04-screenshot-2019-11-11-12-39-55-2.png',
        alt: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019, Bild 4',
        width: 761,
        height: 459,
      },
      {
        title: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019 – Bild 5',
        src: '/images/galerie/tempel-swingin-charlie-2019/05-20191011-155221.jpg',
        alt: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019, Bild 5',
        width: 1920,
        height: 1080,
      },
      {
        title: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019 – Bild 6',
        src: '/images/galerie/tempel-swingin-charlie-2019/06-screenshot-2019-11-11-12-45-40-2.png',
        alt: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019, Bild 6',
        width: 845,
        height: 438,
      },
      {
        title: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019 – Bild 7',
        src: '/images/galerie/tempel-swingin-charlie-2019/07-20191011-175216-c300a02d.jpg',
        alt: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019, Bild 7',
        width: 1920,
        height: 1080,
      },
      {
        title: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019 – Bild 8',
        src: '/images/galerie/tempel-swingin-charlie-2019/08-screenshot-2019-11-11-12-39-20-2.png',
        alt: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019, Bild 8',
        width: 761,
        height: 451,
      },
      {
        title: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019 – Bild 9',
        src: '/images/galerie/tempel-swingin-charlie-2019/09-20191011-162930.jpg',
        alt: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019, Bild 9',
        width: 1920,
        height: 1080,
      },
      {
        title: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019 – Bild 10',
        src: '/images/galerie/tempel-swingin-charlie-2019/10-img-4828-1249a13d.jpg',
        alt: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019, Bild 10',
        width: 1762,
        height: 1963,
      },
      {
        title: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019 – Bild 11',
        src: '/images/galerie/tempel-swingin-charlie-2019/11-screenshot-2019-11-11-12-45-00-2.png',
        alt: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019, Bild 11',
        width: 840,
        height: 433,
      },
      {
        title: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019 – Bild 12',
        src: '/images/galerie/tempel-swingin-charlie-2019/12-screenshot-2019-11-11-12-45-53-2.png',
        alt: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019, Bild 12',
        width: 722,
        height: 436,
      },
      {
        title: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019 – Bild 13',
        src: '/images/galerie/tempel-swingin-charlie-2019/13-screenshot-2019-11-11-12-40-30-2.png',
        alt: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019, Bild 13',
        width: 768,
        height: 462,
      },
      {
        title: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019 – Bild 14',
        src: '/images/galerie/tempel-swingin-charlie-2019/14-screenshot-2019-11-11-12-46-57-2.png',
        alt: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019, Bild 14',
        width: 742,
        height: 375,
      },
      {
        title: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019 – Bild 15',
        src: '/images/galerie/tempel-swingin-charlie-2019/15-screenshot-2019-11-11-12-45-12-2.png',
        alt: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019, Bild 15',
        width: 827,
        height: 424,
      },
      {
        title: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019 – Bild 16',
        src: '/images/galerie/tempel-swingin-charlie-2019/16-volker-2.jpeg',
        alt: 'Swingin\u2019 Charlie im Tempel Karlsruhe 2019, Bild 16',
        width: 1088,
        height: 1080,
      },
      {
        title: "ReBopHot in Action im Tempel Karlsruhe Swingin' Charlie 2019",
        src: '/images/galerie/tempel-swingin-charlie-2019/17-img-4845-6f20d187-80a5e671-d2ceb7f9.jpg',
        alt: "ReBopHot in Action im Tempel Karlsruhe Swingin' Charlie 2019",
        width: 1920,
        height: 485,
      },
    ],
  },
  {
    title: 'EGO Eröffnungsfeier Oberderdingen 2019',
    pictures: [
      {
        title: 'EGO Eröffnungsfeier Oberderdingen 2019 – Bild 1',
        src: '/images/galerie/ego-oberderdingen-2019/01-9.jpg',
        alt: 'EGO Eröffnungsfeier Oberderdingen 2019, Bild 1',
        width: 1920,
        height: 1211,
      },
      {
        title: 'EGO Eröffnungsfeier Oberderdingen 2019 – Bild 2',
        src: '/images/galerie/ego-oberderdingen-2019/02-1.jpg',
        alt: 'EGO Eröffnungsfeier Oberderdingen 2019, Bild 2',
        width: 1920,
        height: 1165,
      },
      {
        title: 'EGO Eröffnungsfeier Oberderdingen 2019 – Bild 3',
        src: '/images/galerie/ego-oberderdingen-2019/03-2.jpg',
        alt: 'EGO Eröffnungsfeier Oberderdingen 2019, Bild 3',
        width: 1920,
        height: 1237,
      },
      {
        title: 'EGO Eröffnungsfeier Oberderdingen 2019 – Bild 4',
        src: '/images/galerie/ego-oberderdingen-2019/04-3.jpg',
        alt: 'EGO Eröffnungsfeier Oberderdingen 2019, Bild 4',
        width: 1920,
        height: 1344,
      },
      {
        title: 'EGO Eröffnungsfeier Oberderdingen 2019 – Bild 5',
        src: '/images/galerie/ego-oberderdingen-2019/05-5.jpg',
        alt: 'EGO Eröffnungsfeier Oberderdingen 2019, Bild 5',
        width: 1920,
        height: 1257,
      },
      {
        title: 'EGO Eröffnungsfeier Oberderdingen 2019 – Bild 6',
        src: '/images/galerie/ego-oberderdingen-2019/06-6.jpg',
        alt: 'EGO Eröffnungsfeier Oberderdingen 2019, Bild 6',
        width: 1920,
        height: 1207,
      },
      {
        title: 'EGO Eröffnungsfeier Oberderdingen 2019 – Bild 7',
        src: '/images/galerie/ego-oberderdingen-2019/07-8.jpg',
        alt: 'EGO Eröffnungsfeier Oberderdingen 2019, Bild 7',
        width: 1920,
        height: 1216,
      },
      {
        title: 'EGO Eröffnungsfeier Oberderdingen 2019 – Bild 8',
        src: '/images/galerie/ego-oberderdingen-2019/08-7.jpg',
        alt: 'EGO Eröffnungsfeier Oberderdingen 2019, Bild 8',
        width: 1920,
        height: 1243,
      },
      {
        title: 'EGO Eröffnungsfeier Oberderdingen 2019 – Bild 9',
        src: '/images/galerie/ego-oberderdingen-2019/09-10.jpg',
        alt: 'EGO Eröffnungsfeier Oberderdingen 2019, Bild 9',
        width: 1920,
        height: 1344,
      },
    ],
  },
  {
    title: 'Swing in Karlsruhe – Tempel 2019',
    pictures: [
      {
        title: 'Swing in Karlsruhe im Tempel 2019 – Bild 1',
        src: '/images/galerie/tempel-swing-karlsruhe-2019/01-dsc-0002-b21092c6.jpg',
        alt: 'Swing in Karlsruhe im Tempel 2019, Bild 1',
        width: 1920,
        height: 1438,
      },
      {
        title: 'Swing in Karlsruhe im Tempel 2019 – Bild 2',
        src: '/images/galerie/tempel-swing-karlsruhe-2019/02-dsc-0460.jpg',
        alt: 'Swing in Karlsruhe im Tempel 2019, Bild 2',
        width: 1920,
        height: 1275,
      },
      {
        title: 'Swing in Karlsruhe im Tempel 2019 – Bild 3',
        src: '/images/galerie/tempel-swing-karlsruhe-2019/03-dsc-0382.jpg',
        alt: 'Swing in Karlsruhe im Tempel 2019, Bild 3',
        width: 1637,
        height: 2465,
      },
      {
        title: 'Swing in Karlsruhe im Tempel 2019 – Bild 4',
        src: '/images/galerie/tempel-swing-karlsruhe-2019/04-dsc-0308.jpg',
        alt: 'Swing in Karlsruhe im Tempel 2019, Bild 4',
        width: 1920,
        height: 1276,
      },
      {
        title: 'Swing in Karlsruhe im Tempel 2019 – Bild 5',
        src: '/images/galerie/tempel-swing-karlsruhe-2019/05-dsc-0360.jpg',
        alt: 'Swing in Karlsruhe im Tempel 2019, Bild 5',
        width: 1892,
        height: 2848,
      },
      {
        title: 'Swing in Karlsruhe im Tempel 2019 – Bild 6',
        src: '/images/galerie/tempel-swing-karlsruhe-2019/06-dsc-0591.jpg',
        alt: 'Swing in Karlsruhe im Tempel 2019, Bild 6',
        width: 1920,
        height: 1275,
      },
      {
        title: 'Swing in Karlsruhe im Tempel 2019 – Bild 7',
        src: '/images/galerie/tempel-swing-karlsruhe-2019/07-dsc-0587.jpg',
        alt: 'Swing in Karlsruhe im Tempel 2019, Bild 7',
        width: 1920,
        height: 2890,
      },
      {
        title: 'Swing in Karlsruhe im Tempel 2019 – Bild 8',
        src: '/images/galerie/tempel-swing-karlsruhe-2019/08-dsc-0659.jpg',
        alt: 'Swing in Karlsruhe im Tempel 2019, Bild 8',
        width: 1920,
        height: 1276,
      },
      {
        title: 'Swing in Karlsruhe im Tempel 2019 – Bild 9',
        src: '/images/galerie/tempel-swing-karlsruhe-2019/09-dsc-0610.jpg',
        alt: 'Swing in Karlsruhe im Tempel 2019, Bild 9',
        width: 1920,
        height: 2890,
      },
      {
        title: 'Swing in Karlsruhe im Tempel 2019 – Bild 10',
        src: '/images/galerie/tempel-swing-karlsruhe-2019/10-dsc-0645.jpg',
        alt: 'Swing in Karlsruhe im Tempel 2019, Bild 10',
        width: 1920,
        height: 1275,
      },
      {
        title: 'Swing in Karlsruhe im Tempel 2019 – Bild 11',
        src: '/images/galerie/tempel-swing-karlsruhe-2019/11-dsc-0508.jpg',
        alt: 'Swing in Karlsruhe im Tempel 2019, Bild 11',
        width: 1920,
        height: 1275,
      },
      {
        title: 'Swing in Karlsruhe im Tempel 2019 – Bild 12',
        src: '/images/galerie/tempel-swing-karlsruhe-2019/12-dsc-0143.jpg',
        alt: 'Swing in Karlsruhe im Tempel 2019, Bild 12',
        width: 1920,
        height: 1275,
      },
      {
        title: 'Swing in Karlsruhe im Tempel 2019 – Bild 13',
        src: '/images/galerie/tempel-swing-karlsruhe-2019/13-dsc-0175.jpg',
        alt: 'Swing in Karlsruhe im Tempel 2019, Bild 13',
        width: 1920,
        height: 2631,
      },
      {
        title: 'Swing in Karlsruhe im Tempel 2019 – Bild 14',
        src: '/images/galerie/tempel-swing-karlsruhe-2019/14-dsc-0159.jpg',
        alt: 'Swing in Karlsruhe im Tempel 2019, Bild 14',
        width: 1920,
        height: 1162,
      },
      {
        title: 'Swing in Karlsruhe im Tempel 2019 – Bild 15',
        src: '/images/galerie/tempel-swing-karlsruhe-2019/15-dsc-0152.jpg',
        alt: 'Swing in Karlsruhe im Tempel 2019, Bild 15',
        width: 1920,
        height: 1072,
      },
      {
        title: 'Swing in Karlsruhe im Tempel 2019 – Bild 16',
        src: '/images/galerie/tempel-swing-karlsruhe-2019/16-dsc-0183.jpg',
        alt: 'Swing in Karlsruhe im Tempel 2019, Bild 16',
        width: 1920,
        height: 2384,
      },
      {
        title: 'Swing in Karlsruhe im Tempel 2019 – Bild 17',
        src: '/images/galerie/tempel-swing-karlsruhe-2019/17-dsc-0030.jpg',
        alt: 'Swing in Karlsruhe im Tempel 2019, Bild 17',
        width: 1920,
        height: 957,
      },
      {
        title: 'Swing in Karlsruhe im Tempel 2019 – Bild 18',
        src: '/images/galerie/tempel-swing-karlsruhe-2019/18-dsc-0113.jpg',
        alt: 'Swing in Karlsruhe im Tempel 2019, Bild 18',
        width: 1920,
        height: 1275,
      },
      {
        title: 'Swing in Karlsruhe im Tempel 2019 – Bild 19',
        src: '/images/galerie/tempel-swing-karlsruhe-2019/19-dsc-0087.jpg',
        alt: 'Swing in Karlsruhe im Tempel 2019, Bild 19',
        width: 1920,
        height: 1275,
      },
      {
        title: 'Swing in Karlsruhe im Tempel 2019 – Bild 20',
        src: '/images/galerie/tempel-swing-karlsruhe-2019/20-dsc-0229.jpg',
        alt: 'Swing in Karlsruhe im Tempel 2019, Bild 20',
        width: 1920,
        height: 1275,
      },
      {
        title: 'Swing in Karlsruhe im Tempel 2019 – Bild 21',
        src: '/images/galerie/tempel-swing-karlsruhe-2019/21-dsc-0126.jpg',
        alt: 'Swing in Karlsruhe im Tempel 2019, Bild 21',
        width: 1920,
        height: 716,
      },
      {
        title: 'Swing in Karlsruhe im Tempel 2019 – Bild 22',
        src: '/images/galerie/tempel-swing-karlsruhe-2019/22-dsc-0137.jpg',
        alt: 'Swing in Karlsruhe im Tempel 2019, Bild 22',
        width: 1920,
        height: 2559,
      },
      {
        title: 'Swing in Karlsruhe im Tempel 2019 – Bild 23',
        src: '/images/galerie/tempel-swing-karlsruhe-2019/23-e2019-01-22-22-02-14-2.jpg',
        alt: 'Swing in Karlsruhe im Tempel 2019, Bild 23',
        width: 1920,
        height: 842,
      },
      {
        title: 'Swing in Karlsruhe im Tempel 2019 – Bild 24',
        src: '/images/galerie/tempel-swing-karlsruhe-2019/24-dsc-0680.jpg',
        alt: 'Swing in Karlsruhe im Tempel 2019, Bild 24',
        width: 1899,
        height: 1632,
      },
    ],
  },
  {
    title: 'Band-Shooting 2018',
    pictures: [
      {
        title: 'Gesang: Ilse, Volker und Martin',
        src: '/images/galerie/fotoshooting-2018/01-gesang2.jpg',
        alt: 'Die Sängerin und die zwei Sänger von ReBop Hot, Fotoshooting November 2018',
        width: 1920,
        height: 1172,
      },
      {
        title: 'Bläsersatz: Anette, Volker, Jonas, Martin, Mathias',
        src: '/images/galerie/fotoshooting-2018/02-bl-sersatz2.jpg',
        alt: 'Der Bläsersatz von ReBop Hot mit Saxophonen und Posaune, Fotoshooting November 2018',
        width: 1920,
        height: 1189,
      },
      {
        title: 'ReBop Hot 2018',
        src: '/images/galerie/fotoshooting-2018/03-band-ohne-hintergrund-3.png',
        alt: 'Die Band ReBop Hot, Fotoshooting November 2018',
        width: 1920,
        height: 1154,
      },
    ],
  },
]
