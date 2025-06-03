const mailTemplete = (firstName,otp,email) =>{
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        /* General Styles */
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            color: #333;
        }

        .email-wrapper {
            width: 100%;
            padding: 20px 0;
            background-color: #f4f4f9;
            display: flex;
            justify-content: center;
        }

        .email-container {
            width: 100%;
            max-width: 600px;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .email-header {
            background-color: #4a90e2;
            color: #ffffff;
            text-align: center;
            padding: 20px;
            font-size: 24px;
            font-weight: bold;
        }

        .email-body {
            padding: 20px;
            line-height: 1.8;
            font-size: 16px;
        }

        .email-body p {
            margin: 10px 0;
        }

        .otp-box {
            margin: 20px 0;
            text-align: center;
        }

        .otp-code {
            display: inline-block;
            background-color: #f9f9f9;
            color: #4a90e2;
            font-size: 28px;
            font-weight: bold;
            padding: 10px 20px;
            border-radius: 4px;
            border: 1px solid #e0e0e0;
        }

        .email-footer {
            background-color: #f9f9f9;
            text-align: center;
            padding: 15px;
            font-size: 14px;
            color: #777;
            border-top: 1px solid #e0e0e0;
        }

        .email-footer a {
            color: #4a90e2;
            text-decoration: none;
        }

        @media only screen and (max-width: 600px) {
            .email-container {
                width: 90%;
            }
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="email-container">
            <!-- Header -->
            <div class="email-header">
                Verify Your Account
            </div>

            <!-- Body -->
            <div class="email-body">
                <p>Hello <strong>${firstName}</strong>,</p>
                <p>Welcome to our platform! To complete your registration, please use the following One-Time Password (OTP), this OTP is valid for 10 miniutes:</p>

                <div class="otp-box">
                    <span class="otp-code">${otp}</span>
                </div>

                <p>If you did not request this, please ignore this email or contact support.</p>
                <p>Thank you for choosing our service!</p>
                <span>To verify your OTP</span> <button> <a href="http://localhost:5173/verifyOtp/${email}" target="_blank" > Click Here </a> </button>
            </div>

            <!-- Footer -->
            <div class="email-footer">
                © 2024 Your Company. All rights reserved.<br>
                <a href="#">Privacy Policy</a> | <a href="#">Contact Support</a>
            </div>
        </div>
    </div>
</body>
</html>

  `
}

module.exports = {mailTemplete}