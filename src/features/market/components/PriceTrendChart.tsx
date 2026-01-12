import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { format } from 'date-fns';

interface PriceTrendChartsProps {
    data: { date: Date, price: number}[],
    isLoading?: boolean,
    color?: string;
}

const chartConfig = {
    price: {
        label: "Price (USD)",
        color: "hsl(var(--primary))",
    },
} satisfies ChartConfig;

export const PriceTrendChart: React.FC<PriceTrendChartsProps> = ({
    data,
    isLoading,
    color = "#2563eb"
}) => {

    const domain = useMemo(() => {
        if (!data.length) return [0, 0];

        const prices = data.map(d => d.price);

        return [Math.min(...prices) * 0.99, Math.max(...prices) * 1.01];
    }, [data]);

    if (isLoading) {
        return (
            <div className="h-[300px] w-full bg-gray-100/50 animate-pulse rounded-lg flex items-center justify-center text-muted-foreground" role="status" aria-label="Loading chart data">
                Loading market history...
            </div>
        )
    }
    return  (
        <div className="w-full h-87.5">
            <div className="sr-only">
                Line chart showing price history.
                Start price: ${data[0]?.price.toFixed(2)}.
                End price: ${data[data.length - 1]?.price.toFixed(2)}
            </div>
            <ChartContainer config={chartConfig} className="h-full w-full">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0}}
                >
                    <defs>
                        <linearGradient id="fillPrice" x1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.3}></stop>
                            <stop offset="98%" stopColor={color} stopOpacity={0}></stop>
                        </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.5} />
                    
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} minTickGap={32} tickFormatter={(value) => format(value, "MMM dd")} />
                    <YAxis domain={domain} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value.toLocaleString()}`} width={60} />
                    
                  <ChartTooltip cursor={false} content={
                        <ChartTooltipContent labelFormatter={(_, payload) => format(new Date(payload?.[0].payload.date),'PPP pp')} />
                    } />

                    <Area dataKey="price" type="monotone" stroke={color} fill="url(#fillPrice)" strokeWidth={2} />


                </AreaChart>
            </ChartContainer>
        </div>
    )
}