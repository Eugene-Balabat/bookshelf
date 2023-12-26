import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface MainContentBooksStateInterface {
  bookList: Array<object>
  isLoading: boolean
  error: string
}

interface BooksState {
  content: MainContentBooksStateInterface
  searchInput: string
  currentPageNumber: number
  isSortBarDisabled: boolean
  limitWorksOnPage: number
  countOfWorks: number
  sortBar: Array<string>
  currentSortKey: string
}

const initialState: BooksState = {
  content: {
    bookList: [],
    isLoading: false,
    error: '',
  },
  searchInput: '',
  currentPageNumber: 1,
  limitWorksOnPage: 100,
  countOfWorks: 0,
  isSortBarDisabled: true,
  sortBar: ['standart', 'title', 'new', 'old'],
  currentSortKey: 'standart',
}

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    booksFetching(state) {
      state.content.isLoading = true
    },

    booksFetchingSuccess(state, action: PayloadAction<Array<object>>) {
      state.content.isLoading = false
      state.content.error = ''
      state.content.bookList = action.payload
    },

    booksFetchingError(state, action: PayloadAction<string>) {
      state.content.isLoading = false
      state.content.bookList = initialState.content.bookList
      state.content.error = action.payload
    },

    clearBooksList(state) {
      state.content.bookList = []
    },

    changingSearchField(state, action: PayloadAction<string>) {
      state.searchInput = action.payload
    },

    changingCurrentPage(state, action: PayloadAction<number>) {
      state.currentPageNumber = action.payload
    },

    setDefaultCurrentPage(state) {
      state.currentPageNumber = initialState.currentPageNumber
    },

    setDefaultSortKey(state) {
      state.currentSortKey = initialState.currentSortKey
    },

    changeDisableStateSortBar(state, action: PayloadAction<boolean>) {
      state.isSortBarDisabled = action.payload
    },

    changeSortKey(state, action: PayloadAction<string>) {
      state.currentSortKey = action.payload
    },

    changeCountOfWorks(state, action: PayloadAction<number>) {
      state.countOfWorks = action.payload
    },
  },
})

export default booksSlice.reducer

//export
// export function libraryReducer(state = initialState, action: LibraryAction): LibraryState {
//   switch (action.type) {
//     case LibraryActionType.SET_BOOKS_LIST:
//       return { ...state, bookList: [...action.payload] }
//     default:
//       return state
//   }
// }

// export function setBooksListAction(payload: Array<object>): LibraryAction {
//   return {
//     type: LibraryActionType.SET_BOOKS_LIST,
//     payload,
//   }
// }
