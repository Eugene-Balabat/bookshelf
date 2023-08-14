import { Link } from 'react-router-dom'
import './LibraryPage.css'
import Item from '../../components/Item/Item'
import SearchBar from '../../components/SearchBar/SearchBar'
import PageNavBar from '../../components/PageNavBar/PaginationNavBar'

const LibraryPage = () => {
  return (
    <>
      <SearchBar />
      <div className="content-items">
        <PageNavBar />
        <Link to="/book">
          <Item />
        </Link>
        <Link to="/book">
          <Item />
        </Link>
        <Link to="/book">
          <Item />
        </Link>
        <PageNavBar />
      </div>
    </>
  )
}

export default LibraryPage
