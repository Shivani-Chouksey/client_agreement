import { NextResponse } from "next/server.js";
import fs, { writeFile } from 'fs/promises';
import { join } from 'path';

import { connection } from "@/connection/connection";

connection()


export const POST = async (req, res) => {
    try {

        const formData = await req.formData();
       
        let imageFile
//         // const imageFile = formData.get('adminSignature') ;
//         // const imageFile = formData.get('clientSignature') ;
//         if (formData.get('signature')) {
//            
//             imageFile = formData.get('signature');
// 
//         } else {
//             imageFile = formData.get('signature');
// 
//         }
        const signatureValues = formData.getAll('signature');
        if (signatureValues.length > 0) {
            imageFile = signatureValues[0]; // Set imageFile to the first value
        } else {
            imageFile = signatureValues[1]; // Set imageFile to the second value (or undefined if it doesn't exist)
        }
        


        if (!imageFile) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 500 });
        }


        const bufferData = await imageFile.arrayBuffer();

        const buffer = Buffer.from(bufferData);

        const path = `./public/uploads/${imageFile.name}`;

        await writeFile(path, buffer);


        const timestamp = Date.now();
        const uniqueFilename = `${timestamp}-${imageFile.name}`
        const uploadPath = join('./public/uploads', uniqueFilename);

        // Save the uploaded file with the unique filename
        await fs.rename(path, uploadPath);

        return NextResponse.json({ message: "Image upload successfully", url: `/uploads/${uniqueFilename}` });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};


