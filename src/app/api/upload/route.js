import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const formData = await req.formData();
  const image = formData.get("image");
  const verdict = formData.get("verdict");

  if (!image || !verdict) {
    return new Response("Invalid request", { status: 400 });
  }

  const buffer = Buffer.from(await image.arrayBuffer());

  await resend.emails.send({
    from: "Dominos AI <onboarding@resend.dev>",
    to: ["cnacodeprof@gmail.com"],
    subject: "Pizza Quality Verification Report",
    text: `VERDICT: ${verdict}`,
    attachments: [
      {
        filename: image.name,
        content: buffer.toString("base64"),
      },
    ],
  });

  return new Response("Email sent", { status: 200 });
}
