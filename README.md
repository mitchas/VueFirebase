# Vue Firebase Template

This is a template for a Vue-Firebase app. It includes all the basics for a user-authenticated site.
 * Login/Signup with email
    * Forgot and Reset password.
    * Create username, check against taken usernames.
 * Terms of Service & Privacy policy.
 * Toast notifications.
 * Super responsive, smooth animations, feels native on mobile.
 * Auto dark-mode based on device settings, with preference that saves to account.
 * Account Settings page
    * Delete account w/multi-step confirmation
    * Change password
    * Re-authenticate for sensitive changes

## Installation
### Firebase Connection
Get your Firebase secrets from the Firebase console and fill them in on `.env` and `.env.production`. The production secrets will be used when building if you want to use a separate database for testing.

**Don't commit your secrets to git!!!**


Rename or copy your environment variable files to `.env.local` and `.env.production.local` to prevent that from happening. Git will ignore `.local` files.

### Packages
```bash
npm install
```

## Usage

#### Serve on [localhost:8080](https://localhost:8080)
```bash
npm run serve
```

#### Build for production
```bash
npm run build
```

#### Run your tests
```bash
npm run test
```
#### Lints and fixes files
```bash
npm run lint
```

# Other Setup

## Firebase Setup
 * Set up new project
 * Switch database to firestore (enable native mode through cloud console if needed)
 * Enable email provider in authentication setttings on Firebase console
 * Enable [firestore api](https://console.cloud.google.com/launcher/details/google/firestore.googleapis.com?project=_) in the cloud console if you get errors.
 * Setup firestore rules to match the firestore.rules file here.


### Delete user data on Firebase
Add [this extension]() to your firebase console to automatically delete all user data when a user deletes their account.

Configure firestore paths to `users/{UID},profiles/{UID}`

### Production Public Path
If the app is going to be deployed in a sub directory (ie website.com/app/), edit the path in vue.config.js.

### Replace project name
CMD/CTRL+F to find and replace every **ABCDEFG** - which is used as a placeholder for wherever the project name is supposed to be.

### Terms of Service & Privacy Policy
Read the TOS and Privacy Policy. There's sutff you'll need to replace (like email addresses and URLs), but also make sure it's accuratet for your site. These documents were taken from [Automattic's Legalmattic](https://github.com/Automattic/legalmattic) documents (and modified a bit).

## Other Features
 * Detect soft keyboard to hide bottom elements
 * Lock scrolling when modal is visible
 * LESS Styles with global light/dark variables
 * Page transitions
 * Uses system fonts (for paragraphs, not headers/display text) to feel more native
 * Users can toggle UI animations in their preferences.
