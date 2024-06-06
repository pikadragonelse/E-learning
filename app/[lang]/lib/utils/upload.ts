import { GetProp, UploadProps, message } from "antd";

export type UploadType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export const getBase64 = (img: UploadType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
};
