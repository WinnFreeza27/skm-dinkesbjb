"use client"

import { useEffect, useState } from "react";
import { ResponseTable } from "@/components/component/responseTable";
import axios from "axios";
import { mergeData } from "@/utils/mergeData";
import { useResponses } from "@/hooks/useResponses";


export default function Responses() {
    const {setResponses} = useResponses()

    useEffect(() => {
        const fetchResponses = async() => {
            try{
              const {data: response} = await axios('http://localhost:3000/api/responses',{ headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
              }
             
            })
            console.log(response)
              if(response.error) throw new Error(response.error)
              const merge = mergeData(response.data)
              const transformedData = Object.keys(merge.response_id).map(key => ({
                [key]: merge.response_id[key]
                }));
                setResponses(transformedData)
            } catch (error) {
              console.log(error)
            }
          }

        fetchResponses()
    }, [])

    return (
        <div>
            <ResponseTable/>
        </div>
    )
}