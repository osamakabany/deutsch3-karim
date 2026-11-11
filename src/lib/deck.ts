import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Quiz, Table, Word } from "@/lib/curriculum";
import type { Lang } from "@/lib/i18n";
import type { VoiceKind } from "@/lib/speech";

export type ThemeName = "paper" | "meadow" | "sky" | "dusk";

type Deck = {
  lang: Lang;
  rate: number;
  volume: number;
  voice: VoiceKind;
  theme: ThemeName;
  teacher: boolean;
  hiddenWords: string[];
  wordEdits: Record<string, Word>;
  extraWords: Word[];
  hiddenQuiz: string[];
  extraQuiz: Quiz[];
  extraTables: Table[];
  setLang: (lang: Lang) => void;
  setRate: (n: number) => void;
  setVolume: (n: number) => void;
  setVoice: (v: VoiceKind) => void;
  setTheme: (t: ThemeName) => void;
  setTeacher: (on: boolean) => void;
  saveWord: (word: Word, isNew: boolean) => void;
  hideWord: (id: string) => void;
  saveQuiz: (quiz: Quiz) => void;
  hideQuiz: (id: string) => void;
  saveTable: (table: Table) => void;
};

export const useDeck = create<Deck>()(
  persist(
    (set) => ({
      lang: "en",
      rate: 0.62,
      volume: 1,
      voice: "auto",
      theme: "paper",
      teacher: false,
      hiddenWords: [],
      wordEdits: {},
      extraWords: [],
      hiddenQuiz: [],
      extraQuiz: [],
      extraTables: [],
      setLang: (lang) => set({ lang }),
      setRate: (rate) => set({ rate }),
      setVolume: (volume) => set({ volume }),
      setVoice: (voice) => set({ voice }),
      setTheme: (theme) => set({ theme }),
      setTeacher: (teacher) => set({ teacher }),
      saveWord: (word, isNew) =>
        set((s) =>
          isNew
            ? { extraWords: [...s.extraWords.filter((w) => w.id !== word.id), word] }
            : { wordEdits: { ...s.wordEdits, [word.id]: word } },
        ),
      hideWord: (id) =>
        set((s) => ({
          hiddenWords: [...s.hiddenWords, id],
          extraWords: s.extraWords.filter((w) => w.id !== id),
        })),
      saveQuiz: (quiz) => set((s) => ({ extraQuiz: [...s.extraQuiz, quiz] })),
      hideQuiz: (id) => set((s) => ({ hiddenQuiz: [...s.hiddenQuiz, id] })),
      saveTable: (table) => set((s) => ({ extraTables: [...s.extraTables, table] })),
    }),
    { name: "deutsch3-deck-v2" },
  ),
);
