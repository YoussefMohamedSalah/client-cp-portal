interface Props {
  title: string;
  value: string;
  iconClass: string;
  backgroundColor?: string;
  onClick?: () => void;
}

const SmallCard: React.FC<Props> = ({ title, value, iconClass, backgroundColor, onClick }) => {
  return (
    <div className="col pointer" onClick={onClick ? onClick : () => {}}>
      <div className={`card ${backgroundColor ? backgroundColor : "bg-primary"}`}>
        <div className="card-body text-white d-flex align-items-center">
          <i className={iconClass} />
          <div className="d-flex flex-column ms-3">
            <h6 className="mb-0">{title}</h6>
            <span className="text-white">{value}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallCard;
