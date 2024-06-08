import { parse } from "valibot";
import axios from "axios";
import { CryptoCurrenciesResponseSchema, CryptoPriceSchema } from "../schema/crypto-schema";
import { Pair } from "../types";

export const getCryptos = async () => {
  const url =
    "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
  const {
    data: { Data },
  } = await axios.get(url);

  const result = parse(CryptoCurrenciesResponseSchema, Data);
  if (result) return result;
};

export const fetchCurrentCryptoPrice = async (pair:Pair) => {
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.criptocurrency}&tsyms=${pair.currency}`; 
  const {data: {DISPLAY}} = await axios.get(url);

  // console.log(DISPLAY[pair.criptocurrency][pair.currency]); // No siempre retorna el mismo orden; 

  const result = parse(CryptoPriceSchema, DISPLAY[pair.criptocurrency][pair.currency]);
  if(result)
    return result
}