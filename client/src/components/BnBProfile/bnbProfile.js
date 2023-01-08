import React, {useState} from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import { FaCalendar } from "react-icons/fa";
import { Link } from "react-router-dom";
import moment from "moment";
import "./bnbProfile.css"

import 'react-calendar/dist/Calendar.css';

const BnbProfile = () => {

const [calendarActive, setCalendarActive] = useState(false);

//tracks Calander date input
const [date, setDate] = useState((new Date()));
const [arriveDate, setArriveDate] = useState("");
const [departDate, setDepartDate] = useState("");

const toggleCalendar = () =>{
    if (!calendarActive){
        setCalendarActive(true)
    } else {
    setCalendarActive(false)
}}

//Get requested dates from calendar by state change
const getDate = (date) => {
     setDate(date);
     let Arrive = (moment(date[0]).format("MM/DD/YYYY"));
     let Depart = (moment(date[1]).format("MM/DD/YYYY"));
     setArriveDate(Arrive)
     setDepartDate(Depart)
     setCalendarActive(false)
     ;
};

const handleClick = () => {

}



return (

    <div className="bnbCont">
        <div className="bnpBox">
            <div className="bnpArrival">
                <div>
                <FaCalendar/>
                <input  type="text" placeholder="Arrive" defaultValue={arriveDate} onFocus={toggleCalendar}></input>
                </div>
                <div>
                <FaCalendar/>
                <input  type="text" placeholder="Depart" defaultValue={departDate} onFocus={toggleCalendar}></input>
                </div>
            </div>
            {calendarActive === true ? (<div>
                <Calendar
                    id = "Calendar"
                    onChange={getDate}
                    onBlur={toggleCalendar}
                    selectRange={true}
                    returnValue="range"/>
                    </div>) : ( <div>
            <div className="bnpRooms">
            <select name="rooms" id="rooms">
                <option value="undefined">Select Room Type</option>
                <option value="Deluxe Double">Deluxe Double Room</option>
                <option value="Superior Double">Superior Double Room</option>
                <option value="Superior Suite">Superior Suite Room</option>
              </select>
            </div>
            <Link to="/reservations">
            <button> Book Now</button>
            </Link>
           </div> ) }
        </div>
    </div>

    )

}

export default BnbProfile;