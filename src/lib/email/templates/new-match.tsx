import { BaseEmailTemplate, EmailButton, EmailDivider } from './base'

interface NewMatchEmailProps {
  recipientName: string
  matchName: string
  matchRole: 'mentor' | 'mentee'
  matchBio: string
  matchPhoto?: string
  profileUrl: string
  messageUrl: string
}

export const NewMatchEmail = ({
  recipientName,
  matchName,
  matchRole,
  matchBio,
  matchPhoto,
  profileUrl,
  messageUrl
}: NewMatchEmailProps) => {
  const content = `
    <h2 style="color: #25283D; font-size: 24px; font-weight: 700; margin: 0 0 20px 0;">
      You've Got a New Match! 🎉
    </h2>

    <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
      Great news, ${recipientName}! You've been matched with ${matchName}, a ${matchRole} on Look 4 Mentors.
    </p>

    <!-- Match Profile Card -->
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f9f9f9; border-radius: 12px; padding: 25px; margin: 0 0 25px 0;">
      <tr>
        <td align="center">
          ${matchPhoto ? `
            <img src="${matchPhoto}" alt="${matchName}" style="width: 80px; height: 80px; border-radius: 50%; margin: 0 0 15px 0; object-fit: cover;">
          ` : `
            <div style="width: 80px; height: 80px; border-radius: 50%; background-color: #8F3985; color: white; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 700; margin: 0 0 15px 0;">
              ${matchName.charAt(0)}
            </div>
          `}
          <h3 style="color: #25283D; font-size: 20px; font-weight: 600; margin: 0 0 5px 0;">
            ${matchName}
          </h3>
          <p style="color: #8F3985; font-size: 14px; font-weight: 500; margin: 0 0 15px 0; text-transform: capitalize;">
            ${matchRole}
          </p>
          <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">
            ${matchBio}
          </p>
          <table cellpadding="0" cellspacing="0" border="0" align="center">
            <tr>
              <td style="padding: 0 5px;">
                <a href="${profileUrl}" style="display: inline-block; padding: 10px 20px; background-color: #98DFEA; color: #25283D; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;">
                  View Profile
                </a>
              </td>
              <td style="padding: 0 5px;">
                <a href="${messageUrl}" style="display: inline-block; padding: 10px 20px; background-color: #8F3985; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600;">
                  Send Message
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
      <strong>Next Steps:</strong>
    </p>

    <ol style="color: #666666; font-size: 15px; line-height: 1.8; margin: 10px 0 25px 0; padding-left: 20px;">
      <li>Introduce yourself and share your goals</li>
      <li>Schedule your first session</li>
      <li>Start building a great mentorship relationship!</li>
    </ol>

    ${EmailDivider()}

    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f0f8ff; padding: 20px; border-radius: 8px;">
      <tr>
        <td>
          <p style="margin: 0 0 10px 0; color: #25283D; font-size: 15px; font-weight: 600;">
            💡 Tips for a Great First Session
          </p>
          <ul style="margin: 0; padding-left: 20px; color: #666666; font-size: 14px; line-height: 1.8;">
            <li>Be clear about your goals and expectations</li>
            <li>Come prepared with questions</li>
            <li>Be open and receptive to feedback</li>
            <li>Follow up with action items</li>
          </ul>
        </td>
      </tr>
    </table>
  `

  return BaseEmailTemplate({
    children: content,
    previewText: `You've been matched with ${matchName}! Start your mentorship journey now.`
  })
}

export default NewMatchEmail
