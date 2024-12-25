import express from 'express';
import Link from '../models/Link';


const linkRouter = express.Router();

const generateShortUrl = (length = 7) => Math.random().toString(36).substr(2, length);

linkRouter.post('/', async (req, res, next) => {
  try {
    if (!req.body.originalUrl) {
      res.status(400).send({error: 'URL is required'});
    }
    const shortUrl = generateShortUrl();
    const link = new Link({
      originalUrl: req.body.originalUrl,
      shortUrl
    });
    await link.save();
    res.json(link);
  } catch (error) {
    next(error);
  }
});

linkRouter.get('/:shortUrl', async (req, res, next) => {
  try {
    const link = await Link.findOne({shortUrl: req.params.shortUrl});
    if (link) {
      res.status(301).redirect(link.originalUrl);
    } else {
      res.status(404).send({error: 'Not Found'});
    }
  } catch (error) {
    next(error);
  }
});


export default linkRouter;