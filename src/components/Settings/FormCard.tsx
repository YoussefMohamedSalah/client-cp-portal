import FormInputs from 'components/UI/FormInputs/FormInputs';
import React from 'react'
import { IField } from 'types/Forms/formFields';

interface Props {
  title: string;
  formFields: IField[];
  onSave: () => void;
};


const FormCard = ({ title, formFields, onSave }: Props) => {
  return (
    <div className="card">
      <div
        className="card-header d-flex align-items-center"
        style={{ height: "3rem" }}
      >
        {title}
      </div>
      <hr className="mt-0 mb-3" />
      <div className="card-body text-center d-flex flex-column align-items-center">
        <FormInputs formFields={formFields} grid={true} block={true} />
        <button className="btn btn-primary align-self-start" type="button" onClick={onSave}>
          Save
        </button>
      </div>
    </div>
  )
}

export default FormCard
