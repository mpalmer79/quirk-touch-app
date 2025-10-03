import sgMail from "@sendgrid/mail";

const { SENDGRID_API_KEY, SERVICE_TO_EMAIL, SERVICE_FROM_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // Quick env check
    if (!SENDGRID_API_KEY || !SERVICE_TO_EMAIL || !SERVICE_FROM_EMAIL) {
      const msg = `Missing env: ${
        [
          !SENDGRID_API_KEY && "SENDGRID_API_KEY",
          !SERVICE_TO_EMAIL && "SERVICE_TO_EMAIL",
          !SERVICE_FROM_EMAIL && "SERVICE_FROM_EMAIL",
        ]
          .filter(Boolean)
          .join(", ")
      }`;
      console.error(msg);
      return { statusCode: 500, body: msg };
    }

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

    const sgResp = await sgMail.send({
      to: SERVICE_TO_EMAIL,
      from: SERVICE_FROM_EMAIL, // must be a verified sender/domain in SendGrid
      subject,
      html,
      replyTo: body.contact?.email || undefined,
    });

    console.log("SendGrid response:", sgResp[0]?.statusCode, sgResp[0]?.headers);
    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
      headers: { "Content-Type": "application/json" },
    };
  } catch (e) {
    // SendGrid usually returns detailed info on e.response.body
    const details =
      e?.response?.body ? JSON.stringify(e.response.body) : (e?.message || "Unknown error");
    console.error("SendGrid error:", details);
    return { statusCode: 500, body: details };
  }
}
