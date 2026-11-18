import { useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, ListChecks, MessageCircle, Plus, Settings, Square, Trash2, Volume2 } from "lucide-react";
import {
  DIALOGUE,
  QUIZZES,
  TABLES,
  UNITS,
  WORDS,
  type Quiz,
  type Table,
  type UnitId,
  type Word,
} from "@/lib/curriculum";
import { useDeck, type ThemeName } from "@/lib/deck";
import { copy, noteOf, quizChoice, quizLine, type Lang } from "@/lib/i18n";
import { playMark, speakGerman, speakLines, type VoiceKind } from "@/lib/speech";

type Tab = "words" | "rules" | "talk" | "quiz" | "settings";

function rateLabel(rate: number, t: (typeof copy)[Lang]) {
  if (rate < 0.5) return t.verySlow;
  if (rate < 0.75) return t.slow;
  return t.normal;
}

function publicUrl(path?: string) {
  if (!path) return "";
  if (path.startsWith("data:") || path.startsWith("blob:") || path.startsWith("http")) return path;
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function meaning(word: Word, lang: Lang) {
  if (lang === "ar") return word.ar;
  if (lang === "de") return word.de;
  return word.en;
}

function loadPicture(file: File | undefined, onOk: (dataUrl: string) => void, onBad: () => void) {
  if (!file) return;
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    const max = 720;
    const scale = Math.min(1, max / Math.max(img.width, img.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(img.width * scale));
    canvas.height = Math.max(1, Math.round(img.height * scale));
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(url);
    onOk(canvas.toDataURL("image/jpeg", 0.72));
  };
  img.onerror = () => {
    URL.revokeObjectURL(url);
    onBad();
  };
  img.src = url;
}

function WordCard({
  word,
  lang,
  labels,
  teacher,
  onSpeak,
  onEdit,
  onHide,
}: {
  word: Word;
  lang: Lang;
  labels: { word: string; sentence: string; edit: string };
  teacher: boolean;
  onSpeak: (text: string) => void;
  onEdit: (word: Word) => void;
  onHide: (id: string) => void;
}) {
  const gloss = meaning(word, lang);
  return (
    <article className="overflow-hidden rounded-card border border-line bg-paper">
      {word.image ? (
        <img src={publicUrl(word.image)} alt="" className="aspect-square w-full object-cover" />
      ) : null}
      <div className="flex flex-col gap-3 p-5">
        <p dir="ltr" className="font-display text-4xl leading-tight text-ink">
          {word.de}
        </p>
        {lang === "de" ? null : <p className="text-lg text-ink/70">{gloss}</p>}
        <p dir="ltr" className="text-xl text-ink">
          {word.sentence}
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="min-h-11 rounded-full bg-sage px-4 text-paper"
            onClick={() => onSpeak(word.de)}
          >
            {labels.word}
          </button>
          <button
            type="button"
            className="min-h-11 rounded-full border border-line px-4"
            onClick={() => onSpeak(word.sentence)}
          >
            {labels.sentence}
          </button>
          {teacher ? (
            <>
              <button type="button" className="min-h-11 rounded-full border border-line px-4" onClick={() => onEdit(word)}>
                {labels.edit}
              </button>
              <button type="button" className="min-h-11 rounded-full px-3 text-accent" onClick={() => onHide(word.id)}>
                <Trash2 className="size-5" />
              </button>
            </>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function speakLine(row: { left: string; stem: string; end: string; tail?: string }) {
  const form = `${row.stem}${row.end}${row.tail ? ` ${row.tail}` : ""}`.replace(/\s+/g, " ").trim();
  const first = row.left.split("/")[0]?.trim() ?? "";
  if (/^(ich|du|er|sie|wir|ihr|es)$/i.test(first) && !form.toLowerCase().startsWith(first.toLowerCase())) {
    return `${first} ${form}`;
  }
  return form;
}

function RuleTable({ table, lang, listen, onSpeak }: { table: Table; lang: Lang; listen: string; onSpeak: (text: string) => void }) {
  const order = ["ich", "du", "er / sie / es", "ihr", "sie / Sie", "wir"];
  const rows = [...table.rows].sort((a, b) => {
    const ai = order.indexOf(a.left);
    const bi = order.indexOf(b.left);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
  return (
    <article className="rounded-card border border-line bg-paper p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h2 dir="ltr" className="font-display text-4xl">
            {table.title}
          </h2>
          <p className="mt-1 text-ink/70">{noteOf(table.id, table.ar, lang)}</p>
        </div>
        <button type="button" className="min-h-11 shrink-0 rounded-full bg-sage px-4 text-paper" onClick={() => onSpeak(table.speak)}>
          {listen}
        </button>
      </div>
      <div className="overflow-hidden rounded-2xl border border-line">
        {rows.map((row) => (
          <button
            key={row.left}
            type="button"
            className="grid w-full grid-cols-[7rem_1fr] items-center gap-2 border-b border-line px-3 py-4 text-left last:border-b-0"
            onClick={() => onSpeak(speakLine(row))}
          >
            <span dir="ltr" className="text-2xl font-semibold text-accent">
              {row.left}
            </span>
            <span dir="ltr" className="font-display text-4xl text-ink">
              {row.stem}
              <span className="text-accent">{row.end}</span>
              {row.tail ? <span className="text-accent"> {row.tail}</span> : null}
            </span>
          </button>
        ))}
      </div>
    </article>
  );
}

export function LearnApp() {
  const deck = useDeck();
  const [tab, setTab] = useState<Tab>("words");
  const [unit, setUnit] = useState<UnitId>("kann");
  const [quizUnit, setQuizUnit] = useState<UnitId | "talk">("kann");
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [mark, setMark] = useState<"ok" | "no" | null>(null);
  const [playing, setPlaying] = useState(false);
  const stopRef = useRef({ current: false });
  const [editor, setEditor] = useState<Word | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [quizDraft, setQuizDraft] = useState(false);

  const t = copy[deck.lang];

  useEffect(() => {
    document.documentElement.dataset.theme = deck.theme;
    document.documentElement.lang = deck.lang;
    document.documentElement.dir = deck.lang === "ar" ? "rtl" : "ltr";
  }, [deck.theme, deck.lang]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.getVoices();
    const warm = () => window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener("voiceschanged", warm);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", warm);
  }, []);

  const words = useMemo(() => {
    const hidden = new Set(deck.hiddenWords);
    const base = WORDS.filter((w) => !hidden.has(w.id)).map((w) => deck.wordEdits[w.id] ?? w);
    return [...base, ...deck.extraWords.filter((w) => !hidden.has(w.id))];
  }, [deck.extraWords, deck.hiddenWords, deck.wordEdits]);

  const quizzes = useMemo(() => {
    const hidden = new Set(deck.hiddenQuiz);
    return [...QUIZZES, ...deck.extraQuiz].filter((q) => !hidden.has(q.id));
  }, [deck.extraQuiz, deck.hiddenQuiz]);

  const tables = useMemo(() => [...TABLES, ...deck.extraTables], [deck.extraTables]);
  const quizList = quizzes.filter((q) => q.unit === quizUnit);
  const current = quizList[step];

  const say = (text: string, pitch?: number) => {
    void speakGerman(text, {
      rate: deck.rate,
      volume: deck.volume,
      voice: deck.voice,
      pitch,
    });
  };

  const openQuiz = (id: UnitId | "talk") => {
    setQuizUnit(id);
    setStep(0);
    setScore(0);
    setPicked(null);
    setDone(false);
    setMark(null);
    setTab("quiz");
  };

  const answer = (index: number) => {
    if (!current || picked !== null) return;
    setPicked(index);
    const good = index === current.correct;
    if (good) setScore((n) => n + 1);
    setMark(good ? "ok" : "no");
    playMark(good ? "ok" : "no", deck.volume);
    window.setTimeout(() => {
      setPicked(null);
      setMark(null);
      if (step + 1 >= quizList.length) setDone(true);
      else setStep((n) => n + 1);
    }, 900);
  };

  const playTalk = async () => {
    stopRef.current.current = false;
    setPlaying(true);
    await speakLines(
      DIALOGUE.map((line) => ({ text: line.text, pitch: line.who === "A" ? 0.82 : 1.3 })),
      { rate: deck.rate, volume: deck.volume, voice: "auto" },
      stopRef.current,
    );
    setPlaying(false);
  };

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 pb-28 pt-6">
      <header className="mb-5">
        <p className="text-sm tracking-wide text-ink/60">{t.grade}</p>
        <h1 className="font-display text-4xl">Deutsch 3</h1>
      </header>

      {tab !== "settings" && tab !== "talk" ? (
        <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
          {(tab === "quiz" ? ([...UNITS, { id: "talk" as const }] ) : UNITS).map((item) => {
            const active = tab === "quiz" ? quizUnit === item.id : unit === item.id;
            const label = t.units[item.id];
            return (
              <button
                key={item.id}
                type="button"
                className={
                  "min-h-11 shrink-0 rounded-full px-4 " +
                  (active ? "bg-ink text-paper" : "border border-line bg-paper")
                }
                onClick={() => {
                  if (tab === "quiz") openQuiz(item.id);
                  else {
                    setUnit(item.id as UnitId);
                    document.getElementById(`unit-${item.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      ) : null}

      {tab === "words" ? (
        <div className="flex flex-col gap-10">
          {deck.teacher ? (
            <button
              type="button"
              className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-line"
              onClick={() => {
                setIsNew(true);
                setEditor({
                  id: `w${Date.now()}`,
                  unit,
                  de: "",
                  ar: "",
                  en: "",
                  sentence: "",
                  image: "",
                });
              }}
            >
              <Plus className="size-5" />
              {t.newWord}
            </button>
          ) : null}
          {UNITS.filter((item) => item.id !== "sheet" && item.id !== "hoeren" && item.id !== "schreiben").map((item) => {
            const list = words.filter((word) => word.unit === item.id);
            return (
              <section key={item.id} id={`unit-${item.id}`} className="flex flex-col gap-4">
                <div>
                  <h2 className="font-display text-3xl">{t.units[item.id]}</h2>
                  <p dir="ltr" className="text-ink/60">{item.de}</p>
                </div>
                {list.map((word) => (
                  <WordCard
                    key={word.id}
                    word={word}
                    lang={deck.lang}
                    labels={{ word: t.word, sentence: t.sentence, edit: t.edit }}
                    teacher={deck.teacher}
                    onSpeak={say}
                    onHide={deck.hideWord}
                    onEdit={(w) => {
                      setIsNew(deck.extraWords.some((x) => x.id === w.id));
                      setEditor({ ...w, en: w.en || "" });
                    }}
                  />
                ))}
                <button type="button" className="min-h-12 rounded-full bg-accent text-paper" onClick={() => openQuiz(item.id)}>
                  {t.quizWords}
                </button>
              </section>
            );
          })}
        </div>
      ) : null}

      {tab === "rules" ? (
        <div className="flex flex-col gap-10">
          {UNITS.filter((item) => item.id !== "sheet" && item.id !== "hoeren" && item.id !== "schreiben").map((item) => {
            const list = tables.filter((table) => table.unit === item.id);
            if (list.length === 0) return null;
            return (
              <section key={item.id} id={`unit-${item.id}`} className="flex flex-col gap-4">
                <h2 className="font-display text-3xl">{t.units[item.id]}</h2>
                {list.map((table) => (
                  <RuleTable key={table.id} table={table} lang={deck.lang} listen={t.listen} onSpeak={say} />
                ))}
                <button type="button" className="min-h-12 rounded-full bg-accent text-paper" onClick={() => openQuiz(item.id)}>
                  {t.quizGrammar}
                </button>
              </section>
            );
          })}
          {deck.teacher ? <TableAdder unit={unit} labels={t} onSave={deck.saveTable} /> : null}
        </div>
      ) : null}

      {tab === "talk" ? (
        <section className="flex flex-col gap-3">
          <div className="flex gap-2">
            <button type="button" className="min-h-12 flex-1 rounded-full bg-accent text-paper" onClick={() => void playTalk()} disabled={playing}>
              {t.playTalk}
            </button>
            <button
              type="button"
              className="flex min-h-12 min-w-12 items-center justify-center rounded-full border border-line"
              onClick={() => {
                stopRef.current.current = true;
                window.speechSynthesis?.cancel();
                setPlaying(false);
              }}
            >
              <Square className="size-5" />
            </button>
          </div>
          {DIALOGUE.map((line, i) => (
            <div key={`${line.who}-${i}`} className="flex items-center gap-3 rounded-card border border-line bg-paper p-4">
              <span className={"grid size-11 place-items-center rounded-full text-paper " + (line.who === "A" ? "bg-accent" : "bg-sage")}>
                {line.who}
              </span>
              <p dir="ltr" className="flex-1 text-xl">
                {line.text}
              </p>
              <button
                type="button"
                className="grid size-11 place-items-center rounded-full border border-line"
                onClick={() => say(line.text, line.who === "A" ? 0.82 : 1.3)}
              >
                <Volume2 className="size-5" />
              </button>
            </div>
          ))}
          <p className="text-sm text-ink/60">{t.talkNote}</p>
          <button type="button" className="min-h-12 rounded-full bg-ink text-paper" onClick={() => openQuiz("talk")}>
            {t.quizTalk}
          </button>
        </section>
      ) : null}

      {tab === "quiz" ? (
        <section>
          {quizList.length === 0 ? (
            <p>{t.noQuestions}</p>
          ) : done ? (
            <div className="rounded-card border border-line bg-paper p-8 text-center">
              <p className="font-display text-4xl">
                {score} / {quizList.length}
              </p>
              <p className="mt-2 text-ink/70">{score === quizList.length ? t.wellDone : t.retryHint}</p>
              <button type="button" className="mt-5 min-h-12 rounded-full bg-accent px-6 text-paper" onClick={() => openQuiz(quizUnit)}>
                {t.again}
              </button>
            </div>
          ) : current ? (
            <div className="rounded-card border border-line bg-paper p-5">
              <p className="text-sm text-ink/60">
                {t.question} {step + 1} {t.of} {quizList.length}
              </p>
              {current.image ? (
                <img src={publicUrl(current.image)} alt="" className="mt-3 aspect-square w-full rounded-2xl object-cover" />
              ) : null}
              {current.passage ? (
                <div className="mt-3 rounded-2xl bg-sage/15 p-4">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="text-sm text-ink/60">Lies den Text.</p>
                    <button
                      type="button"
                      className="grid size-11 place-items-center rounded-full bg-sage text-paper"
                      onClick={() => say(current.passage ?? "")}
                    >
                      <Volume2 className="size-5" />
                    </button>
                  </div>
                  <p dir="ltr" className="text-xl leading-relaxed text-ink">
                    {current.passage}
                  </p>
                </div>
              ) : null}
              {current.audio ? (
                <audio key={current.audio + current.id} controls preload="none" src={publicUrl(current.audio)} className="mt-3 w-full" />
              ) : null}
              <h2 className="mt-2 text-2xl">{quizLine(current.id, current.q, deck.lang)}</h2>
              <div className="mt-4 flex flex-col gap-2">
                {current.options.map((option, index) => {
                  const show = picked !== null;
                  const right = index === current.correct;
                  const wrong = show && index === picked && !right;
                  const label = quizChoice(current.id, index, option, deck.lang);
                  return (
                    <button
                      key={`${current.id}-${index}`}
                      type="button"
                      dir="auto"
                      className={
                        "min-h-12 rounded-2xl border px-4 text-start text-lg " +
                        (show && right ? "border-sage bg-sage text-paper " : "") +
                        (wrong ? "border-accent text-accent " : "") +
                        (!show ? "border-line " : "")
                      }
                      onClick={() => answer(index)}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              {mark ? (
                <p className="mt-4 text-center font-display text-3xl">{mark === "ok" ? t.correct : t.tryAgain}</p>
              ) : null}
              {deck.teacher ? (
                <button type="button" className="mt-3 text-sm text-accent" onClick={() => deck.hideQuiz(current.id)}>
                  {t.deleteQuestion}
                </button>
              ) : null}
            </div>
          ) : null}
          {deck.teacher ? (
            quizDraft ? (
              <QuizAdder
                unit={quizUnit}
                labels={t}
                onSave={(quiz) => {
                  deck.saveQuiz(quiz);
                  setQuizDraft(false);
                }}
              />
            ) : (
              <button type="button" className="mt-4 min-h-11 rounded-full border border-line px-4" onClick={() => setQuizDraft(true)}>
                {t.newQuestion}
              </button>
            )
          ) : null}
        </section>
      ) : null}

      {tab === "settings" ? (
        <section className="flex flex-col gap-5 rounded-card border border-line bg-paper p-5">
          <div>
            <p className="mb-2">{t.language}</p>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  ["ar", "العربية"],
                  ["en", "English"],
                  ["de", "Deutsch"],
                ] as [Lang, string][]
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  className={"min-h-11 rounded-full px-4 " + (deck.lang === id ? "bg-ink text-paper" : "border border-line")}
                  onClick={() => deck.setLang(id)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <label className="flex flex-col gap-2">
            <span>
              {t.speed}: {rateLabel(deck.rate, t)}
            </span>
            <input
              type="range"
              min={0.35}
              max={1}
              step={0.05}
              value={deck.rate}
              onChange={(e) => deck.setRate(Number(e.target.value))}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span>{t.volume}</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={deck.volume}
              onChange={(e) => deck.setVolume(Number(e.target.value))}
            />
          </label>
          <label className="flex flex-col gap-2">
            {t.voice}
            <select
              className="min-h-11 rounded-xl border border-line bg-paper px-3"
              value={deck.voice}
              onChange={(e) => deck.setVoice(e.target.value as VoiceKind)}
            >
              <option value="auto">{t.voiceAuto}</option>
              <option value="child">{t.child}</option>
              <option value="boy">{t.boy}</option>
              <option value="girl">{t.girl}</option>
              <option value="woman">{t.woman}</option>
              <option value="man">{t.man}</option>
            </select>
          </label>
          <div>
            <p className="mb-2">{t.background}</p>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  ["paper", t.paper],
                  ["meadow", t.meadow],
                  ["sky", t.sky],
                  ["dusk", t.night],
                ] as [ThemeName, string][]
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  className={"min-h-11 rounded-full px-4 " + (deck.theme === id ? "bg-ink text-paper" : "border border-line")}
                  onClick={() => deck.setTheme(id)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <label className="flex min-h-11 items-center justify-between gap-3">
            <span>{t.teacher}</span>
            <input type="checkbox" checked={deck.teacher} onChange={(e) => deck.setTeacher(e.target.checked)} />
          </label>
          <button type="button" className="min-h-11 rounded-full bg-sage text-paper" onClick={() => say("Ich kann gut schwimmen.")}>
            {t.testVoice}
          </button>
        </section>
      ) : null}

      <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl">
          {(
            [
              ["words", t.words, BookOpen],
              ["rules", t.grammar, ListChecks],
              ["talk", t.talk, MessageCircle],
              ["quiz", t.quiz, Volume2],
              ["settings", t.settings, Settings],
            ] as const
          ).map(([id, label, Icon]) => {
            const active = tab === id;
            return (
              <button
                key={id}
                type="button"
                className={"flex min-h-16 flex-1 flex-col items-center justify-center gap-1 text-xs " + (active ? "text-accent" : "text-ink/70")}
                onClick={() => setTab(id)}
              >
                <Icon className="size-5" />
                {label}
              </button>
            );
          })}
        </div>
      </nav>

      {editor ? (
        <WordEditor
          word={editor}
          labels={t}
          onClose={() => setEditor(null)}
          onSave={(word) => {
            deck.saveWord(word, isNew);
            setEditor(null);
          }}
        />
      ) : null}
    </main>
  );
}

function WordEditor({
  word,
  labels,
  onClose,
  onSave,
}: {
  word: Word;
  labels: (typeof copy)[Lang];
  onClose: () => void;
  onSave: (word: Word) => void;
}) {
  const [draft, setDraft] = useState(word);
  const [pictureError, setPictureError] = useState("");

  return (
    <div className="fixed inset-0 z-20 grid place-items-end bg-ink/40 p-4 sm:place-items-center">
      <form
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-card bg-paper p-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (!draft.image) {
            setPictureError(labels.needPicture);
            return;
          }
          onSave(draft);
        }}
      >
        <h2 className="mb-3 font-display text-2xl">{labels.word}</h2>
        <div className="flex flex-col gap-2">
          {draft.image ? (
            <img src={publicUrl(draft.image)} alt="" className="aspect-square w-full rounded-2xl object-cover" />
          ) : (
            <div className="grid aspect-square place-items-center rounded-2xl border border-dashed border-line text-ink/60">
              {labels.pictureRequired}
            </div>
          )}
          <label className="flex min-h-11 cursor-pointer items-center justify-center rounded-full bg-ink text-paper">
            {draft.image ? labels.changePicture : labels.addPicture}
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) =>
                loadPicture(
                  e.target.files?.[0],
                  (image) => {
                    setDraft((current) => ({ ...current, image }));
                    setPictureError("");
                  },
                  () => setPictureError(labels.notAPicture),
                )
              }
            />
          </label>
          {pictureError ? <p className="text-sm text-accent">{pictureError}</p> : null}
          <input className="min-h-11 rounded-xl border border-line px-3" dir="ltr" placeholder="Deutsch" value={draft.de} onChange={(e) => setDraft({ ...draft, de: e.target.value })} required />
          <input className="min-h-11 rounded-xl border border-line px-3" placeholder={labels.arabicMeaning} value={draft.ar} onChange={(e) => setDraft({ ...draft, ar: e.target.value })} required />
          <input className="min-h-11 rounded-xl border border-line px-3" placeholder={labels.englishMeaning} value={draft.en} onChange={(e) => setDraft({ ...draft, en: e.target.value })} required />
          <input className="min-h-11 rounded-xl border border-line px-3" dir="ltr" placeholder={labels.sentence} value={draft.sentence} onChange={(e) => setDraft({ ...draft, sentence: e.target.value })} required />
          <select className="min-h-11 rounded-xl border border-line bg-paper px-3" value={draft.unit} onChange={(e) => setDraft({ ...draft, unit: e.target.value as UnitId })}>
            {UNITS.map((u) => (
              <option key={u.id} value={u.id}>
                {labels.units[u.id]}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 flex gap-2">
          <button type="submit" className="min-h-11 flex-1 rounded-full bg-sage text-paper">
            {labels.save}
          </button>
          <button type="button" className="min-h-11 flex-1 rounded-full border border-line" onClick={onClose}>
            {labels.cancel}
          </button>
        </div>
      </form>
    </div>
  );
}

function TableAdder({ unit, labels, onSave }: { unit: UnitId; labels: (typeof copy)[Lang]; onSave: (table: Table) => void }) {
  const [title, setTitle] = useState("");
  const [ar, setAr] = useState("");
  const [raw, setRaw] = useState("ich | spiel | e | I");
  return (
    <form
      className="flex flex-col gap-2 rounded-card border border-dashed border-line p-4"
      onSubmit={(e) => {
        e.preventDefault();
        const rows = raw
          .split("\n")
          .map((line) => line.split("|").map((part) => part.trim()))
          .filter((parts) => parts[0] && parts[1])
          .map((parts) => ({
            left: parts[0] ?? "",
            stem: parts[1] ?? "",
            end: parts[2] ?? "",
            tail: parts[3] && parts.length > 4 ? parts[3] : undefined,
            gloss: parts.length > 4 ? (parts[4] ?? "") : (parts[3] ?? ""),
          }));
        onSave({
          id: `t${Date.now()}`,
          unit,
          title,
          ar,
          speak: rows.map((r) => `${r.stem}${r.end}${r.tail ? " " + r.tail : ""}`).join(", "),
          rows,
        });
        setTitle("");
        setAr("");
      }}
    >
      <p className="text-sm text-ink/70">{labels.ruleHelp}</p>
      <input className="min-h-11 rounded-xl border border-line px-3" dir="ltr" placeholder={labels.title} value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input className="min-h-11 rounded-xl border border-line px-3" placeholder={labels.note} value={ar} onChange={(e) => setAr(e.target.value)} required />
      <textarea className="min-h-28 rounded-xl border border-line px-3 py-2" dir="ltr" value={raw} onChange={(e) => setRaw(e.target.value)} />
      <button type="submit" className="min-h-11 rounded-full bg-sage text-paper">
        {labels.addRule}
      </button>
    </form>
  );
}

function QuizAdder({ unit, labels, onSave }: { unit: UnitId | "talk"; labels: (typeof copy)[Lang]; onSave: (quiz: Quiz) => void }) {
  const [q, setQ] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correct, setCorrect] = useState(0);
  const [image, setImage] = useState("");
  const [pictureError, setPictureError] = useState("");
  return (
    <form
      className="mt-4 flex flex-col gap-2 rounded-card border border-dashed border-line p-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ id: `q${Date.now()}`, unit, q, options, correct, image: image || undefined });
      }}
    >
      {image ? <img src={publicUrl(image)} alt="" className="aspect-square w-full rounded-2xl object-cover" /> : null}
      <label className="flex min-h-11 cursor-pointer items-center justify-center rounded-full border border-line">
        {image ? labels.changePicture : labels.pictureOptional}
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) =>
            loadPicture(
              e.target.files?.[0],
              (next) => {
                setImage(next);
                setPictureError("");
              },
              () => setPictureError(labels.notAPicture),
            )
          }
        />
      </label>
      {pictureError ? <p className="text-sm text-accent">{pictureError}</p> : null}
      <input className="min-h-11 rounded-xl border border-line px-3" placeholder={labels.newQuestion} value={q} onChange={(e) => setQ(e.target.value)} required />
      {options.map((option, i) => (
        <input
          key={i}
          className="min-h-11 rounded-xl border border-line px-3"
          placeholder={`${labels.choice} ${i + 1}`}
          value={option}
          onChange={(e) => setOptions(options.map((item, n) => (n === i ? e.target.value : item)))}
          required
        />
      ))}
      <select className="min-h-11 rounded-xl border border-line bg-paper px-3" value={correct} onChange={(e) => setCorrect(Number(e.target.value))}>
        <option value={0}>{labels.answer} 1</option>
        <option value={1}>{labels.answer} 2</option>
        <option value={2}>{labels.answer} 3</option>
        <option value={3}>{labels.answer} 4</option>
      </select>
      <button type="submit" className="min-h-11 rounded-full bg-sage text-paper">
        {labels.saveQuestion}
      </button>
    </form>
  );
}
