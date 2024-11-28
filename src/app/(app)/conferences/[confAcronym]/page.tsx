

"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IConference } from "@/model/ConferenceSchema";
import { useGetConferenceByConferenceIDQuery } from "@/store/features/ConferenceData";
import Loader from "@/components/Loader";
import { CommentDialog } from "./comment";


const ConferencePage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  // const [conferenceDetails, setConferenceDetails] = useState<IConference | null>(null);

  const baseUrl = `${window.location.protocol}//${window.location.host}`;

    const { data:conferenceDetails, error, isLoading } = useGetConferenceByConferenceIDQuery(params.confAcronym as string);

    console.log(conferenceDetails)  

  if (isLoading) {
    return <Loader/>
  }

  if (!conferenceDetails) {
    return <div className="text-center py-10">No conference details found.</div>;
  }

  const {
    conferenceTitle,
    conferenceOrganizer,
    conferenceOrganizerWebPage,
    conferenceOrganizerPhoneNumber,
    conferenceOrganizerRole,
    conferenceEmail,
    conferenceAnyOtherInformation,
    conferenceAcronym,
    conferenceWebpage,
    conferenceVenue,
    conferenceCity,
    conferenceCountry,
    conferenceEstimatedNumberOfSubmissions,
    conferenceFirstDay,
    conferenceLastDay,
    conferencePrimaryArea,
    conferenceSecondaryArea,
    conferenceAreaNotes,
    conferenceIsAcceptingPaper,
    conferenceStatus,
    conferenceStatusComment,
    conferenceSubmissionsDeadlineDate,
  } = conferenceDetails;
  const validStatus = conferenceStatus === "accepted" || conferenceStatus === "review" || conferenceStatus === "rejected" ? conferenceStatus : undefined;
  return (
    <div className="container mx-auto p-6 bg-white rounded-lg">
      <div className="shadow p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">{conferenceTitle}</h1>
          <CommentDialog ConfAcronym={params.confAcronym as string} confStatus={conferenceStatus} />
        </div>
        <Table className="min-w-full">
          <TableBody>
            <TableRow>
              <TableHead>Organizer</TableHead>
              <TableCell className="font-medium">
                <a href={conferenceOrganizerWebPage} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  {conferenceOrganizer.fullname}
                </a> ({conferenceOrganizerRole})<br />
                Phone: {conferenceOrganizerPhoneNumber}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableCell className="font-medium">{conferenceEmail}</TableCell> 
            </TableRow>
            <TableRow>
              <TableHead>Conference Organizer webpage</TableHead>
              <Link href={conferenceOrganizerWebPage} target="_blank">
              <TableCell className="font-medium">{conferenceOrganizerWebPage}</TableCell>
              </Link>
            </TableRow>
            <TableRow>
              <TableHead>Conference Website</TableHead>
              <Link href={conferenceWebpage} target="_blank">
              <TableCell className="font-medium">{conferenceWebpage}</TableCell>
              </Link>
            </TableRow>
            <TableRow>
              <TableHead>Submission Deadline</TableHead>
              <TableCell className="font-medium">
                {moment(conferenceSubmissionsDeadlineDate).format("MMMM Do YYYY")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Conference Start Date</TableHead>
              <TableCell className="font-medium">
                {moment(conferenceFirstDay).format("MMMM Do YYYY")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Conference End Date</TableHead>
              <TableCell className="font-medium">
                {moment(conferenceLastDay).format("MMMM Do YYYY")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Venue</TableHead>
              <TableCell className="font-medium">
                {conferenceVenue}, {conferenceCity}, {conferenceCountry}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Venue</TableHead>
              <TableCell className="font-medium">
                {conferenceVenue}, {conferenceCity}, {conferenceCountry}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Estimated Number Of Submissions</TableHead>
              <TableCell className="font-medium">
                {conferenceEstimatedNumberOfSubmissions}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Primary Area</TableHead>
              <TableCell className="font-medium">{conferencePrimaryArea}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Secondary Area</TableHead>
              <TableCell className="font-medium">{conferenceSecondaryArea}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableCell className="font-medium">
                <Badge variant={conferenceStatus}>
                  {conferenceStatus && conferenceStatus.charAt(0).toUpperCase() + conferenceStatus.slice(1)}
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Area Notes</TableHead>
              <TableCell className="font-medium">{conferenceAreaNotes || "No Area Notes are present for this conference"}</TableCell>
            </TableRow>
            
            <TableRow>
              <TableHead>Additional Information</TableHead>
              <TableCell className="font-medium">{conferenceAnyOtherInformation}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ConferencePage;
