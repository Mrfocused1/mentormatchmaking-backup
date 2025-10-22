// Base email template with consistent branding

interface BaseEmailProps {
  children: React.ReactNode
  previewText?: string
}

export const BaseEmailTemplate = ({ children, previewText }: BaseEmailProps) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  ${previewText ? `<meta name="preview" content="${previewText}">` : ''}
  <title>Look 4 Mentors</title>
  <style>
    /* Reset styles */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }

    /* Brand colors */
    .bg-primary-dark { background-color: #25283D; }
    .bg-primary-accent { background-color: #98DFEA; }
    .bg-secondary-accent { background-color: #8F3985; }
    .text-primary-dark { color: #25283D; }
    .text-white { color: #ffffff; }

    /* Responsive */
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .content { padding: 20px !important; }
    }
  </style>
</head>
<body style="background-color: #f5f5f5; margin: 0; padding: 0;">
  <!-- Preview text (hidden in email) -->
  ${previewText ? `<div style="display: none; max-height: 0px; overflow: hidden;">${previewText}</div>` : ''}

  <!-- Email container -->
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="600" class="container" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td align="center" style="background-color: #25283D; padding: 30px 20px;">
              <h1 style="color: #ffffff; font-size: 28px; font-weight: 900; margin: 0; font-family: 'Montserrat', sans-serif;">
                Look 4 Mentors
              </h1>
              <p style="color: #98DFEA; font-size: 14px; margin: 5px 0 0 0;">
                Connect. Learn. Grow.
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td class="content" style="padding: 40px 30px;">
              ${children}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 30px 20px; text-align: center;">
              <p style="color: #666666; font-size: 14px; margin: 0 0 10px 0;">
                <strong>Look 4 Mentors</strong>
              </p>
              <p style="color: #999999; font-size: 12px; margin: 0 0 15px 0;">
                Connecting mentors and mentees for meaningful growth
              </p>

              <!-- Social links -->
              <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 15px 0;">
                <tr>
                  <td style="padding: 0 10px;">
                    <a href="https://look4mentors.com" style="color: #8F3985; text-decoration: none; font-size: 12px;">Website</a>
                  </td>
                  <td style="padding: 0 10px; color: #cccccc;">|</td>
                  <td style="padding: 0 10px;">
                    <a href="https://look4mentors.com/help" style="color: #8F3985; text-decoration: none; font-size: 12px;">Help Center</a>
                  </td>
                  <td style="padding: 0 10px; color: #cccccc;">|</td>
                  <td style="padding: 0 10px;">
                    <a href="https://look4mentors.com/contact" style="color: #8F3985; text-decoration: none; font-size: 12px;">Contact</a>
                  </td>
                </tr>
              </table>

              <p style="color: #999999; font-size: 11px; margin: 20px 0 0 0; line-height: 1.5;">
                You're receiving this email because you have an account at Look 4 Mentors.<br>
                <a href="{{unsubscribe_url}}" style="color: #8F3985; text-decoration: underline;">Unsubscribe</a> |
                <a href="https://look4mentors.com/privacy" style="color: #8F3985; text-decoration: underline;">Privacy Policy</a>
              </p>

              <p style="color: #cccccc; font-size: 11px; margin: 10px 0 0 0;">
                © ${new Date().getFullYear()} Look 4 Mentors. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

// Helper function for button
export const EmailButton = (text: string, url: string, color: 'primary' | 'secondary' = 'primary') => {
  const bgColor = color === 'primary' ? '#98DFEA' : '#8F3985'
  const textColor = color === 'primary' ? '#25283D' : '#ffffff'

  return `
    <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 25px 0;">
      <tr>
        <td align="center" style="border-radius: 6px; background-color: ${bgColor};">
          <a href="${url}" target="_blank" style="
            display: inline-block;
            padding: 14px 32px;
            font-size: 16px;
            font-weight: 600;
            color: ${textColor};
            text-decoration: none;
            font-family: 'Montserrat', sans-serif;
          ">
            ${text}
          </a>
        </td>
      </tr>
    </table>
  `
}

// Helper function for divider
export const EmailDivider = () => {
  return `
    <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;">
  `
}
