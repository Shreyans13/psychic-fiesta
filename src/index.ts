import express, { Request, Response } from 'express';

const app = express();
const { PORT = 3000 } = process.env;

app.get('/', (req: Request, res: Response) => {
  res.send({
    message: 'hello bro!!! new checks',
  });
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});

export default app;
