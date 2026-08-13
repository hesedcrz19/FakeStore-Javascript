import express from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import { productsRouter } from './products/product.routes.js';
import { categoriesRouter } from './categories/category.routes.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { error404 } from './utils/createError.js';

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(corsMiddleware());

app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);

app.use((_req, res) => {
  const { code, message, status } = error404();
  res.status(404).json({
    message,
    code,
    status,
  });
});

app.use(errorMiddleware);

export default app;
