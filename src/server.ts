import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connect, connection } from 'mongoose';
import { routerUser, routerBlockchain, routerSlaughter, routerReport, routerLivestock } from './routers/index';
import { createModuleResolutionCache, ModifierFlags } from 'typescript';

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

connect(uri!, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
connection.once('open', () => {
    console.log('MongoDB database connection established successfuly!');
});

/** Router */

// const reportsRouter = require('./routers/reports');
app.use('/users', routerUser);
app.use('/livestocks', routerLivestock);
app.use('/slaughters', routerSlaughter);
app.use('/blockchains', routerBlockchain);
app.use('/reports', routerReport);

app.listen(port, () => {
    console.log(`Server is running on port: ${port} `);
    console.log(uri);
});

module.exports = app;
