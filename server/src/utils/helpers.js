export const validateLine = (line, fileName) => {
  const lineArray = line.split(',');
  if (lineArray.length != 4) return false;
  if (lineArray[0] != fileName) return false;
  if (isNaN(lineArray[2])) return false;
  if (isValidHexadecimal(lineArray[3]) == false) return false;
  return true;
}

export const createValidObject = (validLines, fileName) => {
  console.log("asfasdfasfdasf")
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