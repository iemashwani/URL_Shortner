const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoutes = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

connectToMongoDB(
  "mongodb+srv://as3141538:url123@cluster0.a9n2g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
).then(() => console.log("MongoDb Connected"));

app.use(express.json());

app.use("/url", urlRoutes);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        totalClicks: {
            timestamp: Date.now(),
        }
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT 8001`));
