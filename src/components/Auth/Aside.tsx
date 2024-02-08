import loginImg from "assets/images/aside.jpeg";

const Aside: React.FC = () => {
	return (
		<div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center rounded-lg auth-h100">
			<div style={{ width: "100%" }}>
				<img src={loginImg} alt="login-img" style={{ position: 'absolute', left: "0", top: "0", maxHeight: '100vh', minWidth: "42vw" }} />
			</div>
		</div>
	);
};

export default Aside;
