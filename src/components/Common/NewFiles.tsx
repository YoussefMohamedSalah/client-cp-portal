import ImagePreviewModal from 'components/Modals/ImagePreviewModal';
import { useState } from 'react'

interface Props {
    files: File[];
    onRemove: (file: File) => void;
};


const NewFiles = ({ files, onRemove }: Props) => {
    const [isModal, setIsModal] = useState<boolean>(false);
    const [preview, setPreview] = useState<File>();
    const formatImageUrl = () => {
        if (preview) {
            const reader = new FileReader();
            reader.readAsDataURL(preview);
            reader.onloadend = () => {
                return reader.result
            };
        } else return ""
    }
    return (
        <>
            {files?.map((file, index: number) => {
                return (
                    <div key={index} className="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" className="btn btn-outline-secondary"
                            onClick={() => {
                                setPreview(file)
                                setIsModal(true);
                            }}>
                            {file.name}
                        </button>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => onRemove(file)}>
                            <i className="icofont-close-circled text-danger  pointer" />
                        </button>
                    </div>
                )
            })}
            <ImagePreviewModal
                onClose={() => setIsModal(false)}
                isModal={isModal}
                modalHeader={preview?.name! || ""}
                preview={formatImageUrl()}
            />
        </>
    )
}

export default NewFiles
