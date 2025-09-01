/*
================================================================================
 FILE: src/types/index.ts (UPDATE THIS FILE)
 DESC: Added the new 'preview_image_urls' property to the Book interface to
       support the homepage preview feature.
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
  preview_image_urls?: string[]; // This is the new, optional property
}

export interface BookSection {
  section: string;
  books: Book[];
}

export interface CartItem extends Book {
    quantity: number;
}

export interface Review {
  id: number;
  created_at: string;
  user_id: string;
  book_id: number;
  rating: number;
  review_text: string;
  user_name: string;
}

export interface SiteReview {
  id: number;
  created_at: string;
  user_id: string;
  user_name: string;
  rating: number;
  review_text: string;
}
