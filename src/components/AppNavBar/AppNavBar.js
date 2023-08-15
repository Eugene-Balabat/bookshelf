import { Link } from 'react-router-dom'
import './AppNavBar.css'
import logo from '../../assets/logo.png'

const AppNavBar = () => {
  return (
    <header className="header-nav-bar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      <nav>
        <ul>
          <li>
            <Link to="/library" className="link">
              Library
            </Link>
          </li>
          <li>
            <Link to="/books" className="link">
              Books
            </Link>
          </li>
        </ul>
      </nav>

      <div className="profile">
        <Link to="/profile" className="link">
          Profile
        </Link>
      </div>
    </header>
  )
}

export default AppNavBar
