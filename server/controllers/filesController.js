const getFilesList = async () => {
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


const getFileContent = async (fileName) => {
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

export const downloadFilesContent = async (req, res) => {
  try {
    let response = [];
    const filesList = await getFilesList();
    const { files } = filesList;
    console.log(files);
    const { fileName } = req.query;

    if (fileName) {
      const fileContent = await getFileContent(fileName);
      res.send({ content: fileContent });
      return;
    }

    for (let fileTitle of files) {
      console.log(fileTitle);
      const fileContent = await getFileContent(fileTitle);
      if (!fileContent || fileContent==="file,text,number,hex") continue;
      const rawLines = fileContent.split('\n');
      const validLines = rawLines.filter(line => validateLine(line, fileTitle));
      console.log("validLines", validLines);
      if (validLines.length == 0) continue;
      let object = createValidObject(validLines, fileTitle);
      response.push(object);
    }
    /* const fileContent = await getFileContent(fileName); */
    res.status(500).send(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export const validateLine = (line, fileName) => {
  const lineArray = line.split(',');
  if (lineArray.length != 4) return false;
  if (lineArray[0] != fileName) return false;
  if (isNaN(lineArray[2])) return false;
/*   if (isValidHexadecimal(lineArray[3]) == false) return false;
 */  return true;
}

export const createValidObject = (validLines, fileName) => {
  let object = {};
  object.file = fileName;
  object.lines = [];
  if (validLines.length == 0) return object;
  
  for (let line of validLines) {
    const columns = line.split(',');
    object.lines.push({
      text: columns[1],
      number: columns[2],
      hex: columns[3],
    });
  }
  return object;
}

const isValidHexadecimal = (input) => {
  const hexRegex = /^[0-9A-Fa-f]+$/;
  return hexRegex.test(input);
};