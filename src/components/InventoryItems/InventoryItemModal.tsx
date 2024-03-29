import { Modal } from "react-bootstrap";
import { InventoryItem } from "types/Inventory";
import { InventoryItemKeys } from "models/InventoryItem";
import { IField } from "types/Forms/formFields";

import Button from "components/UI/Button";
import FormInputs from "components/UI/FormInputs/FormInputs";

interface Props {
  handleModelData: (key: string, value: any) => void;
  onClose: () => void;
  onCreate: () => void;
  onUpdate?: () => void;
  modelData: any;
  modalHeader: string;
  isAddModal?: boolean;
  isEditModal?: boolean;
  selectedItem?: InventoryItem;
  isManager?: boolean;
}

const InventoryItemModal: React.FC<Props> = ({
  handleModelData,
  onClose,
  onCreate,
  onUpdate,
  modelData,
  modalHeader,
  isAddModal,
  selectedItem,
  isEditModal,
}) => {
  const formFields: IField[] = [
    {
      label: "Item Name",
      type: "text",
      width: "col-md-6",
      key: InventoryItemKeys.NAME,
      value: isEditModal ? selectedItem?.name : modelData?.name,
      onChange: (value: string | any) => handleModelData(InventoryItemKeys.NAME, value),
      placeholder: "Enter Item Name",
      required: true,
    },
    {
      label: "Item Price",
      type: "text",
      width: "col-md-6",
      key: InventoryItemKeys.PRICE,
      value: isEditModal ? selectedItem?.price : modelData?.price,
      onChange: (value: string | any) => handleModelData(InventoryItemKeys.PRICE, Number(value)),
      placeholder: "Item Price",
      required: true,
    },
    {
      label: "Item Count",
      type: "text",
      width: "col-md-6",
      key: InventoryItemKeys.COUNT,
      value: isEditModal ? selectedItem?.count : modelData?.count,
      onChange: (value: string | any) => handleModelData(InventoryItemKeys.COUNT, value),
      placeholder: "Item Count",
      required: true,
    },

    {
      label: "Item Image",
      width: "col-md-6",
      type: "file",
      key: InventoryItemKeys.THUMBNAIL,
      value: modelData?.thumbnail,
      onChange: (e: any) => {
        let thumbnail: File = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(thumbnail);
        reader.onload = (url) => {
          handleModelData(InventoryItemKeys.THUMBNAIL, thumbnail);
        };
      },
      placeholder: "Item Image",
    },
  ];

  return (
    <Modal centered show={isAddModal || isEditModal} size="lg" onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">{modalHeader}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormInputs formFields={formFields} grid={true} />
      </Modal.Body>
      <Modal.Footer>
        <Button className="lift" content="Cancel" onClick={onClose} variant="dark" />
        {isAddModal && <Button className="lift" content="Create" onClick={onCreate} />}
        {isEditModal && <Button className="lift" content="Save" onClick={onUpdate} />}
      </Modal.Footer>
    </Modal>
  );
};

export default InventoryItemModal;
