Feature: Account
	Account login page

	
	Background: 
		Given  User on main page

	@dev @usability 
	Scenario: User is able to login into system with valid username and password and logout
		Given User with opened sign in modal
		When  User enterd username "aaa" , password "ddd" and company name "MaDIFF"
		Then  Is redireced to dashboad
		When User use logout button
		Then He goes back to main page

