if [ $1 = "backend" ]
    then
    docker-compose -f ./docker/docker-compose.cicd.yaml run --rm test-backend
fi

if [ $1 = "frontend" ]
    then
    docker-compose -f ./docker/docker-compose.cicd.yaml run --rm test-frontend
fi
