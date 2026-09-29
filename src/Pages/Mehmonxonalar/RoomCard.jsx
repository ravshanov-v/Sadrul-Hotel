import { HeartIcon, XCircleIcon } from "../../components/ui/icons"

export default function RoomCard({
  room,
  rowIndex,
  isPromoRoom,
  promoDiscount,
  avail,
  t,
  tData,
  isFav,
  toggleFav,
  onBook,
}) {
  const promoPrice = isPromoRoom && promoDiscount
    ? Math.round(room.price * (1 - promoDiscount / 100))
    : null
  const soldOut = Boolean(avail && !avail.available)

  return (
    <div className={`md-room-card ${isPromoRoom ? 'md-room-promo' : ''} ${soldOut ? 'md-room-card-unavailable' : ''}`} id={isPromoRoom ? 'md-promo-room' : ''} data-aos="fade-up" data-aos-delay={rowIndex * 50}>
      {isPromoRoom && <div className="md-room-promo-tag" data-aos="fade-up">{t("hotelDetail.specialOffer")}</div>}
      <div className="md-room-image" data-aos="fade-up" data-aos-delay={rowIndex * 50}>
        {avail && (
          <div className={`md-avail-badge ${avail.available ? (avail.remaining <= Math.ceil(avail.totalRooms / 3) ? 'md-avail-limited' : 'md-avail-available') : 'md-avail-booked'}`} data-aos="fade-up">
            {avail.available ? (
              <>
                <span className="md-avail-dot" />
                <span>{avail.remaining >= avail.totalRooms ? t("hotelDetail.available") : `${avail.remaining} ${t("hotelDetail.remaining")}`}</span>
              </>
            ) : (
              <>
                <XCircleIcon width="14" height="14" />
                <span>{t("hotelDetail.booked")}</span>
              </>
            )}
          </div>
        )}
        <img src={room.image} alt={tData("data.rooms." + room.id + ".name", room.name)} loading="lazy" />
        <button
          className={`md-like-btn ${isFav('room_' + room.id) ? 'liked' : ''}`}
          onClick={(e) => { e.stopPropagation(); toggleFav('room_' + room.id) }}
          aria-label={t("common.like")}
        >
          <HeartIcon />
        </button>
      </div>
      <div className="md-room-body" data-aos="fade-up" data-aos-delay={rowIndex * 50 + 100}>
        <h3 className="md-room-name" data-aos="fade-up">{tData("data.rooms." + room.id + ".name", room.name)}</h3>
        <p className="md-room-desc" data-aos="fade-up" data-aos-delay="50">{tData("data.rooms." + room.id + ".description", room.description)}</p>
        <div className="md-room-bottom" data-aos="fade-up" data-aos-delay="100">
          <div className="md-room-price" data-aos="fade-up">
            {promoPrice ? (
              <>
                <span className="md-room-price-label">{t("hotelDetail.from")}</span>
                <span className="md-room-price-old">${room.price}</span>
                <span className="md-room-price-amount md-room-price-promo">${promoPrice}</span>
                <span className="md-room-price-unit">{t("hotelDetail.perNight")}</span>
              </>
            ) : (
              <>
                <span className="md-room-price-label">{t("hotelDetail.from")}</span>
                <span className="md-room-price-amount">${room.price}</span>
                <span className="md-room-price-unit">{t("hotelDetail.perNight")}</span>
              </>
            )}
          </div>
          <button className={`md-room-btn ${soldOut ? 'md-room-btn-disabled' : ''}`} data-aos="zoom-in" data-aos-delay="300"
            disabled={soldOut}
            onClick={onBook}>
            {soldOut ? t("hotelDetail.booked") : t("hotelDetail.bookNow")}
          </button>
        </div>
      </div>
    </div>
  )
}
