import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import connectToDatabase from './dbServer';

import Sale from './models/Sale';
import Product from './models/Product';
import cors from 'cors';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
console.log(process.env.PORT);

// Connect to the database
connectToDatabase();

// Middleware
app.use(express.json());

app.use(cors());

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

app.get('/api/v1/analytics/trending_products', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit as string) || 3;

        const trendingProducts = await Sale.aggregate([
            {
                $group: {
                    _id: "$ProductID",
                    quantitySold: { $sum: "$Quantity" },
                    totalSales: { $sum: "$TotalAmount" }, 
                },
            },
            { $sort: { quantitySold: -1 } },
            { $limit: limit },
        ]);

        const result = await Promise.all(
            trendingProducts.map(async (product) => {
                const productDetails = await Product.findOne({ ProductID: product._id }).lean();

                return {
                    productID: product._id,
                    productName: productDetails?.ProductName || "Unknown Product", 
                    quantitySold: product.quantitySold,
                    totalSales: product.totalSales,
                };
            })
        );

        res.json(result);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch trending products", error: err });
    }
});


app.get('/api/v1/analytics/category_sales', async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Step 1: Aggregate sales by category
        const salesByCategory = await Sale.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: 'ProductID',
                    foreignField: 'ProductID', 
                    as: 'productDetails'
                }
            },
            {
                $unwind: '$productDetails' 
            },
            {
                $group: {
                    _id: '$productDetails.Category', 
                    totalSales: { $sum: '$TotalAmount' }, 
                    salesCount: { $sum: 1 }
                }
            },
        ]);

        // Step 2: Calculate total sales for all categories
        const totalSales = salesByCategory.reduce((acc, category) => acc + category.totalSales, 0);

        // Step 3: Calculate percentage and format the result
        const result = salesByCategory.map((category) => ({
            category: category._id,
            salesCount: category.salesCount,
            totalSales: category.totalSales,
            percentage: totalSales > 0 ? ((category.totalSales / totalSales) * 100).toFixed(2) : '0.00' // Calculate percentage
        }));

        // Step 4: Return the result
        res.json(result);
    } catch (err) {
        next(err);
    }
});

app.get('/api/v1/analytics/products', async (req, res) => {
  try {
    const productsWithSales = await Product.aggregate([
      {
        $lookup: {
          from: "sales", 
          localField: "ProductID", 
          foreignField: "ProductID", 
          as: "sales",
        },
      },
      {
        $addFields: {
          totalSales: { $sum: "$sales.Quantity" },
          firstSaleDate: { $min: "$sales.Date" },  
        },
      },
      {
        $project: {
          _id: 0,          
          ProductID: 1,         
          ProductName: 1,      
          Category: 1,           
          Price: 1,              
          totalSales: 1,        
          firstSaleDate: 1,     
        },
      },
    ]);

    res.json(productsWithSales);
  } catch (err) {
    const errorMessage = (err instanceof Error) ? err.message : 'Unknown error';
    res.status(500).json({ message: "Failed to fetch product data", error: errorMessage });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
