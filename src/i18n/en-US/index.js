export default {
  login: {
    subtitle: 'Log in to access your secure service portal.',
    email_label: 'Email Address',
    email_placeholder: "name{'@'}company.com",
    email_required: 'Email is required',
    email_invalid: 'Email is invalid',
    password_label: 'Password',
    forgot_password: 'Forgot password?',
    password_required: 'Password is required',
    password_min: 'Must be at least 6 characters',
    remember_me: 'Remember me',
    submit_btn: 'Log in',
    new_user: 'New to Auto Lab?',
    create_account: 'Create account',
    success_msg: 'Welcome to P&P Services',
    error_msg: 'Error logging in. Check your credentials.',
    error_network: 'Error logging in. Please check your network connection.',
    language: 'Language',
    unverified_email: 'You must verify your email address before logging in. Check your inbox or request a new link.',
    verify_email_subject: 'Verify your email address',
    resend_verification_email_subject: 'Resend email verification',
    email_verified_success: 'Email verified successfully!',
    email_verification_expired: 'The verification link has expired.',
    email_verification_invalid: 'The verification link is invalid or has expired.',
    email_verification_already_verified: 'Your email address has already been verified.',
    email_verification_link_not_found: 'The verification link was not found.',
    email_verification_user_not_found: 'No user was found with this verification link.',
    email_verification_generic_error: 'An unexpected error occurred while verifying your email.',
    verification_modal: {
      title: 'Email not verified',
      description: 'You must verify your email address before continuing. Click the button to resend the verification link.',
      resend_btn: 'Resend verification code',
      close_btn: 'Close',
      success_msg: 'Verification link resent successfully',
      error_msg: 'Error resending verification link'
    }
  },
  register: {
    title: 'Create Account',
    subtitle: 'Enter your details to register in the customer portal.',
    name_label: 'Full Name',
    name_placeholder: 'e.g. John Doe',
    name_required: 'Full name is required',
    name_min: 'Name must be at least 2 characters',
    name_invalid: 'Name may only contain letters, spaces and hyphens',
    email_label: 'Email Address',
    email_placeholder: "name{'@'}company.com",
    email_required: 'Email is required',
    email_invalid: 'Invalid email address',
    phone_label: 'Phone Number',
    phone_placeholder: '+1 234 567 8900',
    phone_required: 'Phone number is required',
    phone_invalid: 'Phone may only contain digits, spaces, +, -, () and dots',
    phone_min: 'Phone must have at least 7 digits',
    password_label: 'Password',
    password_placeholder: '••••••••',
    password_required: 'Password is required',
    password_min: 'Password must be at least 8 characters',
    password_lowercase: 'Must include at least one lowercase letter',
    password_uppercase: 'Must include at least one uppercase letter',
    password_digit: 'Must include at least one digit',
    password_special: 'Must include at least one special character (!@#%^&*...)',
    password_invalid_chars: "Contains invalid characters. Avoid: ' \" ; < > / \\",
    submit_btn: 'REGISTER',
    already_have_account: 'Already have an account?',
    login: 'Log in',
    success_msg: 'Account created successfully',
    error_msg: 'Error creating account. Please check the data and try again.'
  },
  error404: {
    title: 'Route Not Found',
    description: 'Sorry, the page you\'re looking for is not available. The link may have expired or the resource may have been moved to a new location.',
    back_home: 'Go Home',
    go_back: 'Go Back',
    diagnostics: 'System Diagnostics: Lab-ID 404-ERR',
    copyright: 'P&P Services © 2024',
    session_inactive: 'Session Inactive',
    precision_core: 'Precision Engineering Core'
  },
  dashboard: {
    welcome: {
      greeting: 'Welcome back',
      hello: 'Hello,'
    },
    new_project_card: {
      label: 'New Project',
      title: 'Quote Service',
      description: 'Get an instant quote and book your appointment at our auto repair shop.',
      btn: 'Start Quote'
    },
    services: {
      title: 'Services',
      subtitle: 'Select the service you want',
      premium_title: 'Premium Services',
      view_all: 'View all',
      from: 'From',
      quote: 'Quote required',
      featured: 'Featured',
      error_msg: 'Error loading services. Please try again.',
      error_network: 'Error loading services. Please check your internet connection.',
      not_found: 'No services found'
    },
    history: {
      title: 'Recent History',
      completed: 'COMPLETED',
      pending: 'PENDING',
      empty_title: 'No history yet',
      empty_description: 'You haven\'t made any quotes yet. Explore our services and book your first appointment!',
      empty_btn: 'Get a quote now'
    },
    nav: {
      home: 'Home',
      quote: 'Quote',
      profile: 'Profile'
    },
    ads: {
      title: 'Promotions',
      label: 'P&P Services',
      learn_more: 'Learn more'
    }
  }
}
