IMAGE_NAME := czonereact
CONTAINER_NAME := czonereact-container

build:
	docker build . -t ${IMAGE_NAME} --no-cache

dev:
	docker run --rm -p 3000:80 -v ./src:/app/src --env-file .env --name ${CONTAINER_NAME} ${IMAGE_NAME}

copy:
	docker cp ${CONTAINER_NAME}:/usr/share/nginx/html/ ./ && rm -rf public && mv html public

serve:
	serve public