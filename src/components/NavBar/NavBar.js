import { Link } from 'react-router-dom'
import './NavBar.css'
import logo from '../../assets/logo.png'

const NavBar = () => {
  return (
    <header>
      <div className="nav-bar">
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
      </div>
    </header>
  )
}

export default NavBar
