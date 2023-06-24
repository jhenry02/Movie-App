import './App.css';
import { UserContextProvider } from './Context/UserContext';
import MyNavbar from './components/navbar/Navbar'
import MyFooter from './components/footer/Footer'

function App() {
  return (
    <div className="page-container"> {/* This div holds a class towards the div's for containter of the app itself within the css. */}
      <div className="content-wrap"> {/* This div holds a class towards the div's for page content when routed, formated within the css. */}
        <UserContextProvider> {/*Creates Scope so that child components can use Auth and setAuth */}
          <MyNavbar className='navbar'/>
        </UserContextProvider>
      </div>
      <MyFooter /> {/* This component loads the footer. */}
    </div>
  );
}

export default App;
