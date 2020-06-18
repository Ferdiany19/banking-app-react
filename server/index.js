const express = require('express');
const authRoute = require('./routes/auth');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())
app.use(authRoute);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});