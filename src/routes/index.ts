import express from 'express';
import api from './api';

const router = express.Router().use(api); 
export default router