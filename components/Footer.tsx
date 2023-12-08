import styled from "styled-components";

const FooterContainer = styled.div`
display: flex;
justify-content: space-between;
width: auto;
height: 70px;
margin: 0 20px 0 20px;
gap: 10px;
`
const IconsContainer = styled.div`
display: flex;
flex-wrap: wrap;
width: 150px;
align-items: center;
justify-content: space-around;
`
const FooterDescriptionContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
font-weight: 600;
`
const FooterDescription = styled.p`
text-align: center;
margin: 0;
padding: 5px;
`

const Footer: React.FC = () => {
    return (
        <>
            <FooterContainer>
                <IconsContainer>
                    <a href="mailto:brunogabado@hotmail.com"><svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M16 8H8C7.45 8 7.005 8.45 7.005 9L7 15C7 15.55 7.45 16 8 16H16C16.55 16 17 15.55 17 15V9C17 8.45 16.55 8 16 8ZM8.00001 9.99997L12 12.5L16 9.99997V15H8.00001V9.99997ZM8.00001 9.00001L12 11.5L16 9.00001H8.00001Z" fill="#000000" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z" fill="#000000" />
                    </svg>
                    </a>

                    <a href="https://github.com/brunogabado"><svg fill="#000000" width="40px" height="40px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z" /></svg>
                    </a>
                </IconsContainer>

                <FooterDescriptionContainer>
                    <FooterDescription>WeatherWise© 2023</FooterDescription>
                </FooterDescriptionContainer>
            </FooterContainer >
        </>
    )
}

export default Footer