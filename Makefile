args ?=
compose = docker-compose

start:
	$(compose) up $(args)