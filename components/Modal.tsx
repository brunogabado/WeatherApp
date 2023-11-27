import styled from "styled-components";
import LoginForm from "./LoginModalForm";
import RegisterForm from "./RegisterModalForm";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { closeModal } from '@/state/modal/modalSlice';


const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  align-items: center;
  height: 100%;
  width: 100%;
  top: 0;
  background-color: rgba(41, 39, 39, 0.95);
  z-index: 7;
`;

const ModalCard = styled.div`
  border: none;
  z-index: 12;
  border-radius: 15px;
  background-color: white;
  position: absolute;
  z-index: 10;
  align-self: center;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Modal: React.FC = () => {

    const dispatch = useDispatch()
    const typeForm = useSelector((state: RootState) => state.modal.type)

    const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return (
        <>
            <ModalContainer onClick={() => dispatch(closeModal())}>
                <ModalCard onClick={stopPropagation}>
                    {typeForm === 'login' ? <LoginForm /> : <RegisterForm />}
                </ModalCard>
            </ModalContainer>
        </>
    )
}

export default Modal