import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface BookDataInterface {
  bookKey: string
  description: string
  coverId: string
  title: string
  author: string
  rating: string
}

interface MainContentLibraryState {
  libraryList: Array<BookDataInterface>
  isLoading: boolean
  error: string
}

interface LibraryState {
  content: MainContentLibraryState
  limitWorksOnPage: number
  searchInput: string
  currentPageNumber: number
}

const initialState: LibraryState = {
  content: {
    libraryList: [],
    isLoading: false,
    error: '',
  },
  searchInput: '',
  limitWorksOnPage: 10,
  currentPageNumber: 1,
}

export const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    booksFetching(state) {
      state.content.isLoading = true
    },
    booksFetchingSuccess(state, action: PayloadAction<Array<BookDataInterface>>) {
      state.content.isLoading = false
      state.content.error = ''
      state.content.libraryList = action.payload
    },
    booksFetchingError(state, action: PayloadAction<string>) {
      state.content.isLoading = false
      state.content.error = action.payload
    },

    clearBooksList(state) {
      state.content.libraryList = []
    },

    changingSearchField(state, action: PayloadAction<string>) {
      state.searchInput = action.payload
    },

    changingCurrentPage(state, action: PayloadAction<number>) {
      state.currentPageNumber = action.payload
    },
  },
})

export default librarySlice.reducer

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
