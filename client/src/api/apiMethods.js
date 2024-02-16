import { notifyToast} from '../utils/notifyToast';

export const fetchValidLines = async () => {
  try {
    const response = await fetch('http://localhost:3000/files/data',
      {
        method: 'GET',
        headers: {
        Authorization: 'Bearer ',
        'Content-Type': 'application/json',

      },
      }
    );
    console.log("validLines", response)
    if (!response.ok) {
      throw new Error('Error fetching valid lines')
    }
    let data = await response.json();
    return data;
  } catch (error) {
    notifyToast('Error fetching valid lines', 'error');
    return [];
  }
};

export const fetchFile = async (fileName) => {
  try {
    const response = await fetch(`http://localhost:3000/files/data?fileName=${fileName}`,
      {
        method: 'GET',
        headers: {
        Authorization: 'Bearer ',
        'Content-Type': 'application/json',
      },
      }
    );
    
  
    if (response.status > 400) {
      notifyToast('The file was not found in the server', 'warning');
      return [{}];
    }
    if (response.ok) {
      let data = await response.json();
      data.lines.length === 0 && notifyToast('The file was found but has no valid lines or is empty')
      return [data];
    }
  } catch (error) {
    notifyToast('There was a server error downloading your file', 'warning');
    return [{}];
  }
}

export const fetchFilesList = async () => {
  try {
    const response = await fetch('http://localhost:3000/files/list',
      {
        method: 'GET',
        headers: {
        Authorization: 'Bearer ',
        'Content-Type': 'application/json',
      },
      }
    );
    console.log("response", response)
    if (!response.ok) {
      throw new Error('Error fetching')
    }
    let data = await response.json();
    console.log("fileslistdata", data);
    return data;
  } catch (error) {
    notifyToast('Error fetching files list', 'error');
    return [];
  }
};