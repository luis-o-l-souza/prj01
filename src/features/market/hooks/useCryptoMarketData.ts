import { useQuery } from "@tanstack/react-query";
import { getCoins } from "../api/get-coins";
import type { Coin } from "../api/schemas";

export const useCryptoMarketData = () => {
    return useQuery<Coin[], Error>({
        queryKey: ['market-data'],
        queryFn: () => getCoins(1),
        staleTime: 1000 * 60
    })
}