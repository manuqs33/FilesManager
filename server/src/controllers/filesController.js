import { createValidObject, validateLine, createEmptyObject } from '../utils/helpers.js';
import { getFilesList, getFileContent } from '../services/externalApiCallers.js';

export const downloadFilesContent = async (req, res) => {
  try {
    let response = [];
    let singleResponse = {};
    const filesList = await getFilesList();
    const { files } = filesList;
    const { fileName } = req.query;
    res.set('Content-Type', 'application/json');

    if (fileName) {
      const fileContent = await getFileContent(fileName);
      if (typeof fileContent === 'string' && fileContent.startsWith('Error')) {
        singleResponse = {"error": fileContent};
      } else {
        const rawLines = fileContent.split('\n');
        const validLines = rawLines.filter(line => validateLine(line, fileName));
        validLines.length === 0
        ? singleResponse = createEmptyObject(fileName)
        : singleResponse = createValidObject(validLines, fileName);
      }
      res.send(singleResponse);
      return;
    }

    for (let fileTitle of files) {
      const fileContent = await getFileContent(fileTitle);
      if (typeof fileContent === 'string' && fileContent.startsWith('Error')) continue;
      const rawLines = fileContent.split('\n');
      const validLines = rawLines.filter(line => validateLine(line, fileTitle));
      if (validLines.length == 0) {
        response.push(createEmptyObject(fileTitle));
        continue;
      }
      let object = createValidObject(validLines, fileTitle);
      response.push(object);
    }
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export const getFilesListController = async (req, res) => {
  try {
    const filesList = await getFilesList();
    res.set('Content-Type', 'application/json');
    res.status(200).send(filesList);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

