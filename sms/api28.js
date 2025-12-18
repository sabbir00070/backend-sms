export default async function api28(req, res) {
  const phone = req.query.phone;

  if (!phone) {
    return res.status(400).json({
      status: false,
      msg: "phone required"
    });
  }

  try {
    const url = `https://api.win2gain.com/api/Users/RequestOtp?msisdn=88${phone}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "sourcePlatform": "web",
        "client": "2"
      }
    });

    const result = await response.text();

    res.json({
      api: 28,
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