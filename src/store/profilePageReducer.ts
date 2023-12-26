import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ProfilePageMainDataInterface {
  name: string
  email: string
  password: string
  age: number
}

interface ProfilePageInterface {
  mainData: ProfilePageMainDataInterface
  isLoading: boolean
  error: string
}

const initialState: ProfilePageInterface = {
  mainData: { name: '', email: '', password: '', age: 0 },
  isLoading: false,
  error: '',
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    dataFetching(state) {
      state.isLoading = true
    },

    dataFetchingSuccess(state, action: PayloadAction<ProfilePageMainDataInterface>) {
      //state.bookData.author = action.payload.author ? action.payload.author : initialState.bookData.author

      state.isLoading = false
      state.error = ''
    },

    dataFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },

    setInitialState(state) {
      state.mainData = initialState.mainData
    },
  },
})

export default profileSlice.reducer

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
