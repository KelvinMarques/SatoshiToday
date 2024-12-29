'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Component() {
  const [currency, setCurrency] = useState('usd')
  const [amount, setAmount] = useState('')
  const [satoshis, setSatoshis] = useState('')
  const [bitcoinPrice, setBitcoinPrice] = useState('100000000.00')

  useEffect(() => {
    handleSimulate()
  }, [amount, bitcoinPrice])

  const handleSimulate = () => {
    if (amount && bitcoinPrice) {
      const btcAmount = parseFloat(amount) / parseFloat(bitcoinPrice)
      const sats = btcAmount * 100000000
      setSatoshis(sats.toFixed(2))
    } else {
      setSatoshis('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">
              Satoshi <span className="text-orange-500">Today</span>
            </h1>
          </div>
          <nav className="flex items-center gap-6">
            <a className="text-sm font-medium" href="#what-is-sats">
              What is Sats?
            </a>
            <a className="text-sm font-medium" href="#news">
              News
            </a>
          </nav>
        </div>
      </header>
      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 md:grid-cols-2 md:py-12">
        <div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Simulation cotation in sats
          </h2>
        </div>
        <Card className="bg-yellow-400 p-6">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="w-24 bg-zinc-900 text-white">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                    <SelectItem value="gbp">GBP</SelectItem>
                  </SelectContent>
                </Select>
                <Input 
                  className="text-xl font-bold" 
                  placeholder="00,00" 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="text-center font-medium">to</div>
              <div className="flex items-center gap-2">
                <Label className="w-24 text-yellow-700">Satoshi $</Label>
                <Input className="text-xl font-bold" placeholder="00,00" readOnly value={satoshis} type="number" />
              </div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-lg">Bitcoin cotation (today)</div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold">{currency.toUpperCase()}</span>
                <Input 
                  className="w-48 text-2xl font-bold" 
                  type="number" 
                  value={bitcoinPrice}
                  onChange={(e) => setBitcoinPrice(e.target.value)}
                />
              </div>
            </div>
            <Button className="w-full bg-white text-black hover:bg-gray-100" size="lg" onClick={handleSimulate}>
              Simulate
            </Button>
            <div className="mt-4 rounded-lg bg-gray-200 p-20 text-center text-gray-500">AD</div>
          </div>
        </Card>
      </main>
      <footer className="mt-8 border-t bg-white">
        <div className="mx-auto flex max-w-6xl justify-center py-8">
          <a className="text-sm font-medium" href="#what-is-sats">
            What is Sats?
          </a>
        </div>
      </footer>
    </div>
  )
}