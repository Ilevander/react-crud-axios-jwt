
import CustomerComponent from './components/CustomerComponent'
import './App.css'

function App() {

  
  return (
    <div>
      <h1 className="text-center">List Of customers</h1>
      <CustomerComponent load={load} customers={customers} />
    </div>
  )
}

export default App
