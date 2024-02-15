import { downloadFilesContent, getFilesListController } from '../controllers/filesController.js';
import express from 'express';


const filesRouter = express.Router();

// Assign the function to a route
filesRouter.get('/files/data', downloadFilesContent);
filesRouter.get('/files/list', getFilesListController);

export default filesRouter;

