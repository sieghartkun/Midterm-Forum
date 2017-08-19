Group Members:
    >Del Rosario, Abigale
    >Gamayo, Kristine Mae
    >Onila, Christian
    >Victore, Matthew James

1.) Create a Database named dbforum4

   	 > Create a table named users
		user_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT
		user_username VARCHAR NOTNULL
		user_email VARCHAR NOT NULL
		user_birthdate DATE NOT NULL
		user_usertype CHAR(5) NOT NULL	
		user_password VARCHAR NOTNULL

	> Create a table named categories
		category_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT
		category_name VARCHAR(100)
        
	> Create a table named post
		post_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT
		post_author INT NOT NULL
		post_category INT NOT NULL
		post_title VARCHAR(100) NOT NULL
		post_content VARCHAR (1000) NOT NULL
		post_date DATE NOT NULL

2.) To access the admin privileges:
	Username: admin
	Password: admin
 
		 
	



