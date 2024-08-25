"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Cell, PieChart, Pie } from 'recharts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ArrowUpIcon, ArrowDownIcon, BarChart2 } from "lucide-react"

// Mock data for the survey statistics
const surveyData = {
  id: 1,
  title: "Customer Satisfaction Survey",
  description: "Results from our latest product release feedback",
  totalResponses: 500,
  completionRate: 85,
  todayResponses: 72,
  yesterdayResponses: 65,
  averageRating: 4.2,
  sentimentAnalysis: {
    positive: 60,
    neutral: 30,
    negative: 10,
  },
  questionData: [
    { 
      id: 1,
      question: "How satisfied are you with our product?", 
      data: [
        { value: 1, count: 10, name: "Very Dissatisfied" },
        { value: 2, count: 40, name: "Dissatisfied" },
        { value: 3, count: 100, name: "Neutral" },
        { value: 4, count: 150, name: "Satisfied" },
        { value: 5, count: 200, name: "Very Satisfied" },
      ]
    },
    { 
      id: 2,
      question: "How likely are you to recommend our product?", 
      data: [
        { value: 1, count: 20, name: "Not at all likely" },
        { value: 2, count: 50, name: "Slightly likely" },
        { value: 3, count: 130, name: "Moderately likely" },
        { value: 4, count: 180, name: "Very likely" },
        { value: 5, count: 120, name: "Extremely likely" },
      ]
    },
    // Add more questions here...
  ],
}

const COLORS = ['#FF8042', '#FFBB28', '#00C49F', '#0088FE', '#8884D8']
const SENTIMENT_COLORS = {
  positive: '#4CAF50',
  neutral: '#FFC107',
  negative: '#F44336'
}

export default function Component() {
  const [selectedQuestion, setSelectedQuestion] = useState(surveyData.questionData[0].id)

  const CustomBarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow">
          <p className="font-bold">{`${data.name} (${data.value})`}</p>
          <p>{`Count: ${data.count}`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow">
          <p className="font-bold">{`${data.name}: ${data.value}%`}</p>
        </div>
      );
    }
    return null;
  };

  const responseDifference = surveyData.todayResponses - surveyData.yesterdayResponses;
  const responsePercentChange = ((responseDifference / surveyData.yesterdayResponses) * 100).toFixed(1);

  const selectedQuestionData = surveyData.questionData.find(q => q.id === selectedQuestion);

  const sentimentData = Object.entries(surveyData.sentimentAnalysis).map(([name, value]) => ({ name, value }));

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">{surveyData.title}</h1>
      <p className="text-muted-foreground mb-6">{surveyData.description}</p>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{surveyData.totalResponses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{surveyData.completionRate}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{surveyData.todayResponses}</div>
            <p className="text-xs text-muted-foreground">
              {responseDifference > 0 ? (
                <span className="text-green-600 flex items-center">
                  <ArrowUpIcon className="w-4 h-4 mr-1" />
                  {responsePercentChange}% from yesterday
                </span>
              ) : (
                <span className="text-red-600 flex items-center">
                  <ArrowDownIcon className="w-4 h-4 mr-1" />
                  {Math.abs(responsePercentChange)}% from yesterday
                </span>
              )}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{surveyData.averageRating.toFixed(1)}/5.0</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Question Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Select onValueChange={(value) => setSelectedQuestion(Number(value))} defaultValue={selectedQuestion.toString()}>
              <SelectTrigger className="w-full mb-4">
                <SelectValue placeholder="Select a question" />
              </SelectTrigger>
              <SelectContent>
                {surveyData.questionData.map((q) => (
                  <SelectItem key={q.id} value={q.id.toString()}>{q.question}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedQuestionData && (
              <div>
                <h3 className="font-semibold mb-2">{selectedQuestionData.question}</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={selectedQuestionData.data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="value" />
                    <YAxis />
                    <Tooltip content={<CustomBarTooltip />} />
                    <Bar dataKey="count">
                      {selectedQuestionData.data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Sentiment Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button size="lg">
          <BarChart2 className="mr-2 h-5 w-5" />
          View Responses Detail
        </Button>
      </div>
    </div>
  )
}