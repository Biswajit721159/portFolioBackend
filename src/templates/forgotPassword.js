const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password</title>
    <style>
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
    </style>
</head>
<body class="bg-gray-100 font-sans antialiased">
    <div class="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Password Reset Request</h2>
        <p class="text-gray-600 mb-6">Hi there,</p>
        <p class="text-gray-600 mb-6">
            We received a request to reset the password for your account. Click the button below to reset your password. 
            If you did not request a password reset, please ignore this email or contact support if you have questions.
        </p>
        <div class="text-center mb-6">
            <a href="{{ resetLink }}" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block">
                Reset Password
            </a>
        </div>
        <p class="text-gray-600 mb-4">
            This link will expire in 30 minutes for security purposes.
        </p>
        <p class="text-gray-600">If you have any issues, feel free to reach out to our support team.</p>
        
        <p class="text-gray-600 mt-6">Thank you,<br>The Support Team</p>
    </div>
</body>
</html>`;

module.exports = template;
