export default async function api25(req, res) {
  const phone = req.query.phone;

  if (!phone) {
    return res.status(400).json({
      status: false,
      msg: "phone required"
    });
  }

  try {
    const mobileNumber = `+88${phone}`;

    // Step 1: Generate token
    const generateTokenUrl = 'https://accounts.sheba.xyz/api/v1/accountkit/generate/token?app_id=8329815A6D1AE6DD';
    const tokenResponse = await fetch(generateTokenUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    const tokenData = await tokenResponse.json();
    const apiToken = tokenData.token;

    // Step 2: Shoot OTP using the generated token
    const shootOtpUrl = 'https://accountkit.sheba.xyz/api/shoot-otp';
    const shootOtpResponse = await fetch(shootOtpUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mobile: mobileNumber,
        app_id: "8329815A6D1AE6DD",
        api_token: apiToken
      })
    });

    const shootResult = await shootOtpResponse.text();

    res.json({
      api: 25,
      status: true,
      response: shootResult
    });

  } catch (err) {
    res.json({
      status: false,
      msg: err.message
    });
  }
}