# Sales Analysis Tool

## Overview
The Sales Analysis Tool is a comprehensive solution to visualize and analyze sales data. It consists of two main components:

1. **Frontend**: Built with modern web technologies, the frontend provides an interactive dashboard and detailed product views.
   - [Access the Frontend](https://sales-analysis-tool-front-end.vercel.app/)

2. **Backend**: A robust API to serve sales data, built to handle analytics queries.
   - [Access the Backend](https://sales-analysis-tool-back-end.onrender.com/)

---

## Frontend

### Routes

#### `/` - Home (Dashboard)
- Displays the following:
  - Total sales.
  - Top-selling products.
  - Sales percentage by category.
  - Sales distribution charts (bar and pie charts).

#### `/products` - Products
- Displays a table of all products, including:
  - Product name.
  - Category.
  - First sale date.
  - Price.
  - Total sales.
- Includes a pagination feature with customizable items per page.

### Features
- Responsive and user-friendly interface.
- Dropdown to filter analytics by time period (e.g., 7 days, 30 days, 12 months).
- Interactive charts for sales distribution.
- Built with **Vue.js** and styled using **TailwindCSS**.

---

## Backend

### Endpoints

The backend provides the following API endpoints to fetch sales data:

#### `GET /api/v1/analytics/total_sales`
- **Description**: Retrieves the total sales amount.
- **Response**:
  ```json
  {
    "totalSales": 150000
  }
  ```

#### `GET /api/v1/analytics/trending_products?limit=2`
- **Description**: Fetches the top-selling products.
- **Parameters**:
  - `limit` (optional): Specifies the number of top products to return.
- **Response**:
  ```json
  [
    {
        "productID": 53,
        "productName": "Keyboard",
        "quantitySold": 16902,
        "totalSales": 4287789.02
    },
    {
        "productID": 23,
        "productName": "History Book",
        "quantitySold": 16804,
        "totalSales": 4325239.71
    },
  ]
  ```

#### `GET /api/v1/analytics/category_sales`
- **Description**: Returns sales percentage by category.
- **Parameters**:
  - `period` (optional): Filters category sales by time period.
- **Response**:
  ```json
  [
    {
        "category": "Electronics",
        "salesCount": 58275,
        "totalSales": 81519782.15,
        "percentage": "20.05"
    },
    {
        "category": "Sports & Outdoors",
        "salesCount": 58100,
        "totalSales": 81271979.35,
        "percentage": "19.99"
    },
  ]
  ```

#### `GET /api/v1/analytics/products`
- **Description**: Retrieves a list of all products with detailed information.
- **Response**:
  ```json
  [
    {
      "ProductID": "1",
      "ProductName": "Product A",
      "Category": "Electronics",
      "firstSaleDate": "2023-01-01",
      "Price": 100,
      "totalSales": 5000
    },
    {
      "ProductID": "2",
      "ProductName": "Product B",
      "Category": "Clothing",
      "firstSaleDate": "2023-02-01",
      "Price": 50,
      "totalSales": 3000
    }
  ]
  ```

### Backend Technologies
- **Node.js**: Backend runtime environment.
- **Express**: Web framework for API development.
- **Database**: Data persistence for analytics.

---

## How to Run Locally

### Frontend
1. Clone the repository.
2. Navigate to the frontend directory.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the app at `http://localhost:5173/`.

### Backend
1. Clone the repository.
2. Navigate to the backend directory.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables in a `.env` file.
    - PORT = 5000
    - MONGO_URI = mongodb://localhost:27017/salesDatabase
5. Start the server:
   ```bash
   npm run dev
   ```
6. The backend will be available at `http://localhost:5000/`.

---

## Deployment
- **Frontend**: Deployed on **Vercel**.
- **Backend**: Deployed on **Render**.


## License
This project is licensed under the MIT License.

