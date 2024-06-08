import { InferOutput } from "valibot";
import { CryptoCurrenciesResponseSchema, CryptoPriceSchema, CurrencySchema, PairSchema } from "../schema/crypto-schema";

export type Currency = InferOutput<typeof CurrencySchema>
export type CurrenciesCrypto = InferOutput<typeof CryptoCurrenciesResponseSchema>
export type Pair = InferOutput<typeof PairSchema>
export type CryptoPrice = InferOutput<typeof CryptoPriceSchema>