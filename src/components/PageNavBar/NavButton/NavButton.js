import './NavButton.css'

const NavButton = (props) => {
  const { symbol, backCallback } = props

  return (
    <button className="page-button" onClick={backCallback}>
      {symbol}
    </button>
  )
}

export default NavButton
