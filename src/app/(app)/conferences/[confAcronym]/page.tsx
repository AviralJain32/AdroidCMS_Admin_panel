

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
import { useGetConferenceByConferenceIDQuery, useGetConferenceSubmittedPaperByConferenceIDQuery } from "@/store/features/ConferenceData";
import Loader from "@/components/Loader";
import { CommentDialog } from "./comment";


const ConferencePage = () => {
  const params = useParams();
  const ConfAcronym=decodeURIComponent(params.confAcronym as string)

  const { data: conferenceDetails, error, isLoading } = useGetConferenceByConferenceIDQuery(
    params.confAcronym as string,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: conferencePapersDetails, error: fetchingPapersError, isLoading: isLoadingPapers } =
    useGetConferenceSubmittedPaperByConferenceIDQuery(conferenceDetails?._id as string, {
      refetchOnMountOrArgChange: true,
      skip: !conferenceDetails?._id, // Prevent call if ID is not ready
    });
  
    console.log(conferenceDetails)
  console.log(conferencePapersDetails)
  if (isLoading && isLoadingPapers) {
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
          <CommentDialog ConfAcronym={ConfAcronym} confStatus={conferenceStatus} />
        </div>
        <Table className="min-w-full">
          <TableBody>
            <TableRow>
              <TableHead>Organizer</TableHead>
              <TableCell className="font-medium">
                <a href={conferenceOrganizerWebPage || ''} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
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
              <Link href={conferenceOrganizerWebPage || ''} target="_blank">
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

        {/* {conferencePapersDetails && (
  <div className="mt-8 shadow p-4">
    <h2 className="text-xl font-semibold mb-4">
      Submitted Papers ({conferencePapersDetails.length})
    </h2>

    <Table className="min-w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Paper ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Authors</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Submission Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {conferencePapersDetails.map((paper) => (
          <TableRow key={paper.paperID}>
            <TableCell className="font-medium">{paper.paperID}</TableCell>
            <TableCell>{paper.paperTitle}</TableCell>
            <TableCell>
              {paper.paperAuthor.map((author) => author.email).join(", ")}
            </TableCell>
            <TableCell>
              <Badge variant={paper.paperStatus}>
                {paper.paperStatus.charAt(0).toUpperCase() + paper.paperStatus.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>{moment(paper.paperSubmissionDate).format("MMMM Do YYYY")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
)} */}

{conferencePapersDetails && (
  <div className="mt-10">
    <h2 className="text-2xl font-bold mb-6">
      Submitted Papers ({conferencePapersDetails.length})
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {conferencePapersDetails.map((paper) => (
        <div key={paper.paperID} className="border rounded-xl shadow-md p-5 bg-white">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">{paper.paperTitle}</h3>
            <Badge variant={paper.paperStatus}>
              {paper.paperStatus.charAt(0).toUpperCase() + paper.paperStatus.slice(1)}
            </Badge>
          </div>

          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Paper ID:</span> {paper.paperID}
          </p>

          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Authors:</span>{" "}
            {paper.paperAuthor.map((author) => author.email).join(", ")}
          </p>

          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Corresponding Author:</span>{" "}
            {paper.correspondingAuthor.map((ca) => ca.email).join(", ")}
          </p>

          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Keywords:</span>{" "}
            {paper.paperKeywords.join(", ")}
          </p>

          {/* <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Abstract:</span> {paper.paperAbstract}
          </p> */}

          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Submission Date:</span>{" "}
            {moment(paper.paperSubmissionDate).format("MMMM Do YYYY")}
          </p>

          <a
            href={paper.paperFile}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-blue-600 font-medium hover:underline"
          >
            View Paper
          </a>
        </div>
      ))}
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default ConferencePage;
