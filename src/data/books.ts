/*
================================================================================
 FILE: src/data/books.ts (UPDATE THIS FILE WITH COMPLETE DATA)
================================================================================
*/
import type { Book, BookSection } from '@/types';

export const bookData: BookSection[] = [
  {
    section: "Manga",
    books: [
      { id: 1, title: "Attack on Titan", author: "Hajime Isayama", price: 12.99, cover: "https://source.unsplash.com/300x450/?manga,cover,titan" },
      { id: 2, title: "My Hero Academia", author: "Kohei Horikoshi", price: 9.99, cover: "https://source.unsplash.com/300x450/?manga,cover,hero" },
      { id: 3, title: "Jujutsu Kaisen", author: "Gege Akutami", price: 11.99, cover: "https://source.unsplash.com/300x450/?manga,cover,sorcery" },
      { id: 4, title: "Demon Slayer", author: "Koyoharu Gotouge", price: 10.99, cover: "https://source.unsplash.com/300x450/?manga,cover,demon" },
      { id: 5, title: "One Piece", author: "Eiichiro Oda", price: 9.99, cover: "https://source.unsplash.com/300x450/?manga,cover,pirate" },
    ],
  },
  {
    section: "Science Fiction",
    books: [
      { id: 6, title: "Dune", author: "Frank Herbert", price: 18.99, cover: "https://source.unsplash.com/300x450/?scifi,cover,dune" },
      { id: 7, title: "Foundation", author: "Isaac Asimov", price: 15.99, cover: "https://source.unsplash.com/300x450/?scifi,cover,foundation" },
      { id: 8, title: "Neuromancer", author: "William Gibson", price: 14.99, cover: "https://source.unsplash.com/300x450/?scifi,cover,cyberpunk" },
      { id: 9, title: "Hyperion", author: "Dan Simmons", price: 17.99, cover: "https://source.unsplash.com/300x450/?scifi,cover,space" },
      { id: 10, title: "The Martian", author: "Andy Weir", price: 13.99, cover: "https://source.unsplash.com/300x450/?scifi,cover,mars" },
    ],
  },
  {
    section: "Fantasy",
    books: [
      { id: 11, title: "The Hobbit", author: "J.R.R. Tolkien", price: 14.99, cover: "https://source.unsplash.com/300x450/?fantasy,cover,hobbit" },
      { id: 12, title: "A Game of Thrones", author: "George R.R. Martin", price: 19.99, cover: "https://source.unsplash.com/300x450/?fantasy,cover,throne" },
      { id: 13, title: "The Name of the Wind", author: "Patrick Rothfuss", price: 16.99, cover: "https://source.unsplash.com/300x450/?fantasy,cover,wind" },
      { id: 14, title: "Mistborn", author: "Brandon Sanderson", price: 18.99, cover: "https://source.unsplash.com/300x450/?fantasy,cover,mist" },
      { id: 15, title: "The Witcher", author: "Andrzej Sapkowski", price: 15.99, cover: "https://source.unsplash.com/300x450/?fantasy,cover,witcher" },
    ],
  },
  {
    section: "Mystery",
    books: [
      { id: 16, title: "Gone Girl", author: "Gillian Flynn", price: 13.99, cover: "https://source.unsplash.com/300x450/?mystery,cover,girl" },
      { id: 17, title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", price: 14.99, cover: "https://source.unsplash.com/300x450/?mystery,cover,tattoo" },
      { id: 18, title: "And Then There Were None", author: "Agatha Christie", price: 12.99, cover: "https://source.unsplash.com/300x450/?mystery,cover,crime" },
      { id: 19, title: "The Silent Patient", author: "Alex Michaelides", price: 15.99, cover: "https://source.unsplash.com/300x450/?mystery,cover,silent" },
      { id: 20, title: "Big Little Lies", author: "Liane Moriarty", price: 11.99, cover: "https://source.unsplash.com/300x450/?mystery,cover,lies" },
    ],
  },
  {
    section: "Horror",
    books: [
      { id: 21, title: "It", author: "Stephen King", price: 19.99, cover: "https://source.unsplash.com/300x450/?horror,cover,clown" },
      { id: 22, title: "The Haunting of Hill House", author: "Shirley Jackson", price: 14.99, cover: "https://source.unsplash.com/300x450/?horror,cover,house" },
      { id: 23, title: "House of Leaves", author: "Mark Z. Danielewski", price: 22.99, cover: "https://source.unsplash.com/300x450/?horror,cover,abstract" },
      { id: 24, title: "Mexican Gothic", author: "Silvia Moreno-Garcia", price: 16.99, cover: "https://source.unsplash.com/300x450/?horror,cover,gothic" },
      { id: 25, title: "The Shining", author: "Stephen King", price: 17.99, cover: "https://source.unsplash.com/300x450/?horror,cover,hotel" },
    ],
  },
  {
    section: "Romance",
    books: [
      { id: 26, title: "Pride and Prejudice", author: "Jane Austen", price: 12.99, cover: "https://source.unsplash.com/300x450/?romance,cover,classic" },
      { id: 27, title: "Outlander", author: "Diana Gabaldon", price: 15.99, cover: "https://source.unsplash.com/300x450/?romance,cover,scotland" },
      { id: 28, title: "The Notebook", author: "Nicholas Sparks", price: 13.99, cover: "https://source.unsplash.com/300x450/?romance,cover,notebook" },
      { id: 29, title: "Red, White & Royal Blue", author: "Casey McQuiston", price: 14.99, cover: "https://source.unsplash.com/300x450/?romance,cover,prince" },
      { id: 30, title: "The Hating Game", author: "Sally Thorne", price: 11.99, cover: "https://source.unsplash.com/300x450/?romance,cover,office" },
    ],
  },
  {
    section: "Biography",
    books: [
      { id: 31, title: "Steve Jobs", author: "Walter Isaacson", price: 21.99, cover: "https://source.unsplash.com/300x450/?biography,cover,apple" },
      { id: 32, title: "Educated", author: "Tara Westover", price: 18.99, cover: "https://source.unsplash.com/300x450/?biography,cover,memoir" },
      { id: 33, title: "Becoming", author: "Michelle Obama", price: 24.99, cover: "https://source.unsplash.com/300x450/?biography,cover,obama" },
      { id: 34, title: "The Diary of a Young Girl", author: "Anne Frank", price: 10.99, cover: "https://source.unsplash.com/300x450/?biography,cover,diary" },
      { id: 35, title: "Shoe Dog", author: "Phil Knight", price: 17.99, cover: "https://source.unsplash.com/300x450/?biography,cover,nike" },
    ],
  },
  {
    section: "Classics",
    books: [
      { id: 36, title: "To Kill a Mockingbird", author: "Harper Lee", price: 11.99, cover: "https://source.unsplash.com/300x450/?classic,book,cover,bird" },
      { id: 37, title: "1984", author: "George Orwell", price: 10.99, cover: "https://source.unsplash.com/300x450/?classic,book,cover,dystopian" },
      { id: 38, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 9.99, cover: "https://source.unsplash.com/300x450/?classic,book,cover,gatsby" },
      { id: 39, title: "Moby Dick", author: "Herman Melville", price: 14.99, cover: "https://source.unsplash.com/300x450/?classic,book,cover,whale" },
      { id: 40, title: "War and Peace", author: "Leo Tolstoy", price: 22.99, cover: "https://source.unsplash.com/300x450/?classic,book,cover,war" },
    ],
  },
  {
    section: "Cooking",
    books: [
      { id: 41, title: "Salt, Fat, Acid, Heat", author: "Samin Nosrat", price: 29.99, cover: "https://source.unsplash.com/300x450/?cooking,book,cover,elements" },
      { id: 42, title: "The Food Lab", author: "J. Kenji López-Alt", price: 39.99, cover: "https://source.unsplash.com/300x450/?cooking,book,cover,science" },
      { id: 43, title: "Joy of Cooking", author: "Irma S. Rombauer", price: 25.99, cover: "https://source.unsplash.com/300x450/?cooking,book,cover,joy" },
      { id: 44, title: "Cravings", author: "Chrissy Teigen", price: 22.99, cover: "https://source.unsplash.com/300x450/?cooking,book,cover,cravings" },
      { id: 45, title: "Mastering the Art of French Cooking", author: "Julia Child", price: 35.99, cover: "https://source.unsplash.com/300x450/?cooking,book,cover,french" },
    ],
  },
  {
    section: "Self-Help",
    books: [
      { id: 46, title: "Atomic Habits", author: "James Clear", price: 19.99, cover: "https://source.unsplash.com/300x450/?self-help,book,cover,habits" },
      { id: 47, title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", price: 17.99, cover: "https://source.unsplash.com/300x450/?self-help,book,cover,art" },
      { id: 48, title: "How to Win Friends and Influence People", author: "Dale Carnegie", price: 15.99, cover: "https://source.unsplash.com/300x450/?self-help,book,cover,friends" },
      { id: 49, title: "Daring Greatly", author: "Brené Brown", price: 16.99, cover: "https://source.unsplash.com/300x450/?self-help,book,cover,daring" },
      { id: 50, title: "The Power of Now", author: "Eckhart Tolle", price: 14.99, cover: "https://source.unsplash.com/300x450/?self-help,book,cover,now" },
    ],
  },
];

export const topSells: Book[] = [
    bookData[1].books[0], bookData[0].books[2], bookData[4].books[0], bookData[6].books[2], bookData[9].books[0],
    bookData[2].books[1], bookData[7].books[1], bookData[8].books[0], bookData[3].books[3], bookData[5].books[1]
];
export const favorites: Book[] = [
    bookData[2].books[2], bookData[3].books[0], bookData[5].books[3], bookData[7].books[2], bookData[8].books[1],
    bookData[0].books[0], bookData[1].books[2], bookData[4].books[4], bookData[6].books[1], bookData[9].books[4]
];