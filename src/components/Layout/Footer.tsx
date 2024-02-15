const Footer = () => {
  return (
    <div className="card mb-2">
      <footer className="text-lg-start">
        <div className="d-flex justify-content-between">
          <div className="p-3">
            <a className="" href="https://cp-sa.com/">
              {" "}
              © {new Date().getFullYear()} All rights reserved.
            </a>
          </div>
          <a className="text-body" href="https://cp-sa.com/">
            <div className="p-3 fs-7 bolder" style={{ color: "#1976d2" }}>
              Construction Power
            </div>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
