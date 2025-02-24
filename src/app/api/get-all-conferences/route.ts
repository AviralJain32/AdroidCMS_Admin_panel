import dbConnect from "@/lib/dbConnect";
import ConferenceModel from "@/model/ConferenceSchema";



export async function GET(request: Request) {
    await dbConnect();
    
    
    try {

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
