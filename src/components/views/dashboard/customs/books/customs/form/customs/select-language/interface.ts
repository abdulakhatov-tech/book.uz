export interface LanguageI {
  label: string;
  value: string;
}

export interface SelectLanguagePropsI {
  value: string;
  onChange: (value: string, type: string) => void;
}
