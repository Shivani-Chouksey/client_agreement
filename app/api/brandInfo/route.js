import Brandinformation from '@/Model/Brandinfo.model';
import { NextResponse } from 'next/server';

import { connection } from "@/connection/connection"


connection()
    

// 
// export const postBrandInfo = async (request, response) => {
//     try {
//         const data = request.body;
//         const file = request.file
// 
//         const exits = await brandInfoModel.find();
//         const logo = await convertToWebP("/uploads/" + file.filename)
// 
//         if (exits.length === 0) {
// 
//             const brandInfo = new brandInfoModel({
//                 brandName: data.brandName,
//                 logo,
//                 shortAbout: data.shortAbout,
//                 address: data.address,
//                 phone: data.phone,
//                 email: data.email
// 
//             });
//             await brandInfo.save();
//             console.log(chalk.bgGreen.bold("Brand info successfuly saved."));
//             response.status(200).json({ message: "Brand info successfuly saved." });
//         } else {
//             console.log(chalk.bgRed.bold("Brand info alredy present"));
//             response.status(203).json({ status: 203, message: "Brand info alredy present." });
//         }
//     } catch (error) {
//         console.log(chalk.bgRed.bold(error));
//         response.status(500).json({ status: 500, error })
// 
//     }
// 
// }




export const POST = async (req) => {

    try {

        const data  = await req.json()
        // console.log(data)
        const brandInfoData = new Brandinformation(data);
        // console.log("post api", adminData, clientData)
        const brandInfo = await brandInfoData.save();

        return NextResponse.json({ message: "BrandInformation Created Successfully", brandInfo  },{ status: 201 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Internal server error", error },{ status: 500 })
    }

}



export const GET = async (req) => {
    try {

        const brandinfo = await Brandinformation.find();
        console.log(brandinfo)
        return NextResponse.json({ message: "get BrandInformation  Successfully", brandinfo },{ status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error", error })
    }
}
// 
// export const PATCH = async (req) => {
// 
// 
//    
//     try {
//         const searchParams = await req.nextUrl.searchParams;
//         const agreementName = searchParams.get('agreeName');
//         const updateData = await req.json()
// 
//         const filter = { "adminData.agreementName": agreementName };
//         console.log("updated data",updateData)
//         const updatedAgreement = await Agreement.findOneAndUpdate( filter, updateData)
//         return NextResponse.json({ message: "Update Admin ", success: true, agreement: updatedAgreement })
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json({ message: "Internal Server Error", error })
//     }
// }
export const PATCH = async (req) => {
    try {
        const searchParams = await req.nextUrl.searchParams;
        const id = searchParams.get("_id");
        const updateData = await req.json();

        const updatedBrandinfo = await Brandinformation.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedBrandinfo) {
         
            return NextResponse.json({ message: "BrandInformation not found", success: false });
        }

     

        return NextResponse.json({ message: "Update BrandInformation", success: true, brandInfo:  updatedBrandinfo});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error", error });
    }
}