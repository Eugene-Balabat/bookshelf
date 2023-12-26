import { bookSlice } from '../bookPageReducer'
import { AppDispatchType } from '../store'

export const fetchBookDataAC = (workId: string) => async (dispatch: AppDispatchType) => {
  try {
    dispatch(bookSlice.actions.booksFetching())
    dispatch(bookSlice.actions.setInitialState())

    // dispatch(bookSlice.actions.booksFetching())

    // https://openlibrary.org/works/${workId}.json

    // `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_WORKS_KEY}/${workId}.json`
    const bookData = await (await fetch(`https://openlibrary.org/works/${workId}.json`)).json()

    // const authorUrl = `${process.env.REACT_APP_API_URL}${bookData.authors[0].author.key}.json`
    // const authorData = await (await fetch(authorUrl)).json()

    const authorData = await (await fetch(`https://openlibrary.org${bookData.authors[0].author.key}.json`)).json()

    dispatch(
      bookSlice.actions.booksFetchingSuccess({
        workKey: bookData.key,
        author: authorData.personal_name ? authorData.personal_name : authorData.name ? authorData.name : undefined,
        title: bookData.full_title ? bookData.full_title : bookData.subtitle ? bookData.subtitle : bookData.title ? bookData.title : undefined,
        coverId: bookData.covers ? bookData.covers[0] : undefined,
        description: bookData.description ? (bookData.description.value ? bookData.description.value : bookData.description) : undefined,
      }),
    )
  } catch (error) {
    if (error instanceof Error) {
      dispatch(bookSlice.actions.booksFetchingError(error.message))
    }
  }
}
