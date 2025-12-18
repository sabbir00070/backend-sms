export default async function api10(req, res) {
  const phone = req.query.phone;

  if (!phone) {
    return res.status(400).json({
      status: false,
      msg: "phone required"
    });
  }

  try {
    const url = "https://api.ghoorilearning.com/api/auth/signup/otp?_app_platform=web&_lang=bn";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
        "Content-Type": "application/json",
        "Referer": "https://ghoorilearning.com/",
        "Origin": "https://ghoorilearning.com"
      },
      body: JSON.stringify({ mobile_no: phone })
    });

    const result = await response.text();

    res.json({
      api: 10,
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