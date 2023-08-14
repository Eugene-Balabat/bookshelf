import NavButton from '../../components/PageNavBar/NavButton/NavButton'
import './BookPage.css'
import image from '../../assets/no_data.jpg'
import { useNavigate } from 'react-router-dom'

const BookPage = () => {
  const navigate = useNavigate()

  return (
    <div className="item-page">
      <div className="header-item-bar">
        <NavButton className="back-button" symbol="<" backCallback={() => navigate(-1)} />
        <button className="page-button like-button">Like</button>
      </div>

      <div className="item-content">
        <img src={image} alt="Book image" />
        <h1 className="item-title">Title of book</h1>
        <h3 className="item-author">Author of book</h3>
        <h3 className="item-raiting">5.0 of 5.0</h3>
        <p className="item-description book-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi sunt a neque, reprehenderit perspiciatis hic velit minus ipsum dolores. Nostrum Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Commodi sunt a neque, reprehenderit perspiciatis hic velit minus ipsum dolores. Nostrum repellendus
          deserunt eius voluptate est quam velit debLorem ipsum dolor sit amet consectetur adipisicing elit. Commodi sunt a neque, reprehenderit perspiciatis
          hic velit minus ipsum dolores. Nostrum repellendus deserunt eius voluptate est quam velit debLorem ipsum dolor sit amet consectetur adipisicing elit.
          Commodi sunt a neque, reprehenderit perspiciatis hic velit minus ipsum dolores. Nostrum repellendus deserunt eius voluptate est quam velit debLorem
          ipsum dolor sit amet consectetur adipisicing elit. Commodi sunt a neque, reprehenderit perspiciatis hic velit minus ipsum dolores. Nostrum repellendus
          deserunt eius voluptate est quam velit debrepellendus deserunt eius voluptate est quam velit debitis reprehenderit
        </p>
      </div>
    </div>
  )
}

export default BookPage
