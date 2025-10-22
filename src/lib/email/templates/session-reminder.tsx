import { BaseEmailTemplate, EmailButton, EmailDivider } from './base'

interface SessionReminderEmailProps {
  recipientName: string
  otherPersonName: string
  sessionDate: string
  sessionTime: string
  duration: number
  sessionType: string
  sessionUrl: string
}

export const SessionReminderEmail = ({
  recipientName,
  otherPersonName,
  sessionDate,
  sessionTime,
  duration,
  sessionType,
  sessionUrl
}: SessionReminderEmailProps) => {
  const content = `
    <h2 style="color: #25283D; font-size: 24px; font-weight: 700; margin: 0 0 20px 0;">
      Upcoming Session Reminder ⏰
    </h2>

    <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
      Hi ${recipientName},
    </p>

    <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
      This is a friendly reminder about your upcoming mentorship session with <strong>${otherPersonName}</strong>.
    </p>

    <!-- Session Details Card -->
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f9f9f9; border-radius: 12px; padding: 25px; margin: 0 0 25px 0;">
      <tr>
        <td>
          <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="color: #999999; font-size: 13px; width: 100px;">
                      📅 Date
                    </td>
                    <td style="color: #25283D; font-size: 15px; font-weight: 600;">
                      ${sessionDate}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="color: #999999; font-size: 13px; width: 100px;">
                      🕐 Time
                    </td>
                    <td style="color: #25283D; font-size: 15px; font-weight: 600;">
                      ${sessionTime}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="color: #999999; font-size: 13px; width: 100px;">
                      ⏱️ Duration
                    </td>
                    <td style="color: #25283D; font-size: 15px; font-weight: 600;">
                      ${duration} minutes
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="color: #999999; font-size: 13px; width: 100px;">
                      📋 Type
                    </td>
                    <td style="color: #25283D; font-size: 15px; font-weight: 600;">
                      ${sessionType}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    ${EmailButton('View Session Details', sessionUrl, 'primary')}

    ${EmailDivider()}

    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <tr>
        <td>
          <p style="margin: 0 0 10px 0; color: #25283D; font-size: 15px; font-weight: 600;">
            📝 Before Your Session
          </p>
          <ul style="margin: 0; padding-left: 20px; color: #666666; font-size: 14px; line-height: 1.8;">
            <li>Review any prep materials or questions</li>
            <li>Test your internet connection</li>
            <li>Find a quiet, distraction-free space</li>
            <li>Have a notebook ready for key takeaways</li>
          </ul>
        </td>
      </tr>
    </table>

    <p style="color: #999999; font-size: 13px; line-height: 1.6; margin: 20px 0 0 0; text-align: center;">
      Need to reschedule? <a href="${sessionUrl}" style="color: #8F3985;">Manage your session</a>
    </p>
  `

  return BaseEmailTemplate({
    children: content,
    previewText: `Reminder: Your ${sessionType} session with ${otherPersonName} is tomorrow`
  })
}

export default SessionReminderEmail
