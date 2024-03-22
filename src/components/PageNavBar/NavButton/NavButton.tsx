import './NavButton.scss'

interface PropsNavButton {
  symbol: string
  disabled: boolean

  changeCurrentPage: () => void
}

const NavButton = ({ disabled, symbol, changeCurrentPage }: PropsNavButton) => {
  return (
    <button disabled={disabled} className={`page-button ${disabled ? 'page-button--disabled' : 'page-button--activ'} `} onClick={changeCurrentPage}>
      {symbol}
    </button>
  )
}

export default NavButton
