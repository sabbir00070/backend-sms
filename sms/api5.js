export default async function api5(req, res) {
  const phone = req.query.phone;

  if (!phone) {
    return res.status(400).json({
      status: false,
      msg: "phone required"
    });
  }

  const payload = {
    mobile: phone,
    name: "Karim Mia",
    password: "karim2023",
    email: `dghdj${phone}dsgj@gmail.com`
  };

  try {
    const response = await fetch(
      "https://app.eonbazar.com/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(JSON.stringify(payload))
        },
        body: JSON.stringify(payload)
      }
    );

    const result = await response.text();

    res.json({
      api: 5,
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