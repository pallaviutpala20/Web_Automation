import {expect,Page} from '@playwright/test'
import{default as locators} from '../../resources/webElements/locators.json'

 export class Alerts{
    page:any
    objectrepository=locators

    constructor(page:Page){
        this.page=page

    }
    async handlenewTab(){
        await this.page.locator(this.objectrepository.AlertsFramesAndWindows.alertsFramesAndWindows.selector).click()
        await this.page.locator(this.objectrepository.AlertsFramesAndWindows.browserWindows.selector).click()
        const [page1]=await Promise.all([
            this.page.context().waitForEvent('page'),
            this.page.locator(this.objectrepository.AlertsFramesAndWindows.newTab.selector).click()
        ])
        await expect(page1.getByText('This is a sample page')).toBeVisible()
        await page1.close()

    }
    async handlenewWindow(){
        await this.page.locator(this.objectrepository.AlertsFramesAndWindows.alertsFramesAndWindows.selector).click()
        await this.page.locator(this.objectrepository.AlertsFramesAndWindows.browserWindows.selector).click()
        const [newWindow]=await Promise.all([
            this.page.waitForEvent('popup'),
            this.page.locator(this.objectrepository.AlertsFramesAndWindows.newWindow.selector).click()

        ])
        await newWindow.waitForLoadState('domcontentloaded')
        await expect(newWindow.getByText('This is a sample page')).toBeVisible()
        const title=await newWindow.title()
        console.log(title)
        await newWindow.close()
    }
 }