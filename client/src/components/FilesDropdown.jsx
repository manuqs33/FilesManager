import { useState, useEffect } from 'react';
import { Container, Dropdown, Table } from 'react-bootstrap';
import { fetchFilesList } from '../api/apiMethods';

export const FilesDropdown = () => {
  useEffect(() => {
    fetchFilesListData()
  }, [])

  const [filesListData, setFilesListData] = useState([]);

  const fetchFilesListData = async () => {
    const backendData = await fetchFilesList();
    setFilesListData(backendData);
  }
  
  return (
      <Dropdown size="lg">
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Files List
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Files List</th>
              </tr>
            </thead>
            <tbody>
              {(filesListData && filesListData.length > 0) && filesListData.map((file, index) => (
                <tr key={index}>
                  <td>{file}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Dropdown.Menu>
      </Dropdown>
  );
}
