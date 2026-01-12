import { z } from 'zod';


export const CoinSchema = z.object({
    id: z.string(),
    symbol: z.string(),
    name: z.string(),
    image: z.url(),
    current_price: z.number(),
    market_cap: z.number(),
    market_cap_rank: z.number(),
    total_volume: z.number(),
    high_24h: z.number().nullable(),
    low_24h: z.number().nullable(),
    price_change_percentage_24h: z.number().nullable(),
    sparkline_in_7d: z.object({
        price: z.array(z.number())
    }).optional()    
});

export const MarketResponseSchema = z.array(CoinSchema);

export const MarketChartSchema = z.object({
    prices: z.array(z.tuple([z.number(), z.number()])),
    market_caps: z.array(z.tuple([z.number(), z.number()])),
    total_volumes: z.array(z.tuple([z.number(), z.number()]))
})

export type Coin = z.infer<typeof CoinSchema>;
export type MarketChart = z.infer<typeof MarketChartSchema>;