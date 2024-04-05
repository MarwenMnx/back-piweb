import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import  bodyParser from 'body-parser';
import  cors  from 'cors';
import  mongoose from 'mongoose';
import alarmeRouter from './routes/api/AirAlarme.js';
import typealarmeRouter from './routes/api/Air_Typealarme.js';
import usineRouter from './routes/api/Usine.js';
import entretienRouter from './routes/api/Air_Entretien.js';
import equipementRouter from './routes/api/Air_Equipement.js';
dotenv.config();

const app = express();

const { PORT = 5000 } = process.env;

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('./dist/'));
app.use('/api/airalarmes', alarmeRouter);
app.use('/api/airTypeAlarme', typealarmeRouter);
app.use('/api/usine', usineRouter);
app.use('/api/entretiens',entretienRouter);
app.use('/api/equipements', equipementRouter);



app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API',
  });
});

const CONNECTION_URL = `mongodb+srv://nejimarwan21:${dbpassword}@piwebcluster.yq3u1v6.mongodb.net/`;
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, })
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)) )
.catch((error) => console.log(error.message));


