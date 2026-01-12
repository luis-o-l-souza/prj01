import type { Meta, StoryObj } from "@storybook/react-vite";
import { VirtualDataGrid } from "./VirtualDataGrid";
import type { Coin } from "@/features/market/api/schemas";

const meta: Meta<typeof VirtualDataGrid> = {
    title: 'Features/Market/VirtualDataGrid',
    component: VirtualDataGrid,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof VirtualDataGrid>;

const generateMockCoins = (count: number): Coin[] => {
    return Array.from({ length: count }).map((_, i) => ({
        id: `coin-${i}`,
        symbol: 'tst',
        name: `Test Coin ${i + 1}`,
        image: 'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png',
        current_price: 1000 + Math.random() * 5000,
        market_cap: 100000000,
        market_cap_rank: i + 1,
        total_volume: 50000000,
        high_24h: 6000,
        low_24h: 900,
        price_change_percentage_24h: (Math.random() * 20) - 10
    }))
}

export const Default: Story = {
    args: {
        data: generateMockCoins(10),
        isLoading: false
    }
}

export const LargeDataset: Story = {
    args: {
        data: generateMockCoins(1000),
        isLoading: false
    }
}

export const Loading: Story = {
    args: {
        data: [],
        isLoading: true
    }
}