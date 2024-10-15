
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
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

        const getUserDetails=await UserModel.find();

        if(!getUserDetails){
            return new Response(
            JSON.stringify({
                success: false,
                message: "Error occurred while fetching All User Details",
            }),
            { status: 500 });
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Users found for the conference",
                data:getUserDetails,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.log("An unexpected error occurred: ", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error occurred while fetching Users",
            }),
            { status: 500 }
        );
    }
}
