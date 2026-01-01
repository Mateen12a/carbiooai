import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_Z6U7Fzbc_PbNvk7drU1w7T6Vfjg36SVwo';
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const FROM_EMAIL = 'Carbioo AI <hello@carbiooai.com>';

export async function sendVerificationEmail(email: string, firstName: string, verificationToken: string): Promise<boolean> {
  try {
    if (!resend) {
      console.warn('Resend API key not configured. Email not sent.');
      return false;
    }
    
    const verificationUrl = `${process.env.FRONTEND_URL || 'https://carbiooai.com'}/verify?token=${verificationToken}`;
    
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Verify your entry to Carbioo AI',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background: #0f172a; border-radius: 16px 16px 0 0; padding: 40px; text-align: center;">
      <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 20px auto;">
        <tr>
          <td style="vertical-align: middle;">
            <img src="https://www.carbiooai.com/sprout.png" alt="Carbioo" width="36" height="36" style="display: block;" />
          </td>
          <td style="padding-left: 10px; vertical-align: middle;">
            <span style="font-size: 28px; font-weight: 700; color: white; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Carbioo </span><span style="font-size: 28px; font-weight: 700; color: #10b981; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">AI</span>
          </td>
        </tr>
      </table>
      <h1 style="color: white; font-size: 24px; font-weight: 600; margin: 0;">Verify Your Journey</h1>
    </div>
    
    <div style="background: white; border-radius: 0 0 16px 16px; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <p style="font-size: 18px; color: #1e293b; margin: 0 0 20px 0;">Hi ${firstName},</p>
      
      <p style="font-size: 16px; color: #475569; line-height: 1.6; margin: 0 0 24px 0;">
        You're stepping into the future of construction. To finalize your spot on the Carbioo AI priority list, please verify your email address.
      </p>
      
      <div style="text-align: center; margin: 32px 0;">
        <a href="${verificationUrl}" style="display: inline-block; background: #10b981; color: white; text-decoration: none; padding: 16px 48px; border-radius: 12px; font-size: 16px; font-weight: 700; box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.4);">
          Confirm My Spot
        </a>
      </div>
      
      <p style="font-size: 14px; color: #94a3b8; margin: 32px 0 0 0; text-align: center;">
        Welcome to the inevitable shift in building.
      </p>
    </div>
    
    <div style="text-align: center; padding: 24px;">
      <p style="font-size: 12px; color: #94a3b8; margin: 0;">
        © 2026 Carbioo AI. The new standard for construction.
      </p>
    </div>
  </div>
</body>
</html>
      `
    });

    if (error) {
      console.error('Error sending verification email:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
}

export async function sendWelcomeEmail(email: string, firstName: string): Promise<boolean> {
  try {
    if (!resend) {
      console.warn('Resend API key not configured. Email not sent.');
      return false;
    }
    
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Welcome to Carbioo AI | The Future of Building',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f172a; color: #f8fafc;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background: #1e293b; border-radius: 24px; padding: 48px; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5);">
      <div style="text-align: center; margin-bottom: 40px;">
        <span style="font-size: 32px; font-weight: 800; color: white; letter-spacing: -1px;">Carbioo <span style="color: #10b981;">AI</span></span>
      </div>
      
      <h1 style="font-size: 28px; font-weight: 700; color: white; margin: 0 0 24px 0; line-height: 1.2; text-align: center;">You're in. The future is waiting.</h1>
      
      <p style="font-size: 18px; color: #cbd5e1; line-height: 1.6; margin: 0 0 32px 0; text-align: center;">
        Hi ${firstName}, you've officially secured your spot on the Carbioo priority list.
      </p>

      <div style="background: rgba(16, 185, 129, 0.1); border-radius: 16px; padding: 32px; margin-bottom: 40px; border-left: 4px solid #10b981;">
        <p style="font-size: 16px; color: #f8fafc; line-height: 1.6; margin: 0;">
          The industry standard is shifting. By joining us today, you aren't just watching the change—you're leading it.
        </p>
      </div>

      <div style="margin-bottom: 40px;">
        <h3 style="color: white; font-size: 18px; font-weight: 600; margin: 0 0 20px 0;">The Journey Ahead:</h3>
        <div style="margin-bottom: 16px;">
          <p style="margin: 0; color: #10b981; font-weight: 600; font-size: 14px; text-transform: uppercase;">Q1 2026</p>
          <p style="margin: 0; color: #f8fafc; font-size: 16px;">Priority access to the Carbioo intelligence layer.</p>
        </div>
        <div style="margin-bottom: 16px;">
          <p style="margin: 0; color: #10b981; font-weight: 600; font-size: 14px; text-transform: uppercase;">Real-Time</p>
          <p style="margin: 0; color: #f8fafc; font-size: 16px;">Exclusive insights as we build the new standard for building.</p>
        </div>
      </div>

      <div style="text-align: center;">
        <p style="font-size: 16px; color: #94a3b8; margin: 0 0 8px 0;">Sustainable construction is now inevitable.</p>
        <p style="font-size: 18px; color: white; font-weight: 700; margin: 0;">The Carbioo AI Team</p>
      </div>
    </div>
    
    <div style="text-align: center; padding: 32px;">
      <p style="font-size: 12px; color: #475569; margin: 0;">
        © 2026 Carbioo AI. Leading the decarbonization of the built environment.
      </p>
    </div>
  </div>
</body>
</html>
      `
    });

    if (error) {
      console.error('Error sending welcome email:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
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
    if (!resend) {
      console.warn('Resend API key not configured. Contact notification not sent.');
      return false;
    }

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: 'hello@carbiooai.com', // Admin notification
      subject: `New Contact Form Submission: ${contactData.firstName} ${contactData.lastName}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>From:</strong> ${contactData.firstName} ${contactData.lastName} (${contactData.email})</p>
        <p><strong>Message:</strong></p>
        <p>${contactData.message}</p>
      `
    });

    if (error) {
      console.error('Error sending contact notification:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error sending contact notification:', error);
    return false;
  }
}

export async function sendInvestorAcknowledgeEmail(email: string, fullName: string): Promise<boolean> {
  try {
    if (!resend) {
      console.warn('Resend API key not configured. Investor acknowledgment not sent.');
      return false;
    }

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Carbioo AI | Investor Interest Received',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background: #0f172a; border-radius: 16px; padding: 40px; text-align: center; color: white;">
      <h1 style="font-size: 24px; font-weight: 600; margin: 0;">Investor Interest</h1>
    </div>
    
    <div style="background: white; border-radius: 16px; padding: 40px; margin-top: -16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <p style="font-size: 16px; color: #1e293b; margin: 0 0 20px 0;">Dear ${fullName},</p>
      
      <p style="font-size: 16px; color: #475569; line-height: 1.6; margin: 0 0 24px 0;">
        Thank you for your interest in Carbioo AI. We have received your request for an investor brief.
      </p>
      
      <p style="font-size: 16px; color: #475569; line-height: 1.6; margin: 0 0 24px 0;">
        A member of our founding team will review your details and follow up with you personally.
      </p>
      
      <div style="border-top: 1px solid #e2e8f0; margin-top: 32px; padding-top: 24px;">
        <p style="font-size: 14px; color: #64748b; margin: 0; text-align: center;">
          Carbioo AI | The New Standard for Construction
        </p>
      </div>
    </div>
  </div>
</body>
</html>
      `
    });

    if (error) {
      console.error('Error sending investor acknowledgment:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error sending investor acknowledgment:', error);
    return false;
  }
}
