

## Cool-Social-Media-App ©

###### Start Posting:
###### https://cool-social-media-app.herokuapp.com/login
---

##### Technologies Used: 
- Javascript
- CSS
- Express
- Node
- Multer __ upload local photos/media
- Passport __  user authentication
- EJS __ view engine
- Mongoose 
- Mongo __ database
- Materialize __ styling
- Heroku
- AtlasDB

--- 

### General Inspiration / Consideration 

The idea for this application is somewhat around the concept of: what if everyone was in a group chat. You have group chats with friends that encorporate various subject matter but for me at least, my group chat of 20-30 people (with some people ive never met in person) consists mainly of memes, what might be going on around us if something seems cool, music, and random photos/videos/voicememos (a lot are just 2 seconds of someone screaming into the mic or something stupid). The point being you just have one large feed where everyone can post. It is not formal it is not about gaining a cult following around a profile where you post photos of yourself. The idea is just i guess to use this sort of machine in whichever way you see fit/potentially benefitial. I like to keep a lot of things seperate. A main problem with my group chat on iMessage is that if i get a text im normally waiting for something related to work or for making plans. I would prefer that when i get a text it has to do with something of that nature instead of getting spammed with the black and white hippo in the home survaillence camera 40 times. (if that meme is dead by the time you read this then just replace hippo with whatever meme is relevant). Either way I would like to have a clean seperation of concerns when it comes to people trying to reach me or me getting in the crossfire of random stuff that comes with being in a group chat with 40 dudes who just talk about nothing and send memes. I get "do not disturb" but i also dont even like to see a red bubble with a number inside it. To say i believe we, as a society, will view people who have 300 unread texts as borderline insane within the next decades isnt far off. Email, sure, its hard to regulate spam and frankly who wants to go through all that but typically if someone has your number they know you personally or at least have an adjacent relationship with you but regardless this is a tangent. Here is the idea: The app is like a large group caht except the group chat is everyone.. Eventually i would like to make it so you can create personal rooms and add people to those rooms so they are clsoed off from the rest of the world. OR you have geographical rooms, where you have rooms by area code, or city or whatever. That could be cool and just get interesting insight as to whats going on around you or a weird anonymous look at other anonymous people that live by you. And so, you can post whatever you want and then eventually you can comment on it. Maybe someone posts a flier for a show and goes: "is anyone going to this" and then you can comment, like, share, do all that stuff. I think it has relatively solid potential. No carving through the fog of fit pics and selfies, and if you want just link your other social media pages to your page but there wont be a typical posts log on your feed or anything because thats not what its for. If you don't see the value in this maybe get a group chat with friends and tell them to all more friends and just shitpost on there for a while. If that doesn't sound appealing, then wait for the next pandemic, im sure it will then. 

(sorry for the typos if there are any i dont think markdown has a spell check)

---

### WireFrames 

##### Pre Build

![image](/public/uploads/wireframe_social.png)
![image](/public/uploads/wireframe_social_2.png)

##### Post Build

![image](/public/uploads/login.png)
![image](/public/uploads/app_screenshot.png)
![image](/public/uploads/cardshot.png)
![image](/public/uploads/editmodal.png)


---

### User Stories 

The user should be able to create an account which will allow them to view the feed, post within it, edit, like, and flag. Ideally the user should only be able to edit/delete content that they have posted and everything else on the feed is accessible just with the edit/delete buttons turned off. The user should be able to post various media types to the feed such as gif/image url's, text, and local images/gifs. Eventually I would like to encorporate more types of media i.e mp4, mp3, this way it would be more true to the point which is just a stream of content. The User's main purpose for going on the site is just to communicate informally and casually with other people. Eventually these people can be filtered by location or if you would like to create a private room you have the option, and of course you can communicate with the whole feed too. 



---

### Unsolved Problems

- passport setup in a more realistic way.. able to check if(loggedIn == true) then you are able to edit things youve posted. Else, you cannot edit and only view/like/flag

- multer decoder set up better so that youre able to upload movies/videos. Also ideally it would deal with large files in a better way. 

- Error messages handled better in general

- Make the ability to like and flag less clunky


---

### Future Advances 

- able to take photos from phone or computer or tablet and add them internally through the application 

- make the overall database more robust so that it can handle a lot of users and a lot of posts all containing potentailly large files

- MORE mobile friendly, maybe so crazy and learn swift and make it a legitimate app

- comments for other users **big one**

- integrate email and specific **User Profiles**

- integrate "Rooms" where you can create a private feed and add people to it

- maybe create some sort of "friending" system for things like "Rooms"


---


By Weston Perkins 

