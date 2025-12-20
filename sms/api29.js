export default async function api29(req, res) {
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
    const url = "https://api.bdtickets.com:20100/v1/auth";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json, text/plain, */*",
        "Origin": "https://bdtickets.com",
        "Referer": "https://bdtickets.com/",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome Mobile Safari/537.36"
      },
      body: JSON.stringify({
        createUserCheck: true,
        phoneNumber: phone,
        applicationChannel: "WEB_APP"
      })
    });

    const result = await response.text();

    res.json({
      api: 29,
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