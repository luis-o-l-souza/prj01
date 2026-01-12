import { useQuery } from "@tanstack/react-query";
import { getMarketChart } from "../api/get-market-chart";

export const useCoinHistory = (coinId: string, days: number) => {
    return useQuery({
       queryKey: ['coin-history', coinId, days],
       queryFn: () => getMarketChart(coinId, days),
        staleTime: 1000 * 60 * 5,
        select: (data) => {
            return data.prices.map(([timestamp, price]) => ({
                date: new Date(timestamp),
                price,
            }))
        }
    })
}