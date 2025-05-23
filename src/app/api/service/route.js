import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async(req) => {
    const session = await getServerSession(authOptions)
    if(session){
        const email = session?.user?.email;
        const bookingCollection = dbConnect(collectionNames.bookingCollection)
        const result = await bookingCollection.find({email}).toArray()
        return NextResponse.json(result)
    }
}

export const POST = async(req) => {
    const body = await req.json()
    // console.log(body);
    const bookingCollection = dbConnect(collectionNames.bookingCollection)
    const result = await bookingCollection.insertOne(body)
    return NextResponse.json(result)
}