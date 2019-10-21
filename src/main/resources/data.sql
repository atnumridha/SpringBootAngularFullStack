INSERT INTO user (id, first_name, last_name, email, password) VALUES (1, 'Anup', 'Mridha', 'info@gmail.com', '$2y$12$m9w8YW24c6aRz8CPYnEO0u0uHYueHSrxOjkf/JPSDqoC/oN8ILiQ6');

INSERT INTO role (id, name) VALUES (1, 'ROLE_ADMIN');
INSERT INTO role (id, name) VALUES (2, 'ROLE_MANAGER');
INSERT INTO role (id, name) VALUES (3, 'ROLE_USER');

INSERT INTO users_roles (user_id, role_id) VALUES (1, 1);
INSERT INTO users_roles (user_id, role_id) VALUES (1, 2);