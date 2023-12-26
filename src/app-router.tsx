import { Route, Routes } from 'react-router-dom'
import BooksListPage from './pages/BooksPage/BooksListPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import BookPage from './pages/BookPage/BookPage'
import LibraryPage from './pages/LibraryPage/LibraryPage'

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<BooksListPage />} />
      <Route path="/bookslist" element={<BooksListPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/works/:workId" element={<BookPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  )
}

export default AppRouter
