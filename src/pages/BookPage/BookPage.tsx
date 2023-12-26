import React, { useState } from 'react'
import NavButton from '../../components/PageNavBar/NavButton/NavButton'
import './BookPage.css'
import image from '../../assets/no_data.jpg'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import libraryPageService from '../BooksPage/books-list-page.service'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { updateLibraryListKeys } from '../../store/ActionCreators/LibraryAC'
import { fetchBookDataAC, changeRatingOfBookAC } from '../../store/ActionCreators/BookPageAC'
import type { LibraryKeyData } from '../LibraryPage/interfaces/library-page.inreface'
import { addRatingToBookListLS } from '../../store/ActionCreators/BooksListAC'

const BookPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { workId } = useParams<string>()

  const { author, coverId, title, description, workKey, rating } = useAppSelector((state) => state.book.bookData)
  const [libraryListKeys, setLibraryListKeys] = useState<Array<LibraryKeyData>>(() => {
    const localStorageLibraryKeysString = localStorage.getItem(process.env.REACT_APP_BOOKS_LIBRARYLIST_LS_KEY as string)
    return localStorageLibraryKeysString ? JSON.parse(localStorageLibraryKeysString) : []
  })

  const [addedStateBtn, setAddedStateBtn] = useState<boolean>(true)

  useEffect(() => {
    initialRequest()
  }, [])

  useEffect(() => {
    updateLibraryListKeys([...libraryListKeys])
  }, [libraryListKeys])

  const changeCurrentPageToBackOne = () => {
    navigate(-1)
  }

  function initialRequest() {
    workId && dispatch(fetchBookDataAC(workId))
  }

  useEffect(() => {
    const bookData = libraryListKeys.find((element) => element.key === workKey)

    if (bookData) {
      setAddedStateBtn(true)
      dispatch(changeRatingOfBookAC(bookData.rating))
    } else {
      setAddedStateBtn(false)
      dispatch(changeRatingOfBookAC(0))
    }
  }, [workKey])

  function addBookToLibrary() {
    addRatingToBookListLS({ key: workKey, rating: rating })
    setLibraryListKeys([...libraryListKeys, { key: workKey, rating: rating }])
    setAddedStateBtn(!addedStateBtn)
  }

  function removeBookFromLibrary() {
    setLibraryListKeys(libraryListKeys.filter((element) => element.key !== workKey))
    setAddedStateBtn(!addedStateBtn)
  }

  return (
    <div className="item-page">
      <div className="header-item-bar">
        <NavButton disabled={false} className="back-button" symbol="<" changeCurrentPage={changeCurrentPageToBackOne} />
        <button
          disabled={
            rating < parseFloat(process.env.REACT_APP_MIN_BOOK_RATING as string) || rating > parseFloat(process.env.REACT_APP_MAX_BOOK_RATING as string)
              ? true
              : false
          }
          className={`page-button ${
            rating >= parseFloat(process.env.REACT_APP_MIN_BOOK_RATING as string) &&
            rating <= parseFloat(process.env.REACT_APP_MAX_BOOK_RATING as string) &&
            `page-activ-button`
          } ${addedStateBtn ? `remove-button` : `add-button`}`}
          onClick={addedStateBtn ? removeBookFromLibrary : addBookToLibrary}
        >
          {addedStateBtn ? 'Remove' : 'Add'}
        </button>
      </div>

      <div className="item-content">
        <img src={libraryPageService.getUrlImageL(coverId || '')} alt="Book image" />
        <h1 className="item-title">{title}</h1>
        <h3 className="item-author">{author}</h3>
        <div className={`item-rating-value  ${addedStateBtn && 'item-rating-value-disabled'}`}>
          <label htmlFor="rating-value"> Rating:</label>
          <input
            type="number"
            id="rating-value"
            name="quantity"
            disabled={addedStateBtn ? true : false}
            className={`item-rating-number-value`}
            min={process.env.REACT_APP_MIN_BOOK_RATING}
            max={process.env.REACT_APP_MAX_BOOK_RATING}
            value={rating || 0}
            step={'0.5'}
            onChange={(event) => {
              dispatch(changeRatingOfBookAC(parseFloat(event.target.value)))
            }}
          />
        </div>
        <p className="item-description book-description">{description}</p>
      </div>
    </div>
  )
}

export default BookPage
