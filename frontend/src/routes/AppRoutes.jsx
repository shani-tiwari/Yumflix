import React, {Suspense} from 'react';

const Home                = React.lazy(() => import('../pages/general/Home'));
const Saved               = React.lazy(() => import('../pages/general/Saved'));
const Accounts            = React.lazy(() => import('../pages/auth/Accounts'));
const UserLogin           = React.lazy(() => import('../pages/auth/UserLogin'));
const UserRegister        = React.lazy(() => import('../pages/auth/UserRegister'));
const ChooseRegister      = React.lazy(() => import('../pages/auth/ChooseRegister'));
const Profile             = React.lazy(() => import('../pages/food-partner/Profile'));
const FoodPartnerLogin    = React.lazy(() => import('../pages/auth/FoodPartnerLogin'));
const CreateFood          = React.lazy(() => import('../pages/food-partner/CreateFood'));
const FoodPartnerRegister = React.lazy(() => import('../pages/auth/FoodPartnerRegister'));

import BottomNav from'../components/BottomNav';
import Loading from '../pages/general/Loading';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<Loading/>}>
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
                path="/food-partner/:id" 
                element={<> <Profile/> <BottomNav/> </>} 
              />

        </Routes>
      </Suspense>
    </Router>
  )
}

export default AppRoutes
