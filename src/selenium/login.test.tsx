import {Builder, By, WebDriver} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';


describe("Selenium - User Login Test", () => {
    let url = 'http://localhost:3000';
    let browser: WebDriver;
    // Setup Chrome driver
    chrome.setDefaultService(new chrome.ServiceBuilder(process.env.REACT_APP_CHROME_DRIVER).build());

    beforeEach(async  () => browser = await new Builder().forBrowser('chrome').build())

    afterEach(async () => {
        if (browser !== undefined) {
            await browser.quit();
        }
    });

    it("should render title correctly", async () => {
        await browser.get(url);
        const title = await browser.findElement(By.className('header__title')).getText();
        expect(title).toContain('Labour Force Survey')
    });

    it("should fill in form correctly ", async () => {
        await browser.get(url);

        // Get Login Form
        let loginForm = await browser.findElement(By.id('loginForm'));

        // Get Username input field from form
        let usernameField = await loginForm.findElement(By.id('username'));

        // enter text into input field
        await usernameField.sendKeys('username');

        // Get input field Value
        let usernameFieldValue = await usernameField.getAttribute('value');

        expect(usernameFieldValue).toEqual('username');

        // Get Password input field from form
        let passwordField = await loginForm.findElement(By.id('password'));

        // Enter text into input field
        await passwordField.sendKeys('password');

        // Get input field Value
        let passwordFieldValue = await passwordField.getAttribute('value');

        expect(passwordFieldValue).toEqual('password')
    });

    it("should login the user", async () => {

        await browser.get(url);

        // Get Login Form
        let loginForm = await browser.findElement(By.id('loginForm'));

        // Get Username input field from form
        let usernameField = await loginForm.findElement(By.id('username'));

        // enter text into input field
        await usernameField.sendKeys('Admin');

        // Get Password input field from form
        let passwordField = await loginForm.findElement(By.id('password'));

        // Enter text into input field
        await passwordField.sendKeys('password');

        // Get Submit Button
        let SubmitButton = await loginForm.findElement(By.id('login'));

        // Press Button
        await SubmitButton.click();

        // Wait for page to change
        await browser.sleep(10);

        // Find FieldSet title
        let fieldsetTitle = await browser.findElement(By.className('fieldset__legend'));

        let fieldsetTitleValue = await fieldsetTitle.getText();

        expect(fieldsetTitleValue).toEqual('Filter Batches');

        // Get Site Title
        const title = await browser.getTitle();
        expect(title).toEqual('Labour Force Survey Dashboard')
    });

});
