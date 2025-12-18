export default async function api8(req, res) {
  const phone = req.query.phone;

  if (!phone) {
    return res.status(400).json({
      status: false,
      msg: "phone required"
    });
  }

  try {
    const response = await fetch(
      `https://api.mygp.cinematic.mobi/api/v1/send-common-otp/88${phone}/`,
      {
        method: "POST",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({}) // empty body since PHP cURL had $data undefined
      }
    );

    const result = await response.text();

    res.json({
      api: 8,
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