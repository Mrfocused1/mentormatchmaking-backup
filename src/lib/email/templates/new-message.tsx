import { BaseEmailTemplate, EmailButton } from './base'

interface NewMessageEmailProps {
  recipientName: string
  senderName: string
  messagePreview: string
  messagesUrl: string
  senderPhoto?: string
}

export const NewMessageEmail = ({
  recipientName,
  senderName,
  messagePreview,
  messagesUrl,
  senderPhoto
}: NewMessageEmailProps) => {
  const truncatedMessage = messagePreview.length > 150
    ? messagePreview.substring(0, 150) + '...'
    : messagePreview

  const content = `
    <h2 style="color: #25283D; font-size: 24px; font-weight: 700; margin: 0 0 20px 0;">
      New Message from ${senderName} 💬
    </h2>

    <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
      Hi ${recipientName},
    </p>

    <!-- Message Card -->
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f9f9f9; border-radius: 12px; padding: 25px; margin: 0 0 25px 0; border-left: 4px solid #8F3985;">
      <tr>
        <td>
          <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td style="padding: 0 0 15px 0;">
                <table cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="padding-right: 15px;">
                      ${senderPhoto ? `
                        <img src="${senderPhoto}" alt="${senderName}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
                      ` : `
                        <div style="width: 50px; height: 50px; border-radius: 50%; background-color: #98DFEA; color: #25283D; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700;">
                          ${senderName.charAt(0)}
                        </div>
                      `}
                    </td>
                    <td>
                      <p style="margin: 0; color: #25283D; font-size: 16px; font-weight: 600;">
                        ${senderName}
                      </p>
                      <p style="margin: 5px 0 0 0; color: #999999; font-size: 13px;">
                        sent you a message
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <p style="margin: 0; color: #666666; font-size: 15px; line-height: 1.6; font-style: italic;">
                  "${truncatedMessage}"
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    ${EmailButton('Read & Reply', messagesUrl, 'secondary')}

    <p style="color: #999999; font-size: 13px; line-height: 1.6; margin: 25px 0 0 0; text-align: center;">
      You're receiving this because you have message notifications enabled.<br>
      You can change your notification preferences in your <a href="https://look4mentors.com/settings" style="color: #8F3985;">account settings</a>.
    </p>
  `

  return BaseEmailTemplate({
    children: content,
    previewText: `${senderName}: ${messagePreview.substring(0, 50)}...`
  })
}

export default NewMessageEmail
