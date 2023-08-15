import { Link } from 'react-router-dom'
import './LibraryPage.css'
import Item from '../../components/Item/Item'
import SearchBar from '../../components/SearchBar/SearchBar'
import PageNavBar from '../../components/PageNavBar/PaginationNavBar'
import { useEffect } from 'react'

const LibraryPage = () => {
  useEffect(() => {
    initialRequest()
  }, [])

  async function initialRequest() {
    const data = await fetch('https://openlibrary.org/works/OL45804W/editions.json')
    console.log(data.json())
  }

  return (
    <>
      <SearchBar />
      <div className="content-items">
        <PageNavBar />
        <div className="items-grid">
          <Link to="/book">
            <Item />
          </Link>
          <Link to="/book">
            <Item />
          </Link>
          <Link to="/book">
            <Item />
          </Link>
          <Link to="/book">
            <Item />
          </Link>
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
        <PageNavBar />
      </div>
    </>
  )
}

export default LibraryPage
