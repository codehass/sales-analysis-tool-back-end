import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import connectToDatabase from './dbServer';

import Sale from './models/Sale';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
console.log(process.env.PORT);

// Connect to the database
connectToDatabase();

// Middleware
app.use(express.json());

// Routes
app.get('/api/v1/analytics/total_sales', async (req, res) => {
    try {
        const totalSales = await Sale.aggregate([
            { $group: { _id: null, total: { $sum: "$TotalAmount" } } },
        ]);

        res.json({ totalSales: totalSales[0]?.total || 0 });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch total sales", error: err });
    }
});

app.get('/api/v1/analytics/trending_products', (req: Request, res: Response) => {
  res.send('Trending Products');
});

app.get('/api/v1/analytics/category_sales', (req: Request, res: Response) => {
  res.send('Category Sales');
});

app.get(' ', (req: Request, res: Response) => {
  res.send('Products');
});

app.get('/api/v1/hello', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
