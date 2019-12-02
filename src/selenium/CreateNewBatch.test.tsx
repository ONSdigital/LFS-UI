import {Builder, By, WebDriver} from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import {loginUserToUI} from "./WebsiteNavigationFunctions";

/*
Tutorial on selenium find By Xpath, useful for getting items in the HTML, such as options in a select dropdown
https://www.guru99.com/xpath-selenium.html
*/

describe("Selenium - Create New Batch Test", () => {
    let url = "http://localhost:3000/New_Batch";
    let browser: WebDriver;
    // Setup Chrome driver
    chrome.setDefaultService(new chrome.ServiceBuilder(process.env.REACT_APP_CHROME_DRIVER).build());

    beforeAll(async () => {
        browser = await new Builder().forBrowser("chrome").build();
        await browser.get(url);

        // logs in the user
        await loginUserToUI(browser);
    });

    afterAll(async () => {
        if (browser !== undefined) {
            await browser.quit();
        }
    });

    it("should Create a New Batch for January 2010 and then redirect to the Manage Batch Page", async () => {
        // get the batch type select field
        let batchOption = await browser.findElement(By.id("batch"));

        // selects the monthly option from the dropdown
        await batchOption.findElement(By.xpath('option[@value="monthly"]')).click();

        // get the year select field
        let yearOption = await browser.findElement(By.id("year"));

        // selects the 2010 option from the dropdown
        await yearOption.findElement(By.xpath('option[@value="2010"]')).click();

        // get the period select field
        let periodOption = await browser.findElement(By.id("period"));

        // selects the January option from the dropdown
        await periodOption.findElement(By.xpath('option[text()="January"]')).click();

        // Get Submit Button
        let SubmitButton = await browser.findElement(By.id("newBatchSubmit"));

        // Press Button
        await SubmitButton.click();

        await browser.sleep(20);

        // Get Site Title
        const title = await browser.getTitle();

        expect(title).toContain("LFS Manage Batch");
    });

    it("should render the Manage Batch page correctly", async () => {
        await browser.get("http://localhost:3000/manage-batch/monthly/2014/5");
        let filepath = "/Users/palmem2/Documents/Dev/LFS/LFS Upload Files/LFSwk18PERS_non_confidential.sav";

        await browser.sleep(20);

        // Get the first row of the monthly batch imports table
        let tableRow = await browser.findElement(By.xpath("//tbody/tr[1]"));

        // Get the Import Button
        let importButton = await tableRow.findElement(By.id("import-18-5-2014"));

        await importButton.click();

        // Wait for page to change
        await browser.sleep(20);

        // Get Site Title
        let title = await browser.getTitle();

        // Check the page has moved to the Survey Import
        expect(title).toContain("LFS Survey Import ");

        // get Survey metadata
        let metadata = await browser.findElement(By.className("metadata metadata__list grid grid--gutterless u-cf u-mb-l"));

        // get metaData text
        let metadataText = await metadata.getText();

        // Confirm the page is setup for the correct survey
        expect(metadataText).toMatch("Survey:\nGB\nYear:\n2014\nPeriod:\nWeek 18");

        let uploadFileInput = await browser.findElement(By.xpath('//input[@type="file"]'));

        await uploadFileInput.sendKeys(filepath);

        // Get Submit Button
        let SubmitButton = await browser.findElement(By.id("import-btn"));

        // Press Button
        await SubmitButton.click();

        await browser.sleep(20);

        // Get button className
        let submitButtonClassName = await SubmitButton.getAttribute("className");

        // Check Button is loading set to loading
        expect(submitButtonClassName).toMatch("btn btn--loader is-loading field");
    });
});
