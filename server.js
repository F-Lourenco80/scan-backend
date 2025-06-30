const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({ origin: 'https://monsidotest.neocities.org' })); // or your real site

app.post('/trigger-scan', async (req, res) => {
  const bearerToken = process.env.MONSIDO_TOKEN; // safe on backend only
  const apiUrl = 'https://app1.eu.monsido.com/api/domains/130448/rescan';
  try {
    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await apiResponse.json();
    res.status(apiResponse.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to trigger scan", details: error.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
