import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import ConferenceModel from "@/model/ConferenceSchema";
import UserModel from "@/model/User"; 


export async function GET(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return new Response(
            JSON.stringify({
                success: false,
                message: "Not Authenticated",
            }),
            { status: 401 }
        );
    }
    try {
        const { searchParams } = new URL(request.url);
        const queryParams = {
        confName: searchParams.get('confName'),
        };

        const getConferenceDetails=await ConferenceModel.findOne({
            conferenceAcronym:queryParams.confName
        }).populate('conferenceOrganizer',"fullname")

        // 

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
                message: "Conference Details Found by conference id",
                data: getConferenceDetails,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.log("An unexpected error occurred: ", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error occurred while fetching details for the conference"+error,
            }),
            { status: 500 }
        );
    }
}
