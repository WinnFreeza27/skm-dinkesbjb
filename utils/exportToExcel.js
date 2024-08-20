import ExcelJS from 'exceljs';
import { format } from 'date-fns';
import {id} from 'date-fns/locale/id';
import { getTemplate } from '@/lib/getTemplate';
import saveAs from 'file-saver';

export const exportTableToExcel = async (responses,date) => {
  console.log(date)
  const template = await getTemplate();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(await template.arrayBuffer());

    const worksheet = workbook.getWorksheet('Sheet1');

    // Dynamic title and merging cells
    worksheet.mergeCells('A3:Q3');
    const dateFormat = {
      from: format(new Date(date.from), "dd MMM yyyy", { locale: id }),
      to: format(new Date(date.to), "dd MMM yyyy", { locale: id }),
    }
    const titleCell = worksheet.getCell('A3');
    titleCell.value = `Periode : ${dateFormat.from} - ${dateFormat.to}`;
    titleCell.font = { bold: true };
    titleCell.alignment = { horizontal: 'center' };

    // Prepare headers for row 5
    const headers = ['No', 'Tanggal'];
    const headId = Object.keys(responses[0])[0];
    const rowHead = responses[0][headId];
    rowHead.forEach((item) => {
        headers.push(item.question_text);
    });

    const headerRow = worksheet.getRow(4);
    headerRow.values = headers;
    headerRow.font = { bold: true };
    headerRow.alignment = { horizontal: 'center' };

    // Apply borders to the header row
    headerRow.eachCell((cell) => {
        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        };
    });

    // Prepare and add data starting from row 5
    responses.forEach((response, index) => {
        const responseId = Object.keys(response)[0];
        const tanggal = response[responseId][0].responses.created_at;
        const formatTanggal = format(new Date(tanggal), "dd MMM yyyy", { locale: id });
        const row = [index + 1, formatTanggal];
        response[responseId].forEach(item => {
            row.push(item.responses.value.option_text);
        });
        const newRow = worksheet.addRow(row);
        newRow.alignment = { horizontal: 'center' };

        // Apply borders to each cell in the data row
        newRow.eachCell((cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });
    });

    // Generate Excel file and trigger download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `response-${dateFormat.from}-${dateFormat.to}.xlsx`);
    return;
};