import React from "react";
import DocumentQrCode from "./DocumentQrCode";
import { getImageUrl } from "utils/Helpers";

interface Props {
  logo: string;
  url?: string;
}

const DocumentHeader = ({ logo, url }: Props) => {
  return (
    <div className="cart-header">
      <div
        className={`d-flex ${url ? "justify-content-between" : "justify-content-center"}  align-items-center pt-2 px-lg-4 px-3`}
      >
        {url && (
          <div className="d-flex justify-content-center align-items-center w-full">
            <DocumentQrCode url={url} />
          </div>
        )}
        <div className="d-flex justify-content-center align-items-center w-full">
          {logo && (
            <div
              className="mb-1"
              style={{ width: "8rem", height: "8rem", overflow: "hidden", backgroundColor: "#cccccc" }}
            >
              <img
                className="mb-2"
                style={{ width: "100%", height: "100%", objectFit: "inherit" }}
                src={getImageUrl(logo)}
                alt=""
              />
            </div>
          )}
        </div>
      </div>
      <hr className="mt-2 mb-2 px-lg-4 px-3" />
    </div>
  );
};

export default DocumentHeader;
