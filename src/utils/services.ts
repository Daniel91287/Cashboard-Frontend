export const UmsatzErfassen: string[] = ["Beschreibung", "Betrag", "Datum"];

export interface UmsatzEintrag {
  bezeichnung: string;
  Betrag: number;
  Datum: string;
}

export const UmsatzUebersicht: UmsatzEintrag[] = [
  { bezeichnung: "Miete", Betrag: -500, Datum: "01.11.2025" },
  { bezeichnung: "Gehalt", Betrag: 2000, Datum: "01.11.2025" },
  { bezeichnung: "Lebensmittel", Betrag: -300, Datum: "01.11.2025" }
];
