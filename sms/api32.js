export default async function api32(req, res) {
  let phone = req.query.phone;

  if (!phone) {
    return res.status(400).json({
      status: false,
      msg: "phone required"
    });
  }

  const postData = new URLSearchParams({ msisdn: phone }).toString();

  try {
    const response = await fetch("https://webloginda.grameenphone.com/backend/api/v1/otp", {
      method: "POST",
      headers: {
        "Host": "webloginda.grameenphone.com",
        "Connection": "keep-alive",
        "Content-Length": postData.length.toString(),
        "sec-ch-ua-platform": '"Android"',
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36",
        "Accept": "application/json, text/plain, */*",
        "sec-ch-ua": '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
        "Content-Type": "application/x-www-form-urlencoded",
        "sec-ch-ua-mobile": "?1",
        "Origin": "https://www.grameenphone.com",
        "Sec-Fetch-Site": "same-site",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        "Referer": "https://www.grameenphone.com/",
        "Accept-Encoding": "deflate, br, zstd",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8,pt;q=0.7,bn;q=0.6,zh-CN;q=0.5,zh;q=0.4"
      },
      body: postData
    });

    const result = await response.text();

    res.json({
      api: 32,
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