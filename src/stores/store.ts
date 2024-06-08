import { create } from "zustand";
import { CryptoPrice, CurrenciesCrypto, Pair } from "../types";
import { devtools } from "zustand/middleware";
import { fetchCurrentCryptoPrice, getCryptos } from "../services/CryptoService";

type CryptoState = {
  cryptocurrencies: CurrenciesCrypto;
  fetchCryptos: () => Promise<void>;
  fetchData: (data: Pair) => Promise<void>;
  cryptoPriceResult: CryptoPrice;
  loader: boolean;
};

export const useCryptoStore = create<CryptoState>()(
  devtools((set) => ({
    cryptocurrencies: [],
    cryptoPriceResult: {} as CryptoPrice,
    loader: false,
    fetchCryptos: async () => {
      const cryptocurrencies = await getCryptos();
      set(() => ({
        cryptocurrencies: cryptocurrencies,
      }));
    },
    fetchData: async (data) => {
      set((state) => ({
        ...state,
        loader: true,
      }));
      
      const result = await fetchCurrentCryptoPrice(data);

      set((state) => ({
        ...state,
        cryptoPriceResult: result,
        loader: false,
      }));
    },
  }))
);
