import Image from "next/image";
import Link from "next/link";

const ServiceDetailsPage = async ({ params }) => {
    const p = await params;
    const res = await fetch(`https://nextjs-car-doctor-sigma.vercel.app
/api/service/${p.id}`)
    const data = await res.json();
    return (
        <div>
            <section className=" flex  items-center justify-center mt-6">
                <figure className="relative">
                    <Image src={"/assets/images/checkout/checkout.png"}
                        width={1040} height={340} alt="banner" />

                    <div className="transparent-layer overlay-bg absolute w-full h-full border-3 border-red-400 top-0">
                        <div className="w-full h-full flex items-center ps-16">
                            <div>
                                <h1 className="text-white font-bold text-2xl">Service Details</h1>
                            </div>
                        </div>
                    </div>
                </figure>
            </section>
            <section className="container mx-auto grid grid-cols-12 gap-4 mt-8">
                {/* Left Side */}
                <div className="col-span-9 space-y-4 ml-12">
                    <Image
                        className="w-full h-[50%]"
                        src={data?.img}
                        width={260}
                        height={200}
                        alt={data.title}
                    />
                    <h1 className="font-bold text-3xl">{data.title}</h1>
                    <p className="text-justify">{data?.description}</p>
                </div>
                {/* Right Side */}
                <div className="col-span-3 space-y-4">
                    <Link href={`/checkout/${data._id}`}>
                        <button className="btn w-full text-white h-9 bg-orange-500">
                            Checkout
                        </button>
                    </Link>
                    <p className="text-center text-xl font-bold">
                        Price: $ {data?.price}
                    </p>
                </div>
            </section>
        </div>
    );
};

export default ServiceDetailsPage;