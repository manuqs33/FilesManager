export const getFilesList = async () => {
  try {
    const response = await fetch('https://echo-serv.tbxnet.com/v1/secret/files', {
      method: 'GET',
      headers: {
        'authorization': 'Bearer aSuperSecretKey'
      }
    });

    if (!response.ok) {
      throw new Error('Error fetching data');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};


export const getFileContent = async (fileName) => {
  try {
    const response = await fetch(`https://echo-serv.tbxnet.com/v1/secret/file/${fileName}`, {
      method: 'GET',
      headers: {
        "accept": 'application/json',
        'authorization': 'Bearer aSuperSecretKey'
      }
    });

    if (!response.ok) {
      throw new Error('Error fetching data');
    }

    return await response.text();
  } catch (error) {
    console.error(error);
    return "";
  }
};