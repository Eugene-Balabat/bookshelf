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

        <div className="profile-inputs">
          <div className="profile-block">
            <label htmlFor="profile-name" className="profile-lable">
              Name
            </label>
            <input type="text" id="profile-name" className="profile-input" placeholder="Type user name" />
          </div>
          <div className="profile-block">
            <label htmlFor="profile-email" className="profile-lable">
              Email
            </label>
            <input type="email" id="profile-email" className="profile-input" placeholder="Type user email" />
          </div>
          <div className="profile-block">
            <label htmlFor="profile-password" className="profile-lable">
              Password
            </label>
            <input type="password" id="profile-password" className="profile-input" placeholder="Type user password" />
          </div>
          <div className="profile-block block-age">
            <label htmlFor="profile-age" className="profile-lable">
              Age
            </label>
            <input type="number" id="profile-age" className="profile-input" defaultValue="25" min="1" max="120" />
          </div>
        </div>
        <button className="page-button save-profile-button">Save</button>
      </form>
    </div>
  )
}

export default ProfilePage
