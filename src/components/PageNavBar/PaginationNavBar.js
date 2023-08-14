import NavButton from './NavButton/NavButton'
import './PaginationNavBar.css'

const PaginationNavBar = () => {
  return (
    <nav className="page-navigation">
      <ul>
        <li>
          <NavButton symbol="<" />
        </li>
        <li>
          <NavButton symbol=">" />
        </li>
      </ul>
    </nav>
  )
}

export default PaginationNavBar
