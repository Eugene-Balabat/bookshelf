import { Link } from 'react-router-dom'
import './SearchBar.css'
import logo from '../../assets/logo.png'

const SearchBar = () => {
  return (
    <div className="serach-bar">
      <input type="serach" id="search-input" placeholder="Search for books, journal articles and more" />
      <select name="sort" id="sort-list">
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="year">Year</option>
      </select>
    </div>
  )
}

export default SearchBar
