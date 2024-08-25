"use client"
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { TypographyH1,TypographyH2, TypographyLarge, TypographySmall, TypographyH3 } from "@/components/ui/typography";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { useOptions } from "@/hooks/useOptions";
import { sortData } from "@/utils/sortData";
import LoadingSpinner from "@/components/component/loading";


export default function Home() {
  const [error, setError] = useState({status: false, message: ""})
  const [status, setStatus] = useState("")
  const [questions, setQuestions] = useState([])
  const {optionsStore, setOptionsStore} = useOptions()
  const [questionIndex, setQuestionIndex] = useState(0)
  const [complete, setComplete] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const question = questions[questionIndex] || {}
  const defaultOption = optionsStore[questionIndex]?.option_text
  const [value, setValue] = useState(defaultOption || {})
  const handleNext = () => {
    if(questionIndex == questions.length - 1) {
      setOptionsStore(questionIndex, value)
      setModalOpen(true)
      return
    }
    setOptionsStore(questionIndex, value)
    setQuestionIndex(questionIndex + 1)
    setValue(optionsStore[questionIndex + 1] || "")
  }
  const handlePrev = () => {
    if(questionIndex === 0) return
    setQuestionIndex(questionIndex - 1)
    setValue(optionsStore[questionIndex - 1] || "")
  }
  const handleOptionSelect = (option) => {
    setValue({option_id: option.id, option_text: option.option_text, question_id: question.id})
  }
  const onSubmit = async() => {
    const sheetData = Object.keys(optionsStore).map(key => optionsStore[key].option_text);
    const dateNow = new Date()
    sheetData.unshift(dateNow.toLocaleString())

    const formData = Object.keys(optionsStore).map(key => {
      const dataCopy = {...optionsStore[key]}
      delete dataCopy.option_text
      return dataCopy
    }).filter(Boolean);
    setComplete(true)

    try{
      const {data: response} = await axios('/api/responses', {method: 'POST', data: {formData, sheetData}})
      if(response.error) throw(response.error)
    } catch (error) {
      setError({status: true, message: error.message})
      console.log(error)
    }
  }
  const fetchQuestion = async() => {
    setStatus("loading")
    try{
      const {data: response} = await axios('/api/questions')
      if(response.error) throw new Error(response.error)
      const sorted = sortData(response.data)
      setQuestions(sorted)
      setStatus("")
    } catch (error) {
      setError({status: true, message: error.message})
      console.log(error)
    }
  }

  useEffect(() => {
    fetchQuestion()
  }, [])

  if(status == "loading") {
    return (
      <LoadingSpinner />
    )
  }

  return (
    <main className="flex flex-col justify-center items-center sm:mt-3">
    {questions.length > 0 ? (
      <>
      <div className="text-center p-3 rounded-lg">
      <TypographyH1>Dinas Kesehatan Kota Banjarbaru</TypographyH1>
    </div>
    {error.status ? <TypographyLarge className="text-red-500">{error.message}</TypographyLarge> : null}
    {complete ? (
      <TypographyLarge className={"absolute top-1/2 translate-y-1/2"}>Terimakasih telah mengisi survey!</TypographyLarge>
    ) : (
      <Card className="w-full sm:w-96 mt-2 h-[32rem]">
        <CardHeader>
          <TypographyH3 className={"text-secondary-foreground"}>Survey Kepuasan Masyarakat</TypographyH3>
          <CardTitle className="text-md sm:text-lg text-slate-800">No. {questionIndex + 1}/{questions.length}</CardTitle>
          <CardDescription className="text-primary font-bold text-lg">{question.question_text}</CardDescription>
        </CardHeader>
        <CardContent>
        {question.selectable == false ? (
          <>
          <input
          type={question.type}
          max={question.type == "number" ? 100 : null}
          value={value.response_input || ""}
          onChange={(e) => {
            if(e.target.value > 100) {
              return
            }
            setValue({option_text: e.target.value, question_id: question.id, response_input: e.target.value})

          }}
          className="w-full border border-slate-700 outline-none p-2 rounded-lg"
          />
          {question.type == "number" ? <TypographySmall className="text-red-500">Input harus berupa angka dan kurang dari 100</TypographySmall> : null}
          </>
        ) : (
          <RadioGroup defaultValue={defaultOption}>
           {question.questions_options.map((option,index) => (
            <Label key={index} htmlFor={`r${question.id}${index}`}  
            className={`flex items-center space-x-2 text-primary w-full p-4 gap-3 cursor-pointer rounded-lg border bg-transparent ${value.option_text == option.option_text ? "bg-[#393E46] text-secondary border-transparent" : ""}`}
            onClick={() => handleOptionSelect(option)}>
              <RadioGroupItem value={option.option_text} id={`r${question.id}${index}`} checked={value.option_text == option.option_text}/>
              {option.option_text}
              </Label>
           ))}
          </RadioGroup>
      )}
      </CardContent>
        <CardFooter className="flex justify-between flex-wrap gap-3 items-center">
          <AlertDialog open={modalOpen} onOpenChange={setModalOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
                <AlertDialogDescription>
                  Pastikan anda mengisi semua pertanyaan
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={onSubmit}>Kirim</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    )}
    </>
    ) : null}
    <div className="flex justify-between w-full sm:w-96 mt-4">
        <Button onClick={handlePrev} disabled={questionIndex === 0} className="p-6">Sebelumnya</Button>
        <Button onClick={handleNext} disabled={value.option_text == "" || value.option_text == undefined} className="p-6">Selanjutnya</Button>
    </div>
    </main>
  );
}
