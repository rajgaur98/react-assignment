import { useSelector, useDispatch } from "react-redux";
import { cardActions } from "_store";
import { default as ReactCard } from "react-credit-cards";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "react-credit-cards/es/styles-compiled.css";
import { useForm } from "react-hook-form";

export { AddCard };

function AddCard() {
  const dispatch = useDispatch();
  const { user: authUser } = useSelector((x) => x.auth);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    cardExpiration: Yup.string().required("Expiry is required"),
    cardHolder: Yup.string().required("Card Holder is required"),
    cardNumber: Yup.string().required("Card Number is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState, watch } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit(cardDetails) {
    return dispatch(cardActions.create({ ...cardDetails, category: "VISA" }));
  }

  return (
    <div>
      <h1>Hi {authUser?.user.name}!</h1>
      <p>Add a card</p>
      <div className="d-flex">
        <div className="mr-5">
          <ReactCard
            expiry={watch("cardExpiration") ?? ""}
            name={watch("name") ?? ""}
            number={watch("cardNumber") ?? ""}
          />
        </div>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>Name</label>
                <input
                  name="name"
                  type="text"
                  {...register("name")}
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.name?.message}</div>
              </div>
              <div className="form-group">
                <label>Expiry</label>
                <input
                  name="cardExpiration"
                  type="text"
                  {...register("cardExpiration")}
                  className={`form-control ${
                    errors.cardExpiration ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.cardExpiration?.message}
                </div>
              </div>
              <div className="form-group">
                <label>Card Holder</label>
                <input
                  name="cardHolder"
                  type="text"
                  {...register("cardHolder")}
                  className={`form-control ${
                    errors.cardHolder ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.cardHolder?.message}
                </div>
              </div>
              <div className="form-group">
                <label>Card Number</label>
                <input
                  name="cardNumber"
                  type="text"
                  {...register("cardNumber")}
                  className={`form-control ${
                    errors.cardNumber ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.cardNumber?.message}
                </div>
              </div>
              <button disabled={isSubmitting} className="btn btn-primary">
                {isSubmitting && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
                Create Card
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
