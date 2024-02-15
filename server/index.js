import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import filesRouter from './routes/filesRouter.js';


const app = express();

app.use(express.json());
/* app.use(cors({
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
})); */
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/', filesRouter);

dotenv.config();



const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});