import resend
import os


def send_reset_email(to_email: str, reset_link: str):

    resend.api_key = os.getenv("RESEND_API_KEY")
    try:
        response = resend.Emails.send(
            {
                "from": os.getenv("FROM_EMAIL"),
                "to": to_email,
                "subject": "Reset Your Password",
                "html": f"""
                <div style="font-family:Arial;padding:20px">
                    <h2>Password Reset Request 🔐</h2>

                    <p>We received a request to reset your password.</p>

                    <a href="{reset_link}"
                       style="display:inline-block;padding:10px 15px;
                              background:#4CAF50;color:white;
                              text-decoration:none;border-radius:5px;">
                       Reset Password
                    </a>

                    <p style="margin-top:20px;color:#888">
                        If you didn't request this, ignore this email.
                    </p>
                </div>
            """,
            }
        )

        print("EMAIL SENT:", response)

    except Exception as e:
        print("EMAIL ERROR:", str(e))
