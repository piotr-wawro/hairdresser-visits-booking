if [ $1 = "backend" ]
    then
    docker-compose -f ./docker/docker-compose.cicd.yaml run --rm build-backend
    docker build -f ./docker/Dockerfile.backend -t hairdresser-visits-booking-backend .
    docker rmi $(docker images -f "dangling=true" -q)
fi

if [ $1 = "frontend" ]
    then
    docker-compose -f ./docker/docker-compose.cicd.yaml run --rm build-frontend
    docker build -f ./docker/Dockerfile.frontend -t hairdresser-visits-booking-frontend .
    docker rmi $(docker images -f "dangling=true" -q)
fi
