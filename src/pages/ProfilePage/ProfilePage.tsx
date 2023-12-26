import NavButton from '../../components/PageNavBar/NavButton/NavButton'
import './ProfilePage.css'
import image from '../../assets/no_data.jpg'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const ProfilePage = () => {
  const navigate = useNavigate()

  const changeCurrentPageToBackOne = () => {
    navigate(-1)
  }

  interface ProfilePageMainDataInterface {
    file: object
    name: string
    email: string
    password: string
    age: string
  }

  const [profileContent, setProfileContent] = useState<ProfilePageMainDataInterface>({ file: {}, name: '', email: '', password: '', age: '0' })

  const saveProfileData = () => {
    localStorage.setItem(process.env.REACT_APP_PROFILE_DATA_KEY as string, JSON.stringify(profileContent))
  }

  useEffect(() => {
    const profileDataLS = localStorage.getItem(process.env.REACT_APP_PROFILE_DATA_KEY as string)

    if (profileDataLS) {
      setProfileContent({ ...profileContent, ...JSON.parse(profileDataLS) })
    }
  }, [])

  return (
    <div className="profile-page">
      <div className="header-profile-bar">
        <NavButton disabled={false} className="back-button" symbol="<" changeCurrentPage={changeCurrentPageToBackOne} />
      </div>

      <form
        action="#"
        onSubmit={(event) => {
          event.preventDefault()
          saveProfileData()
        }}
        className="profile-content"
      >
        <label htmlFor="profile-input-file" className="profile-lable-file">
          {/* <input
            type="file"
            name="profile-input-file"
            onChange={(event) => {
              event.target.files && console.log(event.target.files[0])
              // event.target.files?.length && setProfileContent({ ...profileContent, file: { ...event.target.files[0] } })
              //event.target.files?.length && console.log(typeof event.target.files[0])
            }}
            id="profile-input-file"
            className="profile-input-file"
            accept=".jpg, .jpeg, .png"
          /> */}
          <img src={image} alt="User image" />
        </label>

        <div className="profile-inputs">
          <div className="profile-block">
            <label htmlFor="profile-name" className="profile-lable">
              Name
            </label>
            <input
              type="text"
              id="profile-name"
              value={profileContent.name}
              onChange={(event) => {
                setProfileContent({ ...profileContent, name: event.target.value })
              }}
              name="name"
              key="name"
              className="profile-input"
              placeholder="Type user name"
            />
          </div>
          <div className="profile-block">
            <label htmlFor="profile-email" className="profile-lable">
              Email
            </label>
            <input
              type="email"
              id="profile-email"
              value={profileContent.email}
              onChange={(event) => {
                setProfileContent({ ...profileContent, email: event.target.value })
              }}
              className="profile-input"
              placeholder="Type user email"
            />
          </div>
          {/* <div className="profile-block">
            <label htmlFor="profile-password" className="profile-lable">
              Password
            </label>
            <input type="password" id="profile-password" className="profile-input" placeholder="Type user password" />
          </div> */}
          <div className="profile-block block-age">
            <label htmlFor="profile-age" className="profile-lable">
              Age
            </label>
            <input
              type="number"
              id="profile-age"
              value={profileContent.age}
              onChange={(event) => {
                setProfileContent({ ...profileContent, age: event.target.value })
              }}
              className="profile-input"
              min="1"
              max="120"
            />
          </div>
        </div>
        <button className="page-button save-profile-button">Save</button>
      </form>
    </div>
  )
}

export default ProfilePage
