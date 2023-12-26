import './NavButton.css'

interface PropsNavButton {
  symbol: string
  disabled: boolean
  className?: string

  changeCurrentPage: () => void
}

const NavButton = ({ disabled, symbol, changeCurrentPage }: PropsNavButton) => {
  return (
    <button disabled={disabled} className={`page-button ${disabled ? 'page-disabled-button' : 'page-activ-button'} `} onClick={changeCurrentPage}>
      {symbol}
    </button>
  )
}

export default NavButton
