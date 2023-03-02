import express from 'express';
import cors from 'cors';
import { router as userRouter } from './routes/user.route';

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());

app.use('/phones', userRouter);

app.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log(`API is ready on http://localhost:${PORT} 🚀🚀🚀`);
});
