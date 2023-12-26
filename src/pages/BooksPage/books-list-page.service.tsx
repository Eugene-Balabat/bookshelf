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
}

export default new BooksListPageService()
