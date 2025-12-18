export default async function api17(req, res) {
  const phone = req.query.phone;

  if (!phone) {
    return res.status(400).json({
      status: false,
      msg: "phone required"
    });
  }

  try {
    const url = `http://apibeta.iqra-live.com/api/v1/sent-otp/${phone}`;

    const response = await fetch(url, {
      method: "GET"
    });

    const result = await response.text();

    res.json({
      api: 17,
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