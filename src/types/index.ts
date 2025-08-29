/*
================================================================================
 FILE: src/types/index.ts (UPDATE THIS FILE)
 DESC: Added a new 'Review' type to match our database table.
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

// NEW: Add this interface for reviews
export interface Review {
  id: number;
  created_at: string;
  user_id: string;
  book_id: number;
  rating: number;
  review_text: string;
  user_name: string;
}