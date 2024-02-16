import React, { useState, useEffect } from 'react';
import { Container, Row, Table, Form, FormControl, Button } from 'react-bootstrap';
import './MainTable.css';
import { fetchValidLines, fetchFile } from '../api/apiMethods';
import { CustomSpinner } from './CustomSpinner';
import { FilesDropdown } from './FilesDropdown';

export const MainTable = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [fileName, setFileName] = useState('')

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoader(true);
    const backendData = await fetchValidLines();
    setData(backendData);
    setLoader(false);
  }

  const fetchByFileName = async (fileName) => {
    setLoader(true);
    const backendData = await fetchFile(fileName);
    setData(backendData);
    setLoader(false);
  }

  return (
    <Container>
      {loader ? (
        <CustomSpinner />
      ) : (
        <>
        <div className="row ButtonsBar">
          <div className="col-md-4">
            <div className="flex-container">
              <Form>
                <FormControl
                  type="text"
                  size="lg"
                  placeholder="Filter by file name"
                  className="mr-sm-2"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                />
              </Form>
              <Button size='lg' variant="primary" onClick={(e) => fetchByFileName(fileName)}>Filter</Button>
            </div>
          </div>
          <div className="col-md-4">
            <Button size='lg' variant="secondary" onClick={(e) => fetchData()}>Refresh</Button>
          </div>
          <div className="col-md-4">
            <FilesDropdown />
          </div>
        </div>
      <Table className='main-table' responsive striped bordered hover>
        <thead>
          <tr>
            <th>File</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 && data.map((item) => (
            (item.lines && item.lines.length > 0) && item.lines.map((line, index) =>
              <tr key={index}>
                <td>{item.file}</td>
                <td>{line.text}</td>
                <td>{line.number}</td>
                <td>{line.hex}</td>
              </tr>
            )
          ))}
        </tbody>
      </Table>
      </>
      )}
    </Container>
  );
};
