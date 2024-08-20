"use client"

import { useEffect, useState } from "react";
import { ResponseTable } from "@/components/component/responseTable";
import axios from "axios";
import { mergeData } from "@/utils/mergeData";
import { useResponses } from "@/hooks/useResponses";
import { useSessionStore } from "@/hooks/useSessionStore";
import ButtonLogin from "@/components/component/buttonLogin";
import supabase from "@/utils/supabaseClient";  
import { Button } from "@/components/ui/button";


export default function Responses() {
    const {isAuthenticated} = useSessionStore()
    const [status, setStatus] = useState("")
    const {setResponses} = useResponses()

    useEffect(() => {
        const fetchResponses = async() => {
            setStatus("loading")
            try{
              const {data: response} = await axios('http://localhost:3000/api/responses',{ headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
              }
            })

              if(response.error) throw new Error(response.error)
              const merge = mergeData(response.data)
              const transformedData = Object.keys(merge.response_id).map(key => ({
                [key]: merge.response_id[key]
                }));
                setResponses(transformedData)
                setStatus("success")
            } catch (error) {
              console.log(error)
              setStatus("error")
            }
          }
        fetchResponses()
    }, [])

    return (
      <div className="mx-auto flex flex-col justify-center items-center mt-4">
      <Button onClick={() => supabase.auth.signOut()}>Test Logout</Button>
      {isAuthenticated ? (
        <>
        <h1 className="text-2xl font-bold mb-4">Responses</h1>
        { status === "success" ? <ResponseTable /> : status === "error" ? <p className="text-red-500">Error: {status}</p> : <p className="font-bold">Loading...</p> }
        </>
      ) : (
        <>
        <p className="font-bold">Tolong login terlebih dahulu untuk melihat data respondent</p>
        <ButtonLogin /> 
        </>
      )}
      </div>
    )
}