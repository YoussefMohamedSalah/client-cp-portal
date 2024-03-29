import { useCompanyDetailsQuery } from "api/Company/getCompany";
import { companyInput, useCompany } from "api/Company/updateCompany";
import FormCard from "components/Settings/FormCard";
import ImageCard from "components/Settings/ImageCard";
import Loading from "components/UI/Loading";
import { useAuth } from "contexts/AuthContext";
import { useUI } from "contexts/UIContext";
import { CompanyKeys } from "models/Company";
import { useState, useEffect } from "react";
import { Company } from "types/Company";
import { IField } from "types/Forms/formFields";
import { handleServerError } from "utils/HandlingServerError";

const OrganizationSettings = () => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [modelData, setModelData] = useState<Company>({} as Company);
  const { mutateAsync: updateCompanyMutation } = useCompany();
  const { showError, showSuccess } = useUI();
  const { session, setSession, setCompany } = useAuth();

  const { data: companyData, error: companyError, isLoading: companyIsLoading } = useCompanyDetailsQuery({});

  useEffect(() => {
    if (!initialized && companyData) {
      let company: Company = companyData?.company?.data! || ({} as Company);
      setModelData({ ...company });
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyData, initialized]);

  if (companyIsLoading) return <Loading />;
  if (companyError) return null;

  const handleModelData = (key: string, value: any) => {
    setModelData({
      ...modelData,
      [key]: value,
    });
  };

  const handleFileChange = (file: File) => {
    if (file) {
      handleModelData("logo", file);
    }
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
      value: modelData?.phone_number,
      onChange: (value: string | any) => handleModelData(CompanyKeys.PHONE_NUMBER, value),
      placeholder: "Company Phone number",
      required: true,
    },
    {
      label: "Vat",
      type: "number",
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
      value: modelData?.currency,
      onChange: (value: string | any) => handleModelData(CompanyKeys.CURRENCY, value),
      placeholder: "Company Currency",
      required: true,
    },
    {
      label: "Shift Start Time",
      type: "time",
      width: "col-md-6",
      key: CompanyKeys.SHIFT_START,
      value: modelData?.shift_start!,
      onChange: (value: string | any) => handleModelData(CompanyKeys.SHIFT_START, value),
      placeholder: "Shift Start Time",
    },
    {
      label: "Shift End Time",
      type: "time",
      width: "col-md-6",
      key: CompanyKeys.SHIFT_END,
      value: modelData?.shift_end!,
      onChange: (value: string | any) => handleModelData(CompanyKeys.SHIFT_END, value),
      placeholder: "Shift End Time",
    },
  ];

  const handleUpdate = async () => {
    try {
      let updateInput = companyInput(modelData);
      let companyRes = await updateCompanyMutation(updateInput);
      if (companyRes.company?.data) {
        let company: Company = companyRes.company?.data! || ({} as Company);
        showSuccess();
        setSession({
          ...session,
          company: company,
        });
        setCompany(company);
        localStorage.setItem(
          "session",
          JSON.stringify({
            ...session,
            company: company,
          }),
        );
        localStorage.setItem("company", JSON.stringify(company));
        window.location.reload();
      }
    } catch (err: any) {
      console.log(err.response?.data?.msg!);
      showError(handleServerError(err.response?.data?.msg!));
    }
  };

  if (!initialized) return <></>;
  return (
    <div className="row">
      <div className="col-xl-4">
        <ImageCard title={"Logo"} defaultUrl={modelData.logo || ""} onSave={handleUpdate} onChange={handleFileChange} />
      </div>
      <div className="col-xl-8">
        <FormCard title={"Info"} formFields={formFields} onSave={handleUpdate} />
      </div>
    </div>
  );
};

export default OrganizationSettings;
