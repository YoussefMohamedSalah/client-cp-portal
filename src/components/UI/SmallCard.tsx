export interface SmallCardProps {
  title: string;
  value: string;
  iconClass: string;
  bgColor?: string;
  fColor?: string;
  onClick?: () => void;
}

const SmallCard: React.FC<SmallCardProps> = ({ title, value, iconClass, bgColor, fColor, onClick }) => {
  return (
    <div className="col pointer" onClick={onClick ? onClick : () => { }}>
      <div className={`card ${bgColor ? bgColor : ""}`}>
        <div className={`${fColor ? fColor : "text-color"} card-body d-flex align-items-center`}>
          {iconClass && <i className={iconClass} />}
          <div className={`${fColor ? fColor : "text-color"} d-flex flex-column ms-3`}>
            <h6 className="mb-0">{title || ""}</h6>
            <span className={`${fColor ? fColor : "text-color"}`}>{value || ""}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallCard;
