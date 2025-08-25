/*
================================================================================
 IMPORTANT NOTE FOR THE DEVELOPER (YOU!)
================================================================================

 The errors you encountered are because this document contains the code for MANY
 DIFFERENT FILES, all presented together in one block for convenience. You cannot
 compile this entire document as a single file.

 Please follow the instructions below carefully. You must copy each section of
 code into its own separate file within your Next.js project. The correct file
 path for each code block is clearly marked in a comment block like this one.

================================================================================
 FILE: src/types/index.ts
 DESC: This file defines the shapes of our data for TypeScript.
================================================================================
*/
export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  cover: string;
}

export interface BookSection {
  section: string;
  books: Book[];
}