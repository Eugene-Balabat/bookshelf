import type { LibraryKeyData } from '../../pages/LibraryPage/interfaces/library-page.inreface'
import { librarySlice } from '../libraryReducer'
import { AppDispatchType } from '../store'

export const fetchExistingLibraryBooksAC = (dataList: Array<LibraryKeyData>) => async (dispatch: AppDispatchType) => {
  try {
    const libraryList = []
    dispatch(librarySlice.actions.booksFetching())

    for (const element of dataList) {
      const workUrl = `${process.env.REACT_APP_API_URL}${element.key}.json`
      const workData = await (await fetch(`${workUrl}`)).json()

      const authorData = await (await fetch(`${process.env.REACT_APP_API_URL}${workData.authors[0].author.key}.json`)).json()
      libraryList.push({ ...workData, authorName: authorData.name, rating: element.rating })
    }

    dispatch(librarySlice.actions.booksFetchingSuccess(libraryList))
  } catch (error) {
    if (error instanceof Error) {
      dispatch(librarySlice.actions.booksFetchingError(error.message))
    }
  }
}

export const setInitialStateAC = () => async (dispatch: AppDispatchType) => {
  dispatch(librarySlice.actions.clearBooksList())
}

export const searchInLibraryAC = (searchString: string, pageNumber: number) => async (dispatch: AppDispatchType) => {
  try {
    dispatch(librarySlice.actions.booksFetching())
    const response = await (await fetch(`https://openlibrary.org/search.json?title=${searchString}&page=${pageNumber}`)).json()
    dispatch(librarySlice.actions.booksFetchingSuccess(response.docs))
  } catch (error) {
    if (error instanceof Error) {
      dispatch(librarySlice.actions.booksFetchingError(error.message))
    }
  }
}

export const changeSearchLibraryInputAC = (searchString: string) => async (dispatch: AppDispatchType) => {
  dispatch(librarySlice.actions.changingSearchField(searchString))
}

export const changeCurrentLibraryPageAC = (newPageNumber: number) => async (dispatch: AppDispatchType) => {
  try {
    dispatch(librarySlice.actions.changingCurrentPage(newPageNumber))
  } catch (error) {
    if (error instanceof Error) {
      dispatch(librarySlice.actions.booksFetchingError(error.message))
    }
  }
}

export const updateLibraryListKeys = (keyList: Array<LibraryKeyData>) => {
  localStorage.setItem(process.env.REACT_APP_BOOKS_LIBRARYLIST_LS_KEY as string, JSON.stringify(keyList))
}
