# BookStore fullstack web application

![Snippet screenshot](./README_assets/snippet_for_readme.jpg)

## Fully functional web application fullstack project

This project is a part of my personal portfolio and is designed to accumulate and demonstrate 
technical stack that I have learned throughout my coding journey.

It is a fully complete and functional example of online bookstore library and shop. 
User can browse through various web app pages in order to search for books, 
checkout books, leave reviews and ratings and so on.
Design of the website is completely done by me as well as the book covers design etc.

### Technical stack

<br>

<div align="center">

<img src="README_assets/java.svg" width="55" height="55" alt="java">
<img src="README_assets/ts.svg" width="55" height="55" alt="ts">
<img src="README_assets/html.svg" width="55" height="55" alt="html">
<img src="README_assets/css.svg" width="55" height="55" alt="css">
<img src="README_assets/spring.svg" width="55" height="55" alt="spring">
<img src="README_assets/reactjs.svg" width="55" height="55" alt="react">
<img src="README_assets/hibernate.svg" width="55" height="55" alt="hibernate">
<img src="README_assets/postgresql.svg" width="55" height="55" alt="postgresql">
<img src="README_assets/tailwind.svg" width="55" height="55" alt="tw">
<img src="README_assets/docker.svg" width="55" height="55" alt="docker">
<img src="README_assets/stripe.svg" width="55" height="55" alt="stripe">
<img src="README_assets/git.svg" width="55" height="55" alt="git">

</div>

<br>

* Programming and markup languages: **Java, TypeScript, HTML, CSS** \
* Frameworks and libraries: **Spring Framework, ReactJS, Hibernate, Tailwind** \
* Database and other tools: **PostgreSQL, Docker, Stripe, Git**

**Deployed version** - [coming soon]()

## Brief overview of functionality and purpose

### General project structure

This project consists of **two major parts**, as could be seen in the folder structure.

* **Backend** - REST API server-side application written in Java with usage of 
Spring Framework and PostgreSQL database.

* **Frontend** - Client side web application written in Typescript with usage of 
React and various additional tools like Tailwind etc.

**PostgreSQL** is used as DataBase system for server side to store all the data required for the application.

**Docker** containerization system is implemented to allow easy build and 
test run on any environment if required.

**Stripe payment** service is applied for processing payments made by users of the website. 

### General project functionality

In order to follow best practices and to make this project as "real-world-like" 
as possible I have implemented some common functionalities throughout this project.
Following is a brief description of those functionalities:

* **Authentication & Authorization** - implemented by using **Spring Security in conjunction with JWT** 
technologies. Only "Home", "Search" and few other pages are available to unauthenticated users. 
Other user-specific pages and application functions are available only after authentication.
Users are able to **Log in** and **Register** to the service. **JWTs** are generated via backend API 
and sent to user's frontend client, and then validated by backend each time a user tries to 
access any secured endpoint. **Admin** page and functionality is only available for **authorized** users. 
All user information including **authority** is stored in DataBase after registration and encoded into JWT.


* **Pagination** - pagination logic is implemented for both frontend and backend, and is used on various website 
pages that fetch / show big amount of items to make appearance more user-friendly. For example, pagination is used 
on "Search" page, "History" page, "All book reviews" page and so on.


* **Books search** - search mechanism of the application allows users to search through all the books 
available at the store either **by title** or **by genre**.


* **Book checkout** - allows user to check out (rent) any book that is available and in stock. 
User gets the book displayed on the "shelf", and the book's "copies available" count gets decreased. 
The book is then available for 7 days free of charge. If user has any outdated books, checkout functionality 
becomes unavailable until outstanding fees are paid.


* **Bookshelf management** - shelf page provides a user with ability to manage current loans or 
display previous loans history. Current loans total count is limited, so only 5 books can be simultaneously
checked out by each user. Management functions are as follows:
  * **Renew loan** - allows user to renew loan expiry date back to 7 days from the current moment. 
  Only available if user has no outdated loans or fees pending.
  * **Return book** - allows user to return the book back to the store. 
  No fee is created unless returned book was overdue at the moment. Book's "copies available" value
  gets increased.
  * **History tab** - displays all records of previously checked books. Can be used to track the list 
  of books read by user.


* **Book's reviews and ratings** - functionality that allows users to leave a review for any book.
User is encouraged to **rate the book and leave a comment**. A review can be created without the comment text
while rating is required.
  * **Book's rating** will be fetched as an average among all book's reviews and shown on book's specific page
  * **Latest reviews** are shown on the bottom of book's specific page as well
  * **All book's reviews** are available for the user on a separate page that can be accessed from book's 
  specific page


* **Discussions service** - allows users to open private discussions with administration. 
  * **New discussion tab** - user is encouraged to **open a discussion on any topic** and leave a message for 
  administration. This discussion can later be answered and closed by admin.
  * **All discussions tab** - provides a list of all person's discussions. Discussions answered by 
  administration are marked as "closed" and have admin reply attached, others are marked as "pending reply".
 

* **Payment service** - 


* **Administration tools** - 