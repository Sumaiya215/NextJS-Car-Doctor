"use client";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";

const DeleteBookingButton = ({id}) => {
    const router = useRouter();
    const handleDelete = async() => {
      const res = await fetch(
        `https://nextjs-car-doctor-sigma.vercel.app
/api/service/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      console.log(data);
      router.refresh();
    };
    return (
      <>
        <MdDelete
          onClick={() => handleDelete(id)}
          className="h-6 w-6 text-red-500 font-bold"
        />
      </>
    )
};

export default DeleteBookingButton;