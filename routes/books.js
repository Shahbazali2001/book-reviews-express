import express from 'express';
import books from '../data/books.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json(books);
});


router.get('/search', (req, res) => {
    const { isbn, title, author } = req.query;
    const results = books.filter(book =>
    (!isbn || book.isbn.includes(isbn)) &&
    (!title || book.title.toLowerCase().includes(title.toLowerCase())) &&
    (!author || book.author.toLowerCase().includes(author.toLowerCase()))
  );
  res.json(results);
});


router.get('/:isbn/reviews', (req, res) => {
    const { isbn } = req.params;
    const book = books.find(book => book.isbn === isbn);
    if (book) {
      res.json(book.reviews);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  });


export default router;