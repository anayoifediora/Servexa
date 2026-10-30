const passwordResetEmail = ({ email, resetLink }) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Password Reset</title>
      </head>

      <body style="
        margin: 0;
        padding: 0;
        background-color: #f4f6f8;
        font-family: Arial, Helvetica, sans-serif;
        color: #333333;
      ">
        <table
          role="presentation"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          border="0"
          style="background-color: #f4f6f8; padding: 40px 16px;"
        >
          <tr>
            <td align="center">
              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="
                  max-width: 560px;
                  background-color: #ffffff;
                  border-radius: 12px;
                  overflow: hidden;
                "
              >
                <tr>
                  <td style="
                    padding: 32px 32px 24px;
                    text-align: center;
                    background-color: #1f2937;
                  ">
                    <h1 style="
                      margin: 0;
                      font-size: 26px;
                      font-weight: 700;
                      color: #ffffff;
                      letter-spacing: -0.5px;
                    ">
                      Servexa
                    </h1>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 36px 32px;">
                    <h2 style="
                      margin: 0 0 16px;
                      font-size: 22px;
                      line-height: 1.4;
                      color: #111827;
                    ">
                      Reset your password
                    </h2>

                    <p style="
                      margin: 0 0 16px;
                      font-size: 15px;
                      line-height: 1.7;
                      color: #4b5563;
                    ">
                      We received a request to reset the password associated
                      with your Servexa account.
                    </p>

                    <p style="
                      margin: 0 0 28px;
                      font-size: 15px;
                      line-height: 1.7;
                      color: #4b5563;
                    ">
                      Click the button below to choose a new password.
                      For your security, this link will expire in 15 minutes.
                    </p>

                    <table
                      role="presentation"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                      style="margin: 0 auto 28px;"
                    >
                      <tr>
                        <td
                          align="center"
                          bgcolor="#2563eb"
                          style="border-radius: 6px;"
                        >
                          <a
                            href="${resetLink}"
                            target="_blank"
                            style="
                              display: inline-block;
                              padding: 14px 28px;
                              font-size: 15px;
                              font-weight: 600;
                              color: #ffffff;
                              text-decoration: none;
                              border-radius: 6px;
                            "
                          >
                            Reset Password
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="
                      margin: 0 0 10px;
                      font-size: 13px;
                      line-height: 1.6;
                      color: #6b7280;
                    ">
                      If the button doesn't work, copy and paste this link
                      into your browser:
                    </p>

                    <p style="
                      margin: 0 0 24px;
                      font-size: 13px;
                      line-height: 1.6;
                      word-break: break-all;
                    ">
                      <a
                        href="${resetLink}"
                        style="color: #2563eb; text-decoration: underline;"
                      >
                        ${resetLink}
                      </a>
                    </p>

                    <p style="
                      margin: 0;
                      font-size: 14px;
                      line-height: 1.7;
                      color: #4b5563;
                    ">
                      If you didn't request a password reset, you can safely
                      ignore this email. Your password will remain unchanged.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="
                    padding: 20px 32px;
                    text-align: center;
                    background-color: #f9fafb;
                    border-top: 1px solid #e5e7eb;
                  ">
                    <p style="
                      margin: 0;
                      font-size: 12px;
                      line-height: 1.6;
                      color: #9ca3af;
                    ">
                      This is an automated security email from Servexa.
                      Please do not reply to this message.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  return {
    to: email,
    subject: 'Password Reset Request',
    text: `
We received a request to reset the password associated with your Servexa account.

Reset your password using this link:
${resetLink}

For your security, this link will expire in 15 minutes.

If you didn't request a password reset, you can safely ignore this email.
    `.trim(),
    html,
  };
};

module.exports = { passwordResetEmail };
