import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination";

const Home = () => {
  const [info, setInfo] = useState([]);
  const [details, setDetails] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [infoPerPage] = useState(3);
 

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      setInfo(res.data);
    };

    fetchData();
  }, []);

  const handleDetails = (id) => {
    console.log(id);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(res => res.json())
    .then(data=> setDetails(data))
  };


   // Get current posts
   const indexOfLastPage = currentPage * infoPerPage;
   const indexOfFirstPage = indexOfLastPage - infoPerPage;
   const currentInfo = info.slice(indexOfFirstPage, indexOfLastPage);

   // Change page
  const paginate = (pageNumber,event) => {
    event.preventDefault()
    setCurrentPage(pageNumber)
    
  };

  return (
    <div>
      {currentInfo?.map((personInfo) => (
        <div
          key={personInfo.id}
          className="grid grid-cols-2 lg:grid-cols-5 p-4 bg-base-300 m-2 rounded-md"
        >
          <p className="font-bold">{personInfo?.company?.name}</p>
          <div>
            <p className=" font-bold">Contact</p>
            <p>{personInfo.address.street}</p>
          </div>
          <p>
            <p className=" font-bold">City</p>
            <p>{personInfo.address.city}</p>
          </p>
          <p>
            <p className=" font-bold">State</p>
            <p>{personInfo.address.street}</p>
          </p>

          <label
            onClick={() => handleDetails(personInfo.id)}
            htmlFor="my-modal-5"
            className="mx-auto mt-5 lg:mt-0 lg:w-1/2 text-center my-auto font-semibold rounded-xl text-white p-2 bg-green-600 cursor-pointer"
          >
            View Details
          </label>
        </div>
      ))}

      <Pagination infoPerPage={infoPerPage}
        totalInfo={info.length}
        paginate={paginate}></Pagination>

      <div>
        

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my-modal-5" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box lg:w-5/12 max-w-5xl">

            <h3 className="font-bold text-lg"> 
              Description
            </h3>
            <p className="py-4">
            {details?.company?.catchPhrase}
            </p>
            <div className="lg:flex justify-between">
              <div className="">
                <p className="font-bold">Contact person</p>
                <p>{details.name}</p>
                
                <p className="font-bold">Designation</p>
                <p>{details.username}</p>

                <p className="font-bold">Email</p>
                <p>{details.email}</p>

                <p className="font-bold">Phone</p>
                <p>{details.phone}</p>

              </div>
              <div>
                  
                <p className="font-bold">Address</p>
                <p>{details?.address?.suite}  {details?.address?.street} {details?.address?.city} {details?.address?.zipcode}
                </p>
                  
                <p className="font-bold">City</p>
                <p>{details?.address?.city} 
                </p>
                  
                <p className="font-bold">State</p>
                <p>  {details?.address?.street}
                </p>
                  
                <p className="font-bold">Country</p>
                <p> India </p>
              </div>
            </div>
            <div className="modal-action">
              <label htmlFor="my-modal-5" className="py-2 px-5 text-xl rounded-xl bg-green-400 hover:bg-green-500 text-white font-semibold cursor-pointer">
                Ok
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
