export default async function api14(req, res) {
  const phone = req.query.phone;

  if (!phone) {
    return res.status(400).json({
      status: false,
      msg: "phone required"
    });
  }

  try {
    const url = "http://45.114.85.19:8080/v3/otp/send";

    const bodyData = {
      msisdn: "88" + phone
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
        "Content-Type": "application/json",
        "user-platform": "3",
        "company-id": "1"
      },
      body: JSON.stringify(bodyData)
    });

    const result = await response.text();

    res.json({
      api: 14,
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