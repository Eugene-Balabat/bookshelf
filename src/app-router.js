import { Route, Routes } from 'react-router-dom'
import LibraryPage from './pages/LibraryPage/LibraryPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import BooksPage from './pages/BooksPage'
import BookPage from './pages/BookPage/BookPage'

function AppRouter() {
  return (
    <Routes>
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/book" element={<BookPage />} />
      <Route path="/books" element={<LibraryPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  )
}

export default AppRouter
