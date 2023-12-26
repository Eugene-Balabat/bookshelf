import { booksSlice } from '../booksReducer'
import { AppDispatchType } from '../store'
import BooksListPageService from '../../pages/BooksPage/books-list-page.service'

// export const fetchBooksListAC = (urlList: Array<{ url: string }>) => async (dispatch: AppDispatchType) => {
//   try {
//     dispatch(librarySlice.actions.booksFetching())

//     const localArr: Array<object> = []
//     for (const element of urlList) {
//       const response = await (await fetch(element.url)).json()
//       localArr.push(response)
//     }

//     console.log(localArr)
//     dispatch(librarySlice.actions.booksFetchingSuccess(localArr))
//   } catch (error) {
//     if (error instanceof Error) {
//       dispatch(librarySlice.actions.booksFetchingError(error.message))
//     }
//   }
// }

export const fetchTrendingWeeklyBooksAC = () => async (dispatch: AppDispatchType) => {
  try {
    dispatch(booksSlice.actions.booksFetching())
    dispatch(booksSlice.actions.changeDisableStateSortBar(true))

    const response = await (await fetch(`https://openlibrary.org/trending/weekly.json?mode=everything`)).json()
    const localStorageLibraryKeysString = localStorage.getItem(process.env.REACT_APP_BOOKS_LIBRARYLIST_LS_KEY as string)

    dispatch(booksSlice.actions.setDefaultCurrentPage())
    dispatch(booksSlice.actions.setDefaultSortKey())
    dispatch(
      booksSlice.actions.booksFetchingSuccess(
        localStorageLibraryKeysString
          ? BooksListPageService.addRatingToExistingBooks([...JSON.parse(localStorageLibraryKeysString)], [...response.works])
          : response.works,
      ),
    )

    localStorage.removeItem(process.env.REACT_APP_BOOKS_BOOKSLIST_LS_KEY as string)
  } catch (error) {
    if (error instanceof Error) {
      dispatch(booksSlice.actions.booksFetchingError(error.message))
    }
  }
}

export const fetchWorksFromLocalStorageAC = (works: Array<object>) => async (dispatch: AppDispatchType) => {
  try {
    dispatch(booksSlice.actions.booksFetching())
    dispatch(booksSlice.actions.booksFetchingSuccess(works))
  } catch (error) {
    if (error instanceof Error) {
      dispatch(booksSlice.actions.booksFetchingError(error.message))
    }
  }
}

export const sendSearchRequestWorksAC = (searchString: string, pageNumber: number, sortKeyWord: string) => async (dispatch: AppDispatchType) => {
  try {
    dispatch(booksSlice.actions.booksFetching())
    dispatch(booksSlice.actions.changeDisableStateSortBar(true))

    const response =
      sortKeyWord === (process.env.REACT_APP_STANDART_SORT_KEY as string)
        ? await (await fetch(`https://openlibrary.org/search.json?mode=everything&q=${searchString}&page=${pageNumber}`)).json()
        : await (await fetch(`https://openlibrary.org/search.json?mode=everything&q=${searchString}&page=${pageNumber}&sort=${sortKeyWord}`)).json()
    // : await (await fetch(`https://openlibrary.org/trending/weekly.json?page=${pageNumber}`)).json()
    const localStorageLibraryKeysString = localStorage.getItem(process.env.REACT_APP_BOOKS_LIBRARYLIST_LS_KEY as string)

    dispatch(booksSlice.actions.setDefaultCurrentPage())
    dispatch(booksSlice.actions.changeCountOfWorks(response.numFound || response.num_found))
    dispatch(
      booksSlice.actions.booksFetchingSuccess(
        localStorageLibraryKeysString
          ? BooksListPageService.addRatingToExistingBooks([...JSON.parse(localStorageLibraryKeysString)], [...response.docs])
          : response.docs,
      ),
    )
    dispatch(booksSlice.actions.changeDisableStateSortBar(false))

    localStorage.setItem(
      process.env.REACT_APP_BOOKS_BOOKSLIST_LS_KEY as string,
      JSON.stringify({
        works: response.docs.map((element: any) => {
          return {
            key: element.key,
            cover_i: element.cover_i || undefined,
            title: element.title || 'Title',
            author: element.author_name ? element.author_name[0] : 'Author',
          }
        }),
        searchString,
        pageNumber,
      }),
    )
  } catch (error) {
    if (error instanceof Error) {
      dispatch(booksSlice.actions.booksFetchingError(error.message))
    }
  }
}

export const changeSearchBooksInputAC = (searchString: string) => async (dispatch: AppDispatchType) => {
  dispatch(booksSlice.actions.changingSearchField(searchString))
}

export const changeCurrentBooksPageAC = (searchString: string, newPageNumber: number, sortKeyWord: string) => async (dispatch: AppDispatchType) => {
  try {
    dispatch(booksSlice.actions.booksFetching())
    dispatch(booksSlice.actions.changingCurrentPage(newPageNumber))
    dispatch(booksSlice.actions.changeDisableStateSortBar(true))

    const response = searchString
      ? sortKeyWord === (process.env.REACT_APP_STANDART_SORT_KEY as string)
        ? await (await fetch(`https://openlibrary.org/search.json?mode=everything&q=${searchString}&page=${newPageNumber}`)).json()
        : await (await fetch(`https://openlibrary.org/search.json?mode=everything&q=${searchString}&page=${newPageNumber}&sort=${sortKeyWord}`)).json()
      : await (await fetch(`https://openlibrary.org/trending/weekly.json?page=${newPageNumber}`)).json()

    const localStorageLibraryKeysString = localStorage.getItem(process.env.REACT_APP_BOOKS_LIBRARYLIST_LS_KEY as string)
    const booksList = response.docs || response.works || []

    dispatch(
      booksSlice.actions.booksFetchingSuccess(
        localStorageLibraryKeysString
          ? BooksListPageService.addRatingToExistingBooks([...JSON.parse(localStorageLibraryKeysString)], [...booksList])
          : booksList,
      ),
    )
    searchString && dispatch(booksSlice.actions.changeDisableStateSortBar(false))

    localStorage.setItem(
      process.env.REACT_APP_BOOKS_BOOKSLIST_LS_KEY as string,
      JSON.stringify({
        works: booksList.map((element: any) => {
          return {
            key: element.key,
            cover_i: element.cover_i || undefined,
            title: element.title || 'Title',
            author: element.author_name ? element.author_name[0] : 'Author',
          }
        }),
        searchString,
        pageNumber: newPageNumber,
      }),
    )
  } catch (error) {
    if (error instanceof Error) {
      dispatch(booksSlice.actions.booksFetchingError(error.message))
    }
  }
}

export const changeSortOptionAC = (searchString: string, pageNumber: number, keyWord: string) => async (dispatch: AppDispatchType) => {
  try {
    dispatch(booksSlice.actions.booksFetching())
    dispatch(booksSlice.actions.changeDisableStateSortBar(true))
    dispatch(booksSlice.actions.changeSortKey(keyWord))

    const response =
      keyWord === (process.env.REACT_APP_STANDART_SORT_KEY as string)
        ? await (await fetch(`https://openlibrary.org/search.json?mode=everything&q=${searchString}&page=${pageNumber}`)).json()
        : await (await fetch(`https://openlibrary.org/search.json?mode=everything&q=${searchString}&page=${pageNumber}&sort=${keyWord}`)).json()
    const localStorageLibraryKeysString = localStorage.getItem(process.env.REACT_APP_BOOKS_LIBRARYLIST_LS_KEY as string)

    dispatch(
      booksSlice.actions.booksFetchingSuccess(
        localStorageLibraryKeysString
          ? BooksListPageService.addRatingToExistingBooks([...JSON.parse(localStorageLibraryKeysString)], [...response.docs])
          : response.docs,
      ),
    )
    dispatch(booksSlice.actions.changeDisableStateSortBar(false))

    localStorage.setItem(
      process.env.REACT_APP_BOOKS_BOOKSLIST_LS_KEY as string,
      JSON.stringify({
        works: response.docs.map((element: any) => {
          return {
            key: element.key,
            cover_i: element.cover_i || undefined,
            title: element.title || 'Title',
            author: element.author_name ? element.author_name[0] : 'Author',
          }
        }),
        searchString,
        pageNumber,
      }),
    )
  } catch (error) {
    if (error instanceof Error) {
      dispatch(booksSlice.actions.booksFetchingError(error.message))
    }
  }
}

export const addRatingToBookListLS = (ratingData: { key: string; rating: number }) => {
  const localStorageBooksListKeysString = localStorage.getItem(process.env.REACT_APP_BOOKS_BOOKSLIST_LS_KEY as string)
  const parsedData = localStorageBooksListKeysString ? JSON.parse(localStorageBooksListKeysString) : {}

  localStorage.setItem(
    process.env.REACT_APP_BOOKS_BOOKSLIST_LS_KEY as string,
    JSON.stringify({
      ...parsedData,
      works: parsedData.works.length
        ? parsedData.works.map((parsedElement: any) =>
            parsedElement.key === ratingData.key ? { ...parsedElement, userRating: ratingData.rating } : { ...parsedElement },
          )
        : [],
    }),
  )
}
