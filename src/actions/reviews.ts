/*
================================================================================
 FILE: src/actions/reviews.ts (NEW FILE)
 DESC: A server action to handle the submission of new reviews.
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
  
  const { error } = await supabase.from("reviews").insert({
    user_id: user.id,
    book_id: parseInt(bookId as string),
    rating: parseInt(rating as string),
    review_text: reviewText as string,
    user_name: userName,
  });

  if (error) {
    console.error("Error inserting review:", error);
    return { error: "Failed to submit review. You may have already reviewed this book." };
  }

  // Revalidate the book page to show the new review instantly
  revalidatePath(`/book/${bookId}`);
  
  return { success: "Review submitted successfully!" };
}