import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Edit, Trash2, BarChart2 } from "lucide-react"

// Mock data for surveys
const surveys = [
  { id: 1, title: "Customer Satisfaction Survey", description: "Gather feedback on our latest product release", status: "Active", responses: 150 },
  { id: 2, title: "Employee Engagement Survey", description: "Annual survey to measure employee satisfaction", status: "Draft", responses: 0 },
  { id: 3, title: "Market Research Survey", description: "Understand market trends and consumer preferences", status: "Completed", responses: 500 },
]

export default function SurveyManager() {
  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">Survey Manager</h1>
        <Button className="w-full sm:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Survey
        </Button>
      </div>
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {surveys.map((survey) => (
          <Card key={survey.id} className="flex flex-col">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                <CardTitle className="text-lg sm:text-xl">{survey.title}</CardTitle>
                <Badge 
                  variant={survey.status === "Active" ? "default" : survey.status === "Draft" ? "secondary" : "outline"}
                  className="text-xs sm:text-sm"
                >
                  {survey.status}
                </Badge>
              </div>
              <CardDescription className="text-sm mt-2">{survey.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Responses: {survey.responses}</p>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2 mt-auto">
              <Button variant="outline" size="sm" className="flex-1">
                <Edit className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <BarChart2 className="mr-2 h-4 w-4" /> Results
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}