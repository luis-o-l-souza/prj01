import axios from "axios";
import { MarketResponseSchema } from './schemas';

export const getCoins = async (page = 1) => {
    const { data } = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
            params: {
                page,
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 50,
                sparkline: true
            }
        }
    )
    

    return MarketResponseSchema.parse(data);
}