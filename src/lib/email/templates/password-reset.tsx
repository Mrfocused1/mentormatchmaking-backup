import { BaseEmailTemplate, EmailButton, EmailDivider } from './base'

interface PasswordResetEmailProps {
  name: string
  resetUrl: string
  expiresIn: string
}

export const PasswordResetEmail = ({ name, resetUrl, expiresIn }: PasswordResetEmailProps) => {
  const content = `
    <h2 style="color: #25283D; font-size: 24px; font-weight: 700; margin: 0 0 20px 0;">
      Reset Your Password 🔒
    </h2>

    <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
      Hi ${name},
    </p>

    <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
      We received a request to reset the password for your Look 4 Mentors account. Click the button below to create a new password:
    </p>

    ${EmailButton('Reset Password', resetUrl, 'primary')}

    <p style="color: #999999; font-size: 14px; line-height: 1.6; margin: 25px 0; text-align: center;">
      Or copy and paste this link into your browser:<br>
      <a href="${resetUrl}" style="color: #8F3985; word-break: break-all;">${resetUrl}</a>
    </p>

    ${EmailDivider()}

    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; border-radius: 4px; margin: 20px 0;">
      <tr>
        <td>
          <p style="margin: 0 0 8px 0; color: #856404; font-size: 14px; font-weight: 600;">
            ⚠️ Important Security Information
          </p>
          <p style="margin: 0; color: #856404; font-size: 13px; line-height: 1.5;">
            • This link expires in ${expiresIn}<br>
            • If you didn't request this, you can safely ignore this email<br>
            • Your password will remain unchanged unless you click the link above
          </p>
        </td>
      </tr>
    </table>

    <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0;">
      For security reasons, we cannot send your current password. If you need additional help, please contact our support team.
    </p>

    ${EmailDivider()}

    <p style="color: #999999; font-size: 13px; line-height: 1.6; margin: 0; text-align: center;">
      <strong>Didn't request this?</strong><br>
      If you didn't request a password reset, please <a href="https://look4mentors.com/contact?subject=suspicious-activity" style="color: #8F3985;">contact support immediately</a>.
    </p>
  `

  return BaseEmailTemplate({
    children: content,
    previewText: `Reset your Look 4 Mentors password - expires in ${expiresIn}`
  })
}

export default PasswordResetEmail
