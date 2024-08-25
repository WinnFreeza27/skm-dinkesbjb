"use client"

import { useEffect, useState } from "react";
import { ResponseTable } from "@/components/component/responseTable";
import axios from "axios";
import { mergeData } from "@/utils/mergeData";
import { useResponses } from "@/hooks/useResponses";
import { useSessionStore } from "@/hooks/useSessionStore";
import ButtonLogin from "@/components/component/buttonLogin";
import LoadingSpinner from "@/components/component/loading";


export default function Responses() {
    const {isAuthenticated} = useSessionStore()
    const [status, setStatus] = useState("loading")
    const {setResponses} = useResponses()

    useEffect(() => {
        const fetchResponses = async() => {
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
                setStatus("")
            } catch (error) {
              console.log(error)
              setStatus("error")
            }
          }
        fetchResponses()
    }, [])

    console.log(status)

    return (
      <div className="mx-auto flex flex-col justify-center items-center mt-4">
        {isAuthenticated && status == "" ? (
          <>
            <h1 className="text-2xl font-bold mb-4">Responses</h1>
            <ResponseTable />
          </>
        ) : (
          <>
            {status === "loading" ? (
              <LoadingSpinner />
            ) : (
              <>
                <p className="font-bold">
                  Tolong login terlebih dahulu untuk melihat data respondent
                </p>
                <ButtonLogin />
              </>
            )}
          </>
        )}
      </div>
    );
    
}