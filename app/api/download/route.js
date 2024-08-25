import { NextResponse } from "next/server";
import { exportTableToExcel } from "@/utils/exportToExcel";

export async function POST(req) {
    try {
        const { responses, date } = await req.json();
        const data = await exportTableToExcel(responses, date);
        
        return new NextResponse(data, {
            headers: {
                "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "Content-Disposition": `attachment; filename=export-${date}.xlsx`,
            },
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.error();
    }
}
