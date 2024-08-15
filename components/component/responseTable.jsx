import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover,PopoverContent,PopoverTrigger } from "@/components/ui/popover"
import { useResponses } from "@/hooks/useResponses";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import React from "react";
import { exportTableToExcel } from "@/utils/exportToExcel";

export function ResponseTable() {
  const {responses} = useResponses()
    const [date, setDate] = ({
      from: addDays(new Date(), -30),
      to: new Date(),
    })
  if(!responses || responses.length === 0) return null
  const headId = Object.keys(responses[0])[0]
  console.log(responses[0])
  const tableHead = responses[0][headId]

  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      if (!date?.from || !date?.to) return true
      return item.dateJoined >= date.from && item.dateJoined <= date.to
    })
  }, [responses, date])

  console.log(filteredData)

  return (
    <div className="flex flex-col max-h-[800px] w-full justify-center gap-4">
    <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <div className="flex-grow overflow-auto rounded-md border">
        <div className="min-w-[800px]">
          <Table>
            <TableHeader>
            <TableRow>
            <TableHead className="font-medium border">No</TableHead>
                {
                    tableHead.map((item, index) => (
                      <TableHead key={index} className="font-medium border">U{index + 1}</TableHead>
                    ))
                }
            </TableRow>
            </TableHeader>
            <TableBody>
            {
              responses.map((response, index) => (
                <TableRow key={index}>
                  <TableCell className="border">{index + 1}</TableCell>
                  {
                    Object.keys(response).map((key) => (
                      response[key].map((item, subIndex) => {
                        const text = item.responses.value.option_text; // Adjust this based on your actual data structure
                        return <TableCell className="border" key={`body-${index}-${subIndex}`}>{text}</TableCell>
                      })
                    ))
                  }
                </TableRow>
              ))
            }
          </TableBody>
          </Table>
        </div>
      </div>
      <Button onClick={() => exportTableToExcel(responses)} className="w-max mx-auto">Export to Excel</Button>
    </div>
  )
}
