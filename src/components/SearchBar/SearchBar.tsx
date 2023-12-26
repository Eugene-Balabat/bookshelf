import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import './SearchBar.css'
import logo from '../../assets/logo.png'
import { useAppSelector } from '../../hooks/redux'
import _ from 'lodash'

interface SearchBarProps {
  value: string
  sortBarData: Array<string>
  currentSortValue: string
  disabled: boolean
  sendSearchRequest: () => void
  changeSortOption: (keyWord: string) => void
  changeSearchInput: (value: string) => void
}

const SearchBar = ({ value, sortBarData, currentSortValue, disabled, sendSearchRequest, changeSortOption, changeSearchInput }: SearchBarProps) => {
  const { isSortBarDisabled } = useAppSelector((state) => state.books)
  // const searchString = value?.trim().replace(/ /g, '+')

  const sendRequest = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendSearchRequest()
    }
  }

  const changeInput = (event: ChangeEvent<HTMLInputElement>) => {
    changeSearchInput(event.target.value.trim().replace(/ /g, '+'))
  }

  return (
    <div className="serach-bar">
      <input
        type="serach"
        id="search-input"
        value={value}
        disabled={disabled}
        onKeyUp={sendRequest}
        onChange={changeInput}
        placeholder="Search for books, journal articles and more"
      />
      <select name="sort" id="sort-list" disabled={isSortBarDisabled} onChange={(event) => changeSortOption(event.target.value)}>
        {sortBarData.map((element: string) =>
          element === currentSortValue ? (
            <option value={element} selected>
              {_.capitalize(element)}
            </option>
          ) : (
            <option value={element}>{_.capitalize(element)}</option>
          ),
        )}
      </select>
    </div>
  )
}

export default SearchBar
