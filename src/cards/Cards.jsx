import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cardActions } from "_store";
import { default as ReactCard } from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

export { Cards };

function Cards() {
  const dispatch = useDispatch();
  const { user: authUser } = useSelector((x) => x.auth);
  const { cards } = useSelector((x) => x.cards);

  useEffect(() => {
    dispatch(cardActions.get());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Hi {authUser?.user.name}!</h1>
      <p>Here are your cards</p>
      <div style={{ position: "relative" }}>
        {/* Re-using the same card, because the API only allows admin to access all the cards */}
        {cards.name &&
          [...Array(5)].map((_, i) => (
            <div key={i} style={{ position: "absolute", top: i * 50 }}>
              <ReactCard
                expiry={cards.cardExpiration}
                name={cards.name}
                number={cards.cardNumber}
              />
            </div>
          ))}
        {cards.loading && (
          <div className="spinner-border spinner-border-sm"></div>
        )}
        {cards.error && (
          <div className="text-danger">
            Error loading cards: {cards.error.message}
          </div>
        )}
      </div>
    </div>
  );
}
