import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { useStrategyStore } from '@/store/strategyStore'
import { INDICATOR_TYPES } from '@/constants'
import { useNavigate } from 'react-router-dom'

export function StrategyBuilder() {
  const navigate = useNavigate()
  const saveStrategy = useStrategyStore((state) => state.saveStrategy)
  
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [indicators, setIndicators] = useState<{ type: string; params: string }[]>([])
  const [buyConditions, setBuyConditions] = useState<string[]>([''])
  const [sellConditions, setSellConditions] = useState<string[]>([''])
  const [stopLoss, setStopLoss] = useState('2')
  const [takeProfit, setTakeProfit] = useState('5')
  const [trailingStop, setTrailingStop] = useState('1.5')

  const addIndicator = () => {
    setIndicators([...indicators, { type: 'ma', params: '14' }])
  }

  const removeIndicator = (index: number) => {
    setIndicators(indicators.filter((_, i) => i !== index))
  }

  const updateIndicator = (index: number, field: 'type' | 'params', value: string) => {
    const updated = [...indicators]
    updated[index] = { ...updated[index], [field]: value }
    setIndicators(updated)
  }

  const addCondition = (type: 'buy' | 'sell') => {
    if (type === 'buy') {
      setBuyConditions([...buyConditions, ''])
    } else {
      setSellConditions([...sellConditions, ''])
    }
  }

  const updateCondition = (type: 'buy' | 'sell', index: number, value: string) => {
    if (type === 'buy') {
      const updated = [...buyConditions]
      updated[index] = value
      setBuyConditions(updated)
    } else {
      const updated = [...sellConditions]
      updated[index] = value
      setSellConditions(updated)
    }
  }

  const handleSave = () => {
    const formattedIndicators = indicators.map((ind, idx) => ({
      id: `ind${idx}`,
      name: INDICATOR_TYPES.find((t) => t.id === ind.type)?.name || '',
      type: ind.type as any,
      params: { period: parseInt(ind.params) || 14 },
    }))

    saveStrategy({
      name,
      description,
      createdBy: 'Current User',
      indicators: formattedIndicators,
      buyConditions: buyConditions.filter((c) => c.trim()),
      sellConditions: sellConditions.filter((c) => c.trim()),
      stopLoss: parseFloat(stopLoss),
      takeProfit: parseFloat(takeProfit),
      trailingStop: parseFloat(trailingStop),
      winRate: 0,
      monthlyReturn: 0,
      maxDrawdown: 0,
    })

    alert('Strategy saved successfully!')
    navigate('/marketplace')
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Strategy Builder</h1>
          <p className="mt-2 text-muted-foreground">
            Create custom algorithmic trading strategies
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Strategy Details</CardTitle>
              <CardDescription>Basic information about your strategy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Strategy Name</Label>
                <Input
                  id="name"
                  placeholder="My RSI Strategy"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Brief description of your strategy"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Risk Management</CardTitle>
              <CardDescription>Configure stop loss and take profit levels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="stopLoss">Stop Loss (%)</Label>
                <Input
                  id="stopLoss"
                  type="number"
                  step="0.1"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="takeProfit">Take Profit (%)</Label>
                <Input
                  id="takeProfit"
                  type="number"
                  step="0.1"
                  value={takeProfit}
                  onChange={(e) => setTakeProfit(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="trailingStop">Trailing Stop (%)</Label>
                <Input
                  id="trailingStop"
                  type="number"
                  step="0.1"
                  value={trailingStop}
                  onChange={(e) => setTrailingStop(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Technical Indicators</CardTitle>
                <CardDescription>Add indicators to analyze market conditions</CardDescription>
              </div>
              <Button onClick={addIndicator} size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Indicator
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {indicators.map((indicator, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-1">
                    <Select
                      value={indicator.type}
                      onChange={(e) => updateIndicator(index, 'type', e.target.value)}
                    >
                      {INDICATOR_TYPES.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <div className="w-32">
                    <Input
                      placeholder="Period"
                      value={indicator.params}
                      onChange={(e) => updateIndicator(index, 'params', e.target.value)}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeIndicator(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {indicators.length === 0 && (
                <p className="text-center text-sm text-muted-foreground">
                  No indicators added yet. Click "Add Indicator" to get started.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Buy Conditions</CardTitle>
                  <CardDescription>Define when to enter a position</CardDescription>
                </div>
                <Button onClick={() => addCondition('buy')} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {buyConditions.map((condition, index) => (
                  <Input
                    key={index}
                    placeholder="e.g., RSI < 30"
                    value={condition}
                    onChange={(e) => updateCondition('buy', index, e.target.value)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Sell Conditions</CardTitle>
                  <CardDescription>Define when to exit a position</CardDescription>
                </div>
                <Button onClick={() => addCondition('sell')} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sellConditions.map((condition, index) => (
                  <Input
                    key={index}
                    placeholder="e.g., RSI > 70"
                    value={condition}
                    onChange={(e) => updateCondition('sell', index, e.target.value)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => navigate('/marketplace')}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!name || indicators.length === 0}>
            Save Strategy
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
