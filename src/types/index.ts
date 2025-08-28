/*
================================================================================
 FILE: src/types/index.ts (UPDATE THIS FILE)
================================================================================
*/
export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  section: string;
  cover_url: string; 
  is_top_sell: boolean;
  is_favorite: boolean;
}

export interface BookSection {
  section: string;
  books: Book[];
}

export interface CartItem extends Book {
    quantity: number;
}