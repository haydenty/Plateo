# Plateo
A web app that brings on conversation by connecting others via license plate numbers.

**Tech Stack**
This app uses the MEAN stack.

**Run me by using:**<br />
npm install <br />
bower install <br />
node server <br />
navigate to localhost:3000

**Vulnerabilities** 
1) username and Password are shown in the local storage. 
2)when we login , all the user details including mail are exposed in the local storage .
3)the login credentials are not encrypted and sent through http protocol by post method which makes this combination visible to  network traffickers and can be captured by wireshark.
