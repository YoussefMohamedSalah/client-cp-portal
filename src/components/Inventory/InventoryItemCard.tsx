import { PAGES } from "constants/pages";
import useApp from "hooks/useApp";
import { InventoryItem } from "types/Inventory";
import { getImageUrl } from "utils/Helpers";

interface Props {
  onClickEdit?: () => void;
  onClickDelete?: () => void;
  item: InventoryItem;
}

const InventoryItemCard: React.FC<Props> = ({ onClickEdit, onClickDelete, item }) => {
  const { push } = useApp();

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mt-5">
          <div className="lesson_name pointer" onClick={() => push("/" + PAGES.INVENTORY_ITEM + "/" + item.id)}>
            <div className="project-block light-info-bg">
              <img
                src={getImageUrl(item?.thumbnail!)}
                alt={item.name}
                className="avatar xl rounded-circle img-thumbnail shadow-sm pointer"
              />
            </div>
            <h6 className="mb-0 fw-bold fs-6 ">{item.name!}</h6>
          </div>
          <div className="btn-group" role="group" aria-label="Basic outlined example">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-toggle="modal"
              data-bs-target="#editItem"
              onClick={onClickEdit}>
              <i className="icofont-edit text-success" />
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-toggle="modal"
              data-bs-target="#deleteItem"
              onClick={onClickDelete}>
              <i className="icofont-ui-delete text-danger" />
            </button>
          </div>
        </div>
        <div className="row g-2 pt-4 mb-2">
          <div className="col-12">
            <div className="d-flex align-items-center">
              <i className="icofont-paper-clip" />
              <span className="ms-2">Items Count: {item.count} </span>
            </div>
          </div>
          <div className="col-12">
            <div className="d-flex align-items-center">
              <i className="icofont-paper-clip" />
              <span className="ms-2">Items Price: {item.price} </span>
            </div>
          </div>
          <div className="col-12">
            <div className="d-flex align-items-center">
              <i className="icofont-sand-clock" />
              <span className="ms-2">Total Value : {item.total_value} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryItemCard;
