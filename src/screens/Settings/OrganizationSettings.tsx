import FormCard from "components/Settings/FormCard";
import ImageCard from "components/Settings/ImageCard";
import { CompanyKeys } from "models/Company";
import React, { useState } from "react";
import { Company } from "types/Company";
import { IField } from "types/Forms/formFields";

const OrganizationSettings = () => {
  const [modelData, setModelData] = useState<Company>({} as Company);

  const handleModelData = (key: string, value: any) => {
    setModelData({
      ...modelData,
      [key]: value,
    });
  };

  const formFields: IField[] = [
    {
      label: "Name",
      type: "text",
      width: "col-md-6",
      key: CompanyKeys.NAME,
      value: modelData?.name,
      onChange: (value: string | any) => handleModelData(CompanyKeys.NAME, value),
      placeholder: "Company Name",
      required: true,
    },
    {
      label: "Email",
      type: "text",
      width: "col-md-6",
      key: CompanyKeys.EMAIL,
      value: modelData?.email,
      onChange: (value: string | any) => handleModelData(CompanyKeys.EMAIL, value),
      placeholder: "Company Email",
      required: true,
    },
    {
      label: "Address",
      type: "text",
      width: "col-md-6",
      key: CompanyKeys.ADDRESS,
      value: modelData?.address,
      onChange: (value: string | any) => handleModelData(CompanyKeys.ADDRESS, value),
      placeholder: "Company Address",
      required: true,
    },
    {
      label: "Phone number",
      type: "text",
      width: "col-md-6",
      key: CompanyKeys.PHONE_NUMBER,
      value: modelData?.address,
      onChange: (value: string | any) => handleModelData(CompanyKeys.PHONE_NUMBER, value),
      placeholder: "Company Phone number",
      required: true,
    },
    {
      label: "Vat",
      type: "text",
      width: "col-md-6",
      key: CompanyKeys.VAT,
      value: modelData?.vat,
      onChange: (value: string | any) => handleModelData(CompanyKeys.VAT, value),
      placeholder: "Company Vat",
      required: true,
    },
    {
      label: "Currency",
      type: "text",
      width: "col-md-6",
      key: CompanyKeys.CURRENCY,
      value: modelData?.vat,
      onChange: (value: string | any) => handleModelData(CompanyKeys.CURRENCY, value),
      placeholder: "Company Currency",
      required: true,
    },
    {
      label: "Shift Start Time",
      type: "time",
      width: "col-md-6",
      key: CompanyKeys.SHIFT_START,
      value: modelData?.shift_start,
      onChange: (value: string | any) => handleModelData(CompanyKeys.SHIFT_START, value),
      placeholder: "Shift Start Time",
    },
    {
      label: "Shift End Time",
      type: "time",
      width: "col-md-6",
      key: CompanyKeys.SHIFT_END,
      value: modelData?.shift_end,
      onChange: (value: string | any) => handleModelData(CompanyKeys.SHIFT_END, value),
      placeholder: "Shift End Time",
    },
  ];

  return (
    <div className="row">
      <div className="col-xl-4">
        <ImageCard title={"Logo"} defaultUrl={""} onSave={() => {}} />
      </div>
      <div className="col-xl-8">
        <FormCard title={"Info"} formFields={formFields} onSave={() => {}} />
      </div>
    </div>
  );
};

export default OrganizationSettings;
