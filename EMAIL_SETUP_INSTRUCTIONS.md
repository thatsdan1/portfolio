# Email Setup Instructions

Your contact form is now configured to send emails to **dodetoye@icloud.com** using Web3Forms.

## Steps to Complete the Setup:

### 1. Get Your Free API Key
1. Go to [https://web3forms.com](https://web3forms.com)
2. Click "Get Started for Free"
3. Enter your email: **dodetoye@icloud.com**
4. You'll receive an Access Key via email

### 2. Update the Code
1. Open `src/components/Portfolio.tsx`
2. Find line 65: `access_key: "YOUR_WEB3FORMS_ACCESS_KEY"`
3. Replace `YOUR_WEB3FORMS_ACCESS_KEY` with the key you received

### 3. Test It
1. Fill out the contact form on your website
2. Submit the message
3. Check **dodetoye@icloud.com** for the email

## Alternative: Use Environment Variables (Recommended for Production)

### Step 1: Create `.env` file in project root
```env
VITE_WEB3FORMS_ACCESS_KEY=your_actual_key_here
```

### Step 2: Update Portfolio.tsx
Replace line 65 with:
```typescript
access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
```

### Step 3: Add `.env` to `.gitignore`
Make sure `.env` is in your `.gitignore` file to keep your key secure.

---

## Features Included:
✅ Sends emails directly to dodetoye@icloud.com
✅ Success/error notifications
✅ Form validation
✅ Spam protection
✅ Free plan: 250 submissions/month

## Troubleshooting:
- If emails don't arrive, check your spam folder
- Verify the access key is correct
- Make sure you're using the email you registered with Web3Forms
