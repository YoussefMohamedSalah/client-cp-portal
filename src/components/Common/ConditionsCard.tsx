import MultilineTextInput from "components/UI/FormInputs/MultilineTextInput";

interface Props {
  conditions: string[];
  onAddCondition: () => void;
  onEdit: (index: number, value: string) => void;
  onRemove: (index: number) => void;
}

const ConditionsCard = ({ conditions, onAddCondition, onEdit, onRemove }: Props) => {
  console.log(conditions)
  return (
    <div className="card">
      <div className="card-header">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <button type="button" className="btn btn-success text-white" onClick={onAddCondition}>
            <i className="fa fa-plus pe-2" />
            Conditions
          </button>
        </div>
      </div>
      <div className="card-body">
        {conditions.map((condition, index) => (
          <div className="row justify-content-center align-items-center row g-3 mb-3" key={index}>
            <div className="col-lg-11 d-flex justify-content-start align-items-center">
              <span className="badge bg-success p-2 m-2">{index + 1}</span>
              {/* condition  */}
              <MultilineTextInput
                label="Add new condition"
                key={"label"}
                placeholder="Condition"
                // rows={2}   ResizeObserver loop problem cause by this props
                value={condition}
                onChange={(value: string) => onEdit(index, value)}
              />
            </div>
            <div className="col-lg-1 col-6 p-lg-0 d-flex justify-content-evenly align-items-center">
              <button type="button" className="btn btn-danger" onClick={() => onRemove(index)}>
                <i className="fa fa-trash  text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConditionsCard;
