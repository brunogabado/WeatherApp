import { getCookie } from 'cookies-next';

const ProfilePage: React.FC = () => {

    const userData = getCookie('userData')
    console.log("userData", userData)

    return (
        <h1>PROFILE PAGE</h1>
    )
}

export default ProfilePage