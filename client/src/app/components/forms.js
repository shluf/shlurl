'use client'

import { CheckCircle, SlashSquare } from "lucide-react"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


const InputURL = () => {
    const [status, setStatus] = useState('')
    const [url, setUrl] = useState('');
    const [customShortLink, setCustomShortLink] = useState('');

    const handleUrlChange = (e) => {
      setUrl(e.target.value);
    };

    const handleCustomShortLinkChange = (e) => {
        setCustomShortLink(e.target.value);
      };
  
    const handleShortenClick = async (e) => {
      e.preventDefault();
  
      const response = await fetch('http://localhost:8001/url/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            'url': url,
            'customUrl': customShortLink
        }),
      });
      
      if (response.ok) {
        setStatus('success')
        setTimeout(() => {
          setStatus('null');
          }, 3000);
      } else {
        setStatus('failed')
        setTimeout(() => {
          setStatus('null');
          }, 3000);
        console.error('Failed to shorten URL');
      }
    };
  
    const handlePaste = async () => {
        try {
          const text = await navigator.clipboard.readText();
          setUrl(text);
          console
        } catch (err) {
          console.error('Failed to read clipboard: ', err);
        }
      };

    
  return (
      <>
      {status === 'success' ? 
        <Alert className="fixed top-6 w-11/12 content-center">
          <CheckCircle className="h-4 w-4" />
              <AlertTitle>Berhasil</AlertTitle>
              <AlertDescription>
                  Short URL baru telah berhasil dibuat!
              </AlertDescription>
        </Alert> 
      : status === 'failed' ? 
        <Alert className="fixed top-6 w-11/12 content-center">
          <SlashSquare className="h-4 w-4" />
              <AlertTitle>Gagal</AlertTitle>
              <AlertDescription>
                  Masukan URL dengan format yang benar!
              </AlertDescription>
        </Alert> 
      : null }
      
      <div className="flex w-full justify-center py-10 items-end gap-2">
        <div className="flex flex-col">
          <Label htmlFor="url">URL</Label>
          <Input 
            type="text"
            id="url"
            placeholder="Masukan link url"
            value={url}
            onChange={handleUrlChange} 
          />
        </div>
        <div className="flex flex-col">
          <Label className htmlFor="customShortLink">Custom</Label>
          <Input
            type="text"
            id="customShortLink"
            placeholder="Kreasikan link anda (opsional)"
            value={customShortLink}
            onChange={handleCustomShortLinkChange}
            />
        </div>
        <Button type="submit" onClick={handleShortenClick}>Shorten</Button>
        <Button type="submit" onClick={handlePaste}>Paste</Button>
      </div>
    </>
  )
}

export default InputURL