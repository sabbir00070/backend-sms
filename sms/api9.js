export default async function api9(req, res) {
  const phone = req.query.phone;

  if (!phone) {
    return res.status(400).json({
      status: false,
      msg: "phone required"
    });
  }

  try {
    const url = "https://fundesh.com.bd/api/auth/generateOTP?service_key=";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ msisdn: phone })
    });

    const result = await response.text();

    res.json({
      api: 9,
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