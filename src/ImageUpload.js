//rfce

import React, { useState } from 'react'
import { Button } from '@material-ui/core';
import { db, storage } from './firebase';
import firebase from "firebase";
import './ImageUpload.css';

function ImageUpload(props) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (event) => {
        if(event.target.files[0]){
            setImage(event.target.files[0]);
        }
    }

    const handleUpload = (event) => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            //To get the visual progress bar
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes)*100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
            },
            //When upload complete
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        //Post image inside db
                        db.collection("posts").add({
                            //get server timestamp
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption,
                            imageUrl: url,
                            username: props.username
                        })
                    })
                    setProgress(0);
                    setCaption("");
                    setImage(null);
            },
        )
    }
    return (
        <div className="imageupload">
            {/* Progress */}
            <progress className="imageupload__progress" value={progress} max="100" />
            {/* Caption Input */}
            <input 
                type="text"
                placeholder="Enter a caption"
                value={caption}
                onChange={event => setCaption(event.target.value)}/>
            {/* File Picker */}
            <input type="file" onChange={handleChange}/>
            {/* Post button */}
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload
