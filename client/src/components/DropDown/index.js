import React, {useRef, useState} from "react";
import "./DropDown.module.css"
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaUserAlt} from "react-icons/fa";
import { BiDrink, } from "react-icons/bi";
import { MdOutlineBedroomParent, MdOutlineRateReview } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";



const DropDown = () => {
    const navRef = useRef();
    const [isOpen, setIsOpen] = useState(false);
	const toggleNavBar = () => {

		setIsOpen(!isOpen);
	  }


    return (
        <div>
        { isOpen === true ? (
        <thead className="divbtn">
            <button type= "submit" onClick={() => toggleNavBar()}>
				<FaBars/>
            </button>
        </thead>
        ) : (
			<div>
			<hgroup>
            <button type= "submit" className="navbtn" onClick={() => toggleNavBar()}>
				<FaBars/>
			</button>
				<Link classname="icon" to="/"><FaHome/></Link>
				<Link classname="icon" to="/dining"><BiDrink/></Link>
				<Link classname="icon" to="/rooms"><MdOutlineBedroomParent/></Link>
				<Link classname="icon" to="/reservations"><BsCalendar2Date/></Link>
				<Link classname="icon" to="/review"><MdOutlineRateReview/></Link>
				<Link className="icon" to="/myprofile"><FaUserAlt/></Link>
			</hgroup> 
			</div>
			)}
        </div>
    );
       
}

export default DropDown;