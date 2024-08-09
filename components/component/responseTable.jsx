import { useResponses } from "@/hooks/useResponses";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "../ui/button";
import React from "react";
import { exportTableToExcel } from "@/utils/exportToExcel";

export function ResponseTable() {
  const {responses} = useResponses()
  if(!responses || responses.length === 0) return null
  const headId = Object.keys(responses[0])[0]
  console.log(responses[0])
  const tableHead = responses[0][headId]
  return (
    (
      <div className="flex flex-col justify-center items-center">
    <div className="border rounded-lg overflow-auto m-8">
      <Table>
        <TableHeader>
        <TableRow>
          <TableHead className="font-medium">No</TableHead>
                {
                    tableHead.map((item, index) => (
                      <TableHead key={index} className="font-medium">U{index + 1}</TableHead>
                    ))
                }
      </TableRow>
        </TableHeader>
        <TableBody>
        {
          responses.map((response, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              {
                Object.keys(response).map((key) => (
                  response[key].map((item, subIndex) => {
                    const text = item.responses.value.option_text; // Adjust this based on your actual data structure
                    return <TableCell key={`body-${index}-${subIndex}`}>{text}</TableCell>
                  })
                ))
              }
            </TableRow>
          ))
        }
      </TableBody>
      </Table>
      </div>
      <Button onClick={() => exportTableToExcel(responses)}>Export to Excel</Button>
    </div>
    )
  );
}
