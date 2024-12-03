import express, {Request,Response,NextFunction} from 'express';

const app = express();

const PORT = 3000;

//routes

//analytics/total_sales 
app.get('/api/v1/analytics/total_sales', (req:Request, res:Response, next:NextFunction ) => {
  res.send('Total Sales');
} );


//analytics/trending_products
app.get('/api/v1/analytics/trending_products', (req:Request, res:Response, next:NextFunction ) => {
  res.send('Trending Products');
} ); 


//analytics/category_sales
app.get('/api/v1/analytics/category_sales', (req:Request, res:Response, next:NextFunction ) => {
  res.send('Category Sales');
} );


//products
app.get('/api/v1/products', (req:Request, res:Response, next:NextFunction ) => {
  res.send('Products');
} ); 


app.get('/api/v1/hello', (req:Request, res:Response, next:NextFunction ) => {
  res.send('Hello World!');
} );

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
} );