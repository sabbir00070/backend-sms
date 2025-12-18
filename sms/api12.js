export default async function api12(req, res) {
  const phone = req.query.phone;

  if (!phone) {
    return res.status(400).json({
      status: false,
      msg: "phone required"
    });
  }

  try {
    const url = "https://bkshopthc.grameenphone.com/api/v1/fwa/request-for-otp";

    const bodyData = {
      phone: phone,
      email: "",
      language: "en"
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Linux; Android 8.0.0; SM-G960F Build/R16NW) AppleWebKit/537.36"
      },
      body: JSON.stringify(bodyData)
    });

    const result = await response.text();

    res.json({
      api: 12,
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