import React from "react";
import {Link} from "react-router-dom";
import DeluxeDouble from "../assets/images/DeluxeDouble.jpg";
import SuperiorDouble from "../assets/images/SuperiorDouble.jpg";
import SuperiorSuite from "../assets/images/SuperiorSuite.jpg";
import Header from "../components/Header/Header";


const Room = () => {

    return (
        <div className="roomPage">
            <Header/>
        <h1 className="">Come stay with us in our comfortable rooms!</h1>
        <h4 className="text-center my-5">Designed with you in mind, with comfortability and accessability at the forefront </h4>
        <h5 className="text-center my-5">Together with 24/7 front-desk service, The Sun Hotel is the place for you!</h5>
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="">
                        <img className="card-img-top" src={DeluxeDouble} alt="Deluxe Double hotel room" />
                        <div className="card-body">
                        <h5 className="card-title">Deluxe Double Room</h5>
                        <ul>
                            <li>Room Description:</li>
                            <li>Bed Type:</li>
                            <li>Room View:</li>
                            <li>Room Price: Click "Reserve Your Stay" for accurate pricing.</li>
                        </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="">
                        <img className="card-img-top" src={SuperiorDouble} alt="Superior Double hotel room" />
                        <div className="card-body">
                        <h5 className="card-title">Superior Double Room</h5>
                        <ul>
                            <li>Room Description:</li>
                            <li>Bed Type:</li>
                            <li>Room View:</li>
                            <li>Room Price: Click "Reserve Your Stay" for accurate pricing.</li>
                        </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="">
                        <img className="card-img-top" src={SuperiorSuite} alt="Superior Suite hotel room" />
                        <div className="card-body">
                        <h5 className="card-title">Superior Suite Room</h5>
                        <ul>
                            <li>Room Description:</li>
                            <li>Bed Type:</li>
                            <li>Room View:</li>
                            <li>Room Price: Click "Reserve Your Stay" for accurate pricing.</li>
                        </ul>
                        </div>
                    </div>
                </div>
                <Link to="/login"><button className="my-5">
                    Reserve Your Stay
                    </button>
                </Link>


                
            </div>
        </div>
        </div>
    )
};

export default Room;