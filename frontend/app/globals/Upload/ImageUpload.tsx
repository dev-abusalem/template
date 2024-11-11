"use client"; // is needed only if you’re using React Server Components
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";
const ImageUpload = () => {
  return (
    <div>
      <FileUploaderRegular
        pubkey="ee16b0666f61957e9829"
        maxLocalFileSizeBytes={3000000}
        multipleMax={5}
        imgOnly={true}
        sourceList="local"
        classNameUploader="my-config"
      />
    </div>
  );
};

export default ImageUpload;
