deploy:
	yarn build
	firebase deploy --only hosting
build_and_copy:
	yarn build
	sudo cp -r ./build /var/www/ravenapp-emh.org
