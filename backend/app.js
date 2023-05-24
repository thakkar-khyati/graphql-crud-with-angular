const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { graphql } = require("graphql");
const dotenv = require("dotenv");


const graphqlSchema = require('./graphql/schema')
const graphqlResolver = require('./graphql/resolver')

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());

graphql
app.use('/graphql', graphqlHTTP({
    schema:graphqlSchema,
    rootValue:graphqlResolver,
    graphiql:true
}))

//mongoose
mongoose
  .connect(process.env.mongoDbCompassUrl)
  .then(() => {
    app.listen(process.env.port, () => {
      console.log("server running on 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
