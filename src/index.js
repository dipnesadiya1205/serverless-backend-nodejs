const serverless = require("serverless-http");
const express = require("express");
const { getDbClient } = require("./db/clients");
const { listLeads, newLead, getLead } = require("./db/crud");
const { validateLeadData } = require("./db/validator");

const app = express();
app.use(express.json());

app.get("/", async (req, res, next) => {
  const db = await getDbClient();
  const now = Date.now();
  const [fetchTime] = await db`select NOW();`;

  const timeDiff = (fetchTime.now.getTime() - now) / 1000;

  return res.status(200).json({
    message: "Hello from root!",
    timeTaken: timeDiff,
  });
});

app.get("/leads/:id", async (req, res) => {
  const { id } = req.params;
  const leadsDetails = await getLead(id);
  return res.status(200).json({
    message: "Lead details",
    payload: leadsDetails,
  });
});

app.get("/leads", async (req, res) => {
  const leadsDetails = await listLeads();
  return res.status(200).json({
    message: "List of leads",
    payload: leadsDetails,
  });
});

app.post("/leads", async (req, res) => {
  const postData = req.body;

  // Validate the input data.
  const { data, hasError, message } = await validateLeadData(postData);

  if (hasError) {
    return res.status(400).json({
      error: message,
    });
  } else if (hasError === undefined) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }

  // Add the lead to the database.
  const result = await newLead({ ...data, description: postData.description });
  return res.status(200).json({
    message: "Lead added successfully",
    payload: result,
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
