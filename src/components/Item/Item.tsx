import './Item.scss'
import image_not_found from '../../assets/no_data.jpg'

interface ItemProps {
  imageUrl: string | undefined
  title: string
  author: string
  rating: number
}

const Item = ({ imageUrl, title, author, rating }: ItemProps) => {
  return (
    <div className="content-item item">
      <img src={imageUrl || image_not_found} alt="Book cover" />
      <h3 className="item__raiting">{rating}</h3>
      <h4 className="item__title">{title}</h4>
      <h3 className="item__author">{author}</h3>
    </div>
  )
}

export default Item
