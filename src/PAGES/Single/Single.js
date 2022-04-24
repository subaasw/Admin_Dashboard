import React from "react";
import NavBar from "../../Components/navbar/NavBar";
import Sidebar from "../../Components/sidebar/Sidebar";
import "./single.scss";
import Chart from "../../Components/chart/Chart"
import Table_ from "../../Components/table_/Table_";
function Single() {
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <NavBar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://images.unsplash.com/photo-1564944940214-93fd718ebabd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhcmVkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt="profile"
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">Subash Giri </h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">subash@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+977 9800 000 001</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">Ghorahi,Dang </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">Nepal</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3/1} title="User Spending ( Last 6 Months )" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">
            Last Transactions
          </h1>
          <Table_ />
        </div>
      </div>
    </div>
  );
}

export default Single;
