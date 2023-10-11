const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const absRoutes = require("./routes/absRoutes");
const bicepsRoutes = require("./routes/bicepsRoutes");
const chestRoutes = require("./routes/chestRoutes");
const latsRoutes = require("./routes/latsRoutes");
const shoulderRoutes = require("./routes/shoulderRoutes");
const tricepsRoutes = require("./routes/tricepsRoutes");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to MONGO");
});
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use("/abs", absRoutes);
app.use("/biceps", bicepsRoutes);
app.use("/chest", chestRoutes);
app.use("/lats", latsRoutes);
app.use("/shoulder", shoulderRoutes);
app.use("/triceps", tricepsRoutes);


// Port connection
app.listen(process.env.PORT || 4000, () => {
  console.log("listening to PORT 4000");
});
