import loginImg from "assets/images/aside.jpeg";

const Aside: React.FC = () => {
  return (
    <div className="d-none d-lg-flex justify-content-center align-items-center rounded-lg w-100 h-100">
      <div className="w-100 h-100">
        <img
          src={loginImg}
          alt="login-img"
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </div>
    </div>
  );
};

export default Aside;
