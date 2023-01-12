import React from "react";
import DeluxeDouble from "../../assets/images/DeluxeDouble.jpg";
import SuperiorDouble from "../../assets/images/SuperiorDouble.jpg";
import SuperiorSuite from "../../assets/images/SuperiorSuite.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import './roomCards.css'
import {Row, Container, Col, Stack, Button} from 'react-bootstrap'


const RoomCards = (props) => {
    const roomDummyData = [
        {
            id: 0,
            name: "Deluxe Double",
            bed: "Queen Bed",
            view: "Standard",
            price: "$112.00",
            img: DeluxeDouble     
        },
        {
            id: 1,
            name: "Superior Double",
            bed: "King Bed",
            view: "Balcony",
            price: "$180.00", 
            img: SuperiorDouble    
        },
        {
            id: 2,
            name: "Superior Suite",
            bed: "2 Queen Beds",
            view: "Overview of the City",
            price: "$230.00",
            img: SuperiorSuite     
        }
    ] 

    let cards = [];
    const renderCards = () => {
        if (props.isValid===true){
    // const openRooms = props.rooms.find(room => room.roomType === props.roomType)
    for (let i = 0; i < props.roomNumber[0]; i++)
        {
        cards.push( <Stack key={i} gap={1} className="col-md-5">
        <Container>
            <Row key={props.openRooms.id}>
                <Row md="auto">
                    <Row className="card">
                        <img className="card-img-top" src={props.openRooms.img} alt="Superior Double hotel room" />
                        <div className="card-body">
                        <h5 className="card-title">{props.openRooms.roomType} Room</h5>
                        <div className="card-main">
                        <ul>
                            <li>Room Description:</li>
                            <li>Bed Type: {props.openRooms.bed}</li>
                            <li>View: {props.openRooms.view}</li>
                            <li>Room Price:{props.openRooms.price}.</li>
                        </ul>
                        <Button id="roomBtn" size="lg" type="submit" onClick={(e)=>props.handleSubmit(e)}>Select</Button>{' '}
                        </div>
                        </div>
                    </Row>
                </Row>
            </Row>
        </Container>
        </Stack>)
        }
    } 
    // else if (props.isValid === false) {
    //     cards.push(
    //     <Stack key={1} className="col-md-5">
    //     <Container>
    //         <Col>
    //             <Col md="auto">
    //                 <Col className="card">
    //                 <h5 className="card-title">We apologize for the inconvenience.</h5>
    //                     <div className="card-body">
    //                         <p>{props.noVacancy}</p>
    //                     <div className="card-main">
    //                     </div>
    //                     </div>
    //                 </Col>
    //             </Col>
    //         </Col>
    //     </Container>
    //     </Stack>)
    //     console.log("test")
    // }
}
renderCards()
 

    return (
        <div>
           {cards}
        </div>
            
    );

}

export default RoomCards;