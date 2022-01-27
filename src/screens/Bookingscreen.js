import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../index.css";
import Loader from "react-spinners/RingLoader";
import Error from "../components/Error";
import moment from "moment";

function Bookingscreen() {
  const [room, setRooms] = useState('');
  const [loading, setLoading] = useState('');
  const [error, setError] = useState(false);
  const { roomid , fromdate, todate} = useParams();

  const fmdate = moment(fromdate, 'DD-MM-YYY');
  const tdate = moment(todate, 'DD-MM-YYY');

  const totaldays = moment.duration(tdate.diff(fmdate)).asDays() + 1;
  const [totalamount, settotalamount] = useState();

  useEffect(() => {

    const user = localStorage.getItem('user');

    if(!user){
      window.location.href="/login";
    }

    async function fetchData() {
      try {
        setLoading(true);
        const data = (
          await axios.post("http://localhost:4000/api/v1/getroombyid", {
            roomid: roomid,
          })
        ).data.result;
        settotalamount(totaldays * data.rentperday)
        console.log(roomid);
        setRooms(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function bookRoom(){
    const bookingDetails = {
      room, 
      userid: localStorage.getItem('userid'),
      fromdate,
      todate,
      totalamount,
      totaldays
    }

    try {
      const result = await axios.post('http://localhost:4000/api/v1/bookings/bookroom', bookingDetails)
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="m-5">
      
      {loading ? (
        <h1 className="text-center my-auto"><Loader/></h1>
      ) : error ? (
        <h1><Error/></h1>
      ) : (
        <div className="row justify-content-center bs">
          <div className="col-md-5 imagediv">
            <b>
              <p className="py-2 font-extrabold">{room.name}</p>
            </b>
            <img src={room.imageurls[0]} className="bigimg" />
          </div>
          
            <div className="col-md-5" style={{ textAlign: "right", marginTop: 32}}>
              <h3 className="text-2xl font-bold">Booking Details</h3>
              <hr />
              <b>
                <p className="py-2">Name : {localStorage.getItem('user')}</p>
                <p className="py-2">From Date : {fromdate}</p>
                <p className="py-2">To Date : {todate}</p>
                <p className="py-2">Max Count : {room.maxcount}</p>
              </b>
              <div style={{ textAlign: "right"}}>
              <b>
                <h1 className="text-2xl">Amount</h1>
                <hr />
                <p className="py-2">Total Days : {totaldays}</p>
                <p className="py-2">Rent per day : {room.rentperday}</p>
                <p className="py-2">Total amount : {totalamount}</p>
              </b>
            </div>
            
            <div>
              <button className="btn btn-primary" onClick={bookRoom}>Pay Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookingscreen;
