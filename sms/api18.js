export default async function api18(req, res) {
  const phoneParam = req.query.phone;

  if (!phoneParam) {
    return res.status(400).json({
      status: false,
      msg: "phone required"
    });
  }

  try {
    // Remove leading 0 if present
    const phone = phoneParam.replace(/^0/, '');
    const url = "https://smart1216.robi.com.bd/robi_sivr/public/login/phone";

    const bodyData = {
      cli: phone
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
      api: 18,
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