import { BaseEmailTemplate, EmailButton } from './base'

interface ConnectionRequestEmailProps {
  recipientName: string
  senderName: string
  senderRole: string
  message: string
  senderPhoto?: string
  requestUrl: string
}

export const ConnectionRequestEmail = ({
  recipientName,
  senderName,
  senderRole,
  message,
  senderPhoto,
  requestUrl
}: ConnectionRequestEmailProps) => {
  const content = `
    <h2 style="color: #25283D; font-size: 24px; font-weight: 700; margin: 0 0 20px 0;">
      New Connection Request 🤝
    </h2>

    <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
      Hi ${recipientName},
    </p>

    <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
      <strong>${senderName}</strong> wants to connect with you on Look 4 Mentors!
    </p>

    <!-- Sender Profile Card -->
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f9f9f9; border-radius: 12px; padding: 25px; margin: 0 0 25px 0;">
      <tr>
        <td align="center">
          ${senderPhoto ? `
            <img src="${senderPhoto}" alt="${senderName}" style="width: 80px; height: 80px; border-radius: 50%; margin: 0 0 15px 0; object-fit: cover;">
          ` : `
            <div style="width: 80px; height: 80px; border-radius: 50%; background-color: #98DFEA; color: #25283D; display: inline-flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 700; margin: 0 0 15px 0;">
              ${senderName.charAt(0)}
            </div>
          `}
          <h3 style="color: #25283D; font-size: 20px; font-weight: 600; margin: 0 0 5px 0;">
            ${senderName}
          </h3>
          <p style="color: #8F3985; font-size: 14px; font-weight: 500; margin: 0 0 20px 0; text-transform: capitalize;">
            ${senderRole}
          </p>
        </td>
      </tr>
      ${message ? `
      <tr>
        <td style="padding: 20px; background-color: #ffffff; border-radius: 8px; border-left: 4px solid #98DFEA;">
          <p style="margin: 0 0 5px 0; color: #999999; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
            Message
          </p>
          <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.6; font-style: italic;">
            "${message}"
          </p>
        </td>
      </tr>
      ` : ''}
    </table>

    <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 0 25px 0;">
      <tr>
        <td style="padding: 0 8px;">
          <a href="${requestUrl}?action=accept" style="display: inline-block; padding: 14px 32px; background-color: #07BEB8; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 15px; font-weight: 600;">
            Accept
          </a>
        </td>
        <td style="padding: 0 8px;">
          <a href="${requestUrl}" style="display: inline-block; padding: 14px 32px; background-color: #f0f0f0; color: #666666; text-decoration: none; border-radius: 6px; font-size: 15px; font-weight: 600;">
            View Request
          </a>
        </td>
      </tr>
    </table>

    <p style="color: #999999; font-size: 13px; line-height: 1.6; margin: 20px 0 0 0; text-align: center;">
      You can view all your connection requests in your <a href="https://look4mentors.com/connections" style="color: #8F3985;">connections page</a>.
    </p>
  `

  return BaseEmailTemplate({
    children: content,
    previewText: `${senderName} wants to connect with you on Look 4 Mentors`
  })
}

export default ConnectionRequestEmail
