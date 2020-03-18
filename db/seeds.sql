-- insert new department
INSERT INTO department (name) 
    VALUES ('Engineering');

-- insert new department
INSERT INTO department (name) 
    VALUES ('Web Development');

-- insert new role
INSERT INTO role (title, salary, department_id) 
    VALUES ('Software Engineer', 100000, 1);

-- insert new role    
INSERT INTO role (title, salary, department_id) 
    VALUES ('Front-end Developer', 80000, 2);

-- insert new employee
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
    VALUES ('Austen', 'Turner', 1, 2);

-- find employee role based on role_id
SELECT 
    title, first_name, last_name
FROM
    role
INNER JOIN employee
    ON role.id = employee.role_id;
    
-- find role department based on department_id
SELECT
	department.name, role.title
FROM 
	department
INNER JOIN role
	ON department.id = role.department_id;
    
-- find employee role and department
SELECT 
	department.name, role.title, employee.first_name, employee.last_name
FROM
	department
INNER JOIN role
	ON department.id = role.department_id
INNER JOIN employee
	ON role.id = employee.role_id;

-- view all employee salaries
SELECT
	salary
FROM 
	role
INNER JOIN employee
	ON role.id = employee.role_id;
    
-- view employees by manager
SELECT 
	first_name, last_name
FROM 
	employee
WHERE manager_id = ;

-- delete departments
DELETE FROM department
	WHERE name = '';

-- delete roles
DELETE FROM roles
	WHERE title = '';
    
-- delete employees by name
DELETE FROM employee
	WHERE first_name = '' AND last_name = '';
    
-- delete employees by id
DELETE FROM employee
	WHERE id = ;
    
-- update employee manager
UPDATE employee
SET
	manager_id = 
WHERE 
	id = ;
    
-- update employee roles
UPDATE employee
SET
	role = ''
WHERE
	id = ;

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;