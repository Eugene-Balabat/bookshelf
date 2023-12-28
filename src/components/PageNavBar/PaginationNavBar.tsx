import NavButton from './NavButton/NavButton'
import './PaginationNavBar.css'
import { NavButtonInterface } from './interfaces/pagination.inreface'

interface PaginationNavBarProps {
  currentPageNumber: number
  stateNavButtons: NavButtonInterface

  changeCurrentPageToBackOne: () => void
  changeCurrentPageToNextOne: () => void
}

const PaginationNavBar = ({ stateNavButtons, currentPageNumber, changeCurrentPageToBackOne, changeCurrentPageToNextOne }: PaginationNavBarProps) => {
  return (
    <nav className="page-navigation">
      <ul>
        <li>
          <NavButton disabled={!stateNavButtons.backButton} symbol="<" changeCurrentPage={changeCurrentPageToBackOne} />
        </li>
        <li className="page-navigation-value">
          <span>{`Page ${currentPageNumber}`}</span>
        </li>
        <li>
          <NavButton disabled={!stateNavButtons.nextButton} symbol=">" changeCurrentPage={changeCurrentPageToNextOne} />
        </li>
      </ul>
    </nav>
  )
}

export default PaginationNavBar
