import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatableSource";
import React, { useEffect, useState } from "react";
import "./datatable.scss";
import { Link } from "react-router-dom";
import { db } from "../../firebase-config";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // const fetchData = () => {
    //   const list = [];

    //   getDocs(collection(db, "users"))
    //     .then((querySnapshot) =>
    //       querySnapshot.forEach((doc) => {
    //         list.push({ id: doc.id, ...doc.data() });
    //       })
    //     ).then(()=>setData(list))
    //     .catch((e) => {
    //       console.log(e);
    //     });

    //   // console.log(list);
    // };
    // fetchData();

    //Listen Real Time
    const unsub = onSnapshot(
      collection(db, "users"),
      (snapShot) => {
        const list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => console.log(error)
    );
    
    return () => {
      unsub();
    };
  }, []);

  const handleDelete = (id) => {
    deleteDoc(doc(db, "users", id));
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">view</div>
            </Link>

            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link
          to="/users/new"
          style={{ textDecoration: "none" }}
          className="link"
        >
          Add New
        </Link>
      </div>
      <DataGrid
        className="dataGrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
      />
    </div>
  );
};

export default DataTable;
