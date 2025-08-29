/*
================================================================================
 FILE: src/actions/siteReviews.ts (NEW FILE)
 DESC: A new server action to handle the submission of general site reviews.
================================================================================
*/
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitSiteReview(formData: FormData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to submit a review." };
  }

  const rating = formData.get("rating");
  const reviewText = formData.get("reviewText");
  const userName = user.user_metadata?.full_name || user.email;

  if (!rating || !reviewText) {
    return { error: "Rating and review text are required." };
  }
  
  const { error } = await supabase.from("site_reviews").insert({
    user_id: user.id,
    rating: parseInt(rating as string),
    review_text: reviewText as string,
    user_name: userName,
  });

  if (error) {
    console.error("Error inserting site review:", error);
    return { error: "Failed to submit review." };
  }

  // Revalidate the homepage to show the new review instantly
  revalidatePath("/");
  
  return { success: "Thank you for your review!" };
}