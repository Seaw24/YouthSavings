import express from 'express';
import { get } from 'http';

const routerFixedData = express.Router();


routerFixedData.route('/').get(getFixedData).post(createFixedData);

export default routerFixedData;