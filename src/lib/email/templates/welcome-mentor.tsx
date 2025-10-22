import { BaseEmailTemplate, EmailButton, EmailDivider } from './base'

interface WelcomeMentorEmailProps {
  name: string
  profileUrl: string
}

export const WelcomeMentorEmail = ({ name, profileUrl }: WelcomeMentorEmailProps) => {
  const content = `
    <h2 style="color: #25283D; font-size: 24px; font-weight: 700; margin: 0 0 20px 0;">
      Welcome to Look 4 Mentors, ${name}! 🎉
    </h2>

    <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
      Thank you for joining our community of mentors! We're excited to have you share your expertise and help others grow in their careers.
    </p>

    <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
      As a mentor on Look 4 Mentors, you'll be able to:
    </p>

    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 0 0 25px 0;">
      <tr>
        <td style="padding: 12px; background-color: #f9f9f9; border-left: 4px solid #98DFEA; margin-bottom: 10px;">
          <p style="margin: 0; color: #25283D; font-size: 15px;">
            ✓ <strong>Share your expertise</strong> with eager learners
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px; background-color: #f9f9f9; border-left: 4px solid #98DFEA; margin-bottom: 10px;">
          <p style="margin: 0; color: #25283D; font-size: 15px;">
            ✓ <strong>Make meaningful connections</strong> with mentees
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px; background-color: #f9f9f9; border-left: 4px solid #98DFEA; margin-bottom: 10px;">
          <p style="margin: 0; color: #25283D; font-size: 15px;">
            ✓ <strong>Flexible scheduling</strong> that works for you
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px; background-color: #f9f9f9; border-left: 4px solid #98DFEA;">
          <p style="margin: 0; color: #25283D; font-size: 15px;">
            ✓ <strong>Track your impact</strong> with analytics
          </p>
        </td>
      </tr>
    </table>

    ${EmailButton('Complete Your Profile', profileUrl, 'primary')}

    <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 25px 0 0 0;">
      <strong>Next Steps:</strong>
    </p>

    <ol style="color: #666666; font-size: 15px; line-height: 1.8; margin: 10px 0; padding-left: 20px;">
      <li>Complete your profile with your expertise and experience</li>
      <li>Set your availability preferences</li>
      <li>Start receiving connection requests from mentees</li>
      <li>Make your first match and begin mentoring!</li>
    </ol>

    ${EmailDivider()}

    <p style="color: #999999; font-size: 14px; line-height: 1.6; margin: 0;">
      <strong>Need help getting started?</strong><br>
      Check out our <a href="https://look4mentors.com/help/mentors" style="color: #8F3985;">Mentor Guide</a>
      or <a href="https://look4mentors.com/contact" style="color: #8F3985;">contact our support team</a>.
    </p>
  `

  return BaseEmailTemplate({
    children: content,
    previewText: `Welcome to Look 4 Mentors! Let's get your mentor profile set up.`
  })
}

export default WelcomeMentorEmail
