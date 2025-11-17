import '../../styles/Accounts.css';
import '../../styles/auth-shared.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Accounts() {
    const navigate = useNavigate();

    const logout = (e) => {
        e.preventDefault();
        document.cookie = "token=; path=/;"; //expires=Thu, 01 Jan 1970 00:00:00 UTC";
        navigate('/');
    };

  return (
    <div className='.auth-page-wrapper'>

        <div className="account-card">
            <button className="logout-btn" onClick={logout}>Logout</button>
            <div className="account-type-container">
                <span className="account-type-label">Change Account Type</span>
                <ul className="account-type-list">
                    - <Link to="/auth/user/register">User </Link> 
                    - <Link to="/auth/food-partner/register"> Food partner</Link>
                </ul>
            </div>
        </div>
        
    </div>
  )
}

export default Accounts
