import React from 'react'
import './css/message.css'
import { styled, Box, Theme } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import DownloadIcon from '@mui/icons-material/Download';
import { Card, Modal } from '@mui/material';

function Message({ message, timestamp, user, userImage, attachment, type, attachmentName }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => setOpen(false);


    const giveAttachment = (typeofimg, attachmenturl, nameofattach) => {
        console.log(typeofimg, attachmenturl, nameofattach)
        if (typeofimg?.includes('image')) {

            return (
                <>
                    <img src={attachmenturl} alt={nameofattach} onClick={handleOpen} role="button" />
                    <Modal
                        aria-labelledby="unstyled-modal-title"
                        aria-describedby="unstyled-modal-description"
                        open={open}
                        onClose={handleClose}
                        className='img__card__main'
                    >
                        <Card className='image__card'>
                            <img src={attachmenturl} alt={nameofattach} />
                            <p id="unstyled-modal-description">{nameofattach}</p>
                        </Card>
                    </Modal>
                </>
            )
        } else {
            return (<Card className='download__card'>
                <a href={attachmenturl} download={nameofattach}>Download File <DownloadIcon /></a>
            </Card>)
        }
    }

    return (
        <div className='message'>
            <img src={userImage} referrerPolicy="no-referrer"/>
            <div className='message__info'>
                <h4>
                    {user} <span className='message__timestamp'>{new Date(timestamp?.toDate()).toUTCString()}</span>
                </h4>
                {message ? <span dangerouslySetInnerHTML={{__html: message}}></span> : giveAttachment(type, attachment, attachmentName)}
            </div>
        </div>
    )
}

export default Message