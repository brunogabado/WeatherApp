import React, { useState } from 'react';
import styled from "styled-components";
import Form from './Form';


const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  align-items: center;
  height: 100%;
  width: 100%;
  top: 0;
  background-color: rgba(41, 39, 39, 0.95);
  z-index: 11;
`;

const ModalCard = styled.div`
  border: none;
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

export interface ModalProps {
    typeOfForm: string
}

const Modal: React.FC<ModalProps> = ({ typeOfForm }) => {

    return (
        <>
            <ModalContainer>
                <ModalCard>
                    <Form typeOfForm={typeOfForm} />
                </ModalCard>
            </ModalContainer>
        </>
    )
}

export default Modal