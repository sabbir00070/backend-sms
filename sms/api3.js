export default async function api3(req, res) {
  const phone = req.query.phone;

  if (!phone) {
    return res.status(400).json({
      status: false,
      msg: "phone query required"
    });
  }

  const url = "https://chokrojan.com/api/v1/passenger/login/mobile";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
        "domain-name": "chokrojan.com",
        "user-platform": "3",
        "company-id": "1",
        "Origin": "https://chokrojan.com",
        "Referer": "https://chokrojan.com/login",
        "Content-Type": "application/json",
        "Cookie":
          "_ga_TXX7J24H07=GS1.1.1681140800.3.1.1681142406.0.0.0; _ga=GA1.1.162112941.1678173405; _fbp=fb.1.1678173407195.536316567"
      },
      body: JSON.stringify({
        mobile_number: phone
      })
    });

    const result = await response.text();

    res.json({
      api: 3,
      status: true,
      response: result
    });

  } catch (err) {
    res.json({
      api: 3,
      status: false,
      msg: err.message
    });
  }
}