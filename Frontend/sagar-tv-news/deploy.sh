#!/bin/bash

# Deploy to VPS
echo "Deploying to VPS..."
rsync -avz --delete ./build/ root@147.93.97.221:~/STVNreal/frontend1/

echo "Deployment complete!"
