import express, {Request,Response,NextFunction} from 'express';

const app = express();

const PORT = 3000;

app.get('/api/v1/hello', (req:Request, res:Response, next:NextFunction ) => {
  res.send('Hello World!');
} );

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
} );