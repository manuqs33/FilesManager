import https from 'https';

export const getFilesList = async () => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      headers: {
        "accept": 'application/json',
        'authorization': 'Bearer aSuperSecretKey'
      }
    };

    const req = https.request('https://echo-serv.tbxnet.com/v1/secret/files', options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error('Error fetching data'));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
};


export const getFileContent = async (fileName) => {
  try {
    const options = {
      hostname: 'echo-serv.tbxnet.com',
      path: `/v1/secret/file/${fileName}`,
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'authorization': 'Bearer aSuperSecretKey'
      }
    };

    const response = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          resolve({ statusCode: res.statusCode, data });
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.end();
    });

    if (response.statusCode >= 400) {
      return {"error": response.statusCode};
    }

    return response.data;
  } catch (error) {
      return {"error": response.statusCode};
  }
};
