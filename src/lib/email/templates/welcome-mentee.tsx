import { BaseEmailTemplate, EmailButton, EmailDivider } from './base'

interface WelcomeMenteeEmailProps {
  name: string
  browseMentorsUrl: string
}

export const WelcomeMenteeEmail = ({ name, browseMentorsUrl }: WelcomeMenteeEmailProps) => {
  const content = `
    <h2 style="color: #25283D; font-size: 24px; font-weight: 700; margin: 0 0 20px 0;">
      Welcome to Look 4 Mentors, ${name}! 🚀
    </h2>

    <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
      Congratulations on taking the first step towards accelerating your career growth! We're thrilled to have you join our community.
    </p>

    <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
      With Look 4 Mentors, you can:
    </p>

    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 0 0 25px 0;">
      <tr>
        <td style="padding: 12px; background-color: #f9f9f9; border-left: 4px solid #8F3985; margin-bottom: 10px;">
          <p style="margin: 0; color: #25283D; font-size: 15px;">
            ✓ <strong>Find experienced mentors</strong> in your field
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px; background-color: #f9f9f9; border-left: 4px solid #8F3985; margin-bottom: 10px;">
          <p style="margin: 0; color: #25283D; font-size: 15px;">
            ✓ <strong>Get personalized guidance</strong> for your career
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px; background-color: #f9f9f9; border-left: 4px solid #8F3985; margin-bottom: 10px;">
          <p style="margin: 0; color: #25283D; font-size: 15px;">
            ✓ <strong>Schedule flexible sessions</strong> at your convenience
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px; background-color: #f9f9f9; border-left: 4px solid #8F3985;">
          <p style="margin: 0; color: #25283D; font-size: 15px;">
            ✓ <strong>Track your progress</strong> and achieve your goals
          </p>
        </td>
      </tr>
    </table>

    ${EmailButton('Find Your Mentor', browseMentorsUrl, 'secondary')}

    <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 25px 0 0 0;">
      <strong>Getting Started:</strong>
    </p>

    <ol style="color: #666666; font-size: 15px; line-height: 1.8; margin: 10px 0; padding-left: 20px;">
      <li>Browse our community of verified mentors</li>
      <li>Send connection requests to mentors who match your goals</li>
      <li>Schedule your first session when you match</li>
      <li>Start learning and growing!</li>
    </ol>

    ${EmailDivider()}

    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <tr>
        <td>
          <p style="margin: 0 0 10px 0; color: #25283D; font-size: 15px; font-weight: 600;">
            💡 Pro Tip
          </p>
          <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.6;">
            Complete your profile and set clear goals to get better mentor matches. Mentors are more likely to connect with mentees who have specific objectives!
          </p>
        </td>
      </tr>
    </table>

    <p style="color: #999999; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0;">
      <strong>Questions?</strong><br>
      Visit our <a href="https://look4mentors.com/help" style="color: #8F3985;">Help Center</a>
      or <a href="https://look4mentors.com/contact" style="color: #8F3985;">reach out to support</a>.
    </p>
  `

  return BaseEmailTemplate({
    children: content,
    previewText: `Welcome to Look 4 Mentors! Ready to find your perfect mentor?`
  })
}

export default WelcomeMenteeEmail
