export default async function api30(req, res) {
  let phone = req.query.phone;

  if (!phone) {
    return res.status(400).json({
      status: false,
      msg: "phone required"
    });
  }
  phone = phone.replace(/\D/g, "");
  if (!phone.startsWith("88")) {
    phone = "88" + phone;
  }
  phone = "+" + phone;

  try {
    const url = "https://api-dynamic.bioscopelive.com/v2/auth/login?country=BD&platform=web&language=en";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Origin": "https://www.bioscopeplus.com",
        "Referer": "https://www.bioscopeplus.com/",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome Mobile Safari/537.36"
      },
      body: JSON.stringify({ number: phone })
    });

    const result = await response.text();

    res.json({
      api: 30,
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