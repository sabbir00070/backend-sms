export default async function api11(req, res) {
  const phone = req.query.phone;

  if (!phone) {
    return res.status(400).json({
      status: false,
      msg: "phone required"
    });
  }

  try {
    const url = `https://api.mygp.cinematic.mobi/api/v1/otp/88${phone}/SBENT_3GB7D`;

    const bodyData = {
      accessinfo: {
        access_token: "K165S6V6q4C6G7H0y9C4f5W7t5YeC6",
        referenceCode: "20190827042622"
      }
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    });

    const result = await response.text();

    res.json({
      api: 11,
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