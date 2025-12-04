# The Wild Oasis

This project is a hotel management project which a booking section, cabin section, user, settings and authentication.

## Authentication Setup

### Initial Admin User

The app uses **admin-only user creation**. This means:
- Users cannot self-register
- Only admins can create new users through the Users page
- The first user created will automatically be an admin

### Demo Credentials

Demo credentials are displayed on the login page:
- **Email:** wibih77293@fna6.com
- **Password:** purple1234

### Creating Initial Admin

To create the initial admin user with the demo credentials, you can:

1. **Option 1: Use the seed function** (recommended for first setup)
   ```bash
   # After running `npx convex dev`, call the seed function
   # This will create the admin user if no users exist
   ```

2. **Option 2: Login page** - If no users exist, the signup will automatically create an admin user

### User Roles

- **Admin**: Full access, can create other users
- **Manager**: Can manage bookings, cabins, and settings
- **Employee**: Limited access for day-to-day operations

### Creating New Users

1. Log in as an admin
2. Navigate to the "Users" page
3. Fill out the user creation form
4. Select the appropriate role
5. The new user will be created and can log in immediately
