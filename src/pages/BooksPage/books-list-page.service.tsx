import { LibraryKeyData } from '../LibraryPage/interfaces/library-page.inreface'

class BooksListPageService {
  getUrlImageS(imageId: string) {
    return `https://covers.openlibrary.org/b/id/${imageId}-S.jpg`
  }

  getUrlImageM(imageId: string) {
    return `https://covers.openlibrary.org/b/id/${imageId}-M.jpg`
  }

  getUrlImageL(imageId: string) {
    return `https://covers.openlibrary.org/b/id/${imageId}-L.jpg`
  }

  addRatingToExistingBooks(libraryList: Array<any>, booksList: Array<any>) {
    return libraryList.length
      ? booksList.map((responsedElement: any) => {
          const foundedKey = libraryList.find((parsedElement: LibraryKeyData) => parsedElement.key === responsedElement.key)
          return foundedKey ? { ...responsedElement, userRating: foundedKey.rating } : responsedElement
        })
      : [...booksList]
  }

  isLengthStringNotAllowed(str: string): boolean {
    for (let charackterI = 0, characterCounter = 0; charackterI < str.length; charackterI += 1, characterCounter += 1) {
      if (characterCounter === Number(process.env.REACT_APP_NUM_OF_CHARACKTER_ALLOWD as string)) {
        return true
      }

      if (str[charackterI] === ' ') {
        characterCounter = 0
      }
    }

    return false
  }

  isPossiblyNextPage(pageNumber: number, limitWorksOnPage: number, countOfWorks: number) {
    return Math.ceil(countOfWorks / limitWorksOnPage) >= pageNumber + 1
  }

  changeProcessBar(stateProcessBar: Array<string>, setStateProcessBar: (value: string[]) => void) {
    let iterator = stateProcessBar.findIndex((element) => element === (process.env.REACT_APP_LOADING_SYMBOL as string))
    const newProcessBarState = [...stateProcessBar]

    window.setTimeout(() => {
      newProcessBarState[iterator] = ''
      iterator = iterator + 1 >= newProcessBarState.length ? 0 : iterator + 1
      newProcessBarState[iterator] = process.env.REACT_APP_LOADING_SYMBOL as string
      setStateProcessBar([...newProcessBarState])
    }, 800)
  }
}

export default new BooksListPageService()
