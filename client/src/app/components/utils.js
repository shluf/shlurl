'use client'

import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RefreshCcw, Trash } from 'lucide-react';


const DataURLTable = () => {
    const [dataURL, setDataURL] = useState([]);
    const [deleted, setDeleted] = useState(false);

    const fetchURLData = async () => {
      try {
        const response = await fetch(`${process.env.SERVER_PATH}url/data`);
        const data = await response.json();
        setDataURL(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching GeoJSON data:", error);
      }
    };
    
    useEffect(() => {
      fetchURLData();
    }, []);

    const refreshData = async () => {
      fetchURLData();
    };

    const deleteData = async (dataId) => {
      try {
        const res = await fetch(`${process.env.SERVER_PATH}url/${dataId}`, {
          method: 'DELETE',
        });
  
        if (res.ok) {
          setDeleted(true)
          fetchURLData();
          setTimeout(() => {
            setDeleted(false);
          }, 3000);
        }
      } catch (error) {
        console.error('Gagal menghapus misi:', error);
      }
    };

    let totalVisits = 0;
    dataURL.forEach((dataEntry) => {
        totalVisits += dataEntry.visitHistory.length;
      });

  return (
    <>
      {deleted ? 
        <Alert className="fixed top-6 w-11/12 content-center">
          <Trash className="h-4 w-4" />
              <AlertTitle>Berhasil</AlertTitle>
              <AlertDescription>
                  Data short URL baru telah dihapus!
              </AlertDescription>
        </Alert> 
      : null }

      <div className='flex flex-col justify-center mx-6'>
      <div className='flex items-center justify-start mb-4'>
        <h2 className="scroll-m-20 text-xl font-semibold tracking-tight mx-6">Analyze your URL</h2>
        <Button className='py-4' onClick={() => refreshData()}>
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>

        <Table>
          <TableCaption>A list of your recent shorted url.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Delete</TableHead>
              <TableHead>ShortId</TableHead>
              <TableHead>Url</TableHead>
              <TableHead>Shorted Url</TableHead>
              <TableHead>Visit</TableHead>
              <TableHead className="text-right">Date Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataURL.map((data) => (
              <TableRow key={data._id}>
                <Button className='m-3' onClick={() => deleteData(data._id)}>
                  <Trash className="h-4 w-4" />
                </Button>
                <TableCell className="font-medium">{data.shortId}</TableCell>
                <TableCell>{data.redirectURL}</TableCell>
                <TableCell>{data.shortURL}</TableCell>
                <TableCell className="text-right">{data.visitHistory.length}</TableCell>
                <TableCell className="text-right">{data.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total Visit</TableCell>
              <TableCell className="text-right">{totalVisits}</TableCell>
              <TableCell className="text-right">{Date.now()}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  )
}

export default DataURLTable

