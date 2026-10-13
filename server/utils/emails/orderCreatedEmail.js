const orderCreatedEmail = ({ email, firstName, serviceTitle, orderId, orderStatus }) => {
  const shortOrderId = orderId.toString().slice(-6).toUpperCase();

  return {
    to: email,

    subject: 'Servexa - Your Order Has Been Received',

    text: `Hello ${firstName},

Your service request has been successfully submitted to Servexa.

Service: ${serviceTitle}
Order ID: ${shortOrderId}
Status: ${orderStatus}

Our team will review your request and provide an update.

Thank you for using Servexa.`,

    html: `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Servexa - Order Received</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
  font-family: Arial, Helvetica, sans-serif;
  color: #222222;
">

  <!-- Main Background -->
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="background-color: #f5f5f5; padding: 40px 15px;"
  >

    <tr>
      <td align="center">

        <!-- Email Container -->
        <table
          width="600"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            width: 100%;
            max-width: 600px;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid #e6e6e6;
          "
        >

          <!-- Header -->
          <tr>
            <td
              style="
                background-color: #111111;
                padding: 30px 35px;
                text-align: center;
              "
            >

              <div style="
                font-size: 26px;
                font-weight: bold;
                letter-spacing: 3px;
                color: #ffffff;
              ">
                SERVEXA
              </div>

              <div style="
                margin-top: 7px;
                font-size: 12px;
                letter-spacing: 1px;
                color: #bdbdbd;
                text-transform: uppercase;
              ">
                Service Management
              </div>

            </td>
          </tr>


          <!-- Main Content -->
          <tr>
            <td style="padding: 40px 40px 35px;">

              <!-- Greeting -->
              <h1 style="
                margin: 0 0 12px;
                font-size: 24px;
                font-weight: 600;
                color: #111111;
              ">
                Order Received
              </h1>

              <p style="
                margin: 0 0 24px;
                font-size: 15px;
                line-height: 1.7;
                color: #555555;
              ">
                Hello ${firstName},
              </p>

              <p style="
                margin: 0 0 30px;
                font-size: 15px;
                line-height: 1.7;
                color: #555555;
              ">
                Your service request has been successfully submitted
                to Servexa. Our team will review your request and
                provide an update.
              </p>


              <!-- Order Information -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  border: 1px solid #e5e5e5;
                  border-radius: 8px;
                  overflow: hidden;
                "
              >

                <!-- Order Header -->
                <tr>
                  <td
                    colspan="2"
                    style="
                      padding: 16px 20px;
                      background-color: #fafafa;
                      border-bottom: 1px solid #e5e5e5;
                    "
                  >

                    <span style="
                      font-size: 12px;
                      font-weight: bold;
                      letter-spacing: 1px;
                      color: #777777;
                      text-transform: uppercase;
                    ">
                      Order Details
                    </span>

                  </td>
                </tr>


                <!-- Service -->
                <tr>
                  <td style="
                    width: 40%;
                    padding: 17px 20px;
                    font-size: 13px;
                    color: #777777;
                    border-bottom: 1px solid #eeeeee;
                  ">
                    Service
                  </td>

                  <td style="
                    padding: 17px 20px;
                    font-size: 14px;
                    font-weight: 600;
                    color: #222222;
                    text-align: right;
                    border-bottom: 1px solid #eeeeee;
                  ">
                    ${serviceTitle}
                  </td>
                </tr>


                <!-- Order ID -->
                <tr>
                  <td style="
                    padding: 17px 20px;
                    font-size: 13px;
                    color: #777777;
                    border-bottom: 1px solid #eeeeee;
                  ">
                    Order ID
                  </td>

                  <td style="
                    padding: 17px 20px;
                    font-size: 14px;
                    font-weight: bold;
                    letter-spacing: 1px;
                    color: #222222;
                    text-align: right;
                    border-bottom: 1px solid #eeeeee;
                  ">
                    #${shortOrderId}
                  </td>
                </tr>


                <!-- Status -->
                <tr>
                  <td style="
                    padding: 17px 20px;
                    font-size: 13px;
                    color: #777777;
                  ">
                    Status
                  </td>

                  <td style="
                    padding: 17px 20px;
                    text-align: right;
                  ">

                    <span style="
                      display: inline-block;
                      padding: 6px 11px;
                      background-color: #f3f4f6;
                      border-radius: 20px;
                      font-size: 12px;
                      font-weight: bold;
                      color: #333333;
                    ">
                      ${orderStatus}
                    </span>

                  </td>
                </tr>

              </table>


              <!-- Message -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="margin-top: 28px;"
              >

                <tr>
                  <td
                    style="
                      padding: 18px 20px;
                      background-color: #fafafa;
                      border-left: 3px solid #222222;
                    "
                  >

                    <p style="
                      margin: 0;
                      font-size: 14px;
                      line-height: 1.7;
                      color: #555555;
                    ">
                      Our team will review your request and provide
                      an update as soon as possible.
                    </p>

                  </td>
                </tr>

              </table>


              <!-- Footer Message -->
              <p style="
                margin: 30px 0 0;
                font-size: 14px;
                line-height: 1.6;
                color: #555555;
              ">
                Thank you for choosing <strong>Servexa</strong>.
              </p>

            </td>
          </tr>


          <!-- Footer -->
          <tr>
            <td
              style="
                padding: 25px 35px;
                background-color: #111111;
                text-align: center;
              "
            >

              <p style="
                margin: 0 0 8px;
                font-size: 12px;
                color: #ffffff;
                letter-spacing: 1px;
              ">
                SERVEXA
              </p>

              <p style="
                margin: 0;
                font-size: 11px;
                line-height: 1.5;
                color: #999999;
              ">
                This is an automated notification.
                Please do not reply directly to this email.
              </p>

            </td>
          </tr>

        </table>


        <!-- Copyright -->
        <p style="
          margin: 18px 0 0;
          font-size: 11px;
          color: #999999;
          text-align: center;
        ">
          © ${new Date().getFullYear()} Servexa
        </p>

      </td>
    </tr>

  </table>

</body>
</html>
    `,
  };
};

module.exports = { orderCreatedEmail };
