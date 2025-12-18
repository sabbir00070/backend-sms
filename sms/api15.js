export default async function api15(req, res) {
  const phone = req.query.phone;

  if (!phone) {
    return res.status(400).json({
      status: false,
      msg: "phone required"
    });
  }

  try {
    // Remove leading 0 if present
    const mobile = phone.replace(/^0/, '');

    const url = "https://ehealth2all.com/api/v1/user/userSignup";

    const params = new URLSearchParams({
      fullname: "Fuckboy",
      country_code: "+880",
      mobile: mobile,
      password: "@@@@2233",
      device_type: "android",
      device_id: "12345",
      language: "en"
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params.toString()
    });

    const result = await response.text();

    res.json({
      api: 15,
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