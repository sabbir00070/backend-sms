export default async function api21(req, res) {
  const phone = req.query.phone;

  if (!phone) {
    return res.status(400).json({
      status: false,
      msg: "phone required"
    });
  }

  try {
    const url = "https://payment.portpos.com/v2/api/user/signup-otp";

    const bodyData = {
      email_or_phone: phone
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "User-Agent": "Monibot",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    });

    const result = await response.text();

    res.json({
      api: 21,
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