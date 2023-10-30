import '@/connection/connection';
import Agreement from '@/Model/Agreement.model';
import { NextResponse } from 'next/server';

import { connection } from "@/connection/connection"

connection()








// export const GET = async (req,{params}) => {
//     const agreementName=params.agreeName
//     try {
//      console.log("fdsfgsdghf",agreementName)
// 
//      const agreement = await Agreement.findOne({ 'adminData.agreementName': agreementName });
// 
//         // console.log(agreement)
//         return NextResponse.json({ message: "get one  Agreement  Successfully", agreement })
// 
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json({ message: "Internal Server Error", error })
//     }
// }


export const GET = async (req) => {
    try {
        const searchParams = await req.nextUrl.searchParams;

        const agreementName = searchParams.get('agreeName');


        const agreement = await Agreement.findOne({ 'adminData.agreementName': agreementName });
        // console.log("fhubjhfgb", agreement)

        return NextResponse.json({ message: "get one  Agreement  Successfully", agreement })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error", error })
    }

}



export const PATCH = async (req) => {


    // console.log(req.json())
    try {
        const searchParams = await req.nextUrl.searchParams;
        const agreementName = searchParams.get('agreeName');
        const updateData = await req.json()

        const filter = { "adminData.agreementName": agreementName };
        console.log("updated data",updateData)
        const updatedAgreement = await Agreement.findOneAndUpdate( filter, {clientData:updateData})
        return NextResponse.json({ message: "Update Admin ", success: true, agreement: updatedAgreement })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error", error })
    }
}
