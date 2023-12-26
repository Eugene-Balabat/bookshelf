import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface BookDataInterface {
  author: string
  title: string
  coverId: string
  description: string
  workKey: string
  rating: number
}

interface BookPageStateInterface {
  bookData: BookDataInterface
  isLoading: boolean
  error: string
}

const initialState: BookPageStateInterface = {
  bookData: {
    author: 'Author',
    title: 'Title',
    coverId: '',
    description: 'Unfortanly description for this book does not exist.',
    workKey: '',
    rating: 0,
  },
  isLoading: false,
  error: '',
}

interface BooksFetchingSuccessPayloadInterface {
  author: string | undefined
  title: string | undefined
  coverId: string | undefined
  description: string | undefined
  workKey: string
}

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    booksFetching(state) {
      state.isLoading = true
    },

    booksFetchingSuccess(state, action: PayloadAction<BooksFetchingSuccessPayloadInterface>) {
      state.bookData.workKey = action.payload.workKey

      state.bookData.author = action.payload.author ? action.payload.author : initialState.bookData.author
      state.bookData.title = action.payload.title ? action.payload.title : initialState.bookData.title
      state.bookData.coverId = action.payload.coverId ? action.payload.coverId : initialState.bookData.coverId
      state.bookData.description = action.payload.description ? action.payload.description : initialState.bookData.description

      state.isLoading = false
      state.error = ''
    },

    booksFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },

    setBookRating(state, action: PayloadAction<number>) {
      state.bookData.rating = action.payload
    },

    setInitialState(state) {
      state.bookData = initialState.bookData
    },
  },
})

export default bookSlice.reducer

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
