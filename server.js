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

    // ---- ADDED LOGGING ----
    console.log('Monsido API response status:', apiResponse.status);
    // Try to log json body, but handle non-JSON just in case
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
    // ---- ADDED LOGGING ----
    console.error('Failed to trigger Monsido scan:', error);
    res.status(500).json({ error: "Failed to trigger scan", details: error.message });
  }
});
