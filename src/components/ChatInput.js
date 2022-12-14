import { Button, Icon, IconButton, TextField } from '@mui/material'
import React, { useState, useRef } from 'react'
import db, { storage } from '../firebase';
import { useStateValue } from '../StateProvider';
import './css/chat-input.css'
import firebase from 'firebase/compat/app';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import AddLinkIcon from '@mui/icons-material/AddLink';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from '@tinymce/tinymce-react';
import $ from 'jquery';

function ChatInput({ channelName, channelId }) {
    const [input, setInput] = useState('');
    const [{ user }] = useStateValue();
    const [file, setFile] = useState();
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            alert(editorRef.current.getContent());
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files) {
            const storageRef = ref(storage, `${e.target.files[0].name}`);
            setFile(e.target.files[0]);

            uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
                console.log('Uploaded a blob or file!');
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL)
                    if (channelId) {
                        db.collection('rooms').doc(channelId).collection('messages').add({
                            attachment: downloadURL,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            user: user.displayName,
                            userImage: user.photoURL,
                            type: e.target.files[0].type,
                            attachmentName: e.target.files[0].name,
                        })
                    }
                })
            });
        }
    };


    const sendMessage = (e) => {

        e.preventDefault();
        if (editorRef.current) {
            if (channelId) {
                db.collection('rooms').doc(channelId).collection('messages').add({
                    message: editorRef.current.getContent(),
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    user: user.displayName,
                    userImage: user.photoURL
                })
            }
        }

    }

    const deletetag = () => {

        $(".tox-statusbar").remove();
    }

    return (
        <div className='chatInput'>
            <form >
                {/* <input

                    value={input}
                    onChange={e => setInput(e.target.value)}
                    
                    placeholder={`Message #${channelName?.toLowerCase()}`} /> */}
                {/* <Editor 
                        onChange={e => console.log(e.blocks[0].text)}
                        /> */}
                
                    <Editor
                        onShow={deletetag()}
                        
                        ClassName="editor__input"
                        apiKey='i466npqznka206chbbgw9xlyetv7ydnox3iv0rsv1sdrxajd'
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue=""
                        init={{
                            height: 200,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',


                        }}

                    /><IconButton

                        variant="contained"
                        component="label"
                        onChange={handleFileChange}
                        className="file__button"
                    >
                        <AddLinkIcon />
                        <input
                            type="file"
                            hidden
                        />
                    </IconButton>


                <button className="chatInput__sendmessage" type='submit' onClick={sendMessage}>SEND</button>
            </form>
        </div>
    )
}

export default ChatInput