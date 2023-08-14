import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRouter from './app-router'
import AppNavBar from './components/AppNavBar/AppNavBar'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppNavBar />
        <div id="page-body">
          <div id="content">
            <AppRouter />
          </div>
        </div>
        <footer>
          <p>Developed by Yevhen Balabat, 2023</p>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
