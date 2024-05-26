#!/bin/bash

set -e

# version example: 0.1.1
VERSION=$1

if [ -z "$VERSION" ]
then
      echo "Please specify an application version!"
      exit
fi



appPackage='beapizer-'$VERSION
appImage='beapizer:'$VERSION

echo '\nBuilding the Application ===> '$appPackage'\n'
sudo podman build -t $appImage .

echo '\nExporting the image to a tar archive...\n'
### export an image to a tar archive ###
sudo podman save --output $appPackage.tar localhost/$appImage

echo '\nImporting the image to the local registry...\n'
### import an image into local registry###
sudo ctr -n=k8s.io images import $appPackage.tar

echo '\nDeleting the generated tar package...\n'
### delete any existing package
rm -f $appPackage.tar