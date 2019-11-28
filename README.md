# LFS-UI

### Installing/Running

Install npm: https://www.npmjs.com/get-npm

clone the project. Navigate to the project root folder in a terminal.

`npm install` - This will download all the dependencies. 

`npm run start` - this will run the development build.

### Testing

#### Unit tests
Run all Tests
```
npm test
```
_Note: This will run every tests including Selenium Tests Which needs to be [Setup](#Setup Selenium Tests) on you machine_

Run All tests with coverage
```
npm run test-coverage
```
Run only the Core ONS_DesignSystem Components tests
```
npm run test-ONS
```

#### Setup Selenium Tests

To Run tests in Google Chrome, these Instructions are for Mac OS

Download the [chromedriver](https://sites.google.com/a/chromium.org/chromedriver/downloads) for your version of Chrome, export the zip and move the chromedriver to a directory **which is not `/Applications`**  

 
In the `.env` file (Which should be in the root of the project) add the folder path to chromedriver like below
```
REACT_APP_CHROME_DRIVER=/Users/yourUsername/Documents/chromedriver
```

For Selenium Test to Run the application Needs to be running on [localhost:3000](http://localhost:3000/)

