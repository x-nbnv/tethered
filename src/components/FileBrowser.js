import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import db from '../firebase';
import Message from './Message';
import { collection, query, where, getDocs } from "firebase/firestore";


function FileBrowser() {
    let [loadFile, setLoadFile] = useState(false)
    const [roomMessages, setRoomMessages] = useState([]);
    let ids = []
    let text = null


    useEffect(() => {
        db.collection("rooms").get().then((querySnapshot) => {

            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                ids.push(doc.id);
            });
        }).then(() => {

            for (let i = 0; i < ids.length; i++) {
                const id = ids[i]
                db.collection('rooms')
                    .doc(id)
                    .collection('messages')
                    .orderBy('timestamp', 'asc')
                    .onSnapshot((snapshot) => setRoomMessages(roomMessages.concat(snapshot.docs.map((doc) => doc.data()))))
                console.log(i)
            }
        }).then(() => {
            console.log(roomMessages)
        }
        )
    }, [])



    return (
        <div className='fileBrowser'>
            {

            }
        </div>
    )
}

export default FileBrowser