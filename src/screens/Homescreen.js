import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "react-spinners/RingLoader";
import Error from "../components/Error";
import "antd/dist/antd.css";
import { DatePicker, Space } from "antd";
import moment, { months } from "moment";
const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [duplicaterooms, setduplicaterooms] = useState();
  const [searchKey, setSearchKey] = useState('');
  const [type, setType] = useState('all')

  useEffect(async () => {
    try {
      setLoading(true);
      const data = (
        await axios.post("https:/hotelwebsite-backend.herokuapp.com/api/v1/getallrooms", {})
      ).data.result;
      setRooms(data);
      setduplicaterooms(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  }, []);

  function filterbytype(e){

    setType(e); 
    if(e !== 'all'){
      const temprooms = duplicaterooms.filter(room => room.type.toLowerCase() == e.toLowerCase())

      setRooms(temprooms);
    }else{
      setRooms(duplicaterooms);
    }
  }

  function filterbysearch(){
    const temprooms = duplicaterooms.filter(room=> room.name.toLowerCase().includes(searchKey.toLocaleLowerCase()));

    setRooms(temprooms);
  }

  function filterbydate(dates) {
    setfromdate(moment(dates[0]).format("DD-MM-YYYY"));
    settodate(moment(dates[1]).format("DD-MM-YYYY"));

    var temprooms = [];
    var availability = false;
    for (const room of duplicaterooms) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (
            !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            ) &&
            !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            )
          ) {
            if (
              moment(dates[0]).format("DD-MM-YYYY") !== booking.fromdate &&
              moment(dates[0]).format("DD-MM-YYYY") !== booking.todate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.fromdate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.todate
            ) {
              availability = true;
            }
          }
        }
      }

      if (availability == true || room.currentbookings.length == 0) {
        temprooms.push(room);
      }

      setRooms(temprooms);
    }
  }

  return (
    <div className="container">
      <div className="sticky z-50 top-2 bg-white row mt-5 bs w-4/5 border-black border-2 mx-auto">
        <div className="col-md-3 mx-auto">
          <RangePicker format="DD-MM-YY" onChange={filterbydate} />
        </div>

        <div className="col-md-5 border-2 text-center border-black ">
          <input  className="text-center  w-full outline-0"
          onChange={(e) => {setSearchKey(e.target.value)}} onKeyUp={filterbysearch}
          value={searchKey} type="text" placeholder="Search" />
        </div>

        <div className="col-md-3 text-center border-2 mx-auto border-black">
        <select className="outline-0" value={type} onChange={(e) => {filterbytype(e.target.value)}}>
          <option value="all"> All </option>
          <option value="delux"> Delux </option>
          <option value="non-delux"> Non-Delux </option>
        </select>
        </div>
      </div>

      <div className={"relative row justify-content-center mt-5"}>
        {loading ? (
          <h1 className="text-center my-60">
            <Loader />
          </h1>
        ) : (
          rooms.map((room) => {
            return (
              <div className={"col-md-9 my-2"}>
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;
