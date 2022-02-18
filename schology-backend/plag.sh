#!/home/ubuntu/
cd plag
docker stop app
echo "y" |docker system prune -a
docker build -t app .
docker run -d -p 5000:5000 --name app app
