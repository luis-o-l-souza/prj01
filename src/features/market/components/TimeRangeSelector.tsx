import { Button } from "@/components/ui/button";

export type TimeRange = 1 | 7 | 30 | 365;

interface Props {
    value: TimeRange;
    onChange: (val: TimeRange) => void;
    disabled?: boolean;
}

const ranges: { label: string, value: TimeRange }[] = [
    {
        label: '24H', value: 1
    },
    {
        label: '7D', value: 7
    },
    {
        label: '30D', value: 30
    },
    {
        label: '1YR', value: 365
    }
]

export const TimeRangeSelector: React.FC<Props> = ({ value, onChange, disabled }) => {
    return (
        <div className="flex items-center space-x-2 bg-muted/50 p-1 rounded-lg w-fit">
            {
                ranges.map(r => (
                    <Button key={r.value} variant={value === r.value ? 'default' : 'ghost'} size="sm" onClick={() => onChange(r.value)} disabled={disabled} className="h-8 text-xs font-medium">
                        {r.label}
                    </Button>
                ))
            }
        </div>
    )
}