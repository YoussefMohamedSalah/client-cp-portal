/* eslint-disable no-lone-blocks */
import React from 'react';
import DatePickerInput from './DatePickerInput';
import FileUploadInput from './FileUploadInput';
import MultiSelectInput from './MultiSelectInput';
import MultilineTextInput from './MultilineTextInput';
import OptionsSelectOne from './OptionsSelectOne';
import PasswordInput from './PasswordInput';
import TextInput from './TextInput';
import { IField } from 'types/Forms/formFields';

interface Props {
	formFields: IField[];
	grid?: boolean;
	block?: boolean;
};

const FormInputs: React.FC<Props> = ({ formFields, grid, block = false }) => {
	return (
		<form>
			<div className={`${grid && !block && 'container'}`}>
				<div className={`${grid && 'row g-3 mb-3'}`}>
					{formFields.map((formInfo: IField, i: number) => {
						return <div key={"key" + i} className={`${formInfo.width && formInfo.width}`}>

							{/* Date */}
							{formInfo.type === "date" && !formInfo.hide && <DatePickerInput placeholder={formInfo.placeholder} value={formInfo.value} onChange={formInfo.onChange} defaultValue={formInfo.default} hidden={formInfo.hide} disabled={formInfo.disabled} label={formInfo.label} required={formInfo.required} />}

							{/* Password */}
							{formInfo.type === "password" && !formInfo.hide && <PasswordInput placeholder={formInfo.placeholder} value={formInfo.value} onChange={formInfo.onChange} defaultValue={formInfo.default} hidden={formInfo.hide} disabled={formInfo.disabled} label={formInfo.label} required={formInfo.required} />}

							{/* Text */}
							{(formInfo.type === "text" || formInfo.type === "number") && !formInfo.hide && <TextInput placeholder={formInfo.placeholder} value={formInfo.value} onChange={formInfo.onChange} defaultValue={formInfo.default} hidden={formInfo.hide} disabled={formInfo.disabled} label={formInfo.label} required={formInfo.required} type={formInfo.type} />}

							{/* Select */}
							{formInfo.type === "select" && !formInfo.hide && <OptionsSelectOne label={formInfo.label} value={formInfo.value} onChange={formInfo.onChange} defaultValue={formInfo.default} disabled={formInfo.disabled} options={formInfo.options ? formInfo.options : []} placeholder={formInfo.placeholder} />}

							{/* Multi Select */}
							{formInfo.type === "multiSelect" && !formInfo.hide && <MultiSelectInput label={formInfo.label} onChange={formInfo.onChange} defaultValue={formInfo.value} disabled={formInfo.disabled} options={formInfo.options ? formInfo.options : []} />}

							{/* Text Area */}
							{formInfo.type === "textarea" && !formInfo.hide && <MultilineTextInput label={formInfo.label} rows={formInfo.rows ? formInfo.rows : 3} placeholder={formInfo.placeholder} value={formInfo.value} onChange={formInfo.onChange} defaultValue={formInfo.default} hidden={formInfo.hide} disabled={formInfo.disabled} />}

							{/* File */}
							{formInfo.type === "file" && !formInfo.hide && <FileUploadInput label={formInfo.label} onChange={formInfo.onChange} disabled={formInfo.disabled} />}

							{formInfo.type === "checkbox" &&
								<>
									<div className=" form-switch ">
										<input
											className="form-check-input"
											type="checkbox"
											checked={formInfo.value}
											onChange={formInfo.onChange}
											hidden={formInfo.hide}
											disabled={formInfo.disabled}
										/>
									</div>
								</>
							}

						</div>
					})}
				</div>
			</div>
		</form>
	)
}

export default FormInputs