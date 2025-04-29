// "use client";
import MyBookingsTable from '@/components/tables/MyBookingsTable';
import { headers } from 'next/headers';
// import React, { useEffect, useState } from 'react';

const fetchMyBookings = async () => {
    const res = await fetch(
      "https://nextjs-car-doctor-sigma.vercel.app/api/service",
      {
        headers: new Headers(await headers()),
      }
    );
    const d = await res.json();
    return d;
  };

const MyBookingsPage = async() => {
    const data = await fetchMyBookings();
    // const [data, setData] = useState([])
    // useEffect(()=>{
    //     const fetchMyBookings = async() => {
    //      const res = await fetch("https://nextjs-car-doctor-sigma.vercel.app/api/service")
    //      const result = await res.json()
    //      setData(result)
    //     };
    //     fetchMyBookings()
    // },[])
    return (
        <div>
           <MyBookingsTable data={data}/>
        </div>
    );
};

export default MyBookingsPage;