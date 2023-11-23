


import Footer from './Footer'
import Header from './Header'

interface LayoutProps {
    children: React.ReactNode
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    setTypeOfForm: React.Dispatch<React.SetStateAction<string>>
}

const Layout: React.FC<LayoutProps> = ({ children, setOpenModal, setTypeOfForm }) => {
    return (
        <>
            <Header setOpenModal={setOpenModal} setTypeOfForm={setTypeOfForm} />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default Layout
