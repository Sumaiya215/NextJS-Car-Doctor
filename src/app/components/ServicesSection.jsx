// "use client";
import dbConnect, { collectionNames } from "@/lib/dbConnect";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
// import { useEffect, useState } from "react";

const ServicesSection = async () => {
    // const [services, setServices] = useState([]);
    // const [loading, setLoading] = useState(true);

    const serviceCollection = dbConnect(collectionNames.servicesCollection);
    const data = await serviceCollection.find({}).toArray();

    // useEffect(() => {
    //     fetch('/services.json')
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setServices(data);
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching services:', error);
    //             setLoading(false);
    //         });
    // }, []);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }
    return (
        <div className="w-4/5 mx-auto text-center ">
            <h1 className="mb-6 font-semibold text-3xl">Our Services</h1>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
                {data?.map((service) => (
                    <div key={service._id} className="card  bg-base-100 shadow-sm">
                        <div className="flex justify-center items-center">
                            <Image src={service.img} width={280} height={208}
                                alt={service.title} className="pt-3 " />
                        </div>

                        <div className="flex justify-between items-center mt-6">
                            <div className="card-body text-left">
                                <h2 className=" card-title font-semibold mt-3 ">
                                    {service.title}
                                </h2>
                                <p className=" font-semibold text-lg text-orange-400"> Price: ${service.price}</p>
                            </div>
                            <div >
                                <Link href={`/services/${service._id}`} className="text-orange-400">
                                    <FaArrowRight  className="mr-6"/>
                                </Link>
                            </div>
                        </div>


                    </div>
                ))}
            </ul>
        </div>
    );
};

export default ServicesSection;