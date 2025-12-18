export default async function api6(req, res) {
  const phone = req.query.phone;

  if (!phone) {
    return res.status(400).json({
      status: false,
      msg: "phone required"
    });
  }

  const payload = {
    name: "Shahidul Islam",
    email: "uyrlhkgxqw@emergentvillage.org",
    mobile: phone,
    password: "boss#2022",
    password_confirmation: "boss#2022",
    device_key: "9a28ae67c5704e1fcb50a8fc4ghjea4d"
  };

  try {
    const response = await fetch(
      "https://core.easy.com.bd/api/v1/registration",
      {
        method: "POST",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
          "Referer": "https://easy.com.bd/",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

    const result = await response.text();

    res.json({
      api: 6,
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