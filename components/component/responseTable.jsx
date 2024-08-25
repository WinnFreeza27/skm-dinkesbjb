import { Calendar as CalendarIcon } from "lucide-react"
import { addDays, format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover,PopoverContent,PopoverTrigger } from "@/components/ui/popover"
import { useResponses } from "@/hooks/useResponses";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { useState, useMemo } from "react"
import { saveAs } from "file-saver"
import { TypographyLarge } from "../ui/typography";
import axios from "axios"
import { downloadBlob } from "@/utils/downloadBlob"

export function ResponseTable() {
  const [status , setStatus] = useState("")
  const { responses } = useResponses();
  const [date, setDate] = useState({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  const headId = responses?.length > 0 ? Object.keys(responses[0])[0] : null;
  const tableHead = headId ? responses[0][headId] : null;

  const filteredData = useMemo(() => {
    if (!date?.from && !date?.to) return true;

    return responses?.filter((item) => {
      const responseId = Object.keys(item);
      const createdAt = new Date(item[responseId][0].responses.created_at);

      // Reset the time part of the dates to midnight
      const createdAtDateOnly = new Date(createdAt.getFullYear(), createdAt.getMonth(), createdAt.getDate());
      const fromDate = new Date(date.from.getFullYear(), date.from.getMonth(), date.from.getDate());
      const toDate = date.to
        ? new Date(date.to.getFullYear(), date.to.getMonth(), date.to.getDate())
        : fromDate;
      return createdAtDateOnly >= fromDate && createdAtDateOnly <= toDate;
    });
  }, [responses, date]);

  const handleExport = async () => {
    try {
        setStatus("loading");

        const response = await axios.post("/api/download", { responses: filteredData, date }, {
            responseType: 'blob'
        });

        downloadBlob(response.data, `responses-${format(new Date(), "dd-MM-yyyy")}.xlsx`);
        setStatus("success");
    } catch (error) {
        console.error("Error:", error);
        setStatus("error");
    }
};

  return (
    <div className="flex flex-col max-h-[800px] w-full justify-center gap-4">
    <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] text-left mx-auto my-4 font-normal",
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
      {filteredData && filteredData.length > 0 ? (
        <>
        <div className="flex-grow overflow-auto rounded-md border mx-2">
        <div className="min-w-[800px]">
          <Table>
            <TableHeader>
            <TableRow>
            <TableHead className="font-medium border">No</TableHead>
            <TableHead className="font-medium border">Tanggal</TableHead>
                {
                    tableHead.map((item, index) => (
                      <TableHead key={index} className="font-medium border">U{index + 1}</TableHead>
                    ))
                }
            </TableRow>
            </TableHeader>
            <TableBody>
              {
                filteredData.map((response, index) => {
                  const responseId = Object.keys(response);
                  const createdAt = response[responseId][0].responses.created_at
                  return (
                    <TableRow key={index}>
                      <TableCell className="border">{index + 1}</TableCell>
                      <TableCell className="border">
                        {format(new Date(createdAt), "dd MMM yyyy")}
                      </TableCell>

                      {response[responseId].map((item) => {

                          const text = item.responses.value.option_text;
                          return (
                            <TableCell className="border" key={`body-${Math.floor(Math.random() * 10000)} with-${index}`}>
                              {text}
                            </TableCell>
                          );
                        })
                      }
                    </TableRow>
                  );
                })
              }
            </TableBody>

          </Table>
        </div>
      </div>
      <Button onClick={() => handleExport()} disabled={status === "loading"} className="w-max mx-auto">{status === "loading" ? "Loading..." : "Export to Excel" }</Button>
      </>
      ) : (
        <TypographyLarge className="text-red-500 mx-auto">Tidak ada data ditemukan pada periode yang dipilih.</TypographyLarge>
      )}
      </div>
  )
}
