import React from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import { FaCalendar } from "react-icons/fa";
import 'react-calendar/dist/Calendar.css';
import "./bnbar.css"
const BookNowBar = (props) => {

const toggleCalendar = () =>{
    if (!props.calendarActive){
        props.setCalendarActive(true)
    } else {
    props.setCalendarActive(false)
}}

const handleChange = () => {
    let roomType = document.getElementById("rooms").value
    props.roomChange(roomType)
}

const handleCheckSubmit = () => {
    props.handleCheckAvailable();
}


return (
    <div>
    <div className="bnbarCont">
        <div className="bnbBar">
            <div className="bnbarArrival">
                <div>
                <FaCalendar/>
                <input  type="text" placeholder="Arrive" 
                defaultValue={props.reqReservation[0]} 
                onFocus={toggleCalendar}></input>
                </div>
                <div>
                <FaCalendar/>
                <input  type="text" placeholder="Depart" 
                defaultValue={props.reqReservation[props.reqReservation.length-1]} 
                onFocus={toggleCalendar}></input>
                </div>
            </div>
                         <div>
            <div className="bnbarRooms">
            <select name="rooms" id="rooms" onChange={handleChange}>
                <option value="undefined">Select Room Type</option>
                <option value="Deluxe Double">Deluxe Double Room</option>
                <option value="Superior Double">Superior Double Room</option>
                <option value="Superior Suite">Superior Suite Room</option>
              </select>
            </div>
           </div> 
           <button onClick={handleCheckSubmit}> Check Rooms</button>
        </div>
    </div>
    {props.calendarActive === true ? (<div className="calendarCont">
                <Calendar
                    id = "Calendar"
                    onChange={props.getDates}
                    onBlur={toggleCalendar}
                    selectRange={true}
                    returnValue="range"/>
                    </div>) : ( null )}
    </div>

    )

}

export default BookNowBar;