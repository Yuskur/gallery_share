import React, { useState } from "react";
import './add-photo-form.css'
import CloseButton from 'react-bootstrap/CloseButton';
import { Upload, Trash } from 'react-bootstrap-icons'
import { Form } from 'react-bootstrap';

function AddPhotoForm(props) {
    const filename_placeholder = 'Upload Photo';
    const [filename, setFilename] = useState("");
    const [description, setDescription] = useState("");
    const [words, setWordsCount] = useState(0);
    const [maxWordsHit, setMaxWordsHit] = useState(false);

    const [tag, setTag] = useState("");
    const [photo, setPhoto] = useState(null);

    const [tags, setTags] = useState([]);

    const [isEnabledCommenting, setIsEnabledCommenting] = useState(true);

    const handleFileChange = (event) => {
        const photoFile = event.target.files[0];
        if(photoFile){
            setPhoto(URL.createObjectURL(photoFile));
            setFilename(photoFile.name);
            console.log(photoFile.name);
        }
    }

    const handleUploadClicked = () => {
        document.getElementById('photo-upload-input').click();
    }

    const trashPhoto = () => {
        setPhoto(null);
        setFilename("");
    }

    const handleTagAdd = () => {
        const tagsToAdd = tag.split(' ');
        setTags([...tags, ...tagsToAdd]);
        setTag("");
        console.log(tags);
    }

    const handleRemoveTag = (itemToRemove) => {
        setTags(tags.filter((item) => item != itemToRemove));
    }

    const handleTagsEnter = (event) => {
        if(event.key === 'Enter'){
            if(tag != "") handleTagAdd();
        }
    }

    const handleKeyDown = (event) => {
        if(event.key === 'Enter'){
            event.preventDefault();
        }
    }

    function TagObj({tag}) {
        return(
            <div className="tag-obj-container">
                <p className="tag-obj">
                    #{tag}
                    <CloseButton id="tag-delete" className="close-photo-form" onClick={() => handleRemoveTag(tag)}/>
                </p>
            </div>
        );
    }


    return(props.trigger) ? (
        <div className="add-photo-form-container">
            <div className="photo-form">
                <div className="photo-form-content">
                    <p className="add-photo-title">Share</p>
                    {photo && (
                        <div className="preview-photo-container">
                            <img className="preview-photo" src={photo} alt={filename} />
                            <Trash className="trash-photo" onClick={trashPhoto} />
                        </div>
                    )}
                    <div className="photo-updload">
                        <div className="photo-upload-btn">
                            <input 
                                type="file"
                                accept=".jpeg, .jpg, .png .HEIC"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                                id="photo-upload-input"
                            />
                            <Upload className="upload-icon" onClick={handleUploadClicked}/>
                            <p className="photo-filename">
                                {filename ? filename : filename_placeholder}
                            </p>
                        </div>
                        <p className="preview">Preview Large</p>
                    </div>
                    <p className="words">* .jpeg, .jpg, .png, and .HEIC *</p>
                    <div className="description-container">
                        <textarea 
                            className="description-box"
                            type="text"
                            value={description}
                            onChange={(change) => {
                                if(change.target.value.length <= 300){
                                    if(maxWordsHit){
                                        setMaxWordsHit(false);
                                    }
                                    setDescription(change.target.value);
                                    setWordsCount(change.target.value.length);
                                } else if(words >= 300 && !maxWordsHit){
                                    setMaxWordsHit(true);
                                }}
                            }
                            placeholder="description"
                        />
                        <p className="words">
                        {maxWordsHit ? <p className="max-words-hit">Max hit</p> : ""}
                        words: {words}/300
                        </p>
                    </div>
                    <div className="tags-container">
                        {tags.length != 0 && (
                            <div className="tags-preview">
                                {tags.map((item, index) => (
                                    <TagObj key={index} tag={item} />
                                ))}
                            </div>
                        )}
                        <form className="tags-body">
                            <textarea 
                                className="tags-box"
                                type="text"
                                value={tag}
                                onChange={(change) => {
                                    setTag(change.target.value);
                                }}
                                onKeyUp={handleTagsEnter}
                                onKeyDown={handleKeyDown}
                                placeholder="Enter Tag"
                            />
                            <p id="tag" className="post-btn" onClick={handleTagAdd}>Add Tag</p>
                        </form>
                        <p id="tags-count" className="words">* Tags separated by space *</p>
                        <p id="tags-statement" className="words">Your tags help us push your content out to more people so think carefully</p>
                    </div>
                    <div className="settings">
                        <Form.Check 
                            className="commenting-setting"
                            type="switch"
                            id="custom-switch"
                            label={isEnabledCommenting ? 'Commenting : ON' : 'Commenting : OFF'}
                            checked={isEnabledCommenting}
                            onChange={() => setIsEnabledCommenting(!isEnabledCommenting)}
                        />
                    </div>
                </div>
                <p className="post-btn">Post</p>
                <CloseButton className="close-photo-form" onClick={props.showState}/>
            </div>
        </div>
    ): "";
}

export default AddPhotoForm;