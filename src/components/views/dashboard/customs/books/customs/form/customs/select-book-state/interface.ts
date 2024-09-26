export interface BookStateI {
  label: string;
  value: string;
}

export interface SelectBookStatePropsI {
  value: string;
  onChange: (value: string, type: string) => void;
}
