## Title: Tankio

## Role

Frontend, Backend, Embedded device programming

## Description

This is Tankio, Tankio helps users especially those in areas where the power supply is unpredictable, manage water in their storage tanks from over the internet. Whenever there is power supply, the tank comes online. The user can then turn the tank pump on to get water into the tank and get real time update on the water level of the tank as the pumping process is going on. This can find applications in homes,factories, irrigation, poultry and so on. Tankio is used to manage tanks for now, many other functionalities will be added as the need arises.

## Why

(My true story) Imagine coming home in the late evening after work and entering the shower to take your bath and realizing that there is no water in the tank. In addition to this, there is no electricity supply at the moment to pump water. If you have lived in Nigeria especially in public houses with different apartments and the water tanks are shared, you will fully understand this scenario.
Now Tankio allows users to see the remaining water level, turn on the pump to pump water into the tank and stop the water when the tank is full.
These functions can be set to automatic though, for example the pumping can be triggered automatically when the water reaches a predefined level set by the user. This functionality is currently being implemented in the hardware.

## Usage:

- visit [Tankio](https.tankio.orangius.xyz/) and Sign Up
- Navigate to the dashboard
- Enter the ID of the tank monitor hardware associated with the tank you want to control
- The tank is all yours to control and monitor from anywhere in the world

#### _Note: If you do not have the hardware, you can navigate to the [demo](https.tankio.orangius.xyz/demo) page to see how it works_

## Tech used (and why)

- **Websocket**: Websocket was used,so as to provide a persistent messaging channel between the server, the client (the dashboard on a browser) and the hardware. Other messaging technologies such as MQTT (Message Queuing Telemetry Transport) can be used for its low memory footprint on embedded devices, however I needed a real time bidirectional communication between the server and the clients, hence the choice for websocket over MQTT.

- **Nextjs:** Nextjs 14 was used for this project, Next was used because of its simple file-based routing structure, server-side rendering (great for SEO), and its file based routing, image optimization and so much more.
- **Express JS:** The backend is built using the express JS framework, it is a very popular un-opinionated framework with shallow learning curve,with express you can basically servers can be spin up in less than a minute.

- **Mongo DB:** Mongo DB is used to store the users data, like their usernames and password, and to log the water level in the tank. Using a NoSQL database like Mongo DB is a matter of choice, SQL database like MySQL, Postgres or even SQL lite could have handled the project just fine.

## Challenges

On the frontend, when the user clicks the "ON" button, an animated gif appears on the screen showing that the pump is currently pumping, to avoid loading another entire image, only a part of the image is swapped out, particularly the animated water level in the tank. Also as the tank gets filled up, it reflects on the dashboard too. Getting these two functionalities was tricky and challenging, and I plan to make a “behind the scene” post on how the functionality was achieved using CSS.

On the backend, among all other challenges, updating the dashboard in real time when the associated hardware comes online or goes offline was a bit challenging. For this, the server has to continuously ping every connected hardware every 5 seconds (5 seconds was chosen because I want the server to know that a hardware has gone offline not more than 5 seconds after the device went offline), and then update the user dashboard accordingly.
Again, since the project uses websocket, it cannot be hosted in a serverless environment like Vercel or Netlify, so an EC2 instance was configured to host the NextJS frontend and ExpressJS backend.
