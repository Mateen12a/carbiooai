import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM_EMAIL = 'Carbioo AI <hello@carbiooai.com>';

export async function sendVerificationEmail(email: string, firstName: string, verificationToken: string): Promise<boolean> {
  try {
    if (!resend) {
      console.warn('Resend API key not configured. Email not sent.');
      return false;
    }
    
    const verificationUrl = `${process.env.APP_URL || 'https://' + process.env.REPLIT_DEV_DOMAIN}/api/waitlist/verify?token=${verificationToken}`;
    
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
      <div style="display: inline-flex; align-items: center; gap: 12px; margin-bottom: 20px;">
        <div style="width: 48px; height: 48px; background: rgba(255,255,255,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"/>
            <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"/>
          </svg>
        </div>
        <span style="font-size: 28px; font-weight: 700; color: white; letter-spacing: -0.5px;">Carbioo AI</span>
      </div>
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
      <div style="display: inline-flex; align-items: center; gap: 12px; margin-bottom: 24px;">
        <div style="width: 56px; height: 56px; background: rgba(255,255,255,0.2); border-radius: 14px; display: flex; align-items: center; justify-content: center;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"/>
            <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"/>
          </svg>
        </div>
        <span style="font-size: 32px; font-weight: 700; color: white; letter-spacing: -0.5px;">Carbioo AI</span>
      </div>
      <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
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
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="display: flex; align-items: flex-start; gap: 12px;">
            <div style="width: 32px; height: 32px; background: #ecfdf5; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <div>
              <p style="font-size: 14px; color: #1e293b; font-weight: 600; margin: 0 0 4px 0;">Instant Material Analysis</p>
              <p style="font-size: 13px; color: #64748b; margin: 0;">Identify materials and their carbon footprint in seconds using AI</p>
            </div>
          </div>
          <div style="display: flex; align-items: flex-start; gap: 12px;">
            <div style="width: 32px; height: 32px; background: #ecfdf5; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <polyline points="2 17 12 22 22 17"/>
                <polyline points="2 12 12 17 22 12"/>
              </svg>
            </div>
            <div>
              <p style="font-size: 14px; color: #1e293b; font-weight: 600; margin: 0 0 4px 0;">Smarter Alternatives</p>
              <p style="font-size: 13px; color: #64748b; margin: 0;">Get AI-recommended eco-friendly substitutes that meet structural requirements</p>
            </div>
          </div>
          <div style="display: flex; align-items: flex-start; gap: 12px;">
            <div style="width: 32px; height: 32px; background: #ecfdf5; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                <path d="M2 12h20"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <div>
              <p style="font-size: 14px; color: #1e293b; font-weight: 600; margin: 0 0 4px 0;">Industry First</p>
              <p style="font-size: 13px; color: #64748b; margin: 0;">The first AI platform designed specifically for construction carbon reduction</p>
            </div>
          </div>
        </div>
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
