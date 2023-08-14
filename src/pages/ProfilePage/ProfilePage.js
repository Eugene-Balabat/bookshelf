import NavButton from '../../components/PageNavBar/NavButton/NavButton'
import './ProfilePage.css'
import image from '../../assets/no_data.jpg'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
  const navigate = useNavigate()

  return (
    <div className="profile-page">
      <div className="header-profile-bar">
        <NavButton className="back-button" symbol="<" backCallback={() => navigate(-1)} />
      </div>

      <form action="#" className="profile-content">
        <label htmlFor="profile-input-file" className="profile-lable-file">
          <input type="file" name="profile-input-file" id="profile-input-file" className="profile-input-file" accept=".jpg, .jpeg, .png" />
          <img src={image} alt="User image" />
        </label>

        <div className="profile-block">
          <label htmlFor="profile-name" className="profile-lable">
            Your name
          </label>
          <input type="text" id="profile-name" className="profile-input" value="User name" />
        </div>
        <div className="profile-block">
          <label htmlFor="profile-email" className="profile-lable">
            Your email
          </label>
          <input type="email" id="profile-email" className="profile-input" value="User email" />
        </div>
        <div className="profile-block block-age">
          <label htmlFor="profile-age" className="profile-lable">
            Your age
          </label>
          <input type="number" id="profile-age" className="profile-input" defaultValue="25" min="1" max="120" />
        </div>
        <button className="page-button save-profile-button">Save</button>
      </form>
    </div>
  )
}

export default ProfilePage
