import { Link } from 'react-router-dom'
import './LibraryPage.css'
import Item from '../../components/Item/Item'
import PaginationNavBar from '../../components/PageNavBar/PaginationNavBar'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import booksListPageService from '../BooksPage/books-list-page.service'
import { changeSearchLibraryInputAC, fetchExistingLibraryBooksAC, changeCurrentLibraryPageAC, setInitialStateAC } from '../../store/ActionCreators/LibraryAC'
import { useEffect, useState } from 'react'

const LibraryPage = () => {
  const { currentPageNumber, limitWorksOnPage } = useAppSelector((state) => state.library)
  const { libraryList, isLoading } = useAppSelector((state) => state.library.content)

  const [pageList, setPageList] = useState<Array<object>>([])
  const [stateNavBackButton, setStateNavBackButton] = useState<boolean>(true)
  const [stateNavNextButton, setStateNavNextButton] = useState<boolean>(true)
  const [stateProcessBar, setStateProcessBar] = useState<Array<string>>([])

  const loadingSymbol = '●'

  const dispatch = useAppDispatch()

  const changeCurrentPageToBackOne = () => {
    if (libraryList.length) {
      currentPageNumber > 1 && dispatch(changeCurrentLibraryPageAC(currentPageNumber - 1))
    }
  }

  const changeCurrentPageToNextOne = () => {
    if (libraryList.length) {
      isPossiblyNextPage(currentPageNumber) && dispatch(changeCurrentLibraryPageAC(currentPageNumber + 1))
    }
  }

  const changeProcessBar = () => {
    let iterator = stateProcessBar.findIndex((element) => element === loadingSymbol)
    const newProcessBarState = [...stateProcessBar]

    window.setTimeout(() => {
      newProcessBarState[iterator] = ''
      iterator = iterator + 1 >= newProcessBarState.length ? 0 : iterator + 1
      newProcessBarState[iterator] = loadingSymbol
      setStateProcessBar([...newProcessBarState])
    }, 800)
  }

  const isPossiblyNextPage = (pageNumber: number) => {
    return Math.ceil(libraryList.length / limitWorksOnPage) >= pageNumber + 1
  }

  const changeBooksSearchInput = (value: string) => {
    dispatch(changeSearchLibraryInputAC(value))
  }

  const sendBooksSearchRequest = (preparedSearchString: string) => {
    // dispatch(sendSearchRequestWorksAC(preparedSearchString, 1))
  }

  const fetchExistingLibraryBooks = () => {
    const localStorageLibraryKeysString = localStorage.getItem(process.env.REACT_APP_BOOKS_LIBRARYLIST_LS_KEY as string)

    if (localStorageLibraryKeysString) {
      const localStorageLibraryKeysParsed = JSON.parse(localStorageLibraryKeysString)
      console.log(localStorageLibraryKeysParsed)

      localStorageLibraryKeysParsed.length ? dispatch(fetchExistingLibraryBooksAC(localStorageLibraryKeysParsed)) : dispatch(setInitialStateAC())
    }
  }

  const setPageListFC = () => {
    const localArray = []

    for (
      let workI = currentPageNumber * limitWorksOnPage - limitWorksOnPage, countWorks = 0;
      workI < libraryList.length && countWorks < limitWorksOnPage;
      workI += 1, countWorks += 1
    ) {
      localArray.push(libraryList[workI])
    }
    setPageList(localArray)
  }

  const setCalculatedNavButtonsState = () => {
    setStateNavBackButton(currentPageNumber === 1 ? false : true)
    setStateNavNextButton(isPossiblyNextPage(currentPageNumber) ? true : false)
  }

  useEffect(() => {
    libraryList.length ? setPageListFC() : setPageList([])

    if (currentPageNumber > Math.ceil(libraryList.length / limitWorksOnPage)) {
      changeCurrentPageToBackOne()
    }
  }, [libraryList])

  useEffect(() => {
    if (isLoading) {
      setStateProcessBar([loadingSymbol, '', ''])
      setStateNavBackButton(false)
      setStateNavNextButton(false)
    } else setCalculatedNavButtonsState()
  }, [isLoading])

  useEffect(() => {
    stateProcessBar.length && changeProcessBar()
  }, [stateProcessBar])

  useEffect(() => {
    setCalculatedNavButtonsState()
  }, [pageList])

  useEffect(() => {
    setPageListFC()
  }, [currentPageNumber])

  useEffect(() => {
    fetchExistingLibraryBooks()
  }, [])

  return (
    <>
      {/* <SearchBar
        changeSearchInput={changeBooksSearchInput}
        fetchDefaultWorks={fetchExistingLibraryBooks}
        sendSearchRequest={sendBooksSearchRequest}
        value={searchInput}
      /> */}
      <div className="content-items">
        <PaginationNavBar
          stateNavButtons={{ backButton: stateNavBackButton, nextButton: stateNavNextButton }}
          currentPageNumber={currentPageNumber}
          changeCurrentPageToBackOne={changeCurrentPageToBackOne}
          changeCurrentPageToNextOne={changeCurrentPageToNextOne}
        />

        {!isLoading ? (
          pageList.length ? (
            <div className="items-grid">
              {pageList.map((element: any) => {
                if (element.authors.length && element.title && element.key) {
                  return (
                    <Link key={element.key + 'link'} to={`/${process.env.REACT_APP_KEYWORD_APP as string}${element.key}`}>
                      {
                        <Item
                          key={element.key + 'item'}
                          imageUrl={element.covers ? booksListPageService.getUrlImageM(element.covers[0]) : undefined}
                          title={element.title || 'Title'}
                          author={element.authorName || 'Author'}
                          rating={element.rating || 0}
                        />
                      }
                    </Link>
                  )
                }
              })}
            </div>
          ) : (
            <div className="content-load-faild">
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

export default LibraryPage
