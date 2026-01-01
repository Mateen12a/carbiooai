import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const FROM_EMAIL = "Carbioo AI <hello@carbiooai.com>";
const FRONTEND_URL = process.env.FRONTEND_URL || "https://carbiooai.com";

export async function sendVerificationEmail(
  email: string,
  firstName: string,
  verificationToken: string
): Promise<boolean> {
  try {
    if (!resend) return false;

    const verificationUrl = `${FRONTEND_URL}/verify?token=${verificationToken}`;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Confirm your email to join Carbioo AI",
      html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:#f8fafc;">
  <div style="max-width:600px;margin:0 auto;padding:32px 20px;">
    
    <div style="background:#0f172a;border-radius:16px 16px 0 0;padding:40px;text-align:center;">
      <img src="https://www.carbiooai.com/sprout.png" width="40" height="40" alt="Carbioo AI" />
      <h1 style="color:#ffffff;font-size:26px;margin-top:16px;">
        Welcome to Carbioo AI
      </h1>
    </div>

    <div style="background:#ffffff;border-radius:0 0 16px 16px;padding:40px;">
      <p style="font-size:18px;color:#0f172a;">
        Hi ${firstName},
      </p>

      <p style="font-size:16px;color:#334155;line-height:1.6;">
        Thanks for joining the Carbioo AI waitlist.
        We are building a new way to understand construction materials, their environmental impact, and how better choices can be made from the start.
      </p>

      <p style="font-size:16px;color:#334155;line-height:1.6;">
        Please confirm your email address to secure your place.
      </p>

      <div style="text-align:center;margin:32px 0;">
        <a href="${verificationUrl}"
           style="background:#16a34a;color:white;padding:16px 40px;border-radius:12px;
           text-decoration:none;font-weight:600;font-size:16px;">
          Confirm Email
        </a>
      </div>

      <p style="font-size:14px;color:#64748b;text-align:center;">
        This link expires in 24 hours. If you didn’t request this, you can ignore this email.
      </p>

      <hr style="margin:32px 0;border:none;border-top:1px solid #e5e7eb;" />

      <p style="font-size:14px;color:#64748b;text-align:center;">
        Questions? Just reply to this email or reach us at hello@carbiooai.com
      </p>
    </div>

    <p style="text-align:center;font-size:12px;color:#94a3b8;margin-top:24px;">
      © 2025 Carbioo AI
    </p>
  </div>
</body>
</html>
      `,
    });

    return !error;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function sendWelcomeEmail(
  email: string,
  firstName: string
): Promise<boolean> {
  try {
    if (!resend) return false;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "You are officially on the Carbioo AI waitlist",
      html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:#f8fafc;">
  <div style="max-width:600px;margin:0 auto;padding:32px 20px;">

    <div style="background:#0f172a;border-radius:16px 16px 0 0;padding:48px;text-align:center;">
      <img src="https://www.carbiooai.com/sprout.png" width="44" height="44" alt="Carbioo AI" />
      <h1 style="color:#ffffff;font-size:28px;margin-top:16px;">
        You are in
      </h1>
      <p style="color:#cbd5e1;font-size:16px;margin-top:8px;">
        Thanks for joining early
      </p>
    </div>

    <div style="background:#ffffff;border-radius:0 0 16px 16px;padding:40px;">
      <p style="font-size:18px;color:#0f172a;">
        Hi ${firstName},
      </p>

      <p style="font-size:16px;color:#334155;line-height:1.6;">
        Your email has been verified and you are now on the Carbioo AI waitlist.
      </p>

      <p style="font-size:16px;color:#334155;line-height:1.6;">
        We are building Carbioo AI openly with people who care about how buildings are designed, built, and improved.
        Whether you are a professional or simply curious, you belong here.
      </p>

      <div style="background:#f0fdf4;border-left:4px solid #16a34a;
        padding:20px;border-radius:12px;margin:24px 0;">
        <strong style="color:#166534;">What happens next</strong>
        <ul style="margin-top:12px;color:#334155;font-size:14px;line-height:1.8;">
          <li>Occasional updates on progress and direction</li>
          <li>Early access invitations as the platform opens</li>
          <li>Opportunities to shape what we build next</li>
        </ul>
      </div>

      <p style="font-size:16px;color:#334155;line-height:1.6;">
        We are glad to have you early.
      </p>

      <p style="font-size:16px;color:#0f172a;">
        The Carbioo AI team
      </p>

      <hr style="margin:32px 0;border:none;border-top:1px solid #e5e7eb;" />

      <p style="font-size:14px;color:#64748b;text-align:center;">
        Have questions or ideas? Reply to this email anytime.
      </p>
    </div>

    <p style="text-align:center;font-size:12px;color:#94a3b8;margin-top:24px;">
      © 2025 Carbioo AI
    </p>
  </div>
</body>
</html>
      `,
    });

    return !error;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function sendContactNotification(contactData: {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}): Promise<boolean> {
  try {
    if (!resend) return false;

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: "hello@carbiooai.com",
      subject: `New message from ${contactData.firstName} ${contactData.lastName}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${contactData.firstName} ${contactData.lastName}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Message:</strong></p>
        <p>${contactData.message}</p>
      `,
    });

    return !error;
  } catch (err) {
    console.error(err);
    return false;
  }
}
