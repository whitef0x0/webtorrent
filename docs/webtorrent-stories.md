#Webtorrent User Story 1 -- Resume/Pause:
As a user, I want to be able to pause my torrent while seeding or downloading and be able to resume progress after pausing my torrent.

#Webtorrent User Story 2 -- Search:
As a user, I want to be able to find and download a torrent by searching torrents online.

#Webtorrent User Story 3 -- SMS Notification on Finish:
As a user, I want to be able to get an SMS message sent to a phone number I provide when my torrent is finished downloading.


PM = A x Size^b x EM

PM = 1.2*(0.10)^0.95*5 = .63months

###Size

`Size = 0.05 KLoC`
___Justification___: Our lines of code have been justified by the relative size of other modules of similar complexity that have already been written for this project.

###Scale Factor

`b= 0.95`
___Justification___: Our scale factor b is 0.95 which is a nearly global scale factor because we believe that much of the work will be almost linear as our project scales up in size. We will need to create an module to add to the project.

###Calibration Factor (A)

`A=1.7`

___Justification___: We think our calibration factor is this as it is an average of our self reflected skill and familiarity with the codebase, Javascript and with PDF conversion.

###Effort Multiplier (EM)

`EM=7`

___Justification___: We think our team will put a lot of effort due to the interest in the project and interest in Javascript.

####Scenario S1.1: After I have created a new Torrent, and it has started downloading,
When I call the pause() function
Then my torrent will pause
And then my torrent will stop downloading

####Scenario S1.2: After I have created a new Torrent,
And I have paused my torrent
When I call the resume() function
Then my torrent will resume downloading
And my torrent will pick up progress from last pause

####Scenario S1.3: After I have created a new Torrent,
And it has started downloading,
When I call the resume() function,
Then my RESUME will not execute

####Scenario S1.4: After I have created a new Torrent,
And it has been paused
When I call the pause() function,
Then my PAUSE will not execute,
And my Torrent will still be paused

####Scenario S1.5: After I have created a new Torrent,
And I have started downloading it ,
And my torrent has finished downloading
When I call the pause() function,
Then my PAUSE will not execute

####Scenario S2.1: After I have started the program,
When I call the search() function with a valid QUERY string
And there is at least one match for my QUERY string
Then it will return a torrent that is the first result in search query
And then it will start downloading the returned torrent

####Scenario S2.2: After I have started the program,
When I call the search() function with an invalid QUERY string
Then it will throw an error no torrent will be downloaded

####Scenario S2.3: After I have started the program,
When I call the search() function with a valid QUERY string
And there are no matches for my QUERY string
Then it will throw an error no torrent will be downloaded

####Scenario S3.1: After I have started the program,
And I have created and downloaded a torrent,
And I have enabled SMS FINISHED NOTIFICATION,
And provided an INVALID phone number,
When my torrent is finished downloading
Then SMS FINISHED NOTIFICATION  will not be executed

####Scenario S3.2: After I have started the program,
And I have created and downloaded a torrent
And I have enabled SMS FINISHED NOTIFICATION
And provided an VALID phone number
When my torrent is finished downloading
Then SMS FINISHED NOTIFICATION will be sent to provide phone number

####Scenario S4.3: After I have started the program,
And I have created a torrent
And I have enabled SMS STARTED NOTIFICATION
And provided an INVALID phone number
When my torrent starts downloading
Then SMS STARTED NOTIFICATION will not be executed

####Scenario S4.4: After I have started the program,
And I have created a torrent
And I have enabled SMS STARTED NOTIFICATION
And provided a VALID phone number
When my torrent starts downloading
Then SMS STARTED NOTIFICATION will be sent to provide phone number

####Scenario S4.5: After I have started the program,
And I have created and started downloading a torrent,
And I have sucessfully sent a SMS STARTED NOTIFICATION
When I respond with 'p' to SMS STARTED NOTIFICATION number
Then my torrent will be paused
And SMS PAUSED NOTIFICATION will be sent to my number

####Scenario S4.6: After I have started the program,
And I have created and started downloading a torrent,
And I have sucessfully sent a SMS STARTED NOTIFICATION
When I respond with 'q' to SMS STARTED NOTIFICATION number
Then my torrent will be stopped
And SMS STOP NOTIFICATION will be sent to my number

####Scenario S4.7: After I have started the program,
And I have created and started downloading a torrent,
And I have sucessfully sent a SMS STARTED NOTIFICATION
When I respond with 'r' to SMS STARTED NOTIFICATION number
Then my torrent will be resumed
And SMS RESUME NOTIFICATION will be sent to my number
