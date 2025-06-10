import { React, useRef } from 'react';
import { IKContext, IKUpload } from 'imagekitio-react';
import attachment from "../../../Public/images/attachment.png";

const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;

const authenticator = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/upload');
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

const Upload = ({ setImage }) => {
    const IKUploadRef = useRef(null);

    const onError = err => {
        console.log("Error", err);
    };

    const onSuccess = res => {
        console.log("Success", res);
        setImage(prev => ({ ...prev, isLoading: false, dbData: res }));
    };

    const onUploadProgress = progress => {
        console.log("Progress", progress);
    };

    const onUploadStart = evt => {
        const file = evt.target.files[0];
        if (!file) {
            alert("Please select a file.");
            return;
        }

        setImage(prev => ({ ...prev, isLoading: true }));

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            setImage(prev => ({
                ...prev,
                aiData: {
                    data: base64String,
                    mimeType: file.type
                }
            }));
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <IKContext 
                publicKey={publicKey} 
                urlEndpoint={urlEndpoint} 
                authenticator={authenticator} 
            >
                <IKUpload
                    fileName="test-upload.png"
                    onError={onError}
                    onSuccess={onSuccess}
                    onUploadProgress={onUploadProgress}
                    onUploadStart={onUploadStart}
                    useUniqueFileName={true}
                    style={{ display: "none" }}
                    ref={IKUploadRef}
                />
                <label className="newFormLabel" onClick={() => IKUploadRef.current.click()}>
                    <img src={attachment} alt="" className="newFormButtonImage" />
                </label>
            </IKContext>
        </>
    );
};

export default Upload;
