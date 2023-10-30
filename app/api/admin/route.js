import Admin from "@/Model/admin.Model"
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export const POST = async (req) => {
    try {
        const data = await req.json();
       
        const password = await bcrypt.hash(data.password, 12);

        data.password = password;
      
        const adminData = await Admin(data);
        const admin = await adminData.save();

        return NextResponse.json("Admin created successfully")

    } catch (error) {
        return NextResponse.json(error)
    }
}