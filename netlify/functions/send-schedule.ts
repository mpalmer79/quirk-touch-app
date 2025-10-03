import type { Handler } from "@netlify/functions";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const TO   = process.env.SERVICE_TO_EMAIL!;     // e.g. service@quirkchevynh.com
const FROM = process.env.SERVICE_FROM_EMAIL!;   // verified sender/domain in Resend

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const body = JSON.parse(event.body || "{}") as {
      vehicle: { year: string; make: string; model: string; mileage?: string };
      services: string[];
      appointment: { date: string; time: string };
      contact: { name: string; phone?: string; email?: string };
    };

    // minimal validation
    if (!body?.vehicle || !body?.appointment || !body?.contact?.name) {
      return { statusCode: 400, body: "Invalid payload" };
    }

    const subject = `Service Request: ${body.vehicle.year} ${body.vehicle.make} ${body.vehicle.model}`;
    const html = `
      <h2>New Service Request</h2>
      <p><strong>From:</strong> ${body.contact.name}
        ${body.contact.email ? ` &lt;${body.contact.email}&gt;` : ""}
        ${body.contact.phone ? ` • ${body.contact.phone}` : ""}
      </p>
      <h3>Vehicle</h3>
      <p>${body.vehicle.year} ${body.vehicle.make} ${body.vehicle.model}
        ${body.vehicle.mileage ? ` (${body.vehicle.mileage} mi)` : ""}</p>
      <h3>Services</h3>
      <p>${body.services?.length ? body.services.join(", ") : "—"}</p>
      <h3>Appointment</h3>
      <p>${body.appointment.date} at ${body.appointment.time}</p>
    `;

    await resend.emails.send({
      from: FROM,
      to: [TO],
      subject,
      html,
      reply_to: body.contact.email || undefined,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
      headers: { "Content-Type": "application/json" },
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Email send failed" };
  }
};
