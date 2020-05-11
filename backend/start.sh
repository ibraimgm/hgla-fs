#!/bin/sh

# first, wait for the database to be 'ready'
./wait-for-it.sh $1

# run the app
./backend

# if we cannot connect (e. g. first time setup on docker)
# wait a bit and try again, until it works
while [ $? -ne 0 ]; do
  echo "Error starting backend. Waiting 30s before trying again..."
  sleep 30
  ./backend
done
