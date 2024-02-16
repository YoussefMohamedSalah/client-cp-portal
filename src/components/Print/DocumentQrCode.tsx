// @ts-ignore
import { QRCode } from "react-qr-code";

interface Props {
  url: string;
}

const DocumentQrCode = ({ url }: Props) => {
  return <QRCode value={url} size={120} bgColor="#FFFFFF" fgColor="#000000" level="L" />;
};

export default DocumentQrCode;
