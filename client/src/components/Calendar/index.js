import React, {Fragment, useState} from "react";
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
import DeluxeDouble from "../../assets/images/DeluxeDouble.jpg";
import SuperiorDouble from "../../assets/images/SuperiorDouble.jpg";
import SuperiorSuite from "../../assets/images/SuperiorSuite.jpg";






const ReactCalendar = () => {

    //Queries 
    const {data: resData } = useQuery(QUERY_RESERVATIONS); //Query all reservations
    const {data: roomData} = useQuery(QUERY_ROOMS); //Query all Rooms     
    const {data: userData} = useQuery(QUERY_ME_RES); //Query for current user
    const reservations = resData?.allReservations || []; //Store reservation return data in variable
    const rooms = roomData?.allRooms || [];  //Store rooms return data in variable
    const currentUser = userData?.me || []; 

    const reservationArr = [];  //Holds all known reservations
    const daysReq = [];  //The dates requesting to be reserved
    const roomCount = [];  //The amount of rooms the hotel has for specific roomType
    const noVancancy = [];  // Dates where there is no Vacancy
    const sortRoomArr = [];
    const navigate = useNavigate();
         
    reservationArr.push(reservations); //Push fetched reservations in Array// easier to work with

    //States
    const [date, setDate] = useState((new Date())); //tracks Calander date input
    const [reqReservation, setReqReservation] = useState([]); //Tracks input for requested reservation
    const [roomType, setRoomType] = useState("undefined");//Tracks which room is being chose from drop down menu
    const [isValid, setIsValid] = useState(false);   //Tracks if the Requested Reservation can be booked
    const [disabledDates, setDisabledDates] = useState([]); //Will be used to black out dates on Calander
    const [roomNumber, setRoomNumber]=useState(""); // How many rooms the selected roomType has
    const [stageRes, setStageRes]=useState(undefined); //Stage all reservation information in JSON obj before submit to Stripe
    const [calendarActive, setCalendarActive] = useState(false); // Calendar Toggle
    const [roomImg, setRoomImg] = useState("");


    //**Setting Reservation Information from Booking Box/Bar**//
    //Get requested dates from calendar by state change
    const getDates = (date) => {
      setDisabledDates([])
      setDate(date);
      setIsValid(false);
      setStageRes(undefined);
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

    //sets state roomType from drop down selection
    const roomChange = () => 
      {
      setDisabledDates([])
      setIsValid(false)
      let roomInput = document.querySelector('#rooms').value
      setRoomType(roomInput)
      let roomImg = roomType.replace(' ', "");
      setRoomImg(roomImg)
      }
  //**End of Setting information for Reservation**//

  //**Start Functions for RoomCards (props)**//

  const openRooms = rooms.find(room => room.roomType === roomType)
  //Calculate Price
  let totalPrice = ()=> { if(openRooms !== undefined){return (openRooms.price) * reqReservation.length}};
  //JSON OBJ for Res Staging
  const handleSelect = () => {
    let stageReservation = {
      checkIn : reqReservation[0],
      checkout: reqReservation[reqReservation.length-1],
      roomType: roomType,
      price: totalPrice(),
      }
    setStageRes(stageReservation)
    }
  //**End Room Cards**//

  //**Checking Availability **//

    const handleCheckAvailable = async () => {
      // event.preventDefault();
      setDisabledDates('');
      checkAvailable();
      setRoomNumber(roomCount)
    }

    //Checks to see if room is open
    const checkAvailable = () => {
      setStageRes(undefined)
      let matchingRes = []; //Array of all reservations that have selected roomType
      let blockedDates = []; //Array of all dates that a roomType is reserved for

      //Finds out the Room Count of chosen room type and pushes to array
        for (let r = 0; r < rooms.length; r++) {
        const roomMatched = (rooms[r].roomType);
        if(roomMatched === roomType){
          let roomNum = rooms[r].roomCount
          roomCount.length = 0;
          roomCount.push(roomNum)
        }}
  
      //Find all reservations that contain the resquested room type and put the matches in new array
      for (let i = 0; i < reservationArr[0].length; i++) {
        if(roomType === reservationArr[0][i].room){
          matchingRes.push(reservationArr[0][i])
        }}
        console.log(matchingRes)

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
          const dateRoomsArr = (Object.entries(count)); 
          // Take dates, roomcount and sort into JSON obj
          let sortedDateRoom = dateRoomsArr.map((a)=>{return {"date": a[0], "count":a[1]}}).sort(function(a, b){return a.count - b.count});
          let x = roomCount - sortedDateRoom[i].count;
          //If there are more reservations for that day than there are rooms. The reservation cannot be made
          if( sortedDateRoom[i].count >= roomCount[0]){
            console.log("There are",x,roomType,'rooms Left on ', sortedDateRoom[i].date)
            noVancancy.push(sortedDateRoom[i].date)
            setIsValid(false)
          } else if ( sortedDateRoom[i].count <= 4){
            console.log("There are",x,roomType,"rooms left on", sortedDateRoom[i].date )
            setIsValid(true)
          }
          else if (sortedDateRoom.length <= i+1 && noVancancy < 1){
            console.log("Room is available")
            setIsValid(true)
          }
         }
         setDisabledDates(noVancancy);
         console.log("There is No Vancancy for",roomType, "on the following dates",noVancancy)
        };

  //**End Check Availability **//

  //**Add Reservation**//
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
    //*End Add Reservation**//
    
    return (
      
      <cont>
      <main className="reservationPage">
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
        roomType={roomType}
        />
        </div>
        <h1>Select a Room</h1>
        <group>
          {isValid === false && disabledDates.length > 0 ? (
          <div className="noVacancy">
            <h3> We apologize for the inconvenience</h3>
            <h5>{roomType} rooms unavailable on:</h5>
            <ul>
              {disabledDates.join(' ✦ ')}
            </ul>
          </div>
          ) : (
          <RoomCards
          handleSelect={handleSelect}
          openRooms={openRooms}
          rooms={rooms}
          roomNumber={roomNumber}
          roomType={roomType}
          isValid={isValid}
          noVancancy={noVancancy}
          handleSubmit={handleSubmit}
          roomImg={roomImg}
          />)}
        </group>  
      </section>
      <section>
        <div className="priceCont">
        <div className="priceBox">
          <div>
            <h3>Your Stay</h3>
            {stageRes !== undefined && isValid === true ?(
            <div>
            <div>
              <p>Check-In : {stageRes.checkIn}</p>
              <p>Checkout-Out : {stageRes.checkout}</p>
            </div>
            <div>
              <p>{stageRes.roomType}</p>
            </div>
            <div>
              Total:${stageRes.price}.00
            </div>
            <button type="submit" onClick={(e)=> handleSubmit(e)}>Checkout</button>
          </div>) : (null)}
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