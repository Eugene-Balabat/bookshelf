import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRouter from './app-router'
import NavBar from './components/NavBar/NavBar'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />

        <AppRouter />

        <footer>
          <p>Developed by Yevhen Balabat, 2023</p>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
