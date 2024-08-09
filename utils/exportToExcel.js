import { writeFile, utils } from 'xlsx';

export const exportTableToExcel = (responses) => {
  const data = [];

  // Extracting headers
  const headers = ['No'];
  const headId = Object.keys(responses[0])[0];
  const rowHead = responses[0][headId];
        rowHead.forEach((item, subIndex) => {
        headers.push(item.question_text);
      });
  data.push(headers);

  // Extracting body data
  responses.forEach((response, index) => {
    const row = [index + 1];
    Object.keys(response).forEach(key => {
      response[key].forEach(item => {
        row.push(item.responses.option_text); // Adjust this based on your actual data structure
      });
    });
    data.push(row);
  });

  // Create a new workbook and a worksheet
  const worksheet = utils.aoa_to_sheet(data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Write the workbook to a file
  const fileName = 'responses.xlsx';
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const filePath = `${fileName}-${formattedDate}.xlsx`;
  writeFile(workbook, filePath);
};