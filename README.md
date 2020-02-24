# Vue Firebase Template

### Demo the project at [mitchs.co/vuefirebase](https://mitchs.co/vuefirebase)

This is a template for a Vue-Firebase app. It includes all the basics for a user-authenticated site.
 * Login/Signup with email
    * Forgot and Reset password.
    * Create username, check against taken usernames.
 * Terms of Service & Privacy policy.
 * Toast notifications.
 * Super responsive, smooth animations, feels native on mobile.
 * Auto dark-mode based on device settings, with preference that saves to account.
 * Profile pages with basics set up (name, photo, bio)
 * Account Settings page
    * Delete account w/multi-step confirmation
    * Change password
	* Change email
    * Re-authenticate for sensitive changes
	* Toggle dark mode, UI Animations
	* Change profile settings
	* Enable/disable public profile
	* Random stats

# Pre-Installation

## Firebase Setup
 * Set up new project.
 * Set connection secrets in .env files
 * Switch database to firestore (enable native mode through cloud console if needed)
 * Enable email provider in authentication settings on Firebase console
 * Enable [firestore api](https://console.cloud.google.com/launcher/details/google/firestore.googleapis.com?project=_) in the cloud console if you get errors.

### Firebase CLI
Install the firebase cli, and run `firebase init` in the root directory of this project.
 * Select whichever options you need - Firestore and Storage are needed, hosting if you are hosting it on Firebase. Functions if you want to add your own.
 * Select which firebase project you want associated with this project.
 * Do not overwrite firestore.rules or any existing files. The existing files include the rules you'll need.
 * Do not overwrite firestore.indexes.json
 * Set the public directory to dist
 * YES configure as single page app
 * Do not overwrite index.html
 * Do not overwrite storage.rules
 
### Environment Variables
Fill in your VUE_APP_BASE_URL and VUE_APP_BASE_PATH in `.env` and `.env.production`. The base URL should be the bare URL it'll be hosted at (ie https://example.com - no trailing slash) and the base path should be the path at the URL (ie /app if it'll be at example.com/app). For the root, leave it at /.

Get your Firebase secrets from the Firebase console and fill them in as well. The production secrets will be used when building if you want to use a separate database for testing.

**Don't commit your secrets to git!!!**

Rename or copy your environment variable files to `.env.local` and `.env.production.local` to prevent that from happening. Git will ignore `.local` files.


### Firestore and storage rules
Make sure your security rules on the firebase console match the rules in the files here. Otherwise you might get permission errors.


# Project Installation & Development

### Packages
```bash
npm install
```

## NPM Commands

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

# Other things to set up

### Delete user data on Firebase
Add [this extension](https://firebase.google.com/products/extensions/delete-user-data) to your firebase console to automatically delete all user data when a user deletes their account.

Configure firestore paths to `users/{UID},profiles/{UID}`

### Production Public Path
If the app is going to be deployed in a sub directory (ie website.com/app/), edit the path in vue.config.js.

### Replace project name
CMD/CTRL+F to find and replace every **ABCDEFG** - which is used as a placeholder for wherever the project name is supposed to be.

### Terms of Service & Privacy Policy
Read the TOS and Privacy Policy. There's stuff you'll need to replace (like email addresses and URLs), but also make sure it's accurate for your site. These documents were taken from [Automattic's Legalmattic](https://github.com/Automattic/legalmattic) documents (and modified a bit).


# Everything else you should know


## Third-party libraries
I tried to use as few as possible. Apart from Vue and Firebase and everything required by those, this project includes:
 * [VueMoment](https://www.npmjs.com/package/vue-moment) (MomentJS) for time formatting
 * [FontAwesome](http://fontawesome.com/) (Pro) for icons. You'll have to switch out icons if you don't have pro.


## Other Features
 * Detect soft keyboard to hide bottom elements
 * Lock scrolling when modal is visible
 * LESS Styles with global light/dark variables
 * Page transitions
 * Uses system fonts (for paragraphs, not headers/display text) to feel more native
 * Users can toggle UI animations in their preferences.
