import '../../styles/auth-shared.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email    = e.target.email.value;
        const password = e.target.password.value;
        const fullName = e.target.fullname.value;
        // const lastName = e.target.lastName.value;

        const response = await axios.post("http://localhost:3000/auth/user/register", {
            email,
            fullName,
            password
        },
        {
            withCredentials: true // save cookies
        });

        // console.log(response.data);
        navigate("/auth/user/login");

    };

    return (
        <div className="auth-page-wrapper">
            <div className="auth-card" role="region" aria-labelledby="user-register-title">
                <header>
                    <h1 id="user-register-title" className="auth-title">Create your account</h1>
                    <p className="auth-subtitle">Join to explore and enjoy delicious meals.</p>
                </header>
                <nav className="auth-alt-action" style={{ marginTop: '-4px' }}>
                    <strong style={{ fontWeight: 600 }}>Switch:</strong> <Link to="/auth/user/register">User</Link> • <Link to="/auth/food-partner/register">Food partner</Link>
                </nav>
                <form className="auth-form" onSubmit={handleSubmit} noValidate>
                    <div className="two-col">
                        <div className="field-group">
                            <label htmlFor="firstName">Full Name</label>
                            <input id="firstName" name="fullname" placeholder="Jane Doe" autoComplete="given-name" />
                        </div>
                        {/* <div className="field-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input id="lastName" name="lastName" placeholder="Doe" autoComplete="family-name" />
                        </div> */}
                    </div>
                    <div className="field-group">
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" />
                    </div>
                    <div className="field-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" placeholder="••••••••" autoComplete="new-password" />
                    </div>
                    <button className="auth-submit" type="submit">Sign Up</button>
                </form>
                <div className="auth-alt-action">
                    Already have an account? <Link to="/auth/user/login">Sign in</Link>
                </div>
            </div>
        </div>
    );
};

export default UserRegister;