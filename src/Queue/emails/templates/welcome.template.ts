export const welcomeTemplate = (name: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to KeepITs</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .header { background: #4f46e5; padding: 32px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 28px; }
    .body { padding: 32px; color: #333; }
    .body p { font-size: 16px; line-height: 1.6; }
    .footer { padding: 16px 32px; background: #f4f4f4; text-align: center; font-size: 12px; color: #999; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to KeepITs 🎉</h1>
    </div>
    <div class="body">
      <p>Hi <strong>${name}</strong>,</p>
      <p>We're thrilled to have you on board! Your account has been successfully created.</p>
      <p>Start exploring KeepITs and make the most of everything we have to offer.</p>
      <p>If you have any questions, feel free to reach out to our support team.</p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} KeepITs. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
