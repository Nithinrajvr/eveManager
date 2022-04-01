import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Movies from './Components/Movies/Movies';
import Fandango from './Components/Movies/Fandango';
import Moviepost from './Components/Movies/Moviepost';
import Regi from './Components/User/Regi';
import Evepost from './Components/Evepost';
import axios from 'axios';
import Dashboard from './Components/User/Dashboard';
import Logout from './Components/User/Logout';
import EventHome from './Components/Events/EventHome';
import Ev from './Components/Events/Ev';
import Plays from './Components/Plays/Plays';
import ResetPassword from './Components/User/ResetPassword';
import Evdetails from './Components/Events/Evdetails';
import Dashboard2 from './Components/User/Dashboard2';
import Edevent from './Components/Edevent';
import Guestlist from './Components/User/Host/Guestlist';
import Navbar2 from './Components/Layout/Navbar2';
import Movieposter from './Components/Movies/Movieposter';
import Bookingmovie from './Components/Movies/Bookingmovie';
import ticket from './Components/Movies/ticket';
import Corporate from './Components/corporate/Corporate';
import Personal from './Components/personal/Personal';
function App() {
  return (
    <>
     
     
     <Router>
     <Switch>
  <Route exact path="/" component={Home}/>

      {/* <Route path="/" element={<App />} /> */}
      <Route path="/home" element={<Home />} />
      <Route path="/login" component={Login} />
      <Route path="/home" element={<Home />} />

      <Route path="/movies" component={Movies} />
      <Route path="/fmovies" component={Fandango} />
      <Route path="/register" component={Regi} />
      <Route path="/bookmovie" component={Bookingmovie} />
      <Route path="/tickets" component={ticket}/>

      

      <Route path="/logout" component={Logout} />
<Route path="/dashboard" component={Dashboard} />
<Route path="/dashboard2" component={Dashboard2} />


      <Route path="/postevent" component={<Evepost/>} />
      <Route path="/postmovie" component={Moviepost} />

      <Route path="/movieposter" component={Movieposter} />
      <Route path="/events" component={Ev} />
      <Route path="/forgot" element={<ResetPassword/>} />
      <Route path="/addevent" component={Evepost} />
      <Route path="/editevent" component={Edevent} />
      <Route path="/evedetails" component={Evdetails} />
      <Route path="/guestlist" component={Guestlist} />

      <Route path="/plays" component={Plays} />
      <Route path="/corporate" component={Corporate} />
      <Route path="/personal" component={Personal} />
      </Switch>
  </Router>
 
    </>
  );
}

export default App;
