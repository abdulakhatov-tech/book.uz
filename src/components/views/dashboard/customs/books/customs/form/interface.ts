export interface ImageUrlsI {
  thumbnail: string;
  additionalImage1: string;
  additionalImage2: string;
  additionalImage3: string;
  additionalImage4: string;
  [key: string]: string;
}

export interface FormDataI {
  name: string;
  genre: string;
  author: string;
  amount: number;
  bookPrice: number;
  language: string;
  cover: string;
  discount: null | number;
  numberOfPages: number;
  state: string;
  year: number;
  barcode: string;
  description: string;
}
