export default async function api4(req, res) {
  const phone = req.query.phone;

  if (!phone) {
    return res.status(400).json({
      status: false,
      msg: "phone required"
    });
  }

  try {
    const response = await fetch(
      "https://portal.flipper.com.bd/api/v1/send-otp/login",
      {
        method: "POST",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
          "X-Authorization":
            "QoFN68MGTcosJxSmDf5GCgxXlNcgE1mUH9MUWuDHgs7dugjR7P2ziASzpo3frHL3",
          "Origin": "https://flipper.com.bd",
          "Referer": "https://flipper.com.bd/",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mobile_number: phone
        })
      }
    );

    const result = await response.text();

    res.json({
      api: 4,
      status: true,
      response: result
    });

  } catch (err) {
    res.json({
      status: false,
      msg: err.message
    });
  }
}