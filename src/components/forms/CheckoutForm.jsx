"use client";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const CheckoutForm = ({ data }) => {
  const { data: session } = useSession();
  console.log(session);

  const handleBookService = async (e) => {
    toast("Submitting Booking...");
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const date = form.date.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const email = form.email.value;
    const bookingPayload = {
      // Session
      customerName: name,
      email,

      // User Inputs
      date,
      phone,
      address,

      // Extra information
      service_id: data._id,
      service_name: data.title,
      service_img: data.img,
      service_price: data.price,
    };

    console.log(bookingPayload);
    const res = await fetch(
      "https://nextjs-car-doctor-sigma.vercel.app/api/service",
      {
        method: "POST",
        body: JSON.stringify(bookingPayload),
      }
    );
    const postedResponse = await res.json();
    console.log("POSTED DATA", postedResponse);
    form.reset();
  };

  return (
    <div className="my-10">
      <div className="w-11/12 mx-auto">
        <h2 className="text-center font-bold text-3xl mb-4">
          Book Service : {data?.title}
        </h2>
        <form onSubmit={handleBookService} className="w-[70%] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold mb-3">Name</span>
              </label>
              <input
                defaultValue={session?.user?.name}
                readOnly
                type="text"
                name="name"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold mb-3">Email</span>
              </label>
              <input
                defaultValue={session?.user?.email}
                readOnly
                type="text"
                name="email"
                placeholder="email"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold mb-3">Due amount</span>
              </label>
              <input
                type="text"
                defaultValue={data?.price}
                readOnly
                name="price"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold mb-3">Date</span>
              </label>
              <input type="date" name="date" className="input input-bordered w-full" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold mb-3">Phone</span>
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Your Phone"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold mb-3">Present Address</span>
              </label>
              <input
                type="text"
                name="address"
                placeholder="Your Address"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="form-control mt-6">
            <input
              className="btn btn-primary btn-block"
              type="submit"
              value="Order Confirm"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;