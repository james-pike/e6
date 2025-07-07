import { component$, useSignal } from "@builder.io/qwik";
import { useSignIn } from "~/routes/plugin@auth";
import { Form } from "@builder.io/qwik-city";

export default component$(() => {
  const signIn = useSignIn();
  const isLoading = useSignal(false);

  return (
    <div class="min-h-screen bg-gradient-to-br from-sage-50 via-white to-clay-50 flex items-center justify-center px-4">
      <div class="max-w-md w-full">
        {/* Header */}
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-clay-900 font-serif mb-4">
            Welcome Back
          </h1>
          <p class="text-lg text-sage-700">
            Sign in to access your pottery studio dashboard
          </p>
        </div>

        {/* Sign In Card */}
        <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-clay-200/50 p-8">
          <div class="text-center mb-6">
            <h2 class="text-2xl font-semibold text-clay-900 mb-2">
              Sign In with Twitter
            </h2>
            <p class="text-sage-600">
              Connect your Twitter account to access protected features
            </p>
          </div>

          {/* Twitter Sign In Button */}
          <button
            onClick$={() => {
              isLoading.value = true;
              signIn.submit({ 
                providerId: 'twitter',
                options: { 
                  redirectTo: '/dashboard'
                }
              });
            }}
            disabled={isLoading.value}
            class="w-full group relative inline-flex items-center justify-center px-6 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="relative z-10 flex items-center">
              <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              {isLoading.value ? 'Signing in...' : 'Continue with Twitter'}
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          {/* Divider */}
          <div class="flex items-center my-6">
            <div class="flex-grow border-t border-sage-200"></div>
            <span class="mx-4 text-sage-400 text-sm">or</span>
            <div class="flex-grow border-t border-sage-200"></div>
          </div>

          {/* Credentials Sign In Form */}
          <Form
            action={signIn}
            spaReset
            class="space-y-4"
            onSubmit$={() => (isLoading.value = true)}
          >
            <input type="hidden" name="providerId" value="credentials" />
            <input name="username" placeholder="Admin Username" required class="w-full border border-clay-300 rounded-lg px-4 py-2 text-clay-900 bg-white focus:ring-2 focus:ring-sage-300" />
            <input name="password" type="password" placeholder="Admin Password" required class="w-full border border-clay-300 rounded-lg px-4 py-2 text-clay-900 bg-white focus:ring-2 focus:ring-sage-300" />
            <button type="submit" disabled={isLoading.value} class="w-full px-6 py-3 bg-gradient-to-r from-sage-600 via-sage-700 to-sage-800 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading.value ? 'Signing in...' : 'Sign in as Admin'}
            </button>
          </Form>

          {/* Info Section */}
          <div class="mt-6 p-4 bg-sage-50 rounded-xl">
            <h3 class="text-sm font-medium text-sage-800 mb-2">What you'll get access to:</h3>
            <ul class="text-xs text-sage-600 space-y-1">
              <li>• Protected dashboard with your profile</li>
              <li>• Workshop management tools</li>
              <li>• Booking history and preferences</li>
              <li>• Secure session management</li>
            </ul>
          </div>

          {/* Back to Home */}
          <div class="mt-6 text-center">
            <a
              href="/"
              class="text-sm text-sage-600 hover:text-sage-800 transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>

        {/* Footer */}
        <div class="text-center mt-8">
          <p class="text-sm text-sage-500">
            By signing in, you agree to our terms of service and privacy policy
          </p>
        </div>
      </div>
    </div>
  );
}); 