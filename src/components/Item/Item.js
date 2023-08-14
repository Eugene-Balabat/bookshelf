import { Link } from 'react-router-dom'
import './Item.css'
import image from '../../assets/no_data.jpg'

const Item = () => {
  return (
    <div className="item">
      <img src={image} alt="No data" />
      <h3 className="item-raiting">5.0</h3>

      <h4 className="item-title">Title of book</h4>
      <h3 className="item-author">Author of book</h3>
      <p className="item-description">Lorem ipsum dolor sit amet consectetur adipisicing ederit perspicistrum Lorem..</p>
    </div>
  )
}

export default Item
