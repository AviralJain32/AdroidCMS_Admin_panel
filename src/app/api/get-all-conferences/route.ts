import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import ConferenceModel from "@/model/ConferenceSchema";
import mongoose from "mongoose";

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
    await dbConnect();
    console.log("************************************************************");
    console.log("ye hai models names  ",mongoose.modelNames());  // should include 'User' and 'Conference'
    console.log("************************************************************");
    
    try {
        const UserModels=UserModel
        const getConferenceDetails=await ConferenceModel.find().populate([{ path: "conferenceOrganizer", select: "fullname" }])

        if(!getConferenceDetails){
            return new Response(
            JSON.stringify({
                success: false,
                message: "conference Details not found",
            }),
            { status: 500 });
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Conference Details Found ",
                data: getConferenceDetails,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.log("An unexpected error occurred: ", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error occurred while fetching papers for the conference",
            }),
            { status: 500 }
        );
    }
}
