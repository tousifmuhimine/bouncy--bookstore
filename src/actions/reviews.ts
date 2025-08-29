/*
================================================================================
 FILE: src/actions/reviews.ts (UPDATE THIS FILE)
 DESC: This action is now updated to use 'upsert'. It will create a new review
       if one doesn't exist for the user/book, or update the existing one if it does.
================================================================================
*/
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitReview(formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to submit a review." };
  }

  const bookId = formData.get("bookId");
  const rating = formData.get("rating");
  const reviewText = formData.get("reviewText");
  const userName = user.user_metadata?.full_name || user.email;

  if (!bookId || !rating) {
    return { error: "Book ID and rating are required." };
  }
  
  // FIX: Using upsert to either create a new review or update an existing one.
  const { error } = await supabase.from("reviews").upsert({
    user_id: user.id,
    book_id: parseInt(bookId as string),
    rating: parseInt(rating as string),
    review_text: reviewText as string,
    user_name: userName,
  }, { onConflict: 'user_id, book_id' }); // This tells Supabase to check for a duplicate user_id/book_id pair.

  if (error) {
    console.error("Error upserting review:", error);
    return { error: "Failed to submit review." };
  }

  revalidatePath(`/book/${bookId}`);
  
  return { success: "Review submitted successfully!" };
}

