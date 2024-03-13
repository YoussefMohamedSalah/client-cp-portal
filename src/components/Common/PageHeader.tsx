import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface TabList {
  title: string;
  href: string;
}

interface Props {
  headerTitle?: string;
  isTabShow?: boolean;
  tabList?: TabList[];
  isBtnShow?: boolean;
  btnText?: string;
  isBackBtn?: boolean;
  onClickBtn?: () => void;
  renderRight?: () => React.ReactNode;
}

const PageHeader: React.FC<Props> = ({
  headerTitle,
  isTabShow,
  tabList,
  isBtnShow,
  btnText,
  isBackBtn,
  onClickBtn,
  renderRight,
}) => {
  const navigate = useNavigate();

  return (
    <div className="row align-items-center m-0">
      <div className="border-0 mb-2 p-0">
        <div className={`card-header no-bg bg-transparent d-flex align-items-center px-0 ${!isBackBtn ? "justify-content-center" : " justify-content-between"} justify-content-lg-between border-bottom flex-wrap`}>
          {isBackBtn && (
            <span onClick={() => navigate(-1)} title="" className="btn btn-primary border lift mb-1">
              <div className="icon">
                <i className="icofont-bubble-left fs-3" />
              </div>
            </span>
          )}
          <h3 className="fw-bold mb-0 p-0 pb-1">{headerTitle}</h3>
          {isTabShow && tabList && tabList.length > 0 ? (
            <div className="col-auto py-2 w-sm-100">
              <Nav variant="pills" className="nav nav-tabs tab-body-header rounded invoice-set">
                {tabList.map((tab, index: number) => {
                  return (
                    <div key={index}>
                      <Nav.Item>
                        <Nav.Link href={tab.href} eventKey={tab.title}>
                          {tab.title}
                        </Nav.Link>
                      </Nav.Item>
                    </div>
                  );
                })}
              </Nav>
            </div>
          ) : null}

          <div className="col-auto d-flex w-sm-100">
            {isBtnShow && btnText ? (
              <button className="btn btn-primary btn-set-task w-sm-100" onClick={onClickBtn ? onClickBtn : () => { }}>
                <i className="icofont-plus-circle me-2 fs-6" />
                {btnText}
              </button>
            ) : null}
          </div>

          {renderRight ? renderRight() : null}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
