import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const EventCard = ({
  imageSrc,
  imageAlt,
  date = new Date(),
  title,
  label,
  small = false,
  ...props
}) => (
    <div
      data-testid={`${small ?"lastEvent": "card-testid"}`}
      className={`EventCard${small ? " EventCard--small" : ""}`}
      label={`${small ? "boom" : ""}`}
      {...props}
    >
      <div className="EventCard__imageContainer">
        <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
        <div className="EventCard__label">{label}</div>
      </div>
      <div className="EventCard__descriptionContainer">
        <div className="EventCard__title">{title}</div>
        <div className="EventCard__month">{getMonth(date)}</div>
      </div>
    </div>
  );

EventCard.propTypes = {
  imageAlt: PropTypes.string,
  small: PropTypes.bool,
  label: PropTypes.string,

  imageSrc: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string.isRequired,
}

EventCard.defaultProps = {
  imageAlt: "image",
  small: false,
  label: "boom",
}

export default EventCard;
