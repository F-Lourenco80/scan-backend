const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 👇 CORRECT: Only allow YOUR Neocities site!
app.use(cors({ origin: 'https://monsidotest.neocities.org' }));

app.use(express.json());

app.post('/trigger-scan', async (req, res) => {
  const bearerToken = process.env.MONSIDO_TOKEN;
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

// 👇 This is IMPORTANT on Render!
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
