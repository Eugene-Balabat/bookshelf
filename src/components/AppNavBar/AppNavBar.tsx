import { Link } from 'react-router-dom'
import './AppNavBar.css'
import logo from '../../assets/logo.png'

const AppNavBar = () => {
  return (
    <header className="header-nav-bar">
      <div className="logo">
        <Link to="/bookslist" className="link">
          <img src={logo} alt="Logo" />{' '}
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/bookslist" className="link">
              Books
            </Link>
          </li>
          <li>
            <Link to="/library" className="link">
              Library
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
