if [[ $1 == "backend" ]] || [[ $1 == "" ]]
    then
    docker-compose -f ./docker/docker-compose.cicd.yaml run --rm test-backend
fi

if [[ $1 == "frontend" ]] || [[ $1 == "" ]]
    then
    docker-compose -f ./docker/docker-compose.cicd.yaml run --rm test-frontend
fi
