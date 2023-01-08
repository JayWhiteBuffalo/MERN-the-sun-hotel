import React from "react"; 
import "./dining.css";
import { BiDrink, } from "react-icons/bi";
import BookNowBox from "../BookNowBox";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../BookNowBox/bnb.css"

const Cuisine = () => {

    return (
        <div className = "top">
        <div className="dine-wrap">
            <div className="dine-left-text">
        <h1 className="text-center text-success my-5" >EAT<BiDrink className="drink"/></h1>|
        <h1 className="text-center text-success my-5" >PLAY</h1>
        <br/>
        <br/>
        <h1 className="text-center text-success " >LOVE</h1>
        <h1 className="text-center text-success " >MEET</h1>
        <h2 className="text-center" >BOOK</h2>
            </div>
        <div className="dine-right">
        <main className="dine-head1">
            <div>
                <img className="img1" src="https://images.pexels.com/photos/3201919/pexels-photo-3201919.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Card image cap" />
            </div>
        </main>
        <main className="dine-head2">
            <div>
                <img className="img1" src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Card image cap"/>
            </div>
        </main>
        <main className="dine-head3">
            <div>
                <img className="img1" src="https://images.pexels.com/photos/3201920/pexels-photo-3201920.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Card image cap"/>
            </div>
        </main>
        <div className="dining-txt">
                <h3>Our restaurant is open till mindnight!</h3>
                <br/>
                <h4>A good place for business dinner</h4>
                <br/>
                <h5>A bright and open atmosphere</h5>
                <br/>
                <h3>A perfect place to grab a drink</h3>
                <br/>
                <h2> Our hospitable staff have got you covered!</h2>
            </div>
        <main className="dine-head4">
            <div>
                <img className="img1" src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Card image cap"/>
            </div>
            <div className="diningBook">
        <BookNowBox/>
        </div>
        </main>
        
        </div>
        </div>
        {/* <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <div className="card">
                        <img className="card-img-top" src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Card image cap" />
                        <div className="card-body">
                        <h5 className="card-title">Our restaurant is open till mindnight!</h5>
                        <p className="card-text">Fancy a night cap or a night snack? Our hospitable staff have got you covered!</p>
                        
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <img className="card-img-top" src="https://images.pexels.com/photos/3201920/pexels-photo-3201920.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Card image cap" />
                        <div className="card-body">
                        <h5 className="card-title">A good place for business dinner:</h5>
                        <p className="card-text">Looking to conduct a business dinner? We have got good food& drinks to keep your business partner happy!</p>
                        
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <img className="card-img-top" src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Card image cap" />
                        <div className="card-body">
                        <h5 className="card-title">A perfect place to grab a drink</h5>
                        <p className="card-text">Come grab a drink at our bar to unwind after a day exploring the city!</p>
                        
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <img className="card-img-top" src="https://images.pexels.com/photos/3201919/pexels-photo-3201919.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Card image cap" />
                        <div className="card-body">
                        <h5 className="card-title">A bright and open atmosphere</h5>
                        <p className="card-text">We pride ourselves in a peaceful ambiance where you could spend time with loved ones</p>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div> */}
        </div>
    )
};

export default Cuisine;