import '@/connection/connection';
import Agreement from '@/Model/Agreement.model';
import { NextResponse } from 'next/server';

import { connection } from "@/connection/connection"

connection()





export const GET = async (req) => {
    try {
        const searchParams = await req.nextUrl.searchParams;

        const id = searchParams.get("_id");

        console.log("fhubjhfgb", id)

        const agreement = await Agreement.findById({ _id: id });

        return NextResponse.json({ message: "Find   Agreement  Successfully", agreement })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error", error })
    }

}
