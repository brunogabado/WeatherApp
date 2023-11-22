import React, { useState } from 'react';
import styled from "styled-components";



const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  align-items: center;
  height: 100%;
  width: 100%;
  top: 0;
  background-color: rgba(41, 39, 39, 0.95);
  z-index: 3;
`;

const ModalCard = styled.div`
  border: none;
  z-index: 12;
  border-radius: 15px;
  background-color: white;
  position: absolute;
  width: 300px;
  z-index: 10;
  align-self: center;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

interface ModalProps {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ setOpenModal, children }) => {

    const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    return (
        <>
            <ModalContainer onClick={() => setOpenModal(false)}>
                <ModalCard onClick={stopPropagation}>
                    {children}
                </ModalCard>
            </ModalContainer>
        </>
    )
}

export default Modal