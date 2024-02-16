import { useState } from 'react'
import './App.css'
import { Hero } from './components/Hero'
import { MainTable } from './components/MainTable'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';
import { FilesDropdown } from './components/FilesDropdown';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Hero />
      <MainTable />
      <Toaster position="bottom-center" />
    </>
  )
}

export default App
