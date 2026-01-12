import axios from "axios";
import { MarketChartSchema, type MarketChart } from "./schemas";

export const getMarketChart = async (coinId: string, days: number): Promise<MarketChart> => {
    const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
        {
            params: {
                vs_currency: 'usd',
                days: days
            }
        }
    );
    
    return MarketChartSchema.parse(data);
}