export default async function api2(req, res) {
  const phone = req.query.phone;

  if (!phone) {
    return res.status(400).json({
      status: false,
      msg: "phone query required"
    });
  }

  const url =
    "https://bikroy.com/data/phone_number_login/verifications/phone_login?phone=" +
    encodeURIComponent(phone);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Host": "bikroy.com",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
        "Application-name": "web",
        "Connection": "keep-alive",
        "Referer": "https://bikroy.com/?login-modal=true&redirect-url=/"
      }
    });

    const result = await response.text();

    res.json({
      api: 2,
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
