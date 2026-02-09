import { Workbook } from 'exceljs';  // its a library/module
import { test, expect } from '@playwright/test';

async function writeExcelTest(searchText,replaceText,change,filePath)
{

    const workbook=new Workbook(); 
    await workbook.xlsx.readFile(filePath);  //read file                                    
    const worksheet=workbook.getWorksheet('Sheet1');
    const output=await readExcel(worksheet,searchText);

    const cell=worksheet.getCell(output.row,output.column+change.colChange);
    cell.value=replaceText //cell value is modified

    await workbook.xlsx.writeFile(filePath);  //write onto file
}

function readExcel(worksheet,searchText) 
{
    let output={row:-1,column:-1};
    worksheet.eachRow((row,rowNumber)=>
    {
        row.eachCell((cell,colNumber)=>
        {
            if(cell.value===searchText)
            {
                output.row=rowNumber;
                output.column=colNumber;

            }
        })

    })    
    return output;
}



test('upload-download excel validation',async({page})=>
{

    const textSearch="Mango";
    const updateValue='300';
    const filePath = "C:/Users/Shivani PK/Downloads/download.xlsx"; 

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise=page.waitForEvent('download');
    //await page.getByRole('button',{name:"Download"}).click();


     // since download file takes time, we are using promise to make sure next 
    //  line is executed only after downloading file 
    const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: 'Download' }).click()
    ]);

    await download.saveAs(filePath);

    await writeExcelTest(textSearch,updateValue,{rowChange:0,colChange:2},filePath);
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles(filePath);   //uploading file onto web this works only when the 
                                                                //element has attribute 'type=file'                                                                                                                      
    const desiredRow=page.getByRole('row').filter({ hasText: textSearch });  //goes to row which  has text 'Mango'
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);

    

})