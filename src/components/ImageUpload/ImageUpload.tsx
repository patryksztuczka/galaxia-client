import { useState, useCallback, useEffect, FC } from 'react';
import { useDropzone } from 'react-dropzone';

import { IImageUploadProps } from './ImageUpload.types';
import { imageExtensionsUpload } from '../../constants';
import UploadIcon from '../../assets/icons/UploadIcon';
import TrashIcon from '../../assets/icons/TrashIcon';
import PenToSquareIcon from '../../assets/icons/PenToSquareIcon';

const ImageUpload: FC<IImageUploadProps> = ({ value, onChange }) => {
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      const [file] = acceptedFiles;
      if (file) {
        const url = URL.createObjectURL(file);
        setImagePreview(url);
        onChange(file);
      }
    },
    [onChange],
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: imageExtensionsUpload,
    multiple: false,
    noClick: true,
    minSize: 0,
  });

  const handleSetPhoto = (e: React.MouseEvent<HTMLElement>) => {
    if (imagePreview) return;
    e.preventDefault();
    open();
  };

  const handleRemovePhoto = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setImagePreview(undefined);
    onChange(null);
  };

  const handleEditPhoto = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    open();
  };

  useEffect(() => {
    if (typeof value === 'string' && value.length > 0) {
      setImagePreview(value);
    }
  }, [value]);

  return (
    <div
      {...getRootProps()}
      onClick={handleSetPhoto}
      className="relative flex w-full justify-center"
    >
      <input {...getInputProps()} type="file" accept={'image/*'} />
      {!imagePreview ? (
        <div className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-green-200">
          <div>
            <UploadIcon />
          </div>
          <span className="text-center font-semibold text-green-200">Add photo</span>
        </div>
      ) : (
        <>
          <img
            src={imagePreview}
            alt="preview of uploaded file"
            className="h-full w-full rounded-2xl object-cover"
          />
          <div className="absolute -right-8 top-1/2 flex -translate-y-1/2 flex-col gap-6">
            <div className="flex h-5 w-5" onClick={handleRemovePhoto}>
              <TrashIcon />
            </div>
            <div className="flex h-5 w-5" onClick={handleEditPhoto}>
              <PenToSquareIcon />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
