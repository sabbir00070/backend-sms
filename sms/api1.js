export default async function api1(req, res) {
  const phone = req.query.phone;

  if (!phone) {
    return res.status(400).json({
      status: false,
      msg: "phone query required"
    });
  }

  const apiUrl = "https://api.apex4u.com/api/auth/login";

  const payload = {
    phoneNumber: phone
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.text();

    return res.json({
      status: true,
      api: 1,
      response: result
    });

  } catch (err) {
    return res.json({
      status: false,
      msg: err.message
    });
  }
}
