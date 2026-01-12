import './App.css'
import { useQuery } from '@tanstack/react-query'
import { getCoins } from './features/market/api/get-coins'

function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['coins'],
    queryFn: () => getCoins(1)
  }); 
  
  console.log("Status: ", { isLoading, error, data });
  
  if (isLoading) return <div> Initing dashboard..... </div>

  return (
    <div className='p-10'>
        <h1 className='text-3xl font-bold'> Data Layer Connected </h1>
        <pre className='mt-4 p-4 bg-gray-100 rounded'>
          { JSON.stringify(data?.[0], null, 2)}
        </pre>
    </div>
  )
}

export default App
