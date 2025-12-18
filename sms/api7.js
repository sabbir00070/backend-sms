export default async function api7(req, res) {
  const phone = req.query.phone;

  if (!phone) {
    return res.status(400).json({
      status: false,
      msg: "phone required"
    });
  }

  try {
    const response = await fetch(
      "https://api.deeptoplay.com/v1/auth/login?country=BD&platform=web",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          number: phone
        })
      }
    );

    const result = await response.text();

    res.json({
      api: 7,
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