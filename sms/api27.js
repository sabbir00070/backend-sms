export default async function api27(req, res) {
  const phone = req.query.phone;

  if (!phone) {
    return res.status(400).json({
      status: false,
      msg: "phone required"
    });
  }

  try {
    const url = "https://api-gateway.sundarbancourierltd.com/graphql";

    const bodyData = {
      operationName: "CreateAccessToken",
      variables: {
        accessTokenFilter: {
          userName: phone
        }
      },
      query: `mutation CreateAccessToken($accessTokenFilter: AccessTokenInput!) {
        createAccessToken(accessTokenFilter: $accessTokenFilter) {
          message
          statusCode
          result {
            phone
            otpCounter
            __typename
          }
          __typename
        }
      }`
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Host": "api-gateway.sundarbancourierltd.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0)",
        "Accept-Language": "en-US,en;q=0.5",
        "Referer": "https://customer.sundarbancourierltd.com/",
        "Origin": "https://customer.sundarbancourierltd.com"
      },
      body: JSON.stringify(bodyData)
    });

    const result = await response.text();

    res.json({
      api: 27,
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