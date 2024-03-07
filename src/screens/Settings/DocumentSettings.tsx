import { useWorkFlowQuery } from "api/Documents/getAllWorkFlow";
import { useUpdateWorkFlow, workFlowUpdateInput } from "api/Documents/updateWorkFlow";
import Loading from "components/UI/Loading";
import { useUI } from "contexts/UIContext";
import { DOCUMENT_TYPE } from "enums/enums";
import { Nav, Tab } from "react-bootstrap";
import { CompanyWorkFlow, WorkFlow } from "types/Workflow";
import { handleServerError } from "utils/HandlingServerError";
import DocumentTab from "./DocumentTab";
import { defaultConditionsUpdateInput, useUpdateDefaultConditions } from "api/Documents/updateDefaultConditions";

interface TabDataType {
  key: string;
  tabKey: DOCUMENT_TYPE;
  tabName: string;
  workFlow: WorkFlow[];
  defaultConditions: string[] | null;
}

const DocumentSettings = () => {
  const { data, error, isLoading } = useWorkFlowQuery({});
  const { mutateAsync: updateWorkFlowMutation } = useUpdateWorkFlow();
  const { mutateAsync: updateDefaultConditionsMutation } = useUpdateDefaultConditions();
  const { showError, showSuccess } = useUI();

  if (isLoading) return <Loading />;
  if (error) return null;

  let workFlowData: CompanyWorkFlow = data?.workflow?.data || ({} as CompanyWorkFlow);
  console.log(workFlowData.default_po_conditions);
  let poWorkFlow: WorkFlow[] = workFlowData.purchase_order_flow || ([] as WorkFlow[]);
  let pcWorkFlow: WorkFlow[] = workFlowData.petty_cash_request_flow || ([] as WorkFlow[]);
  let materialWorkFlow: WorkFlow[] = workFlowData.material_request_flow || ([] as WorkFlow[]);
  let siteWorkFlow: WorkFlow[] = workFlowData.site_request_flow! || ([] as WorkFlow[]);
  let employeeFlow: WorkFlow[] = workFlowData.employee_request_flow! || ([] as WorkFlow[]);
  let contractFlow: WorkFlow[] = workFlowData.contract_flow! || ([] as WorkFlow[]);
  let invoiceFlow: WorkFlow[] = workFlowData.invoice_flow! || ([] as WorkFlow[]);

  const getTerm = (term: string): string => {
    if (term === DOCUMENT_TYPE.PURCHASE_ORDER) return "purchase_order_flow";
    else if (term === DOCUMENT_TYPE.PETTY_CASH) return "petty_cash_request_flow";
    else if (term === DOCUMENT_TYPE.MATERIAL) return "material_request_flow";
    else if (term === DOCUMENT_TYPE.SITE) return "site_request_flow";
    else if (term === DOCUMENT_TYPE.EMPLOYEE) return "employee_request_flow";
    else if (term === DOCUMENT_TYPE.CONTRACT) return "contract_flow";
    else if (term === DOCUMENT_TYPE.INVOICE) return "invoice_flow";
    else return "";
  };

  const handleUpdateWorkFlow = async (updatedWorkFlow: WorkFlow[], term: string) => {
    for (let i = 0; i < updatedWorkFlow.length; i++) updatedWorkFlow[i].index = i + 1;
    let termVal = getTerm(term);
    if (!termVal) return;
    try {
      let updateInput = workFlowUpdateInput({ [termVal]: updatedWorkFlow });
      const res = await updateWorkFlowMutation(updateInput);
      showSuccess();
      workFlowData = res.workFlow?.data! ? res.workFlow?.data! : workFlowData;
    } catch (err: any) {
      console.log(err.response?.data?.msg!);
      showError(handleServerError(err.response));
    }
  };

  const handleUpdateConditions = async (conditions: string[], term: string) => {
    console.log(conditions);

    let termVal: string = "";
    if (term === DOCUMENT_TYPE.PURCHASE_ORDER) termVal = "default_po_conditions";
    if (term === DOCUMENT_TYPE.CONTRACT) termVal = "default_contract_conditions";

    if (!termVal) return;
    try {
      let updateInput = defaultConditionsUpdateInput({ [termVal]: conditions });
      const res = await updateDefaultConditionsMutation(updateInput);
      showSuccess();
      workFlowData = res.workFlow?.data! ? res.workFlow?.data! : workFlowData;
    } catch (err: any) {
      console.log(err.response?.data?.msg!);
      showError(handleServerError(err.response));
    }
  };

  const tabsData: TabDataType[] = [
    {
      key: "Po",
      tabName: "Purchase Order",
      tabKey: DOCUMENT_TYPE.PURCHASE_ORDER,
      workFlow: poWorkFlow,
      defaultConditions:workFlowData.default_po_conditions,          // test condition ["condition 1"]
    },
    {
      key: "Pc",
      tabName: "Petty Cash",
      tabKey: DOCUMENT_TYPE.PETTY_CASH,
      workFlow: pcWorkFlow,
      defaultConditions: null,
    },
    {
      key: "MA",
      tabName: "Material",
      tabKey: DOCUMENT_TYPE.MATERIAL,
      workFlow: materialWorkFlow,
      defaultConditions: null,
    },
    {
      key: "SI",
      tabName: "Site",
      tabKey: DOCUMENT_TYPE.SITE,
      workFlow: siteWorkFlow,
      defaultConditions: null,
    },
    {
      key: "EMP",
      tabName: "Employees",
      tabKey: DOCUMENT_TYPE.EMPLOYEE,
      workFlow: employeeFlow,
      defaultConditions: null,
    },
    {
      key: "CON",
      tabName: "Contracts",
      tabKey: DOCUMENT_TYPE.CONTRACT,
      workFlow: contractFlow,
      defaultConditions: workFlowData.default_contract_conditions,
    },
    {
      key: "INV",
      tabName: "Invoices",
      tabKey: DOCUMENT_TYPE.INVOICE,
      workFlow: invoiceFlow,
      defaultConditions: null,
    },
  ];

  return (
    <div className="container-xxl">
      <Tab.Container id="left-tabs-example" defaultActiveKey="po">
        <div className="row">
          <div className="d-flex justify-content-center align-items-center">
            <Nav variant="pills" className="nav nav-tabs tab-body-header rounded invoice-set">
              {tabsData?.map((tab, index: number) => {
                return (
                  <Nav.Item key={index}>
                    <Nav.Link eventKey={tab.key}>{tab.tabName}</Nav.Link>
                  </Nav.Item>
                );
              })}
            </Nav>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-12 col-md-12">
            <Tab.Content>
              {tabsData?.map((tab, index: number) => {
                return (
                  <Tab.Pane key={tab.key} eventKey={tab.key}>
                    <DocumentTab
                      tabKey={tab.tabKey}
                      workflow={tab.workFlow}
                      defaultConditions={tab.defaultConditions || null}
                      onSave={handleUpdateWorkFlow}
                      onSaveConditions={handleUpdateConditions}
                    />
                  </Tab.Pane>
                );
              })}
            </Tab.Content>
          </div>
        </div>
      </Tab.Container>
    </div>
  );
};

export default DocumentSettings;
