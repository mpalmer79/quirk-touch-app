import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const TO = process.env.SERVICE_TO_EMAIL;
const FROM = process.env.SERVICE_FROM_EMAIL;

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body || "{}");

    const subject = `Service Request: ${body.vehicle?.year} ${body.vehicle?.make} ${body.vehicle?.model}`;
    const html = `
      <h2>New Service Request</h2>
      <p><strong>From:</strong> ${body.contact?.name}
        ${body.contact?.email ? ` &lt;${body.contact.email}&gt;` : ""}
        ${body.contact?.phone ? ` • ${body.contact.phone}` : ""}
      </p>
      <h3>Vehicle</h3>
      <p>${body.vehicle?.year} ${body.vehicle?.make} ${body.vehicle?.model}
        ${body.vehicle?.mileage ? ` (${body.vehicle.mileage} mi)` : ""}</p>
      <h3>Services</h3>
      <p>${body.services?.length ? body.services.join(", ") : "—"}</p>
      <h3>Appointment</h3>
      <p>${body.appointment?.date} at ${body.appointment?.time}</p>
    `;

    await sgMail.send({
      to: TO,
      from: FROM, // must be a verified sender/domain in SendGrid
      subject,
      html,
      replyTo: body.contact?.email || undefined,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
      headers: { "Content-Type": "application/json" },
    };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: "Email send failed" };
  }
}
