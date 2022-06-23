import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabs } from "antd";
import Loader from "../components/Error";
import Error from "../components/Error";
const { TabPane } = Tabs;

function Adminscreen() {

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    console.log(admin);
      if (!admin) {
        window.location.href = "/home";
        return;
      }
  }, []);

  return (
    <div className="ml-3 mr-3 mt-3 bs">
      <h1 className="text-3xl text-center">Admin Panel</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>
        <TabPane tab="Add Room" key="3">
          <Addroom />
        </TabPane>
        <TabPane tab="User" key="4">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;

export function Bookings() {
  const [bookings, setbookings] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(async () => {
    const admin = localStorage.getItem('admin');
      if (!admin) {
        window.location = "https:/hotelwebsite-backend.herokuapp.com/home";
        return;
      }
    try {
      const data = await (
        await axios.post("https:/hotelwebsite-backend.herokuapp.com/api/v1/allbookings")
      ).data;

      setbookings(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(error);
    }
  }, []);

  return (
    <div className="row">
      <div className="col-md-10">
        <h1>Bookings</h1>
        {loading && <Loader />}
        <table className="table table-bordered bg-slate-700 text-white">
          <thead className="bs">
            <tr>
              <th>Booking Id</th>
              <th>User Id</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length &&
              bookings.map((booking) => {
                return (
                  <tr>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.room}</td>
                    <td>{booking.fromdate}</td>
                    <td>{booking.todate}</td>
                    <td>{booking.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Rooms() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(async () => {
    try {
      // const admin = localStorage.getItem('admin');
      // if (admin) {
      //   window.location.href = "/home";
      //   return;
      // }
      const data = await (
        await axios.post("https:/hotelwebsite-backend.herokuapp.com/api/v1/getallrooms")
      ).data.result;

      setrooms(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(error);
    }
  }, []);

  return (
    <div className="row">
      <div className="col-md-10">
        <h1>Rooms</h1>
        {loading && <Loader />}
        <table className="table table-bordered bg-slate-700 text-white">
          <thead className="bs">
            <tr>
              <th>Room Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Rent Per Day</th>
              <th>Max Count</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length &&
              rooms.map((room) => {
                return (
                  <tr>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.rentperday}</td>
                    <td>{room.maxcount}</td>
                    <td>{room.phonenumber}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Users() {
  const [users, setusers] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();

  useEffect(async () => {
    try {
      // const admin = localStorage.getItem('admin');
      // if (admin) {
      //   window.location.href = "/home";
      //   return;
      // }

      const data = await (
        await axios.post("https:/hotelwebsite-backend.herokuapp.com/api/v1/getallusers")
      ).data;

      setusers(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      seterror(error);
    }
  }, []);

  return (
    <div className="row">
      <div className="col-md-10">
        <h1>Rooms</h1>
        {loading && <Loader />}
        <table className="table table-bordered bg-slate-700 text-white">
          <thead className="bs">
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.length &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.isAdmin ? "Yes" : "No"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Addroom() {
  const [name, setroom] = useState("");
  const [rentperday, setrentperday] = useState();
  const [maxcount, setmaxcount] = useState();
  const [description, setdescription] = useState();
  const [phonenumber, setphonenumber] = useState();
  const [type, settype] = useState();
  const [imageurl1, setimageurl1] = useState();
  const [imageurl2, setimageurl2] = useState();
  const [imageurl3, setimageurl3] = useState();

  async function addroom() {
    const newroom = {
      name,
      rentperday,
      maxcount,
      description,
      phonenumber,
      type,
      imageurls: [imageurl1, imageurl2, imageurl3]
    };

    try{
      // const admin = localStorage.getItem('admin');
      // if (admin) {
      //   window.location.href = "/home";
      //   return;
      // }
        const result = await (await axios.post('https:/hotelwebsite-backend.herokuapp.com/api/v1/addroom', newroom)).data;
    }catch(error){
        console.log(error);
    }
  }

  return (
    <div className="row">
      <div className="col-md-5">
        <input
          value={name}
          onChange={(e) => {
            setroom(e.target.value);
          }}
          type="text"
          className="form-control my-1"
          placeholder="Room Name"
        />
        <input
          value={rentperday}
          onChange={(e) => {
            setrentperday(e.target.value);
          }}
          type="text"
          className="form-control my-1"
          placeholder="Rent per day"
        />
        <input
          value={maxcount}
          onChange={(e) => {
            setmaxcount(e.target.value);
          }}
          type="text"
          className="form-control my-1"
          placeholder="Max count"
        />
        <input
          value={description}
          onChange={(e) => {
            setdescription(e.target.value);
          }}
          type="text"
          className="form-control my-1"
          placeholder="Description"
        />
        <input
          value={phonenumber}
          onChange={(e) => {
            setphonenumber(e.target.value);
          }}
          type="text"
          className="form-control my-1"
          placeholder="Phone Number"
        />
      </div>
      <div className="col-md-5">
        <input
          value={type}
          onChange={(e) => {
            settype(e.target.value);
          }}
          type="text"
          className="form-control my-1"
          placeholder="Type"
        />
        <input
          value={imageurl1}
          onChange={(e) => {
            setimageurl1(e.target.value);
          }}
          type="text"
          className="form-control my-1"
          placeholder="Image url 1"
        />
        <input
          value={imageurl2}
          onChange={(e) => {
            setimageurl2(e.target.value);
          }}
          type="text"
          className="form-control my-1"
          placeholder="Image url 2"
        />
        <input
          value={imageurl3}
          onChange={(e) => {
            setimageurl3(e.target.value);
          }}
          type="text"
          className="form-control my-1"
          placeholder="Image url 3"
        />
        <button
          className="btn btn-primary"
          onClick={addroom}
          style={{ float: "right" }}
        >
          Add Room
        </button>
      </div>
    </div>
  );
}
