import { ExtendedOffer } from '../../types/extended-offer';


type Props = {
  extendedOffer: ExtendedOffer;
}
function OfferInside({extendedOffer}: Props):JSX.Element{
  return(
    <div className="offer__inside">
      <h2 className="offer__inside-title">What&apos;s inside</h2>
      <ul className="offer__inside-list">
        {
          extendedOffer.goods.map((item) => (
            <li key = {item} className="offer__inside-item">
              {item}
            </li>)
          )
        }
      </ul>
    </div>
  );
}

export default OfferInside;
