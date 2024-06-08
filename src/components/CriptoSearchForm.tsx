import { currencies } from "../data/index";
import { useCryptoStore } from "../stores/store";
import { useForm } from "react-hook-form";
import { Pair } from "../types";
import { Errors } from "./Errors";
import '../index.css';

export const CriptoSearchForm = () => {
  const [cryptocurrencies, fetchData] = useCryptoStore((state) => [state.cryptocurrencies, state.fetchData]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Pair>();

  const handleOnSubmit = (data: Pair) => {

    fetchData(data);
  };

  return (
    <form className="form" onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="field">
        <label htmlFor="currency">Modeda:</label>
        <select
          className={
            errors.currency
              && "error"
          }
          id="currency"
          aria-placeholder="Seleccione moneda"
          {...register("currency", {
            required: "🚨Este campo es obligatorio",
          })}
        >
          <option value="">Seleccione</option>
          {currencies.map((currency) => {
            return (
              <option key={currency.code} value={currency.code}>
                {currency.name}
              </option>
            );
          })}
        </select>
        {errors && (
          <Errors>{errors.currency && errors.currency.message}</Errors>
        )}
      </div>
      <div className="field">
        <label htmlFor="criptocurrency">Modeda:</label>
        <select
          className={
            errors.criptocurrency
              && "error"
          }
          id="criptocurrency"
          aria-placeholder="Seleccione criptomoneda"
          {...register("criptocurrency", {
            required: "🚨Este campo es obligatorio",
          })}
        >
          <option value="">Seleccione:</option>
          {cryptocurrencies.map((cryptocurrency) => {
            return (
              <option
                key={cryptocurrency.CoinInfo.Name}
                value={cryptocurrency.CoinInfo.Name}
              >
                {cryptocurrency.CoinInfo.FullName}
              </option>
            );
          })}
        </select>
        {errors && (
          <Errors>
            {errors.criptocurrency && errors.criptocurrency.message}
          </Errors>
        )}
      </div>
      <button type="submit">Cotizar</button>
    </form>
  );
};
