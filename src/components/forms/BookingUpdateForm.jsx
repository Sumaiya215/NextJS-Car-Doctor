"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const BookingUpdateForm = ({ data }) => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session);
  console.log("FROM UPDATE FORM", data);

  const handleBookService = async (e) => {
    toast("Submitting Booking...");
    e.preventDefault();

    const form = e.target;

    const date = form.date.value;
    const phone = form.phone.value;
    const address = form.address.value;

    const bookingPayload = {
      // User Inputs
      date,
      phone,
      address,

    };

    console.log(bookingPayload);
    const res = await fetch(
      `https://nextjs-car-doctor-sigma.vercel.app
/api/my-bookings/${data._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(bookingPayload),
      }
    );
    const postedResponse = await res.json();
    console.log("Updated DATA response", postedResponse);
    router.push("/my-bookings");
  };

  return (
    <div className="my-10">
      <div className="w-11/12 mx-auto">
        <h2 className="text-center text-3xl font-bold mb-4">
          Book Service : {data?.service_name}
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
                defaultValue={data?.service_price}
                readOnly
                name="price"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold mb-3">Date</span>
              </label>
              <input
                defaultValue={data?.date}
                type="date"
                name="date"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold mb-3">Phone</span>
              </label>
              <input
                type="text"
                name="phone"
                defaultValue={data?.phone}
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
                defaultValue={data?.address}
                placeholder="Your Address"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="form-control mt-6">
            <input
              className="btn btn-primary btn-block"
              type="submit"
              value="Update Booking"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingUpdateForm;