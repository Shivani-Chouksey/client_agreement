import '@/connection/connection';
import Admin from '@/Model/Brandinfo.model'
import { NextResponse } from 'next/server';


export const DELETE = async (req, { params }) => {
    const { adminId } = params
    try {
        await Admin.findOneAndDelete({ _id: adminId })
        return NextResponse.json({ message: "Delete Admin", success: true, })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error", error })
    }

}

export const PATCH =async (req,{params})=>{
    const {adminId}=params

try {
      const updatedAdmin=await Admin.findByIdAndUpdate(adminId , req.body)
    return NextResponse.json({message:"Update Admin ",success:true,admin:updatedAdmin})
} catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Internal Server Error", error })
}
}