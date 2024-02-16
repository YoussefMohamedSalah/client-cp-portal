import InventoryItemModal from "components/Inventory/InventoryItemModal";
import { ENUMS } from "enums/enums";
import { PAGES } from "constants/pages";
import useApp from "hooks/useApp";
import { useState } from "react";
import { Inventory, InventoryItem } from "types/Inventory";

import {
  inventoryItemInput,
  useCreateInventoryItem,
} from "api/InventoryItem/createInventoryItem";

import { handleServerError, validateInputs } from "utils/HandlingServerError";
import { useUI } from "contexts/UIContext";
import { inputsValidationType } from "types/Error";
import {
  InventoryNumKeys,
  InventoryRequiredKeys,
  InventoryStrKeys,
} from "models/Inventory";

interface Props {
  inventory: Inventory;
}

interface State {
  isModal: boolean;
  modelData: InventoryItem;
  isEditModal: boolean;
  isDeleteModal: boolean;
  modalHeader: any;
  selectedItem: InventoryItem;
}

const INITIAlIZE_DATA: State = {
  isModal: false,
  modelData: {} as InventoryItem,
  isEditModal: false,
  isDeleteModal: false,
  modalHeader: "",
  selectedItem: {} as InventoryItem,
};

const InventoryCard: React.FC<Props> = ({ inventory }) => {
  const [state, setState] = useState<State>(INITIAlIZE_DATA);
  const { isModal, modelData } = state;
  const { push } = useApp();
  const { showError, showSuccess } = useUI();
  const { mutateAsync: createMutation } = useCreateInventoryItem();

  const closeModal = (reload: boolean = false) => {
    if (reload === true) window.location.reload();
    setState({
      ...state,
      isModal: false,
      modelData: {} as InventoryItem,
    });
  };

  const openModal = () => {
    setState({ ...state, isModal: true });
  };

  const handleModelData = (key: string, value: any) => {
    setState({
      ...state,
      modelData: {
        ...modelData,
        [key]: value,
      },
    });
  };

  const handleCreateItem = async () => {
    let numbersToValidate = InventoryNumKeys;
    let stringsToValidate = InventoryStrKeys;
    let requiredToValidate = InventoryRequiredKeys;

    const validationData: inputsValidationType = {
      requiredToValidate,
      numbersToValidate,
      stringsToValidate,
      inputs: modelData,
    };

    let errors = validateInputs(validationData);
    if (errors.length > 0) return showError(errors);

    // modelData.inventoryId = ''
    try {
      let createInput = inventoryItemInput(modelData);
      await createMutation({
        inventoryId: inventory.id,
        data: createInput,
      });
      showSuccess();
      closeModal(true);
    } catch (err: any) {
      console.log(err.response?.data?.msg!);
      showError(handleServerError(err.response));
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="d-flex flex-column align-items-center justify-content-between mt-5">
            <div
              className="lesson_name pointer"
              onClick={() => push("/" + PAGES.INVENTORY + "/" + inventory.id)}
            >
              <div className="project-block light-info-bg">
                <i className="icofont-inbox" />
              </div>
              <span className="small text-muted project_name fw-bold">
                {" "}
                {inventory.type === ENUMS.INVENTORY_TYPE.MASTER
                  ? "Company Main Inventory"
                  : "Projects's Inventory"}{" "}
              </span>
              <h6 className="mb-0 fw-bold  fs-6  mb-2">
                {inventory.type === ENUMS.INVENTORY_TYPE.MASTER
                  ? "Company Main Inventory"
                  : `${inventory.project_info.name!}'s Inventory`}
              </h6>
            </div>

            <div
              className="btn-group pt-2"
              role="group"
              aria-label="Basic outlined example"
            >
              <button
                type="button"
                className="btn btn-outline-secondary"
                data-bs-toggle="modal"
                data-bs-target="#editInventory"
              >
                <i className="icofont-edit text-success" />
              </button>
              {inventory.type !== ENUMS.INVENTORY_TYPE.MASTER && (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteInventory"
                >
                  <i className="icofont-ui-delete text-danger" />
                </button>
              )}
            </div>
          </div>

          <div className="row g-2 pt-4">
            <div className="col-12">
              <div className="d-flex align-items-center">
                <i className="icofont-paper-clip" />
                <span className="ms-2">
                  Items Count: {inventory.items_count}{" "}
                </span>
              </div>
            </div>
            <div className="col-12">
              <div className="d-flex align-items-center">
                <i className="icofont-sand-clock" />
                <span className="ms-2">
                  Total Value : {inventory.items_value}{" "}
                </span>
              </div>
            </div>
          </div>

          <div className="dividers-block" />

          <div className="d-flex align-items-center justify-content-center mb-2">
            <button
              className="btn btn-primary btn-set-task w-sm-100 me-2"
              onClick={openModal}
            >
              <i className="icofont-plus-circle me-2 fs-6" />
              Add Items
            </button>
          </div>
        </div>
      </div>

      <InventoryItemModal
        isAddModal={isModal}
        onClose={closeModal}
        handleModelData={handleModelData}
        modelData={modelData}
        onCreate={handleCreateItem}
        modalHeader="Add Item"
        isManager={true}
      />
    </>
  );
};

export default InventoryCard;
