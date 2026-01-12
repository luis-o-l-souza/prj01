import './App.css'
import { useCryptoMarketData } from './features/market/hooks/useCryptoMarketData'
import { VirtualDataGrid } from './features/market/components/VirtualDataGrid';
import { type TimeRange, TimeRangeSelector } from './features/market/components/TimeRangeSelector';
import { PriceTrendChart } from './features/market/components/PriceTrendChart';
import { useState } from 'react';
import { useCoinHistory } from './features/market/hooks/useCoinHistory';
import { ModeToggle } from './components/ui/mode-toggle';
import { MetricCard } from './features/market/components/MetricCard';
import { Activity, DollarSign, TrendingUp } from 'lucide-react';

function App() {
  const { data: gridData, isLoading: isLoadingGrid } = useCryptoMarketData();

  const [range, setRange] = useState<TimeRange>(30);
  const { data: chartData, isLoading: isLoadingChart } = useCoinHistory('bitcoin', range);
  

  const topCoin = gridData?.[0];
  const globalMarketCap = gridData?.reduce((acc, coin) => acc + coin.market_cap, 0) || 0;
  const totalVolume = gridData?.reduce((acc, coin) => acc + coin.total_volume, 0) || 0;


  return (
    <div className='min-h-screen bg-background text-foreground transition-colors duration-300'>
      <header className='border-b'>
        <div className='container mx-auto py-4 flex items-center justify-between'>
          <div className='flex items-center gap-2'>

          <h1 className='text-xl font-bold'>Testing the pipeline!!!</h1>
          </div>
          <ModeToggle />
        </div>
      </header>
      <main className='container mx-auto py-8 space-y-8'>
        <div className='grid gap-4 md:grid-cols-3'>
            <MetricCard title='Market leader (BTC)' value={`$${topCoin?.current_price.toLocaleString() ?? '0.00'}`} change={topCoin?.price_change_percentage_24h ?? 0} isLoading={isLoadingGrid} icon={<DollarSign className='h-4 w-4'/>} />
            <MetricCard title='Total Market Cap' value={`$${(globalMarketCap/1e12).toFixed(2)}T`} change={2.4} isLoading={isLoadingGrid} icon={<TrendingUp className='h-4 w-4' />} />
            <MetricCard title='24h Volume' value={`$${(totalVolume/ 1e9).toFixed(2)}B`}  isLoading={isLoadingGrid} icon={<Activity className='h-4 w-4' />} />
        </div>
        
        <div className='grid gap-4 md:grid-cols-7'>

          <div className='md:col-span-4 space-y-4'>
            <div className='flex items-center justify-between'>
                <h2>Bitcoin Price Trend</h2>
                <TimeRangeSelector value={range} onChange={setRange} disabled={isLoadingChart} />
            </div>
            <div className='p-6 border rounded-xl bg-card shadow-sm'>
              <PriceTrendChart data={chartData || []} isLoading={isLoadingChart} />

            </div>
          </div>
          
          <div className='md:col-span-3 space-y-4'>
            <h2 className='text-lg font-semibold'>
              Top Assets
            </h2>
            <VirtualDataGrid data={gridData || []} isLoading={isLoadingGrid} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
