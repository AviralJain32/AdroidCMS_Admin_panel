import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import ConferenceModel from "@/model/ConferenceSchema";
import { sendConfStatusUpdateMail } from "@/helper/sendConfStatusUpdateMail";

export async function PATCH(request: Request) {
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
        const { comment,conferenceAcronmym,Status} = await request.json();
        if (!comment || !conferenceAcronmym) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Comment or conference Acronym is missing",
                }),
                { status: 400 }
            );
        }

        // Prepare the review object to be pushed into the history
        const commentObject = {
            comment,
            updatedAt: new Date(), // Add a timestamp
        };

        // Determine which review field to update (paperReview1History or paperReview2History)

        const updateQuery = { $push: { conferenceStatusComment: commentObject } };

        // Update the paper document by pushing the new review into the appropriate history array
        const updatedConference = await ConferenceModel.findOneAndUpdate(
            { conferenceAcronym:conferenceAcronmym },
            updateQuery,
            { new: true } // Return the updated document
        );
        console.log("in the update route"+updatedConference)
        if (!updatedConference) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Conference not found",
                }),
                { status: 404 }
            );
        }


        const updateConferenceStatus= await ConferenceModel.findOneAndUpdate(
            {conferenceAcronym:conferenceAcronmym},
            {conferenceStatus:Status}
        )


        if (!updateConferenceStatus) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Conference status not updated",
                }),
                { status: 404 }
            );
        }
        console.log(updatedConference)
        const emailResponse=await sendConfStatusUpdateMail(
            conferenceAcronmym,
            comment,
            Status,
            updatedConference?.conferenceEmail,
        )

        if(!emailResponse.success){
            return Response.json({
                success:false,
                message:emailResponse.message
            },{
                status:500
            })
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Comment added and status updated successfully",
            }),
            { status: 200 }
        );

    } catch (error) {
        console.log("An unexpected error occurred: ", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error occurred while adding comment",
            }),
            { status: 500 }
        );
    }
}
