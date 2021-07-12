![Screenshot 2020-02-09 at 5 08 54 PM](https://res.cloudinary.com/vileni/image/upload/v1625945360/LinkShortener_wlf61h.png)


# MERN STACK APPLICATION Vileni.ge

## Important things I used to build the project
- Javascript React✨
- Mongoose Mongodb✨
- TypeScript NodeJS✨
- State Managment Redux✨


#  Design decision
  #### I used SPA React Application, thus I chose to use Redux to mange State.
  #### on Front-end there are 4 pages.
  #### 1)signup page You can register there.
  #### 2)login page You can login there.
  #### 3)mystats page You can track your links there.
  #### 4)main page You can create links there.
  
  #### on main page you can create short links but as long as you are not authenticated you can't track your link.
  #### if you do authenticate then every link will be tracked by you. (check mystats page)
  #### using Mongodb and Mongoose I managed to impliment user authorization and authentication.
  #### I made relation beetween Users and links,so all link belongs to user who created it.
  #### about unique visits and visits. if there is visit on link the visits field of links in database incriments by 1,
  #### then NodeJs checks in database URLs visitorsIP field if it do not contain visitors ip then appends it 
  #### and incriments uniqueVisitors field by 1.
  
  
  



## Do you want to try it yourself?

#I recommend [Node.js](https://nodejs.org/) v14+ to run.

### Firt you need to create your own MongoAtlas database and fill required fields in .env file


##### Download project
```sh
git clone https://github.com/Vileni/link_shortener.git
```
##### Start Nodejs server PORT=3001

```sh
cd link_shortener 
```
```sh
cd server 
```
```sh
npm install
```
```sh
npm run start:dev
```
##### Start React app PORT=3000
```sh
cd link_shortener 
```
```sh
cd client 
```
```sh
npm install
```
```sh
npm run start
```
Navigate to local server address in
your preferred browser.

```sh
127.0.0.1:3000
```

## License
Open source 
*USE AS YOU WANT!*
