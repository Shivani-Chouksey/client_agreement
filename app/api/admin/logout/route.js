import { connection } from "@/connection/connection";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

connection()

export const GET = async (req) => {
    try {

        cookies().delete("token");

        return NextResponse.json({ message: "Logout successfully" });

    } catch (error) {
        return NextResponse.json(error);
    }
}          