import './Item.css'
import image_not_found from '../../assets/no_data.jpg'

interface ItemProps {
  imageUrl: string | undefined
  title: string
  author: string
  rating: number
}

const Item = ({ imageUrl, title, author, rating }: ItemProps) => {
  return (
    <div className="item">
      <img src={imageUrl || image_not_found} alt="Book cover" />
      <h3 className="item-raiting">{rating}</h3>
      <h4 className="item-title">{title}</h4>
      <h3 className="item-author">{author}</h3>
    </div>
  )
}

export default Item
