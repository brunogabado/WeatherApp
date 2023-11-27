import { RootState } from '@/state/store';
import { getCookie } from 'cookies-next';
import { useSelector } from 'react-redux';
import { GetServerSidePropsContext } from 'next';
import axios from "axios";
import cookie from 'cookie'

export async function getServerSideProps(context: GetServerSidePropsContext) {
    console.log("começou")
    const cookieToken = context.req.headers.cookie || ""
    const parsedCookie = cookie.parse(cookieToken)
    const tokenInsideCookie = parsedCookie.userToken || ""
    let authToken;

    try {
        authToken = await axios.get("https://x8ki-letl-twmt.n7.xano.io/api:5BvcM-Pn/auth/me", {
            headers: {
                Authorization: "Bearer " + tokenInsideCookie
            }
        })
    } catch (error: any) {
        console.error("Error fetching authentication:", error.message);
        authToken = { status: 500 };
        console.log("acabou")
    }

    if (!cookieToken || authToken.status !== 200) {
        return {
            redirect: {
                permanent: false,
                destination: '/',
            },
        }
    }
    console.log("acabou")
    return {
        props: {}, // will be passed to the page component as props
    }
}

const ProfilePage: React.FC = () => {

    const userName = useSelector((state: RootState) => state.user.name)

    return (
        <h1>welcome, {userName}</h1>
    )
}

export default ProfilePage