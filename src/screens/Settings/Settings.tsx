import { Nav, Tab } from "react-bootstrap";
import OrganizationSettings from "./OrganizationSettings";
import PageHeader from "components/Common/PageHeader";
import DocumentSettings from "./DocumentSettings";

const Settings = () => {
  return (
    <div className="container-xxl">
      <Tab.Container id="left-tabs-example" defaultActiveKey="organization">
        <div className="row clearfix g-3">
          <PageHeader
            headerTitle={"Settings"}
            renderRight={() => {
              return (
                <div className="col-auto py-2 w-sm-100 d-flex justify-content-center align-items-center">
                  <Nav variant="pills" className="nav nav-tabs tab-body-header rounded invoice-set">
                    <Nav.Item>
                      <Nav.Link eventKey="organization">Organization</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="documents">Documents</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
              );
            }}
          />
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-12 col-md-12">
            <Tab.Content>
              <Tab.Pane eventKey="organization">
                <OrganizationSettings />
              </Tab.Pane>
              <Tab.Pane eventKey="documents">
                <DocumentSettings />
              </Tab.Pane>
            </Tab.Content>
          </div>
        </div>
      </Tab.Container>
    </div>
  );
};

export default Settings;
