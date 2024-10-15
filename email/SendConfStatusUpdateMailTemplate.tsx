import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface SendConfStatusUpdateMailTemplateProps {
  status: string;
  comment: string;
  conferenceAcronmym: string;
}

export const SendConfStatusUpdateMailTemplate = ({
  status,
  comment,
  conferenceAcronmym,
}: SendConfStatusUpdateMailTemplateProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Text style={tertiary}>Conference Status Update</Text>

        <Heading style={secondary}>Update on Your Conference</Heading>

        <Text style={description}>
          Dear Organizer, we wanted to inform you about the recent updates on
          your conference (Acronym: {conferenceAcronmym}). Below are the details:
        </Text>

        <Section style={infoContainer}>
          <Text style={label}>Conference Status:</Text>
          <Text style={value}>{status}</Text>
        </Section>

        <Section style={infoContainer}>
          <Text style={label}>Admin Comment:</Text>
          <Text style={value}>{comment || "No comments available"}</Text>
        </Section>

        <Text style={paragraph}>
          Please review the changes and contact us if you have any questions.
        </Text>
      </Container>

      <Text style={footer}>Powered securely by Android CMS</Text>
    </Body>
  </Html>
);

SendConfStatusUpdateMailTemplate.PreviewProps = {
  status: "Approved",
  comment: "Congratulations! Your conference has been successfully approved.",
  conferenceAcronmym: "ICML2024",
} as SendConfStatusUpdateMailTemplateProps;

export default SendConfStatusUpdateMailTemplate;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: "Arial, sans-serif",
  padding: "20px",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #eaeaea",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  padding: "40px 20px",
  maxWidth: "600px",
  margin: "0 auto",
};

const tertiary = {
  color: "#0a85ea",
  fontSize: "12px",
  fontWeight: "bold" as const,
  textTransform: "uppercase" as const,
  textAlign: "center" as const,
  marginBottom: "10px",
};

const secondary = {
  color: "#333",
  fontSize: "22px",
  fontWeight: 600,
  textAlign: "center" as const,
  marginBottom: "20px",
};

const description = {
  color: "#555",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "center" as const,
  marginBottom: "30px",
};

const infoContainer = {
  backgroundColor: "#f1f3f5",
  borderRadius: "8px",
  padding: "10px",
  marginBottom: "15px",
};

const label = {
  color: "#777",
  fontSize: "14px",
  fontWeight: "bold" as const,
  textTransform: "uppercase" as const,
};

const value = {
  color: "#333",
  fontSize: "16px",
  marginTop: "5px",
};

const paragraph = {
  color: "#777",
  fontSize: "14px",
  textAlign: "center" as const,
  lineHeight: "22px",
  marginTop: "10px",
  padding: "0 20px",
};

const footer = {
  color: "#888",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "30px",
};
