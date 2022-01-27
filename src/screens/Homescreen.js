import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "react-spinners/RingLoader";
import Error from "../components/Error";
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import moment from "moment";
const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();

  useEffect(async () => {
    try {
      setLoading(true);
      const data = (
        await axios.post("http://localhost:4000/api/v1/getallrooms", {})
      ).data.result;
      setRooms(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  }, []);

  function filterbydate(dates){
    console.log(moment(dates[0]).format('DD-MM-YYYY'));
    console.log(moment(dates[1]).format('DD-MM-YYYY'));
    setfromdate(moment(dates[0]).format('DD-MM-YYYY'));
    settodate(moment(dates[1]).format('DD-MM-YYYY'));
  }

  return (
    <div className="container">

      <div className="row mt-5">
          <div className="col-md-3">
              <RangePicker format='DD-MM-YY' onChange={filterbydate}/>
          </div>
      </div>

      <div className={"row justify-content-center mt-5"}>
        
        {loading ? (
          <h1 className="text-center my-60"><Loader/></h1>
        ) : error ? (
          <h1><Error/></h1>
        ) : (
          rooms.map((room) => {
            return (
              <div className={"col-md-9 mt-2"}>
                <Room room = {room} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;
