import { Container, Row, Col } from "react-bootstrap";
import { calculateProjectAvailableAmount, calculateRemainingAmount } from "utils/ProjectsUtils";

interface Props {
  budget: number;
  expenses: number;
  documentTotal: number;
}

const DocumentProjectFinancesBox = ({ budget, expenses, documentTotal }: Props) => {
  return (
    <Container className="py-3 mb-2" style={{ border: "2px solid red", borderRadius: "10px" }}>
      <Row>
        <Col className="col-sm d-flex align-items-center justify-content-center">BUDGET</Col>
        <Col className="col-sm d-flex align-items-center justify-content-center">REMAINING</Col>
        <Col className="col-sm d-flex align-items-center justify-content-center">THIS INVOICE TOTAL</Col>
        <Col className="col-sm d-flex align-items-center justify-content-center">REMAINING AFTER</Col>
      </Row>
      <Row className="row align-items-center justify-content-center">
        <Col className="col-sm d-flex align-items-center justify-content-center">{budget.toFixed(2)}</Col>
        <Col className="col-sm d-flex align-items-center justify-content-center">
          {budget ? calculateProjectAvailableAmount(budget, expenses).toFixed(2) : (0).toFixed(2)}
        </Col>
        <Col className="col-sm d-flex align-items-center justify-content-center">{documentTotal.toFixed(2)}</Col>
        <Col className="col-sm d-flex align-items-center justify-content-center">
          {budget ? calculateRemainingAmount(documentTotal, budget, expenses).toFixed(2) : (0).toFixed(2)}
        </Col>
      </Row>
    </Container>
  );
};

export default DocumentProjectFinancesBox;
