import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath} from 'url';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const totalApi = process.env.TAPI || 1;
const apis = [];

for (let i = 1; i <= totalApi; i++) {
  const api = `api${i}.js`;
  try {
    const modules = await import(`./sms/${api}`);
    apis.push(modules.default);
    app.get(`/sms/api${i}`, modules.default);
  } catch (err) {
    console.log(`Faild to loaded file ${err}`);
  }
}
app.get('/smsv2/attack', async (req, res) => {
  try {
    const number = req.query.num;
    const isNum = numberCheck(number);
    if(!isNum.status) {
      return res.status(400).json(isNum);
    }
    const data = await hitAll(number);
    res.status(200).json({
      status: true,
      msg: 'Succesfully sumited',
      results: data,
    });
  } catch(err) {
    res.status(500).json({
      status: false,
      msg: 'Internal server error'
    });
  }
});

app.listen(PORT, () => {
  console.log('Sarver has started at localhost:',PORT);
})

function numberCheck(number) {
  if(!number) {
    return {
      status: false,
      msg: 'empty query'
    };
  }
  if(!/^01\d{9}$/.test(number)) {
    return {
      status: false,
      msg: 'Invalid number format'
    };
  }
  const blocked = ["01306995635"];
  if(blocked.includes(number)) {
    return {
      status: false,
      msg: 'This number is blocked'
    };
  }
  return {
    status: true,
    msg: 'Number accepted'
  };
}

async function hitAll(number) {
  const results = [];
  let count = 0;

  for (const api of apis) {
    const data = new Promise((resolve) => {
      api(
        { query: { phone: number } },
        {
          json: (d) => resolve(d)
        }
      );
    });

    count++;
    results.push({
      api: count,
      response: data
    });
  }

  return {
    total: count,
    results
  };
}