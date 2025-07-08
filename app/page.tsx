"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Copy, Code2, Zap, Shield } from "lucide-react"
import { toast } from "@/hooks/use-toast"

type Script = {
  name: string
  description: string
  content: string
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  tags: string[]
}

const scripts: Record<string, Script[]> = {
  gtps: [
    {
      name: "Auto Farm GTPS",
      description: "Automatically farms resources in GTPS with advanced detection and safety features",
      content: `-- Auto Farm GTPS Script v2.0
-- Advanced farming with safety checks
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

local player = Players.LocalPlayer
local farming = false

function autoFarm()
    farming = true
    while farming do
        -- Safety check
        if not player.Character then
            wait(1)
            continue
        end
        
        print("🌾 Farming resources...")
        -- Add your farming logic here
        wait(2)
    end
end

function stopFarm()
    farming = false
    print("⏹️ Farming stopped")
end

-- Start farming
autoFarm()`,
      category: "gtps",
      difficulty: "Intermediate",
      tags: ["automation", "farming", "safety"],
    },
    {
      name: "Teleport System",
      description: "Advanced teleportation system with saved locations and safety checks",
      content: `-- Advanced Teleport System
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

local player = Players.LocalPlayer
local savedLocations = {}

function teleport(position, smooth)
    if not player.Character or not player.Character:FindFirstChild("HumanoidRootPart") then
        return false
    end
    
    local hrp = player.Character.HumanoidRootPart
    
    if smooth then
        local tween = TweenService:Create(hrp, 
            TweenInfo.new(1, Enum.EasingStyle.Quad), 
            {CFrame = CFrame.new(position)}
        )
        tween:Play()
    else
        hrp.CFrame = CFrame.new(position)
    end
    
    print("✈️ Teleported to: " .. tostring(position))
    return true
end

-- Example usage
teleport(Vector3.new(0, 50, 0), true)`,
      category: "gtps",
      difficulty: "Advanced",
      tags: ["teleport", "movement", "smooth"],
    },
  ],
  rgt: [
    {
      name: "Speed Enhancement",
      description: "Professional speed modification with customizable settings and anti-detection",
      content: `-- Speed Enhancement System v3.0
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

local player = Players.LocalPlayer
local defaultSpeed = 16
local currentSpeed = defaultSpeed

function setSpeed(newSpeed)
    if not player.Character or not player.Character:FindFirstChild("Humanoid") then
        return false
    end
    
    local humanoid = player.Character.Humanoid
    currentSpeed = math.clamp(newSpeed, 0, 100)
    humanoid.WalkSpeed = currentSpeed
    
    print("🏃 Speed set to: " .. currentSpeed)
    return true
end

function resetSpeed()
    setSpeed(defaultSpeed)
    print("🔄 Speed reset to default")
end

-- Gradual speed increase (anti-detection)
function gradualSpeedIncrease(targetSpeed, duration)
    local startSpeed = currentSpeed
    local startTime = tick()
    
    local connection
    connection = RunService.Heartbeat:Connect(function()
        local elapsed = tick() - startTime
        local progress = math.min(elapsed / duration, 1)
        
        local newSpeed = startSpeed + (targetSpeed - startSpeed) * progress
        setSpeed(newSpeed)
        
        if progress >= 1 then
            connection:Disconnect()
        end
    end)
end

-- Example: Gradually increase to speed 25 over 3 seconds
gradualSpeedIncrease(25, 3)`,
      category: "rgt",
      difficulty: "Advanced",
      tags: ["speed", "anti-detection", "gradual"],
    },
    {
      name: "Auto Complete System",
      description: "Intelligent level completion with pattern recognition and timing optimization",
      content: `-- Auto Complete System v2.0
local Players = game:GetService("Players")
local Workspace = game:GetService("Workspace")

local player = Players.LocalPlayer
local completing = false

function findObjectives()
    local objectives = {}
    -- Add logic to find level objectives
    for _, obj in pairs(Workspace:GetDescendants()) do
        if obj.Name:match("Objective") or obj.Name:match("Goal") then
            table.insert(objectives, obj)
        end
    end
    return objectives
end

function autoComplete()
    completing = true
    print("🎯 Starting auto completion...")
    
    while completing do
        local objectives = findObjectives()
        
        if #objectives == 0 then
            print("✅ Level completed!")
            break
        end
        
        for _, objective in pairs(objectives) do
            if objective and objective.Parent then
                -- Simulate interaction
                print("🔄 Completing objective: " .. objective.Name)
                -- Add your completion logic here
                wait(0.5)
            end
        end
        
        wait(1)
    end
end

function stopCompletion()
    completing = false
    print("⏹️ Auto completion stopped")
end

-- Start auto completion
autoComplete()`,
      category: "rgt",
      difficulty: "Intermediate",
      tags: ["automation", "completion", "objectives"],
    },
  ],
}

type Page = "main" | "list" | "detail"

export default function HexaScript() {
  const [currentPage, setCurrentPage] = useState<Page>("main")
  const [currentCategory, setCurrentCategory] = useState<string>("")
  const [selectedScript, setSelectedScript] = useState<Script | null>(null)

  const showScriptList = (category: string) => {
    setCurrentCategory(category)
    setCurrentPage("list")
  }

  const showScriptDetail = (script: Script) => {
    setSelectedScript(script)
    setCurrentPage("detail")
  }

  const copyScript = async () => {
    if (!selectedScript) return

    try {
      await navigator.clipboard.writeText(selectedScript.content)
      toast({
        title: "Script Copied!",
        description: "The script has been copied to your clipboard.",
      })
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy script to clipboard.",
        variant: "destructive",
      })
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Main Page */}
        {currentPage === "main" && (
          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="p-3 bg-blue-600 rounded-xl">
                  <Code2 className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Hexa Script
                </h1>
              </div>
              <p className="text-xl text-slate-600 max-w-2xl">
                Professional script collection for game automation and enhancement. Choose your category to explore our
                curated scripts.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl">
              <Card
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-200"
                onClick={() => showScriptList("gtps")}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto p-3 bg-blue-100 rounded-full w-fit group-hover:bg-blue-200 transition-colors">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl">GTPS Scripts</CardTitle>
                  <CardDescription>
                    Advanced automation scripts for GTPS with safety features and optimization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center space-x-2">
                    <Badge variant="secondary">Farming</Badge>
                    <Badge variant="secondary">Teleport</Badge>
                    <Badge variant="secondary">Safety</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-purple-200"
                onClick={() => showScriptList("rgt")}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto p-3 bg-purple-100 rounded-full w-fit group-hover:bg-purple-200 transition-colors">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-2xl">RGT Scripts</CardTitle>
                  <CardDescription>
                    Professional enhancement scripts for RGT with anti-detection and smart features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center space-x-2">
                    <Badge variant="secondary">Speed</Badge>
                    <Badge variant="secondary">Auto Complete</Badge>
                    <Badge variant="secondary">Smart</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-sm text-slate-500 mt-8">
              All scripts are tested and optimized for performance and safety
            </div>
          </div>
        )}

        {/* Script List Page */}
        {currentPage === "list" && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => setCurrentPage("main")} className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Button>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-slate-800">{currentCategory.toUpperCase()} Scripts</h2>
              <p className="text-slate-600">Professional scripts with advanced features and safety measures</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scripts[currentCategory]?.map((script, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer border hover:border-blue-200"
                  onClick={() => showScriptDetail(script)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                        {script.name}
                      </CardTitle>
                      <Badge className={getDifficultyColor(script.difficulty)}>{script.difficulty}</Badge>
                    </div>
                    <CardDescription className="text-sm">{script.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1">
                      {script.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Script Detail Page */}
        {currentPage === "detail" && selectedScript && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => setCurrentPage("list")} className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Scripts</span>
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-slate-800">{selectedScript.name}</h1>
                  <p className="text-slate-600">{selectedScript.description}</p>
                  <div className="flex items-center space-x-2">
                    <Badge className={getDifficultyColor(selectedScript.difficulty)}>{selectedScript.difficulty}</Badge>
                    {selectedScript.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button onClick={copyScript} className="flex items-center space-x-2">
                  <Copy className="h-4 w-4" />
                  <span>Copy Script</span>
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  <pre className="bg-slate-900 text-slate-100 p-6 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
                    <code>{selectedScript.content}</code>
                  </pre>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="fixed bottom-4 right-4 text-sm text-slate-400 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
          By Hexa Script
        </div>
      </div>
    </div>
  )
}
