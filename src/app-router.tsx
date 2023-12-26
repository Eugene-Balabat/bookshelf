import { Route, Routes } from 'react-router-dom'
import BooksListPage from './pages/BooksPage/BooksListPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import BookPage from './pages/BookPage/BookPage'
import LibraryPage from './pages/LibraryPage/LibraryPage'

function AppRouter() {
  return (
    <Routes>
      <Route path="bookshelf/" element={<BooksListPage />} />
      <Route path="bookshelf/bookslist" element={<BooksListPage />} />
      <Route path="bookshelf/library" element={<LibraryPage />} />
      <Route path="bookshelf/works/:workId" element={<BookPage />} />
      <Route path="bookshelf/profile" element={<ProfilePage />} />
    </Routes>
  )
}

export default AppRouter
