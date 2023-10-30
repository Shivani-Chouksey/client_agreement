
import Agreement from '@/Model/Agreement.model';
import { NextResponse } from 'next/server';
import { Jwt } from 'jsonwebtoken';
import { connection } from "@/connection/connection"

connection()

export const POST = async (req) => {

    try {
        const { adminData, clientData } = await req.json();
        const agreementData = new Agreement({ adminData, clientData });
        // console.log("post api", adminData, clientData)
        const agreement = await agreementData.save();

        return NextResponse.json({ message: "Agreement Created Successfully", agreement })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Internal server error", error })
    }

}



export const GET = async (req) => {
    try {

        const agreement = await Agreement.find();
        // console.log(agreement)
        return NextResponse.json({ message: "get Agreement  Successfully", agreement })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error", error })
    }
}


export const PATCH = async (req) => {
    try {
        const searchParams = await req.nextUrl.searchParams;
        const id = searchParams.get("_id");
        const updateData = await req.json();

        const updatedAgreement = await Agreement.findByIdAndUpdate(id,{clientData: updateData}, { new: true });

        if (!updatedAgreement) {
         
            return NextResponse.json({ message: "Agreement not found", success: false });
        }

     

        return NextResponse.json({ message: "Update Agreement", success: true, agreement: updatedAgreement });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error", error });
    }
}

export const DELETE=async(req)=>{
try {
    const searchParams = await req.nextUrl.searchParams;
    const id = searchParams.get("_id");

    await Agreement.findOneAndDelete(id)

    return NextResponse.json({ message: " Agreement Delete Successfully", success: true});
    
} catch (error) {
    console.error(error);
        return NextResponse.json({ message: "Internal Server Error", error });
}
}