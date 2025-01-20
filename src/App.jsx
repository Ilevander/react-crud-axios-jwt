import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import NavBar from './components/NavBar';

function App() {

  //const [customers, setCustomers] = useState([]);

  /* manage side effects */
  // useEffect(() => {
  //   (async () => await load())();
  // }, []);

  // async function load() {
  //   const result = await CustomerService.get("/all");
  //   setCustomers(result.data);
  // }
  
  return (
    <div>
      <NavBar/>
    </div>
  );
}

export default App
