# NextGen E-commerce

Full-stack e-commerce application with a React storefront, an Express API, MongoDB persistence, authenticated user accounts, product management, reviews, order processing, image uploads, and Stripe checkout.

## Features

- Browse products by category, color, price range, and pagination
- View product details, related products, ratings, and reviews
- Register, log in, log out, and update user profiles
- Manage a shopping cart and create Stripe checkout sessions
- View user orders and payment results
- Admin dashboard with product, order, user, and sales statistics management
- Upload product and profile images through Cloudinary
- Responsive UI built with React, Tailwind CSS, and Remix Icon

## Tech Stack

**Frontend**

- React 19 and Vite
- React Router
- Redux Toolkit and RTK Query
- Tailwind CSS
- Stripe.js
- Chart.js

**Backend**

- Node.js and Express 5
- MongoDB with Mongoose
- JSON Web Tokens and HTTP cookies for authentication
- Stripe for payments
- Cloudinary for image uploads

## Project Structure

```text
.
├── backend/
│   ├── index.js              # Express application entry point
│   └── src/
│       ├── middleware/       # Authentication and authorization middleware
│       ├── orders/           # Order model and routes
│       ├── products/         # Product model and routes
│       ├── reviews/          # Review model and routes
│       ├── stats/            # Admin statistics routes
│       ├── users/            # User model and authentication routes
│       └── utils/            # Cloudinary upload helper
└── frontend/
	└── src/
		├── components/       # Shared UI components
		├── pages/            # Storefront, blog, shop, and dashboard pages
		├── redux/            # Store and API slices
		├── routers/          # Application routing and protected routes
		└── utils/            # Shared frontend helpers
```

## Prerequisites

- Node.js 18 or newer
- npm
- A MongoDB database, local or hosted
- A Stripe account with API keys
- A Cloudinary account for image uploads

## Installation

Clone the repository and install dependencies in both applications:

```bash
git clone <repository-url>
cd My_New_Project_Code

cd backend
npm install

cd ../frontend
npm install
```

## Environment Variables

Create `backend/.env`:

```env
PORT=5000
DB_URL=mongodb://127.0.0.1:27017/nextgen-ecommerce
JWT_SECRET_KEY=replace-with-a-long-random-secret
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

Create `frontend/.env`:

```env
VITE_STRIPE_PK=pk_test_your_stripe_publishable_key
```

The frontend currently uses `http://localhost:5000` as its backend URL. Update `frontend/src/utils/baseURL.js` when the API is hosted elsewhere, and update the backend CORS origin in `backend/index.js` to match the deployed frontend URL.

Never commit real credentials or environment files to source control.

## Running Locally

Start the backend in one terminal:

```bash
cd backend
npm run start:dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

The backend runs on `http://localhost:5000` by default. Its root health response is available at `http://localhost:5000/`.

## Available Scripts

### Backend

| Command | Description |
| --- | --- |
| `npm start` | Start the API with Node.js |
| `npm run start:dev` | Start the API with Nodemon |

### Frontend

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## API Overview

The backend exposes these route groups:

| Route | Purpose |
| --- | --- |
| `/api/auth` | Registration, login, logout, users, and profile updates |
| `/api/products` | Product listing, filtering, details, related products, and admin updates |
| `/api/reviews` | Product reviews and ratings |
| `/api/orders` | Orders, Stripe checkout, and payment confirmation |
| `/api/stats` | Admin dashboard statistics |
| `/uploadImage` | Upload a base64 image to Cloudinary |

Authentication uses JWTs returned during login and an HTTP cookie. Admin-only actions require an authenticated admin account.

## Deployment Notes

- Configure all backend environment variables in the hosting provider.
- Set the frontend Stripe publishable key through `VITE_STRIPE_PK` before building.
- Change the frontend API URL from localhost to the deployed backend URL.
- Configure backend CORS to allow the deployed frontend origin.
- Use HTTPS in production so secure authentication cookies work correctly.
- Use Stripe test keys for development and live keys only in a protected production environment.

## License

This project currently uses the ISC license declared in `backend/package.json`.