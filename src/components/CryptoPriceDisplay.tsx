import { useMemo } from "react";
import { useCryptoStore } from "../stores/store";
import { Spinner } from "./Spinner";

export const CryptoPriceDisplay = () => {
  const [cryptoPriceResult, loader] = useCryptoStore((state) => [
    state.cryptoPriceResult,
    state.loader,
  ]);
  const resultExist = useMemo(
    () =>
      Object.keys(cryptoPriceResult).length > 0 &&
      !Object.values(cryptoPriceResult).includes(""),
    [cryptoPriceResult]
  );

  return (
    <div className="result-wrapper">
      {loader ? (
        <Spinner />
      ) : (
        resultExist && (
          <>
            <h2>Cotización</h2>
            <div className="result">
              <img
                src={`https://cryptocompare.com/${cryptoPriceResult.IMAGEURL}`}
                alt="Imagen de criptomoneda"
                title="Imagen de criptomoneda"
              />
              <div>
                <p>
                  El precio es de: <span>{cryptoPriceResult.PRICE}</span>
                </p>
                <p>
                  Precio más alto: <span>{cryptoPriceResult.HIGHDAY}</span>
                </p>
                <p>
                  Precio más bajo: <span>{cryptoPriceResult.LOWDAY}</span>
                </p>
                <p>
                  Cambio de 24 horas:{" "}
                  <span>{cryptoPriceResult.CHANGEPCT24HOUR}</span>
                </p>
                <p>
                  Última actualización:
                  <span>{cryptoPriceResult.LASTUPDATE}</span>
                </p>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};
