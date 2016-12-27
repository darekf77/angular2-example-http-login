Feature: Account
	Account login page

	
	Background: 
		Given  User on main page

	@dev @usability 
	Scenario: User is able to login into system with valid data and logout
		Given User with opened sign in modal
		When  User enterd username "aaa" , password "ddd" and company name "MaDIFF"
		Then  Is redireced to dashboad
		When User use logout button
		Then He goes back to main page

	@dev @usability 
	Scenario: User gets error trying login with incorrect data
		Given User with opened sign in modal
		When  User enterd username "111" , password "111" and company name "111"
		Then  Error appears in modal form

