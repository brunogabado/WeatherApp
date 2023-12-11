import * as React from 'react';
import styled from "styled-components";
import { useState, useEffect } from 'react';
import LoginForm from "./LoginModalForm";
import RegisterForm from "./RegisterModalForm";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { closeModal } from '@/state/modal/modalSlice';
import { Snackbar } from '@mui/material/';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

  animation: fade 0s ease-in-out;

  @keyframes fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
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

export interface errorProps {
  errorMessage: string,
  errorType: string
}

const Modal: React.FC = () => {

  const dispatch = useDispatch()
  const typeForm = useSelector((state: RootState) => state.modal.type)
  const [errorToDisplay, setErrorToDisplay] = useState<errorProps | null>(null)
  const [open, setOpen] = useState<boolean>(false)

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (errorToDisplay?.errorType) {
      setOpen(true)

      setTimeout(function () {
        setErrorToDisplay(null)
        setOpen(false)
      }, 6000);
    }
  }, [errorToDisplay])




  return (
    <>
      {errorToDisplay !== null &&
        errorToDisplay?.errorType === "success" &&
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}  open={open} autoHideDuration={6000}>
          <Alert severity="success" sx={{ width: '100%' }}>{errorToDisplay.errorMessage}</Alert>
        </Snackbar> ||
        errorToDisplay !== null && errorToDisplay?.errorType === "error" &&
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}  open={open} autoHideDuration={6000}>
          <Alert severity="error" sx={{ width: '100%' }}>{errorToDisplay.errorMessage}</Alert>
        </Snackbar>}


      <ModalContainer onClick={() => dispatch(closeModal())}>

        <ModalCard onClick={stopPropagation}>
          {typeForm === 'login' ? <LoginForm setErrorToDisplay={setErrorToDisplay} /> : <RegisterForm setErrorToDisplay={setErrorToDisplay} />}
        </ModalCard>
      </ModalContainer>
    </>
  )
}

export default Modal