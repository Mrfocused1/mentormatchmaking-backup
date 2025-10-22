import { BaseEmailTemplate, EmailButton } from './base'

interface EmailVerificationProps {
  name: string
  verificationUrl: string
}

export const EmailVerificationEmail = ({ name, verificationUrl }: EmailVerificationProps) => {
  const content = `
    <h2 style="color: #25283D; font-size: 24px; font-weight: 700; margin: 0 0 20px 0;">
      Verify Your Email Address ✉️
    </h2>

    <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
      Hi ${name},
    </p>

    <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
      Thanks for signing up for Look 4 Mentors! To get started, please verify your email address by clicking the button below:
    </p>

    ${EmailButton('Verify Email Address', verificationUrl, 'primary')}

    <p style="color: #999999; font-size: 14px; line-height: 1.6; margin: 25px 0; text-align: center;">
      Or copy and paste this link into your browser:<br>
      <a href="${verificationUrl}" style="color: #8F3985; word-break: break-all;">${verificationUrl}</a>
    </p>

    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 25px 0;">
      <tr>
        <td>
          <p style="margin: 0 0 10px 0; color: #25283D; font-size: 15px; font-weight: 600;">
            Why verify your email?
          </p>
          <ul style="margin: 0; padding-left: 20px; color: #666666; font-size: 14px; line-height: 1.8;">
            <li>Access all platform features</li>
            <li>Receive important notifications</li>
            <li>Secure your account</li>
            <li>Connect with mentors/mentees</li>
          </ul>
        </td>
      </tr>
    </table>

    <p style="color: #999999; font-size: 13px; line-height: 1.6; margin: 20px 0 0 0; text-align: center;">
      This verification link expires in 24 hours.<br>
      Didn't sign up? You can safely ignore this email.
    </p>
  `

  return BaseEmailTemplate({
    children: content,
    previewText: `Verify your email to activate your Look 4 Mentors account`
  })
}

export default EmailVerificationEmail
