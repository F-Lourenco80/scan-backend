const express = require('express');
const fetch = require('node-fetch'); // or just use global fetch if Node 18+
const cors = require('cors');        // <---- THIS LINE IS REQUIRED!
require('dotenv').config();

const app = express(); // <--- app is declared here!
app.use(express.json());
app.use(cors({ origin: 'https://monsidotest.neocities.org' })); // or your real site

// Place this BELOW the declarations above
app.post('/trigger-scan/:domainId', async (req, res) => {
  const domainId = req.params.domainId || '130448'; // fallback to default if not provided
  const bearerToken = process.env.MONSIDO_TOKEN;
  const apiUrl = `https://app1.eu.monsido.com/api/domains/${domainId}/rescan`;
  try {
    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Monsido API response status:', apiResponse.status);
    let data;
    try {
      data = await apiResponse.json();
      console.log('Monsido API response body:', data);
    } catch (jsonErr) {
      console.log('Monsido API returned non-JSON data');
      data = { message: 'Non-JSON response from Monsido' };
    }

    res.status(apiResponse.status).json(data);

  } catch (error) {
    console.error('Failed to trigger Monsido scan:', error);
    res.status(500).json({ error: "Failed to trigger scan", details: error.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
