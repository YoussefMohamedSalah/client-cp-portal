import React, { useState, lazy } from "react";
import { INVENTORY_TYPE } from "enums/enums";
import { useSingleInventoryQuery } from "api/Inventory/getSingleInventory";
import { inventoryItemInput, useCreateInventoryItem } from "api/InventoryItem/createInventoryItem";
import { useDeleteInventoryItem } from "api/InventoryItem/deleteInventoryItem";
import { inventoryItemUpdateInput, useUpdateInventoryItem } from "api/InventoryItem/updateInventoryItem";
import { Inventory, InventoryItem } from "types/Inventory";
import { inputsValidationType } from "types/Error";
import { InventoryItemNumKeys, InventoryItemRequiredKeys, InventoryItemStrKeys } from "models/InventoryItem";
import { useUI } from "contexts/UIContext";
import { handleServerError, validateInputs } from "utils/HandlingServerError";

const PageHeader = lazy(() => import("../../components/Common/PageHeader"));
const Loading = lazy(() => import("../../components/UI/Loading"));
const InventoryItemModal = lazy(() => import("../../components/InventoryItems/InventoryItemModal"));
const DeleteModal = lazy(() => import("../../components/Modals/DeleteModal"));
const InventoryItemCard = lazy(() => import("../../components/Inventory/InventoryItemCard"));

interface Props {
  id: string;
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

const InventoryDetails: React.FC<Props> = ({ id }) => {
  const [state, setState] = useState<State>(INITIAlIZE_DATA);
  const { isModal, modelData, isEditModal, isDeleteModal, modalHeader, selectedItem } = state;

  const { mutateAsync: createMutation } = useCreateInventoryItem();
  const { mutateAsync: updateItemMutation } = useUpdateInventoryItem();
  const { mutateAsync: deleteItemMutation } = useDeleteInventoryItem();
  const { showError, showSuccess } = useUI();

  let { data: inventoryData, error: inventoryError, isLoading: inventoryIsLoading } = useSingleInventoryQuery({ id });

  if (inventoryIsLoading) return <Loading />;
  if (inventoryError) return null;

  let inventory: Inventory = inventoryData?.inventory?.data! || ({} as Inventory);
  let items: InventoryItem[] = inventory.items || [];
  let inventoryName =
    inventory.type === INVENTORY_TYPE.MASTER
      ? "Master Inventory Items"
      : `${inventory.project_info?.name!}'s Inventory Items`;

  const handleModalClose = (reload: boolean = false) => {
    if (reload === true) window.location.reload();
    setState({
      ...state,
      isModal: false,
      isEditModal: false,
      isDeleteModal: false,
      modalHeader: "",
      modelData: {} as InventoryItem,
    });
  };

  const openModal = () => {
    setState({ ...state, isModal: true });
  };

  const handleModelData = (key: string, value: any) => {
    if (isEditModal) {
      setState({
        ...state,
        selectedItem: {
          ...selectedItem,
          [key]: value,
        },
      });
      return;
    }

    setState({
      ...state,
      modelData: {
        ...modelData,
        [key]: value,
      },
    });
  };

  const handleOpenEditModal = (item: InventoryItem) => {
    setState({
      ...state,
      isEditModal: true,
      modalHeader: "Edit Item",
      selectedItem: item,
    });
  };

  const handleOpenDeleteModal = (item: InventoryItem) => {
    setState({
      ...state,
      isDeleteModal: true,
      selectedItem: item,
      modalHeader: "Delete Item",
    });
  };

  const deleteItem = async () => {
    try {
      await deleteItemMutation(selectedItem);
      showSuccess();
      let currenItem = items.find((item) => item.id === selectedItem.id);
      currenItem && items.splice(items.indexOf(currenItem), 1);
      handleModalClose();
    } catch (err: any) {
      console.log(err.response?.data?.msg!);
      showError(handleServerError(err.response));
    }
  };

  const handleCreateItem = async () => {
    let numbersToValidate = InventoryItemNumKeys;
    let stringsToValidate = InventoryItemStrKeys;
    let requiredToValidate = InventoryItemRequiredKeys;

    const validationData: inputsValidationType = {
      requiredToValidate,
      numbersToValidate,
      stringsToValidate,
      inputs: modelData,
    };

    let errors = validateInputs(validationData);
    if (errors.length > 0) return showError(errors);

    try {
      let createInput = inventoryItemInput(modelData);
      await createMutation({
        inventoryId: inventory.id,
        data: createInput,
      });
      showSuccess();
      handleModalClose(true);
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  const handleEditItem = async () => {
    let numbersToValidate = InventoryItemNumKeys;
    let stringsToValidate = InventoryItemStrKeys;
    let requiredToValidate = InventoryItemRequiredKeys;

    const validationData: inputsValidationType = {
      requiredToValidate,
      numbersToValidate,
      stringsToValidate,
      inputs: selectedItem,
    };

    let errors = validateInputs(validationData);
    if (errors.length > 0) return showError(errors);

    try {
      let createInput = inventoryItemUpdateInput(selectedItem);
      let res = await updateItemMutation({
        id: selectedItem.id,
        data: createInput,
      });
      showSuccess();
      let updatedItem = res.inventoryItem.data;
      items.map((item) => {
        if (item.id === updatedItem.id) {
          return {
            ...item,
            name: updatedItem.name,
            price: updatedItem.price,
            count: updatedItem.count,
            thumbnail: updatedItem.thumbnail,
          };
        } else return item;
      });
      handleModalClose(true);
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  return (
    <div className="container-xxl">
      <PageHeader
        headerTitle={inventoryName}
        renderRight={() => {
          return (
            <div className="col-auto d-flex w-sm-100">
              <button
                className="btn btn-primary btn-set-task w-sm-100 me-2"
                onClick={() => {
                  openModal();
                }}>
                <i className="icofont-plus-circle me-2 fs-6"></i>Add Item
              </button>
            </div>
          );
        }}
      />
      <div className="row g-2 row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 row-deck py-1 pb-4">
        {items.map((item, i: number) => {
          return (
            <div key={"key" + i} className="col pt-5">
              <InventoryItemCard
                item={item}
                onClickEdit={() => handleOpenEditModal(item)}
                onClickDelete={() => handleOpenDeleteModal(item)}
              />
            </div>
          );
        })}
      </div>
      <InventoryItemModal
        isAddModal={isModal}
        isEditModal={isEditModal}
        selectedItem={selectedItem}
        onUpdate={handleEditItem}
        onClose={handleModalClose}
        handleModelData={handleModelData}
        modelData={modelData}
        onCreate={handleCreateItem}
        modalHeader="Add Item"
        isManager={true}
      />
      {isDeleteModal && (
        <DeleteModal
          show={isDeleteModal}
          onClose={handleModalClose}
          onDelete={deleteItem}
          message="Are you sure you want to delete this project?"
          modalHeader={modalHeader}
        />
      )}
    </div>
  );
};

export default InventoryDetails;
