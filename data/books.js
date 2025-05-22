// books.js (ES Module version)
const books = [
  {
    isbn: "9780132350884",
    title: "Clean Code",
    author: "Robert C. Martin",
    reviews: [
        {
            user: "user1",
            rating: 5,
            comment: "Great book!"
        },
        {
            user: "user2",
            rating: 4,
            comment: "Very informative."
        }
    ]
  },
  {
    isbn: "9781491950296",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    reviews: [
            {
            user: "user1",
            rating: 5,
            comment: "Great book!"
        },
        {
            user: "user2",
            rating: 4,
            comment: "Very informative."
        }
    ]
  }
];

export default books;
