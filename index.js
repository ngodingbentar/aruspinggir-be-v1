const express = require('express');
const categoriesRouter = require('./routers/categoriesRouter.js');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(cors())
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

app.use('/api/ap/categories', categoriesRouter)

app.get('/', (req, res) => res.send('Home Page Route'))

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));