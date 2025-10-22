import { BaseEmailTemplate, EmailButton } from './base'

interface SessionConfirmedEmailProps {
  recipientName: string
  otherPersonName: string
  sessionDate: string
  sessionTime: string
  sessionType: string
  sessionUrl: string
}

export const SessionConfirmedEmail = ({
  recipientName,
  otherPersonName,
  sessionDate,
  sessionTime,
  sessionType,
  sessionUrl
}: SessionConfirmedEmailProps) => {
  const content = `
    <table cellpadding="0" cellspacing="0" border="0" width="100%" align="center" style="margin: 0 0 25px 0;">
      <tr>
        <td align="center">
          <div style="width: 80px; height: 80px; border-radius: 50%; background-color: #07BEB8; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
            <span style="font-size: 40px;">✓</span>
          </div>
        </td>
      </tr>
    </table>

    <h2 style="color: #25283D; font-size: 24px; font-weight: 700; margin: 0 0 20px 0; text-align: center;">
      Session Confirmed! ✨
    </h2>

    <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0; text-align: center;">
      Great news, ${recipientName}!
    </p>

    <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0; text-align: center;">
      Your <strong>${sessionType}</strong> session with <strong>${otherPersonName}</strong> has been confirmed.
    </p>

    <!-- Session Card -->
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, #8F3985 0%, #98DFEA 100%); border-radius: 12px; padding: 2px; margin: 0 0 25px 0;">
      <tr>
        <td>
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 10px; padding: 25px;">
            <tr>
              <td align="center">
                <p style="margin: 0 0 15px 0; color: #25283D; font-size: 18px; font-weight: 600;">
                  ${sessionDate}
                </p>
                <p style="margin: 0 0 5px 0; color: #8F3985; font-size: 28px; font-weight: 700;">
                  ${sessionTime}
                </p>
                <p style="margin: 0; color: #999999; font-size: 14px;">
                  ${sessionType}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    ${EmailButton('Add to Calendar', sessionUrl, 'primary')}

    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 25px 0;">
      <tr>
        <td align="center">
          <p style="margin: 0; color: #999999; font-size: 14px;">
            <a href="${sessionUrl}" style="color: #8F3985; text-decoration: none;">View session details</a> •
            <a href="${sessionUrl}" style="color: #8F3985; text-decoration: none;">Add notes</a> •
            <a href="${sessionUrl}" style="color: #8F3985; text-decoration: none;">Reschedule</a>
          </p>
        </td>
      </tr>
    </table>

    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; border-radius: 4px; margin: 25px 0;">
      <tr>
        <td>
          <p style="margin: 0 0 8px 0; color: #856404; font-size: 14px; font-weight: 600;">
            📌 Mark Your Calendar
          </p>
          <p style="margin: 0; color: #856404; font-size: 13px; line-height: 1.5;">
            You'll receive a reminder 24 hours before your session. We recommend adding this to your calendar now!
          </p>
        </td>
      </tr>
    </table>
  `

  return BaseEmailTemplate({
    children: content,
    previewText: `Session confirmed with ${otherPersonName} on ${sessionDate} at ${sessionTime}`
  })
}

export default SessionConfirmedEmail
