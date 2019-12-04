import {By, WebDriver} from "selenium-webdriver";

export async function loginUserToUI(browser: WebDriver) {
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
    await browser.sleep(20);
}