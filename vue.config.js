module.exports = {
	publicPath: process.env.NODE_ENV === 'production'
	  ? '/vuefirebase/' 
	  // Change this ^^ path if the app won't be at root level ie website.com/app/ - put "/app/"
	  : '/'
  }