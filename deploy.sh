#!/bin/bash

git update-index 

git add -u
git commit -m "$1"
git push origin master

npm publish
