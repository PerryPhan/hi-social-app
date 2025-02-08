@echo off
mkdir multi-channel-messaging-ts
cd multi-channel-messaging-ts

mkdir src
cd src

echo. > app.ts

mkdir routes
cd routes
echo. > zalo.ts
echo. > facebook.ts
echo. > instagram.ts
cd ..

mkdir services
cd services
echo. > messaging-service-interface.ts
echo. > rich-card-messaging-interface.ts
echo. > zalo-service.ts
echo. > facebook-service.ts
echo. > instagram-service.ts
cd ..

cd ..

echo. > .env
echo. > .gitignore
echo. > package.json
echo. > tsconfig.json

echo Directory structure created successfully!
pause