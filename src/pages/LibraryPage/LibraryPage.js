import { Link } from 'react-router-dom'
import './LibraryPage.css'
import Item from '../../components/Item/Item'
import SearchBar from '../../components/SearchBar/SearchBar'

const LibraryPage = () => {
  const back = '<'
  const next = '>'

  return (
    <div id="page-body">
      <div id="content">
        <SearchBar />

        <nav className="page-navigation">
          <ul>
            <button className="nav-page">
              <li>{back}</li>
            </button>
            <button className="nav-page">
              <li>{next}</li>
            </button>
          </ul>
        </nav>

        <div className="content-items">
          <Link to="/book">
            <Item />
          </Link>
          <Link to="/book">
            <Item />
          </Link>
          <Link to="/book">
            <Item />
          </Link>
        </div>

        <nav className="page-navigation">
          <ul>
            <button className="nav-page">
              <li>{back}</li>
            </button>
            <button className="nav-page">
              <li>{next}</li>
            </button>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default LibraryPage
