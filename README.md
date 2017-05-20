## An Interval Timer mobile app written using React and Redux

### RUN 

Live Version Available [on Heroku](https://workout-interval-timer.herokuapp.com)

#### Clone / Navigate to Directory
```git clone https://github.com/wkoutre/react-redux-workout-app.git [folder-name]```

```cd [folder-name]```

#### Install dependencies
```npm i ```

 #### Scripts
 ```npm run start``` : starts a locally served build of the app
 
 ``` npm run build``` : creates public folder, minifies and builds app for deployment to hosting provider


### Current features:
* React UI
* Redux store synced with Firebase DB and (if applicable) localStorage
* Store is set on a page refresh to ensure data retention
* OAuth with Google, Facebook, or manual email address/password
* Interval Timer: Create timer with Name, Interval Time, Number of Intervals, Rest Time, Rest Increment Time w/ live calculations on input
* Profile page: data grabbed from social media Oauth provider
* Settings: Ability to set default Interval Time, Number of Intervals, Rest Time, and Rest Increment
* Rest Increment is something simple I wanted in an interval timer app, but haven't been able to find. It's an amount of time that's added to the total rest time each time an interval is complete, thus creating a rest time that increases by a factor of (N intervals completed * R rest increment time)
* Saved Timers page with ability to search through timers, sort the alphabetically or by date created, delete/edit/quickly view a timer's info, add timers to "favorites", and start the timer
* Timer page, which runs the timer, showing: its info; time remaining; time elapsed, and a circle that fills as the interval/rest interval time passes
* Completed Timers page, showing titles and dates of completed timers, with the ability to delete them
* Home page, showing 3 most recent timers and their info, and a list of favorited timers, all of which can be started from the Home page

### Features to Be Added:
- Default sounds for end of interval, end of rest, and end of timer
- Uploading personal pictures
- Uploading personal sounds
- Adding notes to an ongoing/completed timer
- Having an indexed, searchable public timer store; when a user creates a timer, he/she can choose whether or not it is publicly available
- Searching / connecting with users who have chosen to make their accounts publically accessible
- Merging accounts: If a user signs up with Google, then tries to sign in with an email or Facebook account w/ same email as Google sign-in, an error page will appear. I'd rather the accounts be automatically merged, so the user can sign in with whichever and the same data will be accessible via the Oauth token received

***** On the note above, Signing in with a Google account AFTER having already created an account with Facebook/manual overrides the login. The data is retained; however, only Google can be used from that point forward. *****

- Account recovery option
- Dynamic color schemes
- Better graphics for timer (this was my first attempt using canvas)
- CSSTransitionGroup for page changes, timer countdown and reset, etc.
- A better format for seeing previously achieved timers; more like a monthly calendar view with colored boxes on days where 1 or more timers were completed.
* The more timers completed, the darker the box.
* OR... color-coded boxes depending on which timer(s) were completed that day

#### Bugs, Questions, Comments? All Welcome :) 
