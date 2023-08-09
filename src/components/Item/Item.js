import { Link } from 'react-router-dom'
import './Item.css'
import image from '../../assets/no_data.jpg'

const Item = () => {
  return (
    <div className="item">
      <img src={image} alt="No data" />
      <h3 className="item-raiting">5.0</h3>
      <p className="item-genre">You can now</p>
      <h4 className="item-title">You can now view bookshelf in the browser.</h4>
      <b className="item-author">Bookshelf in the browser.</b>
    </div>
  )
}

export default Item
