/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect } from "react";
const UseImageUpload = (initialImage = null) => {
  const [imageUrl, setImageUrl] = useState<string | null>(
    initialImage ? URL.createObjectURL(initialImage) : null
  );
  const [imageFile, setImageFile] = useState<File | null>(initialImage);

  const convertToBase64 = () => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  useEffect(() => {
    convertToBase64();
  }, [imageFile]);

  const setFile = (file: File | null) => {
    setImageFile(file);
    // @ts-ignore
  };

  return {
    imageUrl,
    setFile,
    imageFile,
    setImageUrl,
  };
};

export default UseImageUpload;
