import { Link } from 'react-router-dom'
import './BooksListPage.scss'
import Item from '../../components/Item/Item'
import SearchBar from '../../components/SearchBar/SearchBar'
import PaginationNavBar from '../../components/PageNavBar/PaginationNavBar'
import React, { useEffect, useRef, useState } from 'react'
import BooksListPageService from './books-list-page.service'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
  changeCurrentBooksPageAC,
  changeSearchBooksInputAC,
  changeSortOptionAC,
  fetchTrendingWeeklyBooksAC,
  fetchWorksFromLocalStorageAC,
  sendSearchRequestWorksAC,
} from '../../store/ActionCreators/BooksListAC'

const BooksListPage = () => {
  const { currentPageNumber, searchInput, sortBar, currentSortKey, limitWorksOnPage, countOfWorks } = useAppSelector((state) => state.books)
  const { bookList, isLoading } = useAppSelector((state) => state.books.content)

  const [stateNavBackButton, setStateNavBackButton] = useState<boolean>(true)
  const [stateNavNextButton, setStateNavNextButton] = useState<boolean>(true)
  const [stateProcessBar, setStateProcessBar] = useState<Array<string>>([])

  const dispatch = useAppDispatch()

  const changeCurrentPageToBackOne = () => {
    if (bookList.length) {
      const newPageNumber = currentPageNumber > 1 ? currentPageNumber - 1 : currentPageNumber
      dispatch(changeCurrentBooksPageAC(searchInput, newPageNumber, currentSortKey))
    }
  }

  const changeCurrentPageToNextOne = () => {
    if (bookList.length) {
      searchInput
        ? BooksListPageService.isPossiblyNextPage(currentPageNumber, limitWorksOnPage, countOfWorks) &&
          dispatch(changeCurrentBooksPageAC(searchInput, currentPageNumber + 1, currentSortKey))
        : dispatch(changeCurrentBooksPageAC(searchInput, currentPageNumber + 1, currentSortKey))
    }
  }

  const changeBooksSearchInput = (value: string) => {
    dispatch(changeSearchBooksInputAC(value))
  }

  const fetchTrendingWeeklyBooks = (pageNumber: number) => {
    dispatch(fetchTrendingWeeklyBooksAC())
  }

  const sendBooksSearchRequest = () => {
    //   const preparedSearchString = searchInput?.trim().replace(/ /g, '+')
    dispatch(searchInput ? sendSearchRequestWorksAC(searchInput, 1, currentSortKey) : fetchTrendingWeeklyBooksAC())
  }

  const changeSortOption = (keyWord: string) => {
    dispatch(changeSortOptionAC(searchInput, currentPageNumber, keyWord))
  }

  const setCalculatedNavButtonsState = () => {
    setStateNavBackButton(currentPageNumber === 1 ? false : true)
    searchInput
      ? setStateNavNextButton(BooksListPageService.isPossiblyNextPage(currentPageNumber, limitWorksOnPage, countOfWorks) ? true : false)
      : setStateNavNextButton(true)
  }

  useEffect(() => {
    if (!isLoading) {
      const wokrsItem = localStorage.getItem(process.env.REACT_APP_BOOKS_BOOKSLIST_LS_KEY as string)
      const parsedItems = wokrsItem ? JSON.parse(wokrsItem) : {}

      parsedItems.works && parsedItems.searchString === searchInput && parsedItems.pageNumber === currentPageNumber
        ? dispatch(fetchWorksFromLocalStorageAC([...parsedItems.works]))
        : sendBooksSearchRequest()
    }
  }, [])

  useEffect(() => {
    if (isLoading) {
      setStateProcessBar([process.env.REACT_APP_LOADING_SYMBOL as string, '', ''])
      setStateNavBackButton(false)
      setStateNavNextButton(false)
    } else {
      setCalculatedNavButtonsState()
    }
  }, [isLoading])

  useEffect(() => {
    isLoading && BooksListPageService.changeProcessBar(stateProcessBar, setStateProcessBar)
  }, [stateProcessBar])

  useEffect(() => {
    if (!bookList.length && currentPageNumber !== 1) {
      dispatch(changeCurrentBooksPageAC(searchInput, currentPageNumber - 1, currentSortKey))
    }
  }, [bookList])

  return (
    <>
      <SearchBar
        changeSearchInput={changeBooksSearchInput}
        changeSortOption={changeSortOption}
        sendSearchRequest={sendBooksSearchRequest}
        currentSortValue={currentSortKey}
        value={searchInput}
        sortBarData={sortBar}
        disabled={isLoading ? true : false}
      />
      <div className="content-items">
        <PaginationNavBar
          stateNavButtons={{ backButton: stateNavBackButton, nextButton: stateNavNextButton }}
          currentPageNumber={currentPageNumber}
          changeCurrentPageToBackOne={changeCurrentPageToBackOne}
          changeCurrentPageToNextOne={changeCurrentPageToNextOne}
        />

        {!isLoading ? (
          bookList.length ? (
            <div className="items-grid">
              {bookList.map((element: any) => {
                if (element.key) {
                  if (!BooksListPageService.isLengthStringNotAllowed(element.title)) {
                    return (
                      <Link key={element.key + 'link'} to={`/${process.env.REACT_APP_KEYWORD_APP as string}${element.key}`}>
                        {
                          <Item
                            key={element.key + 'item'}
                            imageUrl={element.cover_i ? BooksListPageService.getUrlImageM(element.cover_i) : undefined}
                            title={element.title || 'Title'}
                            author={element.author ? element.author : element.author_name ? element.author_name[0] : 'Author'}
                            rating={element.userRating || 0}
                          />
                        }
                      </Link>
                    )
                  }
                }
              })}
            </div>
          ) : (
            <div className="content-load--faild">
              <p>Data does not exist.</p>
            </div>
          )
        ) : (
          <div className="content-load">
            {stateProcessBar.map((element) => {
              return <span>{element}</span>
            })}
          </div>
        )}

        <PaginationNavBar
          stateNavButtons={{ backButton: stateNavBackButton, nextButton: stateNavNextButton }}
          currentPageNumber={currentPageNumber}
          changeCurrentPageToBackOne={changeCurrentPageToBackOne}
          changeCurrentPageToNextOne={changeCurrentPageToNextOne}
        />
      </div>
    </>
  )
}

export default BooksListPage
