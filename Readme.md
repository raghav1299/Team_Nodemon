<div align="center"> 
  <p align='center'> 
   <img src="https://img.shields.io/badge/Name%20-%20Nodemarket🔥 -darkgreen?style=for-the-badge" />
   <img src="https://forthebadge.com/images/badges/built-with-love.svg" />
   <img src="https://img.shields.io/badge/By-Team%20Nodemon-blue?style=for-the-badge" /><br>
   <img src="https://img.shields.io/badge/shadowfax-leap%20hackathon-red?style=for-the-badge" />
    <br>
   <img src="https://img.shields.io/badge/License-MIT-yellow.svg?logo=Microsoft%20Word&style=for-the-badge" /><br>
  </p>
  <img src="media/logo.jpg" />
  <br><br>
  <p>
  <img src="https://img.shields.io/badge/Problem%20statement-lavenderblush?logo=Product%20Hunt&style=for-the-badge" height="55"/>
  </p>
  <img src="media/p_statement.png" />
  <br><br>
 </div>

- [X] Can AI play a role here by predictively analysing the customer order patterns? Can a grocery order be auto-triggered?

  <div align="center"> 
  <img src="media/Reco_sys.png" />
  </div>

  ```
  We have a 3 way powered recommendation engine that uses content filtering, collaborative
  and past order history based recommendations to suggest the most effective and nearest 
  matching products to the users.

  Content based filtering suggests, how products with similar tags are selected and suggested 
  to the user. Care is taken to ensure that tags for multiple products are properly analysed 
  before recommending anything. Collaborative and past order based recommendations are quite 
  similar apart from a few points. Users with a similar order history or similar likes or dislikes
  are suggested near alike products.

  Using the apriori algorithm, we can determine patterns and trends in an user’s past orders based
  on pruning frequency and candidate items to improve joining efficiency. This algorithm can also 
  be used to determine recurring orders and send push  notifications to the user for the same.

  ```
- [X] Can Kiranas play a role in quicker deliveries? If yes, how can it work at scale?

  <div align="center"> 
  <img src="media/Delivery_Flow.png" />
  <br>
  <img src="media/Delivery_Optimized.png" />
  </div>

  ```
  As per the basic flow of the system, first the customer places an order and we get the coordinates of 
  the customer via device location and then scans all the nearest shops and delivery agents in a 5km radius.

  Then we will assign the order to the nearest shop and the delivery agent based upon a distance matrix as
  shown above. The shop is selected based on the availability of the product and the number of pending 
  orders in the shop. 

  A job is pushed using RabbitMQ and the shopkeeper gets an alert message and has a 2 minute window 
  to accept the order failing which the order will be passed on to the next available shop. After the 
  job is acknowledged it is popped from the queue. Next the delivery agent will receive a job through 
  RabbitMQ. The delivery agent also has to accept the job within 2 minutes or else it will be passed 
  on to the next agent.

  Accordingly a final decision is made and the product is delivered

  ```
- [X] In Tier-1 cities, our societies are now digitised, courtesy the likes of Mygate. Can this prove to be a fundamental block in achieving higher speed of deliveries? (Relay deliveries)

  ```
  We have also incorporated a feature which plays a fundamental role in relay deliveries.  We will 
  ensure that products ordered at same time from nearby localities are ordered to the customers via the 
  same delivery agent therefore keeping the max possible delivery agents available for further orders.

  Suppose customer 1 and customer 2 from nearby localities order products at the same time, their 
  orders will be delivered via the nearest same delivery agent. This facilitates relay deliveries and 
  ensures max possible delivery agents are available for further orders.
  ```

<div align="center"> 
    <p>
    <img src="https://img.shields.io/badge/Why%20%7C%20What%20it%20does-darkslategrey?logo=Windows%20Terminal&style=for-the-badge" height="55"/></p>
    <img src="media/approach.png" />
  <br><br>
 </div>

<div align="center"> 
    <p>
    <img src="https://img.shields.io/badge/system%20architecture-moccasin?logo=Databricks&style=for-the-badge" height="55"/></p>
    <img src="media/Sys_Arch.png" />
  <br><br>
 </div>

<div align="center"> 
  <img src="https://img.shields.io/badge/Product%20Images-mediumseagreen?logo=Pinterest&style=for-the-badge" height="55" /><br><br>
  <img src="media/mockup1.jpg" />
  <img src="media/mockup2.jpg" />
  <img src="media/mockup3.jpg" />
</div>
<br>

<div align="center"> 
  <img src="https://img.shields.io/badge/Prerequisites-teal?logo=Pinboard&style=for-the-badge" height="55"/><br>
</div>
<br>

```

- Python(3.9.6): Poetry for python dependency management
- Node.js
- React js
- React Native
 
```

<br>

<div align="center"> 
  <img src="https://img.shields.io/badge/Setting%20up%20locally-purple?logo=visual-studio-code&style=for-the-badge" height="55"/> 
</div><br>

```
Fork The Repository ✅

$ git clone https://github.com/raghav1299/Team_Nodemon.git   
```

```
$ cd Team_Nodemon
```

#### Start the Python ML backend 🚀 :

```
!! APIs might not work upon run as it requires a .env file to be added with the credentials.

pip install poetry
cd ML
bash install.sh
bash run.sh
```

**OR**

```
pip install poetry
cd ML/Recommendation_sys
poetry install
poetry run uvicorn main:app --reload
```

#### Start the Backend Server 🗃 :

```
npm install 
npm install -g nodemon
nodemon app
```

#### Start the Frontend Admin 🖥️ :

```
npm install
npm start
```

#### Start the Native App 📱 :

```
npm install
npx react-ntive run-android
npx react-native run-android
```

`<br><br>`

<div align="center"> 
  <img src="https://img.shields.io/badge/Tech%20Stack%20Used-chocolate?logo=Tesla&style=for-the-badge" height="55"/> 
</div>
  <br>

#### Recommendation System | Backend :

```
Python
- Scikit Learn
- Pandas
- NLP
- Poetry
- FastAPI
- Uvicorn

Database
- MySQL

Deployment
- AWS
```

<div>
   <h3>API Documentation:</h3>

`<a href="https://leap.swarnabha.tech/docs">` https://leap.swarnabha.tech/docs `</a><br>`

</div>

#### Admin | Frontend

```
- React JS
```

#### Server | Backend

```
- Node JS
- Express
- RabbitMQ
  
  Deployment
  - Azure
  
  Development API to calculate distance
  - https://rapidapi.com/digitallyamar/api/distance-calculator1(Distance Calculating API)
  
```

<div>

<h3>API Documentation:</h3>

`<a href="https://api.chetanpareek.tech/api-docs/">` https://api.chetanpareek.tech/api-docs/ `</a><br>`

</div>

#### Native | Android

```
- React Native
```

<br>

<div align="center"> 
  <img src="https://img.shields.io/badge/Contributors-black?logo=Github&style=for-the-badge" height="55"/> 
</div>
  <br>

<div align="center"> 
  <table>
<tr align="center">
 <td>
