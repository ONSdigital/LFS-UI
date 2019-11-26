# LFS-UI
LFS UI

How do you run it? 

Install npm: https://www.npmjs.com/get-npm

clone the project. Navigate to the project in a terminal.

`npm install` - This will download all the dependencies. 

`npm run start` - this will run the development build

### Tests 

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

To Run tests in Google Chrome

Download the [Chrome Driver](https://sites.google.com/a/chromium.org/chromedriver/downloads) for your version of Chrome

In the `.env` file (Which should be in the root of the project)  add the address to the downloaded Chrome Driver like below
```
REACT_APP_CHROME_DRIVER=/Users/bill/Documents/chromedriver
```

For Selenium Test to Run the application Needs to be running on [localhost:3000](http://localhost:3000/)

