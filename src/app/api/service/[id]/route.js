import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { revalidatePath } from "next/cache";

export const GET = async(req, {params}) => {
    const p = await params
    const serviceCollection = dbConnect(collectionNames.servicesCollection);
    const data = await serviceCollection.findOne({_id: new ObjectId(p.id)});

    return NextResponse.json(data)
}

export const DELETE = async (req, { params }) => {
    const bookingCollection = dbConnect(collectionNames.bookingCollection)
    const p = await params;
    const query = { _id: new ObjectId(p.id) }

    // Validation
    const session = await getServerSession(authOptions)
    const currentBooking = await bookingCollection.findOne(query)

    const isOwnerOK = session?.user?.email == currentBooking.email

    if (isOwnerOK) {
        // Deleting User specific booking

        const deleteResponse = await bookingCollection.deleteOne(query)
        revalidatePath("/my-bookings")
        return NextResponse.json(deleteResponse)
    }
    else {
        return NextResponse.json({ success: false, message: "Forbidden Action" }, { status: 401 })
    }

}
