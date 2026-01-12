import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import clsx from "clsx";
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "lucide-react";

interface MetricCardProps {
    title: string;
    value: string | number;
    change?: number;
    icon?: React.ReactNode
    isLoading?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
    title,
    value,
    change,
    icon,
    isLoading
}) => {
    if (isLoading) {
        return <div className="h-32 rounded-xl bg-muted/50 animate-pulse"></div>
    }

    const isPositive = change && change > 0;
    const isNeutral = change === 0 || change === undefined;

    const TrendIcon = isNeutral ? MinusIcon : isPositive ? ArrowUpIcon : ArrowDownIcon;
    const trendColor = isNeutral ? 'text-muted-foreground' : isPositive ? 'text-green-500' : 'text-red-500';

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                {icon && <div className="text-muted-foregound">{icon}</div>}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                { change !== undefined && (
                    <div className={clsx('flex items-center text-xs mt-1', trendColor)}>
                        <TrendIcon className="mr-1 h-3 w-3" />
                        {Math.abs(change).toFixed(2)}%
                        <span className="text-muted-foreground ml-1"> from yesterday </span>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}