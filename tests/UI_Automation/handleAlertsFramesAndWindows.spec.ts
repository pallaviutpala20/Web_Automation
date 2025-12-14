import {test,expect,Page} from '@playwright/test'
import { Alerts } from '../../src/pages/alertsFramesWindows'
import { Elements } from '../../src/pages/elements'

test.describe('Handle Alerts Frames And Windows',()=>{
    let alerts:Alerts
    let elements:Elements
     test.beforeEach(async({page})=>{
        alerts=new Alerts(page)
        elements=new Elements(page)
        await page.goto("https://demoqa.com/")
        await page.waitForLoadState('domcontentloaded')
        await elements.selectElementsTab()

     })
     test.afterEach(async({page})=>{
        await page.close()
    })

    test('Handle New Tab',async({page})=>{
        await alerts.handlenewTab()

    })
    test('Handle New Window',async({page})=>{
        await alerts.handlenewWindow()
    })
})