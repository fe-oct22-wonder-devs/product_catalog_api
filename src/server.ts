import express from 'express';
import cors from 'cors';
import { router as phoneRouter } from './routes/phone.route';
import { router as tabletRouter } from './routes/tablet.route';

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());

app.use('/phones', phoneRouter);
app.use('/tablets', tabletRouter);

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`API is ready on http://localhost:${PORT} 🚀🚀🚀`);
});
