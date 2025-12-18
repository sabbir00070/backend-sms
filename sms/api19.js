export default async function api19(req, res) {
  const phone = req.query.phone;

  if (!phone) {
    return res.status(400).json({
      status: false,
      msg: "phone required"
    });
  }

  try {
    const url = "https://api.osudpotro.com/api/v1/users/send_otp";

    const bodyData = {
      mobile: `+88-${phone}`,
      deviceToken: "app",
      language: "bn",
      os: "android"
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0"
      },
      body: JSON.stringify(bodyData)
    });

    const result = await response.text();

    res.json({
      api: 19,
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