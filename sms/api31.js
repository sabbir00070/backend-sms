export default async function api31(req, res) {
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
    const url = "https://ecom.rangs.com.bd/send-otp-code";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer",
        "Origin": "https://shop.rangs.com.bd",
        "Referer": "https://shop.rangs.com.bd/",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome Mobile Safari/537.36"
      },
      body: JSON.stringify({
        mobile: phone,
        type: 1
      })
    });

    const result = await response.text();

    res.json({
      api: 31,
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