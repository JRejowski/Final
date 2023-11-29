import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './Login';
import Register from "./Register";
import Main from "./Main";
import Plans from "./Plans";
import Exercises from "./Exercises";
import User from "./User";
import Settings from "./Settings";
import UserPlans from "./UserPlans";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/plans" element={<Plans/>}/>
            <Route path="/exercises" element={<Exercises/>}/>
            <Route path="/user" element={<User/>}/>
            <Route path="/user-settings" element={<Settings/>}/>
            <Route path="/user-plans" element={<UserPlans/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
