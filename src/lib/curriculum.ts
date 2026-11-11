export type UnitId = "hallo" | "kann" | "kleidung" | "tag" | "tiere" | "sheet";

export type Word = {
  id: string;
  unit: UnitId;
  de: string;
  ar: string;
  en: string;
  sentence: string;
  image?: string;
};

export type Row = {
  left: string;
  stem: string;
  end: string;
  tail?: string;
  gloss: string;
};

export type Table = {
  id: string;
  unit: UnitId;
  title: string;
  ar: string;
  speak: string;
  rows: Row[];
};

export type Quiz = {
  id: string;
  unit: UnitId | "talk";
  q: string;
  options: string[];
  correct: number;
  image?: string;
};

export type Line = { who: "A" | "B"; text: string };

export const UNITS: { id: UnitId; ar: string; de: string }[] = [
  { id: "hallo", ar: "Hello", de: "Hallo" },
  { id: "kann", ar: "I can", de: "Ich kann" },
  { id: "kleidung", ar: "Clothes", de: "Die Kleidung" },
  { id: "tag", ar: "My day", de: "Tagesablauf" },
  { id: "tiere", ar: "Animals", de: "Die Tiere" },
  { id: "sheet", ar: "Revision sheet", de: "Wiederholung" },
];

export const WORDS: Word[] = [
  { id: "hallo", unit: "hallo", de: "Hallo!", ar: "أهلاً", en: "Hello!", sentence: "Hallo! Ich bin Karim." },
  { id: "morgen", unit: "hallo", de: "Guten Morgen!", ar: "صباح الخير", en: "Good morning!", sentence: "Guten Morgen!" },
  { id: "tag", unit: "hallo", de: "Guten Tag!", ar: "نهارك سعيد", en: "Good afternoon!", sentence: "Guten Tag!" },
  { id: "abendgruss", unit: "hallo", de: "Guten Abend!", ar: "مساء الخير", en: "Good evening!", sentence: "Guten Abend!" },
  { id: "wiedersehen", unit: "hallo", de: "Auf Wiedersehen!", ar: "إلى اللقاء", en: "Goodbye!", sentence: "Auf Wiedersehen!" },
  { id: "tschuess", unit: "hallo", de: "Tschüs!", ar: "باي", en: "Bye!", sentence: "Tschüs!" },
  { id: "nacht", unit: "hallo", de: "Gute Nacht!", ar: "تصبح على خير", en: "Good night!", sentence: "Gute Nacht!" },
  { id: "wer", unit: "hallo", de: "Wer bist du?", ar: "مين أنت؟", en: "Who are you?", sentence: "Wer bist du? Ich bin Alex." },
  { id: "alter", unit: "hallo", de: "Wie alt bist du?", ar: "عندك كام سنة؟", en: "How old are you?", sentence: "Ich bin acht Jahre alt." },
  { id: "laufen", unit: "kann", de: "laufen", ar: "يجري", en: "to run", sentence: "Ich kann gut laufen.", image: "/vocab/laufen.jpg" },
  { id: "schwimmen", unit: "kann", de: "schwimmen", ar: "يسبح", en: "to swim", sentence: "Ich kann gut schwimmen.", image: "/vocab/schwimmen.jpg" },
  { id: "springen", unit: "kann", de: "springen", ar: "يقفز", en: "to jump", sentence: "Ich kann hoch springen.", image: "/vocab/springen.jpg" },
  { id: "tanzen", unit: "kann", de: "tanzen", ar: "يرقص", en: "to dance", sentence: "Ich tanze gern.", image: "/vocab/tanzen.jpg" },
  { id: "singen", unit: "kann", de: "singen", ar: "يغني", en: "to sing", sentence: "Ich kann gut singen.", image: "/vocab/singen.jpg" },
  { id: "fussball", unit: "kann", de: "Fußball spielen", ar: "يلعب كرة", en: "to play football", sentence: "Ich kann gut Fußball spielen.", image: "/vocab/fussball.jpg" },
  { id: "basketball", unit: "kann", de: "Basketball spielen", ar: "يلعب كرة سلة", en: "to play basketball", sentence: "Ich spiele Basketball." },
  { id: "tennis", unit: "kann", de: "Tennis spielen", ar: "يلعب تنس", en: "to play tennis", sentence: "Er spielt Tennis." },
  { id: "malen", unit: "kann", de: "malen", ar: "يرسم", en: "to draw", sentence: "Du malst ein Bild." },
  { id: "muetze", unit: "kleidung", de: "die Mütze", ar: "طاقية", en: "cap", sentence: "Ich ziehe die Mütze an.", image: "/vocab/muetze.jpg" },
  { id: "schal", unit: "kleidung", de: "der Schal", ar: "شال", en: "scarf", sentence: "Er zieht einen Schal an.", image: "/vocab/schal.jpg" },
  { id: "hut", unit: "kleidung", de: "der Hut", ar: "قبعة", en: "hat", sentence: "Sie zieht den Hut an.", image: "/vocab/hut.jpg" },
  { id: "kurzhose", unit: "kleidung", de: "die Kurzhose", ar: "شورت", en: "shorts", sentence: "Ich ziehe die Kurzhose an.", image: "/vocab/kurzhose.jpg" },
  { id: "turnschuhe", unit: "kleidung", de: "die Turnschuhe", ar: "حذاء رياضي", en: "trainers", sentence: "Anna zieht die Turnschuhe an.", image: "/vocab/turnschuhe.jpg" },
  { id: "socken", unit: "kleidung", de: "die Socken", ar: "شرابات", en: "socks", sentence: "Wir ziehen die Socken an.", image: "/vocab/socken.jpg" },
  { id: "kleid", unit: "kleidung", de: "das Kleid", ar: "فستان", en: "dress", sentence: "Ich ziehe das Kleid an." },
  { id: "kalt", unit: "kleidung", de: "kalt", ar: "بارد", en: "cold", sentence: "Heute ist es kalt." },
  { id: "heiss", unit: "kleidung", de: "heiß", ar: "حر", en: "hot", sentence: "Heute ist es heiß." },
  { id: "schlafen", unit: "tag", de: "schlafen", ar: "ينام", en: "to sleep", sentence: "Ich schlafe um neun Uhr.", image: "/vocab/schlafen.jpg" },
  { id: "aufstehen", unit: "tag", de: "aufstehen", ar: "يصحى", en: "to get up", sentence: "Ich stehe um sieben Uhr auf.", image: "/vocab/aufstehen.jpg" },
  { id: "fruehstueck", unit: "tag", de: "frühstücken", ar: "يتفطر", en: "to have breakfast", sentence: "Ich frühstücke um acht Uhr.", image: "/vocab/fruehstueck.jpg" },
  { id: "mittag", unit: "tag", de: "zu Mittag essen", ar: "يتغدى", en: "to have lunch", sentence: "Ich esse um zwölf Uhr zu Mittag.", image: "/vocab/mittag.jpg" },
  { id: "abendessen", unit: "tag", de: "zu Abend essen", ar: "يتعشى", en: "to have dinner", sentence: "Ich esse um sieben Uhr zu Abend.", image: "/vocab/abend.jpg" },
  { id: "fuchs", unit: "tiere", de: "der Fuchs", ar: "ثعلب", en: "fox", sentence: "Der Fuchs ist kleiner als der Tiger.", image: "/vocab/fuchs.jpg" },
  { id: "tiger", unit: "tiere", de: "der Tiger", ar: "نمر", en: "tiger", sentence: "Der Tiger ist schneller als der Fuchs.", image: "/vocab/tiger.jpg" },
  { id: "kaenguru", unit: "tiere", de: "das Känguru", ar: "كنغر", en: "kangaroo", sentence: "Das Känguru ist größer als das Eichhörnchen.", image: "/vocab/kaenguru.jpg" },
  { id: "eich", unit: "tiere", de: "das Eichhörnchen", ar: "سنجاب", en: "squirrel", sentence: "Das Eichhörnchen ist klein, aber schnell.", image: "/vocab/eichhoernchen.jpg" },
];

export const TABLES: Table[] = [
  {
    id: "mein",
    unit: "hallo",
    title: "mein / meine",
    ar: "my / mine — the red e is for feminine and plural",
    speak: "mein Vater, meine Mutter, mein Bruder, meine Schwester",
    rows: [
      { left: "Vater", stem: "mein", end: "", gloss: "my father" },
      { left: "Mutter", stem: "mein", end: "e", gloss: "my mother" },
      { left: "Bruder", stem: "mein", end: "", gloss: "my brother" },
      { left: "Schwester", stem: "mein", end: "e", gloss: "my sister" },
      { left: "Großvater", stem: "mein", end: "", gloss: "my grandfather" },
      { left: "Großmutter", stem: "mein", end: "e", gloss: "my grandmother" },
      { left: "Eltern", stem: "mein", end: "e", gloss: "my parents" },
      { left: "Großeltern", stem: "mein", end: "e", gloss: "my grandparents" },
    ],
  },
  {
    id: "spielen",
    unit: "kann",
    title: "spielen",
    ar: "A regular verb. The red ending is the part that changes.",
    speak: "ich spiele, du spielst, er spielt, wir spielen, ihr spielt, sie spielen",
    rows: [
      { left: "ich", stem: "spiel", end: "e", gloss: "I" },
      { left: "du", stem: "spiel", end: "st", gloss: "you" },
      { left: "er / sie / es", stem: "spiel", end: "t", gloss: "he / she" },
      { left: "wir", stem: "spiel", end: "en", gloss: "we" },
      { left: "ihr", stem: "spiel", end: "t", gloss: "you all" },
      { left: "sie / Sie", stem: "spiel", end: "en", gloss: "they / you" },
    ],
  },
  {
    id: "singen",
    unit: "kann",
    title: "singen",
    ar: "Same endings: e · st · t · en · t · en",
    speak: "ich singe, du singst, er singt, wir singen, ihr singt, sie singen",
    rows: [
      { left: "ich", stem: "sing", end: "e", gloss: "I" },
      { left: "du", stem: "sing", end: "st", gloss: "you" },
      { left: "er / sie / es", stem: "sing", end: "t", gloss: "he / she" },
      { left: "wir", stem: "sing", end: "en", gloss: "we" },
      { left: "ihr", stem: "sing", end: "t", gloss: "you all" },
      { left: "sie / Sie", stem: "sing", end: "en", gloss: "they / you" },
    ],
  },
  {
    id: "koennen",
    unit: "kann",
    title: "können",
    ar: "can. After können the second verb stays at the end, not conjugated.",
    speak: "ich kann, du kannst, er kann, wir können, ihr könnt, sie können",
    rows: [
      { left: "ich", stem: "kann", end: "", gloss: "I" },
      { left: "du", stem: "kann", end: "st", gloss: "you" },
      { left: "er / sie / es", stem: "kann", end: "", gloss: "he / she" },
      { left: "wir", stem: "könn", end: "en", gloss: "we" },
      { left: "ihr", stem: "könn", end: "t", gloss: "you all" },
      { left: "sie / Sie", stem: "könn", end: "en", gloss: "they / you" },
    ],
  },
  {
    id: "anziehen",
    unit: "kleidung",
    title: "anziehen",
    ar: "to put on. an leaves the verb and goes to the end of the sentence.",
    speak: "ich ziehe an, du ziehst an, er zieht an, wir ziehen an, ihr zieht an, sie ziehen an",
    rows: [
      { left: "ich", stem: "zieh", end: "e", tail: "an", gloss: "I" },
      { left: "du", stem: "zieh", end: "st", tail: "an", gloss: "you" },
      { left: "er / sie / es", stem: "zieh", end: "t", tail: "an", gloss: "he / she" },
      { left: "wir", stem: "zieh", end: "en", tail: "an", gloss: "we" },
      { left: "ihr", stem: "zieh", end: "t", tail: "an", gloss: "you all" },
      { left: "sie / Sie", stem: "zieh", end: "en", tail: "an", gloss: "they / you" },
    ],
  },
  {
    id: "machen",
    unit: "tag",
    title: "machen",
    ar: "to do / to make. The same six endings.",
    speak: "ich mache, du machst, er macht, wir machen, ihr macht, sie machen",
    rows: [
      { left: "ich", stem: "mach", end: "e", gloss: "I" },
      { left: "du", stem: "mach", end: "st", gloss: "you" },
      { left: "er / sie / es", stem: "mach", end: "t", gloss: "he / she" },
      { left: "wir", stem: "mach", end: "en", gloss: "we" },
      { left: "ihr", stem: "mach", end: "t", gloss: "you all" },
      { left: "sie / Sie", stem: "mach", end: "en", gloss: "they / you" },
    ],
  },
  {
    id: "aufstehen",
    unit: "tag",
    title: "aufstehen",
    ar: "to get up. auf goes to the end, like an.",
    speak: "ich stehe auf, du stehst auf, er steht auf, wir stehen auf",
    rows: [
      { left: "ich", stem: "steh", end: "e", tail: "auf", gloss: "I" },
      { left: "du", stem: "steh", end: "st", tail: "auf", gloss: "you" },
      { left: "er / sie / es", stem: "steh", end: "t", tail: "auf", gloss: "he / she" },
      { left: "wir", stem: "steh", end: "en", tail: "auf", gloss: "we" },
      { left: "ihr", stem: "steh", end: "t", tail: "auf", gloss: "you all" },
      { left: "sie / Sie", stem: "steh", end: "en", tail: "auf", gloss: "they / you" },
    ],
  },
  {
    id: "essen",
    unit: "tag",
    title: "essen",
    ar: "to eat. du and er change to isst.",
    speak: "ich esse, du isst, er isst, wir essen, ihr esst, sie essen",
    rows: [
      { left: "ich", stem: "ess", end: "e", gloss: "I" },
      { left: "du", stem: "iss", end: "t", gloss: "you" },
      { left: "er / sie / es", stem: "iss", end: "t", gloss: "he / she" },
      { left: "wir", stem: "ess", end: "en", gloss: "we" },
      { left: "ihr", stem: "ess", end: "t", gloss: "you all" },
      { left: "sie / Sie", stem: "ess", end: "en", gloss: "they / you" },
    ],
  },
  {
    id: "komparativ",
    unit: "tiere",
    title: "Komparativ",
    ar: "Comparison: adjective + er, then als.",
    speak: "schneller, größer, kleiner, langsamer",
    rows: [
      { left: "schnell", stem: "schnell", end: "er", gloss: "faster" },
      { left: "groß", stem: "größ", end: "er", gloss: "bigger" },
      { left: "klein", stem: "klein", end: "er", gloss: "smaller" },
      { left: "langsam", stem: "langsam", end: "er", gloss: "slower" },
    ],
  },
];

export const QUIZZES: Quiz[] = [
  { id: "q1", unit: "hallo", q: "What does Guten Morgen mean?", options: ["Good morning", "Good night", "Bye", "Please"], correct: 0 },
  { id: "q2", unit: "hallo", q: "Das ist ___ Mutter.", options: ["mein", "meine", "meinen", "meiner"], correct: 1 },
  { id: "q3", unit: "hallo", q: "Das ist ___ Vater.", options: ["meine", "mein", "meinen", "meinem"], correct: 1 },
  { id: "q4", unit: "hallo", q: "Wie alt bist du? A good answer is:", options: ["Ich bin acht Jahre alt.", "Ich ziehe die Mütze an.", "Der Tiger ist schnell.", "Guten Abend!"], correct: 0 },
  { id: "q5", unit: "kann", q: "ich ___", options: ["kann", "kannst", "können", "könnt"], correct: 0 },
  { id: "q6", unit: "kann", q: "du ___", options: ["kann", "kannst", "können", "könnt"], correct: 1 },
  { id: "q7", unit: "kann", q: "wir ___", options: ["kann", "kannst", "können", "könnt"], correct: 2 },
  { id: "q8", unit: "kann", q: "ihr ___", options: ["kann", "kannst", "können", "könnt"], correct: 3 },
  { id: "q9", unit: "kann", q: "er / sie ___", options: ["kann", "kannst", "können", "könnt"], correct: 0 },
  { id: "q10", unit: "kann", q: "sie / Sie ___", options: ["kann", "kannst", "können", "könnt"], correct: 2 },
  { id: "q11", unit: "kann", q: "Ich ___ gut schwimmen.", options: ["kann", "kannst", "spielen", "schwimmt"], correct: 0 },
  { id: "q12", unit: "kann", q: "Paul kann nicht schwimmen. This sentence is:", options: ["true", "false"], correct: 0 },
  { id: "q13", unit: "kann", q: "du ___ ein Lied.", options: ["singe", "singst", "singen", "singt"], correct: 1 },
  { id: "q14", unit: "kleidung", q: "die Mütze means:", options: ["cap", "scarf", "shorts", "socks"], correct: 0, image: "/vocab/muetze.jpg" },
  { id: "q15", unit: "kleidung", q: "der Schal means:", options: ["shoe", "scarf", "tiger", "sun hat"], correct: 1, image: "/vocab/schal.jpg" },
  { id: "q16", unit: "kleidung", q: "Ich ___ die Mütze an.", options: ["ziehe", "ziehst", "zieht", "ziehen"], correct: 0 },
  { id: "q17", unit: "kleidung", q: "Er ___ den Hut an.", options: ["ziehe", "ziehst", "zieht", "ziehen"], correct: 2 },
  { id: "q18", unit: "kleidung", q: "Wir ___ die Socken an.", options: ["ziehe", "ziehst", "zieht", "ziehen"], correct: 3 },
  { id: "q19", unit: "kleidung", q: "It is cold. Lukas puts on:", options: ["Mütze und Schal", "nur eine Kurzhose", "nichts", "einen Tiger"], correct: 0 },
  { id: "q20", unit: "tag", q: "Ich stehe um 7 Uhr ___.", options: ["auf", "an", "aus", "ab"], correct: 0 },
  { id: "q21", unit: "tag", q: "Ich ___ um 8 Uhr.", options: ["frühstücke", "frühstückst", "frühstücken", "frühstückt"], correct: 0 },
  { id: "q22", unit: "tag", q: "Um 8 Uhr frühstücke ich. This means the same as:", options: ["Ich frühstücke um 8 Uhr.", "Ich schlafe um 8 Uhr.", "Der Fuchs ist schnell.", "Tschüs!"], correct: 0 },
  { id: "q23", unit: "tag", q: "du ___ Sport.", options: ["mache", "machst", "machen", "macht"], correct: 1 },
  { id: "q24", unit: "tiere", q: "Der Tiger ist ___ als der Fuchs.", options: ["schneller", "kleiner", "langsam", "mein"], correct: 0 },
  { id: "q25", unit: "tiere", q: "Das Känguru ist ___ als das Eichhörnchen.", options: ["größer", "kleiner", "mein", "kannst"], correct: 0 },
  { id: "q26", unit: "tiere", q: "Das Eichhörnchen ist ___ als das Känguru.", options: ["kleiner", "größer", "der", "an"], correct: 0 },
  { id: "q27", unit: "talk", q: "A: Hallo!  B: ___", options: ["Hallo!", "Der Hut.", "Um 7 Uhr.", "größer"], correct: 0 },
  { id: "q28", unit: "talk", q: "Was kannst du gut machen?", options: ["Ich kann gut Fußball spielen.", "Das ist meine Mutter.", "Gute Nacht!", "der Fuchs"], correct: 0 },
  { id: "q29", unit: "talk", q: "Ich kann gut schwimmen.  B: ___", options: ["Toll!", "der Schal", "mein Vater", "kleiner"], correct: 0 },
  { id: "q30", unit: "talk", q: "Ich tanze gern.  B: ___", options: ["Super!", "Nein, der Tiger.", "auf", "isst"], correct: 0 },
  { id: "s1", unit: "sheet", q: "Tom ist im Park.", options: ["richtig", "falsch"], correct: 0 },
  { id: "s2", unit: "sheet", q: "Tom zieht eine Kurzhose an.", options: ["richtig", "falsch"], correct: 1 },
  { id: "s3", unit: "sheet", q: "Lisa zieht die Turnschuhe an.", options: ["richtig", "falsch"], correct: 0 },
  { id: "s4", unit: "sheet", q: "Heute ist ___.", options: ["kalt", "heiß"], correct: 0 },
  { id: "s5", unit: "sheet", q: "Er zieht eine Mütze und einen ___ an.", options: ["Schal", "Hut"], correct: 0 },
  { id: "s6", unit: "sheet", q: "Ich ___ Basketball.", options: ["spiele", "spielst", "spielen"], correct: 0 },
  { id: "s7", unit: "sheet", q: "Du ___ ein Bild.", options: ["malst", "male", "malen"], correct: 0 },
  { id: "s8", unit: "sheet", q: "Er ___ ein Lied.", options: ["singt", "singe", "singen"], correct: 0 },
  { id: "s9", unit: "sheet", q: "Wir ___ im Schwimmbad.", options: ["schwimmen", "schwimmt", "schwimme"], correct: 0 },
  { id: "s10", unit: "sheet", q: "Ihr ___ Fußball.", options: ["spielt", "spielen", "spielst"], correct: 0 },
  { id: "s11", unit: "sheet", q: "Du ___ Fußball spielen.", options: ["kannst", "kann", "können"], correct: 0 },
  { id: "s12", unit: "sheet", q: "Ich ___ gern.", options: ["singe", "singt", "singen"], correct: 0 },
  { id: "s13", unit: "sheet", q: "Du ___ im Meer.", options: ["schwimmst", "schwimme", "schwimmen"], correct: 0 },
  { id: "s14", unit: "sheet", q: "Er ___ Tennis.", options: ["spielt", "spielen", "spielst"], correct: 0 },
  { id: "s15", unit: "sheet", q: "Wir ___ Tiere.", options: ["malen", "malt", "male"], correct: 0 },
  { id: "s16", unit: "sheet", q: "Ich ___ gut singen.", options: ["kann", "kannst", "können"], correct: 0 },
  { id: "s17", unit: "sheet", q: "Ich ___ gut malen.", options: ["kann", "kannst"], correct: 0 },
  { id: "s18", unit: "sheet", q: "Ihr ___ gut singen.", options: ["könnt", "kannst"], correct: 0 },
  { id: "s19", unit: "sheet", q: "Hana ___ gut laufen.", options: ["kann", "könnt"], correct: 0 },
  { id: "s20", unit: "sheet", q: "Wir ___ Basketball spielen.", options: ["können", "kann"], correct: 0 },
  { id: "s21", unit: "sheet", q: "Du ___ gut schwimmen.", options: ["kannst", "könnt"], correct: 0 },
  { id: "s22", unit: "sheet", q: "Was passt hier nicht? Singen – singe – du", options: ["du", "Singen", "singe"], correct: 0 },
  { id: "s23", unit: "sheet", q: "Was passt hier nicht? Schal – malen – Hut", options: ["malen", "Schal", "Hut"], correct: 0 },
  { id: "s24", unit: "sheet", q: "Was passt hier nicht? er – springen – tanzen", options: ["er", "springen", "tanzen"], correct: 0 },
  { id: "s25", unit: "sheet", q: "Was passt hier nicht? schwimmen – ich – malen", options: ["ich", "schwimmen", "malen"], correct: 0 },
  { id: "s26", unit: "sheet", q: "Was passt hier nicht? der – das – du", options: ["du", "der", "das"], correct: 0 },
  { id: "s27", unit: "sheet", q: "Lina ___ Basketball spielen.", options: ["kann", "können", "kannst"], correct: 0 },
  { id: "s28", unit: "sheet", q: "Wir ___ malen.", options: ["können", "kann", "könnt"], correct: 0 },
  { id: "s29", unit: "sheet", q: "Du ___ schwimmen.", options: ["kannst", "kann", "können"], correct: 0 },
  { id: "s30", unit: "sheet", q: "Ihr ___ laufen.", options: ["könnt", "kannst", "kann"], correct: 0 },
  { id: "b1", unit: "kann", q: "Lara kann gut schwimmen.", options: ["richtig", "falsch"], correct: 0 },
  { id: "b2", unit: "kann", q: "Paul kann schwimmen.", options: ["richtig", "falsch"], correct: 1 },
  { id: "b3", unit: "kann", q: "Wer tanzt am Strand?", options: ["Anna", "Max", "Paul"], correct: 0 },
  { id: "b4", unit: "kann", q: "Was macht Max?", options: ["Er singt.", "Er springt.", "Er schläft."], correct: 0 },
  { id: "b5", unit: "kann", q: "Tom kann hoch springen.", options: ["richtig", "falsch"], correct: 0 },
  { id: "b6", unit: "kleidung", q: "Wo ist Lukas?", options: ["Im Park", "In der Schule", "Im Kino"], correct: 0 },
  { id: "b7", unit: "kleidung", q: "Was zieht Lukas an?", options: ["Eine Mütze und einen Schal", "Einen Hut", "Eine Hose"], correct: 0 },
  { id: "b8", unit: "kleidung", q: "Was zieht Anna an?", options: ["Die Turnschuhe", "Die Socken", "Die Mütze"], correct: 0 },
  { id: "b9", unit: "kleidung", q: "Wo spielen die Kinder?", options: ["Im Garten", "Im Park", "In der Schule"], correct: 0 },
  { id: "b10", unit: "kleidung", q: "Wer zieht einen Hut an?", options: ["Maha", "Mark", "Lukas"], correct: 0 },
  { id: "b11", unit: "kleidung", q: "Ich ___ die Mütze an.", options: ["ziehe", "zieht", "ziehst"], correct: 0 },
  { id: "b12", unit: "kleidung", q: "Sie ___ den Schal an.", options: ["zieht", "ziehe", "ziehen"], correct: 0 },
  { id: "b13", unit: "tag", q: "Um wie viel Uhr steht Anna auf?", options: ["Um 7 Uhr", "Um 6 Uhr", "Um 8 Uhr"], correct: 0 },
  { id: "b14", unit: "tag", q: "Anna frühstückt um 9 Uhr.", options: ["falsch", "richtig"], correct: 0 },
  { id: "b15", unit: "tag", q: "Anna geht um 8 Uhr in die Schule.", options: ["richtig", "falsch"], correct: 0 },
  { id: "b16", unit: "tag", q: "Ich ___ um 7 Uhr auf.", options: ["stehe", "aufstehe", "steht"], correct: 0 },
  { id: "b17", unit: "tiere", q: "Der Fuchs ist größer als der Tiger.", options: ["falsch", "richtig"], correct: 0 },
  { id: "b18", unit: "tiere", q: "Der Tiger ist schneller als der Fuchs.", options: ["richtig", "falsch"], correct: 0 },
  { id: "b19", unit: "tiere", q: "Der Tiger ist klein.", options: ["falsch", "richtig"], correct: 0 },
  { id: "b20", unit: "tiere", q: "Wer ist größer?", options: ["Das Känguru", "Das Eichhörnchen"], correct: 0 },
];

export const DIALOGUE: Line[] = [
  { who: "A", text: "Hallo!" },
  { who: "B", text: "Hallo!" },
  { who: "A", text: "Was kannst du gut machen?" },
  { who: "B", text: "Ich kann gut Fußball spielen. Und du?" },
  { who: "A", text: "Ich kann gut schwimmen." },
  { who: "B", text: "Toll!" },
  { who: "A", text: "Was machst du gern?" },
  { who: "B", text: "Ich spiele gern Tennis. Und du?" },
  { who: "A", text: "Ich tanze gern." },
  { who: "B", text: "Super!" },
  { who: "A", text: "Was kannst du nicht gut machen?" },
  { who: "B", text: "Ich kann nicht gut singen." },
  { who: "A", text: "Tschüs!" },
  { who: "B", text: "Tschüs!" },
];
