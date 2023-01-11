import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
  };
  
export const TransModal = ({modalOpen, handleModalClose, modalContent, setModalContent, handleModalOpen}) => {
      return (
          <div>
          <Modal
              open={modalOpen}
              onClose={handleModalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
              <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                  Transaction
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  TODO Update the modal with transaction info
                  {modalContent.transType} <br />
                  {modalContent.date}
              </Typography>
              </Box>
          </Modal>
          </div>
    );
  }