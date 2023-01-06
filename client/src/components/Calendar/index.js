import React, {Fragment, useState} from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { eachDayOfInterval} from 'date-fns'
import moment from 'moment';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_RESERVATIONS, QUERY_ROOMS, QUERY_ME_RES } from "../../utils/queries";
import { ADD_RESERVATION } from "../../utils/mutations";
import { useNavigate } from "react-router-dom";
import BookNowBar from "../BookNowBar";
import "./calendar.css"
import RoomCards from "../RoomCards";






const ReactCalendar = () => {


    const reservationArr = [];  //Holds all know reservations
    const daysReq = [];  //The dates requesting to be reserved
    const roomCount = [];  //The amount of rooms the hotel has for specific roomType
    const noVancancy = [];  // Dates where there is no Vacancy
    const navigate = useNavigate();
    

        //Query all reservations
        const {data: resData } = useQuery(QUERY_RESERVATIONS);
        //Query all Rooms
        const {data: roomData} = useQuery(QUERY_ROOMS);
        //Query for current user
        const {data: userData} = useQuery(QUERY_ME_RES);
        //Return
        const reservations = resData?.allReservations || [];
        const rooms = roomData?.allRooms || [];
        const currentUser = userData?.me || [];
         
        
        
         //Push fetched reservations in Array for reference
        reservationArr.push(reservations);

    //States
    //tracks Calander date input
    const [date, setDate] = useState((new Date()));
    //Tracks input for requested reservation
    const [reqReservation, setReqReservation] = useState([]);
    //Tracks which room is being chose
    const [roomType, setRoomType] = useState("undefined");
    //Tracks if the Requested Reservation can be booked
    const [isValid, setIsValid] = useState(false);
    const [disabledDates, setDisabledDates] = useState([]);
    const [roomNumber, setRoomNumber]=useState("")

    const [calendarActive, setCalendarActive] = useState(false);

// const toggleCalendar = () =>{
//     if (!calendarActive){
//         setCalendarActive(true)
//     } else {
//     setCalendarActive(false)
// }
// console.log(calendarActive)}


    //sets state from string from drop down selection
    const roomChange = () => 
      {
      setDisabledDates([])
      setIsValid(false)
      let roomInput = document.querySelector('#rooms').value
      setRoomType(roomInput)
      }
    
    //Checks to see if room is open
    const checkAvailable = () => {
      //Array of all reservations that have selected roomType
      let matchingRes = [];
      //Array of all dates that a roomType is reserved for
      let blockedDates = [];
      console.log(roomType)
      console.log(rooms)
      //Finds out the Room Count of chosen room type and pushes to array
        for (let r = 0; r < rooms.length; r++) {
        const roomMatched = (rooms[r].roomType);
        if(roomMatched === roomType){
          let roomNum = rooms[r].roomCount
          //Reset roomCount Array, allows referenced room Count to vary based on room type 
          roomCount.length = 0;
          roomCount.push(roomNum)
          console.log(roomCount)
        }}
  
      //Find all reservations that contain the resquested room type and put the matches in new array
      for (let i = 0; i < reservationArr[0].length; i++) {
        if(roomType === reservationArr[0][i].room){
          matchingRes.push(reservationArr[0][i])
        }}

        //if No matches are found then the room is available.
       if (matchingRes.length < roomCount[0] || matchingRes.length === 0){
        console.log("Your room is available")
        setIsValid(true)
      } 
      //Loops through all matching reservations to find matching dates. Push dates to array
      for (let i = 0; i < matchingRes.length; i++) {
        const daysBooked = matchingRes[i].daysBooked;
          for (let j = 0; j < daysBooked.length; j++) {
            const date = daysBooked[j];
            if(reqReservation.includes(date)){
              blockedDates.push(date)}
            }}
            if(blockedDates < 1){
              console.log('Blocked dates less than one, room is available')
              setIsValid(true)
            }
            //Take all blocked dates and return an arr with that date and the number of rooms that have been reserved on that date
            const count = blockedDates.reduce((accumulator, value) => {
              return {...accumulator, [value]: (accumulator[value] || 0) + 1};
            }, {});
        //Loop through the dates and check which dates are booked full
         for (let i = 0; i < (Object.entries(count)).length; i++) {
          //dateRoomsArr will return the Date, dateRoomsArr[1] will return number of booked rooms for that date
          const dateRoomsArr = (Object.entries(count));
          //If there are more reservations for that day than there are rooms. The reservation cannot be made
          if( dateRoomsArr[i][1] >= 5){
            console.log("There are no",roomType,'rooms Left on ', dateRoomsArr[i][0])
            noVancancy.push(dateRoomsArr[i][0])
            setIsValid(false)
          } else if (dateRoomsArr.length <= i+1 && noVancancy < 1){
            console.log("Room is available")
            setIsValid(true)
          }
         }
         setDisabledDates(noVancancy);
         console.log(noVancancy)
        };

         //Trigger to Check if Room is open
    const handleCheckAvailable = async () => {
      // event.preventDefault();
      setDisabledDates('');
      checkAvailable();
      setRoomNumber(roomCount)
      console.log(roomNumber) 
    }

    //add Reservation
    const [addReservation, {err} ] = useMutation(ADD_RESERVATION, {
      update(cache, { data: { addReservation } }){}
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      getDates(date)
       let arrivalDate = reqReservation[0];
       let departureDate = reqReservation[reqReservation.length-1];
       let daysBooked = reqReservation;
       let room = roomType;

      try {
        await addReservation({
          variables: { arrivalDate, departureDate, daysBooked, room }
        })
      } catch (err) {
        console.error(err)
      } if (!err){
        //Redirect to Profile Page
        window.location.reload(navigate("/myprofile"));
      }
  
    };

    //Get requested dates from calendar by state change
    const getDates = (date) => {
        setDisabledDates([])
        setDate(date);
        setIsValid(false)
        let arrivalDate = (moment(date[0]).format("MM/DD/YYYY"));
        let departureDate = (moment(date[1]).format("MM/DD/YYYY"));
        let bookedDates = eachDayOfInterval({
          start: new Date(arrivalDate),
          end: new Date(departureDate)
        })
        for (let i = 0; i < bookedDates.length; i++) {
          const booked = (moment(bookedDates[i]).format("MM/DD/YYYY"));
          daysReq.push(booked);
        }      
        setReqReservation(daysReq);
        setCalendarActive(false)
    };

    return (
      <cont>
      <main>
      <section>
        <div className="resTop">
        <BookNowBar 
        handleCheckAvailable={handleCheckAvailable} 
        roomChange={roomChange} 
        getDates={getDates} 
        setCalendarActive={setCalendarActive} 
        calendarActive={calendarActive}
        setDate={setDate}
        date={date}
        reqReservation={reqReservation}
        roomType={roomType}/>
        </div>
        <h1>Select a Room</h1>
        <group>
          <RoomCards
          roomNumber={roomNumber}
          roomType={roomType}
          isValid={isValid}/>
        </group>  
      </section>
      <section>
        <div className="priceBox">
          <div>
            <h3>Your Stay</h3>
            <div>
              <p>Check-In : {reqReservation[0]}</p>
              <p>Checkout-Out : {reqReservation[reqReservation.length-1]}</p>
            </div>
            <div>
              <p>{roomType}</p>
            </div>
            <div>
              Total: $$$
            </div>
          </div>
        </div>
      </section>
      </main>
      </cont>
      );
    }
  
  export default ReactCalendar;

  // <div>
  //       <main className="light mobileBooking">
  //       <div>
  //         <h1 className='text-center'>Calendar</h1>
  //         <div>
  //           <Calendar
  //             id = "Calendar"
  //             onChange={getDates}
  //             selectRange={true}
  //             returnValue="range"
  //             // tileDisabled={disabledDates}
  //           />
  //         </div>
  //         <br/>
  //         {date.length > 0 ? (
  //           <p className='text-center'>
  //             <span>Start:</span>{' '}
  //             {date[0].toDateString()}
  //             &nbsp;|&nbsp;
  //             <span>End:</span> {date[1].toDateString()}
  //           </p>
  //         ) : (
  //           <p className='text-center'>
  //             <span>Default selected date:</span>{' '}
  //             {date.toDateString()}
  //           </p>
  //         )}
  //       </div>
  //     <div className="bookingMain">
  //     <div className="bookingCont">
  //       <div className="bookingBox">
  //           {/* Select Room type drop down*/}
  //           <div className="bookingDropdown">
  //             <label htmlFor="rooms">What type of room would you like?</label>
  //             <br/><br/>
  //             <select name="rooms" id="rooms" onChange={roomChange}>
  //               <option value="undefined">Choose Room Type</option>
  //               <option value="Deluxe Double">Deluxe Double Room</option>
  //               <option value="Superior Double">Superior Double Room</option>
  //               <option value="Superior Suite">Superior Suite Room</option>
  //             </select>
  //           </div>
  //           <br/>
  //           { isValid === true && roomType !== "undefined" && date.length > 0  ? ( 
  //           <div className="bookingBox">
  //             <span>
  //               Your Room is Available!
  //             </span>
  //           <br/>
  //       <button type="submit" onClick={handleSubmit}>Confirm your Booking!</button>
  //         </div>) : (
  //           <div>
  //           <br/><br/>
  //         <button type="click" onClick={handleCheckAvailable} >Check Available</button>
  //         </div>) }
  //         { (roomType === "undefined") && date.length > 1 ? (
  //         <span>
  //           <br/>
  //           Please Select a Room Type
  //         </span>
  //       ) : null}
  //     {(roomType !== "undefined") && date.length === undefined ? (
  //         <span>
  //           <br/>
  //             Please Select Dates     
  //         </span>
  //     ) : null } 
  //     { (roomType !== "undefined") && date.length > 0 && isValid === false && disabledDates.length < 0  ?(
  //       <span>
  //         <br/>
  //           Check if your Room is available.
  //       </span>
  //     ) : null }
  //     { (roomType === "undefined") && date.length === undefined ? (
  //       <span>
  //         <br/>
  //           Please Select Dates and Room
  //       </span>
  //     ) : null }
  //     { disabledDates.length > 0 && isValid === false ? (
  //       <span className="text-center">
  //         There are no {roomType} rooms Left on<br/> {'✦' + disabledDates.join(' ✦ ') + '✦'}</span>
  //       ) : null
  //     }
  //       </div>
  //     </div>
  //     </div>
  //       </main>
  //     </div>