import './App.css'
import { useCryptoMarketData } from './features/market/hooks/useCryptoMarketData'
import { VirtualDataGrid } from './components/common/VirtualDataGrid';

function App() {
  const { data, isLoading } = useCryptoMarketData();

  return (
    <main className='container mx-auto p-10'>
      <h1 className='text-3xl font-bold mb-6'>PRJ01</h1>
      <VirtualDataGrid data={data || []} isLoading={isLoading} />
    </main>
  )
}

export default App
