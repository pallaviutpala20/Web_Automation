import{Page,expect} from '@playwright/test'
import{default as locators} from '../../resources/webElements/locators.json'
const path = "C:\\Users\\PALLAVI\\Documents\\Workspace\\Web_Automation\\resources\\fileuploads\\sampleFile.jpeg";



export class Elements{
    
    objectRepository= locators
    page: any
    currentAddress="🇮🇳 IndiaFlat 402, Lotus Heights,Madhapur, Hyderabad, Telangana 500081"
    permanentAddress="🇮🇳 IndiaFlat 402, Lotus Heights,Madhapur, Hyderabad, Telangana 500081"
    

    constructor(page:Page){
        this.page=page
        
    }

    async selectElementsTab(){
        await this.page.locator(this.objectRepository.WebElements.Elements.selector).click()
        await this.page.waitForLoadState('domcontentloaded')

    }
    async selectTextBox(){
        await this.page.locator(this.objectRepository.WebElements.textBox.selector).click()
        await this.page.locator(this.objectRepository.WebElements.firstName.selector).fill("Pallavi")
        await this.page.locator(this.objectRepository.WebElements.Email.selector).fill('xyz@gmail.com')
        await this.page.locator(this.objectRepository.WebElements.currentAddress.selector).fill(this.currentAddress)
        await this.page.locator(this.objectRepository.WebElements.permanentAddress.selector).fill(this.permanentAddress)
        await this.page.locator(this.objectRepository.WebElements.submitBtn.selector).click()
        const output= this.page.locator(this.objectRepository.WebElements.output.selector);
        await expect(output).toBeVisible();

    }
    async selectCheckbox() {
        await this.page.locator(this.objectRepository.WebElements.checkBoxes.selector).click()
        await this.page.locator(this.objectRepository.WebElements.homecheckbox.selector).check()
        await expect(this.page.getByText('You have selected ')).toBeVisible();
        await this.page.locator(this.objectRepository.WebElements.expandHomeButton.selector).click()
        await expect(this.page.locator(this.objectRepository.WebElements.desktopCheckBox.selector)).toBeChecked()
        await expect(this.page.locator(this.objectRepository.WebElements.documentsCheckBox.selector)).toBeChecked()
        await expect(this.page.locator(this.objectRepository.WebElements.downloadsCheckBox.selector)).toBeChecked()
       
    }
    async radioButtons(){
        await this.page.locator(this.objectRepository.WebElements.radioButtons.selector).click()
        await this.page.locator(this.objectRepository.WebElements.yesRadioButton.selector).check()
        await expect(this.page.getByText('You have selected Yes')).toBeVisible()
        await this.page.locator(this.objectRepository.WebElements.impressiveRadioButton.selector).check()
        await expect(this.page.getByText('You have selected Impressive')).toBeVisible()
        await expect(this.page.locator(this.objectRepository.WebElements.noRadioButton.selector)).toBeDisabled()
    }
    async webTables(){
        await this.page.locator(this.objectRepository.WebElements.webTables.selector).click()
        await this.page.locator(this.objectRepository.WebElements.addData.selector).click()
        await this.page.locator(this.objectRepository.WebElements.rf_FirstName.selector).fill("Pallavi")
        await this.page.locator(this.objectRepository.WebElements.rf_LastName.selector).fill("Utpala")
        await this.page.locator(this.objectRepository.WebElements.rf_Email.selector).fill("xyz@gmail.com")
        await this.page.locator(this.objectRepository.WebElements.rf_Age.selector).fill("40")
        await this.page.locator(this.objectRepository.WebElements.rf_salary.selector).fill("3200000")
        await this.page.locator(this.objectRepository.WebElements.rf_Department.selector).fill("Software Development Engineer in Test")
        await this.page.locator(this.objectRepository.WebElements.rf_Submit.selector).click()
        const rows=this.page.locator('rt-tr-group')
        const count=await rows.count()
        for(let i=0;i<count;i++){
            const row=rows.nth(i)
            const sal=await row.locator('.rt-td').nth(4).innerText() 
            if(sal<10000){
                await row.locator("span[id*='delete-record']").click()
            }
        }
    }
    async Buttons(){
        await this.page.locator(this.objectRepository.WebElements.buttons.selector).click()
        await this.page.locator(this.objectRepository.WebElements.dbClickButton.selector).dblclick()
        await expect(this.page.getByText('You have done a double click')).toBeVisible()
        await this.page.locator(this.objectRepository.WebElements.rightClick.selector).click({button:'right'})
        await expect(this.page.getByText('You have done a right click')).toBeVisible()
        await this.page.locator(this.objectRepository.WebElements.singleClick.selector).click()
        await expect(this.page.getByText('You have done a dynamic click')).toBeVisible()
    }
    async links(){
        await this.page.locator(this.objectRepository.WebElements.links.selector).click()
        const [page1]=await Promise.all([
            this.page.context().waitForEvent("page"),
            this.page.locator(this.objectRepository.WebElements.homeLink.selector).click()

        ])
        
        await page1.waitForLoadState("domcontentloaded");
        await page1.close()
        
    }
    async downloadandUpload(){
        await this.page.locator(this.objectRepository.WebElements.uploadAndDownload.selector).click()
        const [download]=await Promise.all([
            this.page.waitForEvent('download'),
            this.page.locator(this.objectRepository.WebElements.download.selector).click()

        ])
        await download.saveAs('downloads/DummyFile.jpeg')
        await this.page.locator(this.objectRepository.WebElements.uploadFile.selector).setInputFiles(path);
    }
}