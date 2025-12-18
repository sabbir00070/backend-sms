export default async function api16(req, res) {
  const phone = req.query.phone;

  if (!phone) {
    return res.status(400).json({
      status: false,
      msg: "phone required"
    });
  }

  try {
    const url = "https://api.hishabexpress.com/login/status";

    const params = new URLSearchParams({
      msisdn: phone,
      hash: "Hello"
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "user-agent": "Dart/2.19 (dart:io)",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params.toString()
    });

    const result = await response.text();

    res.json({
      api: 16,
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