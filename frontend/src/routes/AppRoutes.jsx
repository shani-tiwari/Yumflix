import Home from '../pages/general/Home';
import Saved from '../pages/general/Saved';
import UserLogin from '../pages/auth/UserLogin';
import BottomNav from '../components/BottomNav';
import Profile from '../pages/food-partner/Profile';
import UserRegister from '../pages/auth/UserRegister';
import ChooseRegister from '../pages/auth/ChooseRegister';
import CreateFood from '../pages/food-partner/CreateFood';
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin';
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Accounts from '../pages/auth/Accounts';


function AppRoutes() {
  return (
    <Router>
        <Routes>
              <Route 
                path="/"                           
                element={<> <Home/><BottomNav/> </>} 
              />

              <Route 
                path="/register"                    
                element={<ChooseRegister/>} 
              />

              <Route 
                path="/auth/user/login" 
                element={<UserLogin/>} 
              />

              <Route 
                path="/auth/user/register" 
                element={<UserRegister/>} 
              />

              <Route 
                path="/auth/food-partner/register" 
                element={<FoodPartnerRegister/>} 
              />

              <Route 
                path="/auth/food-partner/login" 
                element={<FoodPartnerLogin/>} 
              />

              <Route 
                path="/saved" 
                element={<> <Saved/><BottomNav/> </>} 
              />

              <Route 
                path="/accounts" 
                element={<> <Accounts/> <BottomNav/> </>} 
              />

              <Route 
                path="/create-food" 
                element={<CreateFood/>} 
              />

              <Route 
                path="/auth/food-partner/:id" 
                element={<Profile/>} 
              />

        </Routes>
    </Router>
  )
}

export default AppRoutes
