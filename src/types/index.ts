// src/types/index.ts

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  section: string;
  cover_url: string; // Changed from 'cover' to match the database
  is_top_sell: boolean; // Added for Top Sells
  is_favorite: boolean; // Added for Favorites
}

export interface BookSection {
  section: string;
  books: Book[];
}

export interface CartItem extends Book {
    quantity: number;
}