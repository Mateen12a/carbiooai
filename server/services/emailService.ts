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
      subject: 'Verify your email to join the Carbioo AI waitlist',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); border-radius: 16px 16px 0 0; padding: 40px; text-align: center;">
      <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 20px auto;">
        <tr>
          <td style="vertical-align: middle;">
            <img src="https://www.carbiooai.com/sprout.png" alt="Carbioo" width="36" height="36" style="display: block;" />
          </td>
          <td style="padding-left: 10px; vertical-align: middle;">
            <span style="font-size: 28px; font-weight: 700; color: white; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Carbioo </span><span style="font-size: 28px; font-weight: 700; color: #22c55e; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">AI</span>
          </td>
        </tr>
      </table>
      <h1 style="color: white; font-size: 24px; font-weight: 600; margin: 0;">Verify Your Email</h1>
    </div>
    
    <div style="background: white; border-radius: 0 0 16px 16px; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <p style="font-size: 18px; color: #1e293b; margin: 0 0 20px 0;">Hi ${firstName},</p>
      
      <p style="font-size: 16px; color: #475569; line-height: 1.6; margin: 0 0 24px 0;">
        Thank you for your interest in Carbioo AI! You're one step away from joining the waitlist for the world's first AI-powered platform for sustainable construction materials.
      </p>
      
      <p style="font-size: 16px; color: #475569; line-height: 1.6; margin: 0 0 32px 0;">
        Click the button below to verify your email and secure your spot:
      </p>
      
      <div style="text-align: center; margin: 32px 0;">
        <a href="${verificationUrl}" style="display: inline-block; background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; text-decoration: none; padding: 16px 48px; border-radius: 12px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.4);">
          Verify My Email
        </a>
      </div>
      
      <p style="font-size: 14px; color: #94a3b8; margin: 32px 0 0 0; text-align: center;">
        This link expires in 24 hours. If you didn't request this, you can safely ignore this email.
      </p>
      
      <div style="border-top: 1px solid #e2e8f0; margin-top: 32px; padding-top: 24px;">
        <p style="font-size: 14px; color: #64748b; margin: 0; text-align: center;">
          Questions? Reply to this email or contact us at hello@carbiooai.com
        </p>
      </div>
    </div>
    
    <div style="text-align: center; padding: 24px;">
      <p style="font-size: 12px; color: #94a3b8; margin: 0;">
        © 2025 Carbioo AI. Building a sustainable future, one material at a time.
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
      subject: 'Welcome to Carbioo AI - You\'re on the waitlist!',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); border-radius: 16px 16px 0 0; padding: 48px 40px; text-align: center;">
      <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 24px auto;">
        <tr>
          <td style="vertical-align: middle;">
            <img src="https://www.carbiooai.com/sprout.png" alt="Carbioo" width="40" height="40" style="display: block;" />
          </td>
          <td style="padding-left: 10px; vertical-align: middle;">
            <span style="font-size: 32px; font-weight: 700; color: white; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Carbioo </span><span style="font-size: 32px; font-weight: 700; color: #22c55e; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">AI</span>
          </td>
        </tr>
      </table>
      <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto 20px auto;">
        <tr>
          <td style="width: 80px; height: 80px; background: rgba(255,255,255,0.25); border-radius: 50%; text-align: center; vertical-align: middle;">
            <img src="https://img.icons8.com/fluency/96/checkmark.png" alt="Success" width="48" height="48" style="display: block; margin: auto;" />
          </td>
        </tr>
      </table>
      <h1 style="color: white; font-size: 28px; font-weight: 700; margin: 0;">You're In!</h1>
      <p style="color: rgba(255,255,255,0.9); font-size: 16px; margin: 12px 0 0 0;">Welcome to the future of sustainable construction</p>
    </div>
    
    <div style="background: white; border-radius: 0 0 16px 16px; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <p style="font-size: 18px; color: #1e293b; margin: 0 0 20px 0;">Hi ${firstName},</p>
      
      <p style="font-size: 16px; color: #475569; line-height: 1.6; margin: 0 0 24px 0;">
        <strong>Congratulations!</strong> Your email has been verified and you're officially on the Carbioo AI waitlist. You're now part of an exclusive group of forward-thinking professionals who are helping shape the future of sustainable construction.
      </p>
      
      <div style="background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border-radius: 12px; padding: 24px; margin: 24px 0; border-left: 4px solid #10b981;">
        <h3 style="color: #059669; font-size: 16px; font-weight: 600; margin: 0 0 12px 0;">What happens next?</h3>
        <ul style="color: #475569; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
          <li>We'll notify you as soon as Carbioo AI launches</li>
          <li>Early waitlist members get exclusive beta access</li>
          <li>You'll receive updates on our progress and features</li>
          <li>Priority support when the platform goes live</li>
        </ul>
      </div>
      
      <div style="background: #f8fafc; border-radius: 12px; padding: 24px; margin: 24px 0;">
        <h3 style="color: #1e293b; font-size: 16px; font-weight: 600; margin: 0 0 16px 0;">Why Carbioo AI?</h3>
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td style="padding-bottom: 16px;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="width: 32px; height: 32px; background: #ecfdf5; border-radius: 8px; text-align: center; vertical-align: middle;">
                    <img src="https://img.icons8.com/fluency/32/time.png" alt="Clock" width="16" height="16" style="display: block; margin: auto;" />
                  </td>
                  <td style="padding-left: 12px; vertical-align: top;">
                    <p style="font-size: 14px; color: #1e293b; font-weight: 600; margin: 0 0 4px 0;">Instant Material Analysis</p>
                    <p style="font-size: 13px; color: #64748b; margin: 0;">Identify materials and their carbon footprint in seconds using AI</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom: 16px;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="width: 32px; height: 32px; background: #ecfdf5; border-radius: 8px; text-align: center; vertical-align: middle;">
                    <img src="https://img.icons8.com/fluency/32/layers.png" alt="Layers" width="16" height="16" style="display: block; margin: auto;" />
                  </td>
                  <td style="padding-left: 12px; vertical-align: top;">
                    <p style="font-size: 14px; color: #1e293b; font-weight: 600; margin: 0 0 4px 0;">Smarter Alternatives</p>
                    <p style="font-size: 13px; color: #64748b; margin: 0;">Get AI-recommended eco-friendly substitutes that meet structural requirements</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="width: 32px; height: 32px; background: #ecfdf5; border-radius: 8px; text-align: center; vertical-align: middle;">
                    <img src="https://img.icons8.com/fluency/32/globe.png" alt="Globe" width="16" height="16" style="display: block; margin: auto;" />
                  </td>
                  <td style="padding-left: 12px; vertical-align: top;">
                    <p style="font-size: 14px; color: #1e293b; font-weight: 600; margin: 0 0 4px 0;">Industry First</p>
                    <p style="font-size: 13px; color: #64748b; margin: 0;">The first AI platform designed specifically for construction carbon reduction</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
      
      <p style="font-size: 16px; color: #475569; line-height: 1.6; margin: 24px 0 0 0;">
        Thank you for being part of our mission to decarbonize the construction industry. Together, we can build a more sustainable future.
      </p>
      
      <p style="font-size: 16px; color: #1e293b; margin: 24px 0 0 0;">
        The Carbioo AI Team
      </p>
      
      <div style="border-top: 1px solid #e2e8f0; margin-top: 32px; padding-top: 24px;">
        <p style="font-size: 14px; color: #64748b; margin: 0; text-align: center;">
          Questions? Reply to this email or contact us at hello@carbiooai.com
        </p>
      </div>
    </div>
    
    <div style="text-align: center; padding: 24px;">
      <p style="font-size: 12px; color: #94a3b8; margin: 0;">
        © 2025 Carbioo AI. Building a sustainable future, one material at a time.
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
