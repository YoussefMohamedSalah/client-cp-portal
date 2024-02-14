const Footer = () => {
    return (
        <footer className="bg-body-tertiary text-lg-start mb-2 rounded-2">
            <div className="d-flex justify-content-between">
                <div className="p-3">
                    <a className="text-body" href="https://cp-sa.com/"> © {new Date().getFullYear()} All rights reserved.</a>
                </div>
                <a className="text-body" href="https://cp-sa.com/">
                    <div className="p-3 fs-7 bolder" style={{ color: "blue" }}>
                        Construction Power
                    </div>
                </a>
            </div>
        </footer>
    );
};

export default Footer;