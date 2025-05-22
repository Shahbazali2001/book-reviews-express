import express from "express";
const router = express.Router();
import books from "../data/books.js";
import { v4 as uuidv4 } from "uuid";



router.post("/:isbn/reviews", (req, res) => {
  const { isbn } = req.params;
  const { review } = req.body;
  const book = books.find((book) => book.isbn === isbn);
  if (book) {
    const newReview = {
      id: uuidv4(),
      username: req.user.username,
      comment,
      rating,
      createdAt: new Date(),
    };
    book.reviews.push(newReview);
    res.status(201).json({ message: 'Review added', newReview });
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});


router.put('/:isbn/reviews',  (req, res) => {
  const { isbn } = req.params;
  const { comment, rating } = req.body;

  const book = books.find(b => b.isbn === isbn);
  if (!book || !book.reviews) return res.status(404).json({ error: 'Book or reviews not found' });

  const review = book.reviews.find(r => r.username === req.user.username);
  if (!review) return res.status(403).json({ error: 'No review found to update' });

  review.comment = comment || review.comment;
  review.rating = rating || review.rating;
  review.updatedAt = new Date();

  res.json({ message: 'Review updated', review });
})

router.delete('/:isbn/reviews', (req, res) => {
  const { isbn } = req.params;

  const book = books.find(b => b.isbn === isbn);
  if (!book || !book.reviews) return res.status(404).json({ error: 'Book or reviews not found' });

  const index = book.reviews.findIndex(r => r.username === req.user.username);
  if (index === -1) return res.status(403).json({ error: 'No review found to delete' });

  book.reviews.splice(index, 1);
  res.json({ message: 'Review deleted' });
});

export default router;
