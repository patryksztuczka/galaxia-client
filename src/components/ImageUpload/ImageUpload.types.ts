export interface IImageUploadProps {
  value: File | string | null;
  onChange: (value: File | string | null) => void;
}
