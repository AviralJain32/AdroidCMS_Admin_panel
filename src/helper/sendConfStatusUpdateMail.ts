import sgMail from '@sendgrid/mail';
import { render } from '@react-email/components';
import { SendConfStatusUpdateMailTemplate } from '../../email/SendConfStatusUpdateMailTemplate';
import { ApiResponse } from '@/types/ApiResponse';


sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function sendConfStatusUpdateMail(
    conferenceAcronmym: string,
    comment:string,
    Status:string,
    conferenceEmail:string
):Promise<ApiResponse> {
    console.log(conferenceEmail+"in the email karrinbg component")
        try {
            const generalEmailHtml =await render(SendConfStatusUpdateMailTemplate({
                comment: comment,
                conferenceAcronmym:conferenceAcronmym,
                status:Status
            }));
    
            await sgMail.send({
                from: 'adroidconnectz@gmail.com',
                to: conferenceEmail,  // Send to the additional email ID
                subject: `${conferenceAcronmym}: Your Conference has been ${Status}`,
                html: generalEmailHtml,
            });

    
            return { success: true, message: "Emails sent successfully to conference organizer" };
        } catch (error) {
                console.log("Error sending emails to authors", error);
                return { success: false, message: "Failed to send emails to authors" };
        }
    } 
