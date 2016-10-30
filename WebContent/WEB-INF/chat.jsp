<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="test.models.*" %>
<%
	User user = (User) request.getSession().getAttribute("user");
	String author = "unknown" ;
	if(user == null){
		System.out.println("no session");
		response.sendRedirect("login");
	}else{
		System.out.println("session found ");
		author = user.getPseudo();	
	}
%>
<!DOCTYPE html>
<html lang="fr">
<head>
	<title>Chat</title>
	<meta charset="UTF-8">
	<link href="./assets/css/bootstrap.min.css" rel="stylesheet">
	<link href="./assets/css/styles.css" rel="stylesheet">
</head>
<body class="grey lighten-5">

	

	<div class="container text-center">
		<h3>bonjour <%=author %></h3>
		<hr>		
		
		<div class="row">
			<div class="text-center col-md-6 col-md-offset-3 chat-panel">
				
				<div id="chat" class="chat" >
					
				</div>
				<textarea type="text" data-author="<%=author %>" id="message" class="form-control" name="message" placeholder="..."></textarea>
				<br>
				<button class="btn btn-primary btn-block btn-lg" id="submit" name="submit">Envoyer</button>
			</div>
		</div>
		
	</div>


	<script src="./assets/js/jquery.min.js"></script>
	<script src="./assets/js/bootstrap.min.js"></script>
	<script src="./assets/js/app.js"></script>
</body>
</html>