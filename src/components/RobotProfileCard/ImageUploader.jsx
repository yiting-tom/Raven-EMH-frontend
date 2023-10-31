import React, { useState, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { Button, Modal, ModalBody } from 'reactstrap';

import defaultAvatar from '../../assets/img/default-avatar.png';
import getCroppedImg from '../../utils/cropImage';

function ImageUploader({ imageFile, setImageFile, defaultPreviewURL }) {
  const [previewURL, setPreviewURL] = useState(defaultPreviewURL);
  const [croppedImageURL, setCroppedImageURL] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [modal, setModal] = useState(false);

  const fileInputRef = useRef();

  const toggleModal = () => setModal(!modal);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    try {
      const url = URL.createObjectURL(file);
      setImageFile(file);
      setPreviewURL(url);
      toggleModal();
    } catch (error) {
      return;
    }
  };

  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropImage = async () => {
    if (!imageFile || !croppedAreaPixels) return;

    try {
      const croppedImageBlob = await getCroppedImg(
        previewURL,
        croppedAreaPixels,
      );
      const objectURL = URL.createObjectURL(croppedImageBlob);
      setCroppedImageURL(objectURL);
      toggleModal(); // Close the modal after cropping
    } catch (error) {
      console.error('Image crop failed:', error);
    }
  };

  return (
    <div>
      <img
        src={croppedImageURL || previewURL || defaultAvatar}
        alt="User"
        className="avatar"
        onClick={handleImageClick}
        style={{ cursor: 'pointer', borderRadius: '50%', margin: 0 }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      <Modal
        isOpen={modal}
        toggle={toggleModal}
        style={{ width: '100%', height: '100%' }}
      >
        <ModalBody style={{ width: '100%', height: '50vh', margin: '0' }}>
          <Cropper
            image={previewURL}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            cropShape="round"
          />
          <Button color="primary" onClick={handleCropImage}>
            Crop Image
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ImageUploader;
