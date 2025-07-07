import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import PaperModel from "@/model/PaperModel";


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
        const confId=searchParams.get('confId')

        const getSumittedConferencePapers=await PaperModel.find({
            conference:confId
        })

        // 

        if(!getSumittedConferencePapers){
            return new Response(
            JSON.stringify({
                success: false,
                message: "Papers Submitted in conference not found",
            }),
            { status: 500 });
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Conference Details Found by conference id",
                data: getSumittedConferencePapers,
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
