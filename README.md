# Mini Inter API

<p align="center"><a href="https://www.bancointer.com.br/superapp/?utm_source=google&utm_medium=cpc&utm_campaign=Pesquisa+Brand" ><img width="400px" src="https://feirao-credito.fiesp.com.br/img/banco-inter.png"/><a></p>
   
<h4 align="center" >🚀 🟧 Inter Front-End Developer 🟧 🚀</h4>
   
<h4 align="center">Application develoepd during a Front End Bootcamp promoted by <a href="https://www.bancointer.com.br/superapp/?utm_source=google&utm_medium=cpc&utm_campaign=Pesquisa+Brand"> @Inter </a> in Partnership With <a href="https://web.digitalinnovation.one/"> @Digital Inovation One</a> </h4>

      
<p align="center">
   |&nbsp;
  <a href="#project">Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#techs">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
   <a href="#routes">Routes</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#run-project">Run</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#author">Author</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>
   
#

    
 <h1 align="center">
  <a herf='https://github.com/Samuel-Ricardo'>
    <img src='https://img.shields.io/static/v1?label=&message=Samuel%20Ricardo&color=black&style=for-the-badge&logo=GITHUB'> 
  </a>
  
  <a herf='https://www.instagram.com/samuel_ricardo.ex/'>
    <img src='https://img.shields.io/static/v1?label=&message=Samuel.ex&color=black&style=for-the-badge&logo=instagram'> 
  </a>
  
   <a herf='https://www.linkedin.com/in/samuel-ricardo-cabral/'>
    <img src='https://img.shields.io/static/v1?label=&message=Samuel%20Ricardo&color=black&style=for-the-badge&logo=LinkedIn'> 
  </a>
      
  <a href="https://web.digitalinnovation.one/users/samuelricardoofficial?tab=achievements">
    <img alt="DIO" src="https://url.gratis/i5PyNS">
  </a>
</h1>

<br>

<p align="center" id="project">Inter is a Brazilian fintech, with the main function of a 100% digital bank with a 100% tariff free digital account, in addition to being a bank, it has investment, insurance, online shopping platforms, among others, all within a super App.

This API is part of a full-stack project that aims to make a small project of a mini bank based on Inter, with account registration, transfer via pix, transfer history and among others.

   <img width="40px" src="https://feirao-credito.fiesp.com.br/img/banco-inter.png"/>
	
#
   
Site - <a href="http://mini-inter.vercel.app/">Mini Inter</a>

Repo [frontend] - <a href="https://github.com/Samuel-Ricardo/mini-inter-site">Mini Inter Site</a>
   
This API is hosted on <a href='https://mini-inter-api.herokuapp.com/'> Heroku </a> 
  
#
   <p id="routes"/>
   
##  :construction: API Routes:  

 <h3><b> Base URL - https://mini-inter-api.herokuapp.com/ </b></h3>

</br>
   
- <b> User Routes - /user </b>
   
<p>   - Create - POST - /signup </p>
<p>   - Login - POST - /signin </p>
<p>   - Get Logged User - GET - /me </p>
   
#

- <b> Pix Routes - /pix </b>
   
 <p>   - Request - POST - /request </p>
 <p>   - Pay - POST - /pay/:key </p>
 <p>   - Get all transactions of user - GET - /transactions </p>

#

<p align="justfy">
	All routes have error coverage, some are accessible only to authenticated users, some logics were applied such as: a user cannot send a pix to himself, he cannot pay an amount greater than his balance, among other features
</p>
   
#

<h2 id="techs">
  🛠 Main Technologies and Concepts Studieds:
</h2>

- Typescript
- @Types
- REST
- Token Authentication
- JWT
- cryptography
- js-base64
- Relational Database
- Postgres SQL
- TypeORM
- Deploy
- Host API
- Middlewares
- Error Coverage
- DTO
- Clean Code
