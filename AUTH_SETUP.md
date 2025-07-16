# Twitter Authentication Setup

This guide will help you set up Twitter OAuth authentication for your pottery studio application.

## Prerequisites

1. A Twitter Developer Account
2. A Twitter App created in the Twitter Developer Portal

## Step 1: Create a Twitter App

1. Go to [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Create a new app or use an existing one
3. In your app settings, configure the following:

### OAuth 2.0 Settings
- **Type of App**: Web App
- **Callback URLs**: 
  - For development: `http://localhost:5173/auth/callback/twitter`
  - For production: `https://your-domain.com/auth/callback/twitter`
- **Website URL**: Your app's base URL

### App Permissionss
- Enable "Read" permissions (minimum required)
- Optionally enable "Write" if you need to post to Twitter

## Step 2: Get Your Credentials

From your Twitter app dashboard, copy:
- **Client ID** (also called Consumer Key)
- **Client Secret** (also called Consumer Secret)

## Step 3: Configure Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Twitter OAuth Configuration
AUTH_TWITTER_ID=your_twitter_client_id_here
AUTH_TWITTER_SECRET=your_twitter_client_secret_here

# Auth.js Secret (generate with: openssl rand -base64 32)
AUTH_SECRET=your_generated_secret_here

# Optional: Set your app's base URL for production
# ORIGIN=https://your-app-domain.com
```

## Step 4: Generate Auth Secret

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Copy the output and use it as your `AUTH_SECRET`.

## Step 5: Test the Authentication

1. Start your development server: `pnpm dev`
2. Navigate to `/signin` to test the Twitter sign-in flow
3. After successful authentication, you'll be redirected to `/dashboard`

## Protected Routes

The following routes are protected and require authentication:
- `/dashboard` - User dashboard with profile information

## Files Created/Modified

- `src/routes/plugin@auth.ts` - Auth.js configuration with Twitter provider
- `src/routes/dashboard/index.tsx` - Protected dashboard page
- `src/routes/signin/index.tsx` - Sign-in page with Twitter OAuth
- `src/components/header/header.tsx` - Updated header with auth-aware navigation
- `vite.config.ts` - Added `@auth/qwik` to optimizeDeps

## Troubleshooting

### Common Issues

1. **"Invalid redirect URI" error**: Make sure your callback URL in Twitter app settings matches exactly
2. **"Invalid client" error**: Verify your Twitter Client ID and Secret are correct
3. **Session not persisting**: Check that `AUTH_SECRET` is set and consistent

### Development vs Production

For production deployment, make sure to:
1. Update callback URLs in Twitter app settings
2. Set the `ORIGIN` environment variable
3. Use HTTPS in production (Twitter OAuth requires it)

## Security Notes

- Never commit your `.env.local` file to version control
- Keep your Twitter Client Secret secure
- Use a strong, randomly generated `AUTH_SECRET`
- Consider using environment-specific configuration for different deployment stages 