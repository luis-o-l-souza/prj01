import type { Meta, StoryObj } from "@storybook/react-vite";
import { PriceTrendChart } from "./PriceTrendChart";
import { subDays } from "date-fns";

const meta: Meta<typeof PriceTrendChart> = {
    title: 'Features/Market/PriceTrendChart',
    component: PriceTrendChart,
    tags: ['autodocs']
}

export default meta;

type Story = StoryObj<typeof PriceTrendChart>;

const generateHistory = (days: number) => {
    const data = [];
    let price = 50000;

    for (let i = days; i >= 0; i--) {
        price = price + (Math.random() - 0.5) * 1000;
        data.push({
            date: subDays(new Date(), i),
            price: price
        })
    }

    return data;
}

export const OneMonth: Story = {
    args: {
        data: generateHistory(30),
        isLoading: false,
    }
}

export const OneYear: Story = {
    args: {
        data: generateHistory(365),
        isLoading: false,
        color: "#16a34a"
    }
}

export const Loading: Story = {
    args: {
        data: [],
        isLoading: true
    }
}