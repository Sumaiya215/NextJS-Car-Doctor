import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import Image from "next/image";


const ServiceDetailsPage = async({params}) => {
    const p = await params
    const serviceCollection = dbConnect(collectionNames.servicesCollection);
    const data = await serviceCollection.findOne({_id: new ObjectId(p.id)}) 
    return (
        <div>
            <section className=" flex  items-center justify-center mt-6">
                <figure className="relative">
                    <Image src={"/assets/images/checkout/checkout.png"} 
                    width={1040} height={300} alt="banner"/>
                
                <div className="transparent-layer overlay-bg absolute w-full h-full border-3 border-red-400 top-0">
                    <div className="w-full h-full flex items-center ps-16">
                        <div>
                            <h1 className="text-white font-bold text-2xl">Service Details</h1>
                        </div>
                    </div>
                </div>
                </figure>
            </section>
            <section className="mt-22 container mx-auto">
                <Image src={data?.img} width={400} height={260} alt={data.title}/>
                <h2 className="text-xl font-bold">{data.title}</h2>
            </section>
            <p>{p.id}</p>
            <p>{JSON.stringify(data)}</p>
        </div>
    );
};

export default ServiceDetailsPage;