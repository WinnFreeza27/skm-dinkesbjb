"use client"

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
import { TypographyH1,TypographyH2, TypographyLarge } from "@/components/ui/typography";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { useOptions } from "@/hooks/useOptions";
import { insertData } from "@/lib/insertData";
import { getData } from "@/lib/getData";
import { getQuestion } from "@/lib/getQuestion";
import questionx from "./question";


export default function Home() {
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
    const formData = Object.keys(optionsStore).map(key => {
      delete optionsStore[key].option_text
      return optionsStore[key]
    }).filter(Boolean);

    try{
      const data = await insertData(formData)
    } catch (error) {
      console.log(error)
    }
    setComplete(true)
  }
  const fetchQuestion = async() => {
    try{
      const data = await getQuestion()
      setQuestions(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getResponse = async() => {
    try{
      const data = await getData()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchQuestion()
  }, [])

  return (
    <main className="flex flex-col justify-center items-center sm:mt-3">
    {questions.length > 0 ? (
      <>
      <div className="text-center bg-secondary p-3 rounded-lg">
      <TypographyH1>Dinas Kesehatan Kota Banjarbaru</TypographyH1>
      <TypographyH2 className={"text-secondary-foreground"}>Survey Kepuasan Masyarakat</TypographyH2>
    </div>
    {complete ? (
      <TypographyLarge className={"absolute top-1/2 translate-y-1/2"}>Terimakasih telah mengisi survey!</TypographyLarge>
    ) : (
      <Card className="w-full sm:w-96 mt-2">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">No. {questionIndex + 1}/{questions.length}</CardTitle>
          <CardDescription>{question.question_text}</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue={defaultOption}>
           {question.questions_options.map((option,index) => (
            <Label key={index} htmlFor={`r${question.id}${index}`}  
            className="flex items-center space-x-2 bg-secondary text-primary w-full p-3 gap-3 cursor-pointer" 
            onClick={() => handleOptionSelect(option)}>
              <RadioGroupItem value={option.option_text} id={`r${question.id}${index}`} checked={value.option_text == option.option_text}/>
              {option.option_text}
              </Label>
           ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between flex-wrap gap-3 items-center">
          <Button onClick={handlePrev} disabled={questionIndex === 0}>Sebelumnya</Button>
          <Button onClick={handleNext} disabled={value == ""}>Selanjutnya</Button>
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
    </main>
  );
}
