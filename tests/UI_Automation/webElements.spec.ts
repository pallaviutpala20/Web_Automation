import {expect,test} from '@playwright/test'
import { Elements } from '../../src/pages/elements';

test.describe('Handling Web Elements',()=>{
    let  elements:Elements
   


    test.beforeEach('Open the web',async({page})=>{
        elements = new Elements(page);
    
    await page.goto("https://demoqa.com/")
    await page.waitForLoadState('domcontentloaded')
    await elements.selectElementsTab()

})
test.afterEach(async({page})=>{
    await page.close()
})
test('Handling TextBox',async({page})=>{
    await elements.selectTextBox()
   
})
test('Handle Checkboxes',async(page)=>{
    await elements.selectCheckbox()

})
test('Handle RadioButtons',async()=>{
    await elements.radioButtons()
})
test('Handle WebTables',async()=>{
    await elements.webTables()
})
test('Handle Buttons',async()=>{
    await elements.Buttons()
})
test('Handle Links',async()=>{
    await elements.links()
})
test('Download and Upload Buttons',async()=>{
    await elements.downloadandUpload()
})

})
