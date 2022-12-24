import { React, useRef, useState, useEffect } from "react";
import Auth from "../../utils/auth"
import "./Navbar.css";
import logo from "../../assets/images/logo.png"
import { Link } from "react-router-dom";
import DropDown from "../DropDown";

const Header = () =>{


	const navRef = useRef();
	const [width, setWidth] = useState(window.innerWidth)
	const breakpoint = 750;
	const [isNavOpen, setIsNavOpen] = useState(false);



	useEffect(() => {
		setIsNavOpen(false)
		const handleResizeWindow = () => setWidth(window.innerWidth);
		 window.addEventListener("resize", handleResizeWindow);
		 return () => {
		   window.removeEventListener("resize", handleResizeWindow);
		 };
	   }, []);

	const toggleNavBar = () => {

		setIsNavOpen(!isNavOpen);
	  }


  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
		<div className="loginWrap">
        <div className="login">
            <Link to="/myprofile">
              Profile
            </Link>
            <a href="/" onClick={() => Auth.logout()}>
            Logout
          </a>
      </div>
	  </div>
      );
    } else {
      return(
		<div className="loginWrap">
        <div className="login">
            <Link to="/login">Login</Link>
        </div>
		</div>
      );
    }
  }

  if (width > breakpoint) {
	return (
		<header>
		<DropDown/>
		</header>
	)
}
// {
// 	return (<div>
// 		{isNavOpen === !true ? (
// 		<header>
// 		<div>
// 			<img src={logo} alt="Sun Hotel Logo"></img>
// 			</div>
// 			<button type= "submit" className="nav-btn" onClick={() => toggleNavBar() }>
				
// 			</button>
// 			</header>) : (
// 				<div>
// 					(
//     <div className="mobileNav">
//     <header ref={navRef}>
//         <div>
//     <img src={logo} alt="Sun Hotel Logo"></img>
//     </div>
//     <button type= "submit" className="nav-btn" onClick={() => toggleNavBar()}>
			
// 			</button>
//             </header>
//     <main className="mobileLinks">
//     <nav>
//         <Link to="/">Home</Link>
//         <Link to="/dining">Wine & Dine</Link>
//         <Link to="/rooms">Rooms & Suites</Link>
//         <Link to="/reservations">Reservation</Link>
//         <Link to="/review">Hotel Reviews</Link>
//         </nav>
//         </main>
//         </div>
//         )
// 				</div>)}
// 			</div>
// 	)
// }
}
export default Header;
