"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Copy, Code2, Zap, Shield, Bug, Play } from "lucide-react"
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
    {
      name: "Auto Collect Items",
      description: "Automatically collects dropped items and resources with smart filtering",
      content: `-- Auto Collect Items v1.5
local Players = game:GetService("Players")
local Workspace = game:GetService("Workspace")
local RunService = game:GetService("RunService")

local player = Players.LocalPlayer
local collecting = false
local collectDistance = 50

local itemWhitelist = {
    "Gem", "Diamond", "Coin", "Block", "Seed"
}

function isItemWhitelisted(itemName)
    for _, whitelistedItem in pairs(itemWhitelist) do
        if string.find(itemName:lower(), whitelistedItem:lower()) then
            return true
        end
    end
    return false
end

function collectNearbyItems()
    if not player.Character or not player.Character:FindFirstChild("HumanoidRootPart") then
        return
    end
    
    local playerPosition = player.Character.HumanoidRootPart.Position
    
    for _, item in pairs(Workspace:GetChildren()) do
        if item:IsA("Part") and isItemWhitelisted(item.Name) then
            local distance = (item.Position - playerPosition).Magnitude
            
            if distance <= collectDistance then
                -- Teleport item to player
                item.CFrame = player.Character.HumanoidRootPart.CFrame
                print("📦 Collected: " .. item.Name)
                wait(0.1)
            end
        end
    end
end

function startAutoCollect()
    collecting = true
    print("🔄 Auto collect started")
    
    while collecting do
        collectNearbyItems()
        wait(1)
    end
end

function stopAutoCollect()
    collecting = false
    print("⏹️ Auto collect stopped")
end

-- Start auto collect
startAutoCollect()`,
      category: "gtps",
      difficulty: "Intermediate",
      tags: ["automation", "collection", "items"],
    },
    {
      name: "World Scanner",
      description: "Scans the world for valuable items and players with distance calculation",
      content: `-- World Scanner v2.0
local Players = game:GetService("Players")
local Workspace = game:GetService("Workspace")

local player = Players.LocalPlayer
local scanRadius = 100

function scanForPlayers()
    local nearbyPlayers = {}
    
    if not player.Character or not player.Character:FindFirstChild("HumanoidRootPart") then
        return nearbyPlayers
    end
    
    local playerPosition = player.Character.HumanoidRootPart.Position
    
    for _, otherPlayer in pairs(Players:GetPlayers()) do
        if otherPlayer ~= player and otherPlayer.Character and otherPlayer.Character:FindFirstChild("HumanoidRootPart") then
            local distance = (otherPlayer.Character.HumanoidRootPart.Position - playerPosition).Magnitude
            
            if distance <= scanRadius then
                table.insert(nearbyPlayers, {
                    name = otherPlayer.Name,
                    distance = math.floor(distance),
                    position = otherPlayer.Character.HumanoidRootPart.Position
                })
            end
        end
    end
    
    return nearbyPlayers
end

function scanForItems()
    local nearbyItems = {}
    
    if not player.Character or not player.Character:FindFirstChild("HumanoidRootPart") then
        return nearbyItems
    end
    
    local playerPosition = player.Character.HumanoidRootPart.Position
    
    for _, item in pairs(Workspace:GetChildren()) do
        if item:IsA("Part") and item.Name ~= "Baseplate" then
            local distance = (item.Position - playerPosition).Magnitude
            
            if distance <= scanRadius then
                table.insert(nearbyItems, {
                    name = item.Name,
                    distance = math.floor(distance),
                    position = item.Position
                })
            end
        end
    end
    
    return nearbyItems
end

function displayScanResults()
    local players = scanForPlayers()
    local items = scanForItems()
    
    print("🔍 === WORLD SCAN RESULTS ===")
    print("👥 Nearby Players (" .. #players .. "):")
    for _, playerData in pairs(players) do
        print("  • " .. playerData.name .. " - " .. playerData.distance .. " studs")
    end
    
    print("📦 Nearby Items (" .. #items .. "):")
    for _, itemData in pairs(items) do
        print("  • " .. itemData.name .. " - " .. itemData.distance .. " studs")
    end
    print("========================")
end

-- Run scan
displayScanResults()`,
      category: "gtps",
      difficulty: "Beginner",
      tags: ["scanner", "detection", "utility"],
    },
    {
      name: "Anti-AFK System",
      description: "Prevents AFK detection with random movements and actions",
      content: `-- Anti-AFK System v1.3
local Players = game:GetService("Players")
local UserInputService = game:GetService("UserInputService")
local RunService = game:GetService("RunService")

local player = Players.LocalPlayer
local antiAFK = true
local lastActionTime = tick()
local actionInterval = math.random(30, 60) -- Random interval between 30-60 seconds

function performRandomAction()
    if not player.Character or not player.Character:FindFirstChild("Humanoid") then
        return
    end
    
    local humanoid = player.Character.Humanoid
    local actions = {
        function() -- Random jump
            humanoid.Jump = true
            print("🦘 Anti-AFK: Jumped")
        end,
        function() -- Random movement
            local randomDirection = Vector3.new(
                math.random(-1, 1),
                0,
                math.random(-1, 1)
            ).Unit * 5
            
            humanoid:MoveTo(player.Character.HumanoidRootPart.Position + randomDirection)
            print("🚶 Anti-AFK: Moved randomly")
        end,
        function() -- Random rotation
            if player.Character:FindFirstChild("HumanoidRootPart") then
                player.Character.HumanoidRootPart.CFrame = player.Character.HumanoidRootPart.CFrame * CFrame.Angles(0, math.rad(math.random(-180, 180)), 0)
                print("🔄 Anti-AFK: Rotated")
            end
        end
    }
    
    -- Execute random action
    local randomAction = actions[math.random(1, #actions)]
    randomAction()
    
    lastActionTime = tick()
    actionInterval = math.random(30, 60) -- Set new random interval
end

function antiAFKLoop()
    while antiAFK do
        if tick() - lastActionTime >= actionInterval then
            performRandomAction()
        end
        wait(1)
    end
end

function stopAntiAFK()
    antiAFK = false
    print("⏹️ Anti-AFK stopped")
end

print("🛡️ Anti-AFK System started")
print("⏰ Action interval: " .. actionInterval .. " seconds")

-- Start anti-AFK
spawn(antiAFKLoop)`,
      category: "gtps",
      difficulty: "Intermediate",
      tags: ["anti-afk", "automation", "safety"],
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
    {
      name: "Jump Power Modifier",
      description: "Enhances jump power with smooth transitions and safety limits",
      content: `-- Jump Power Modifier v2.1
local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")

local player = Players.LocalPlayer
local defaultJumpPower = 50
local currentJumpPower = defaultJumpPower
local maxJumpPower = 200

function setJumpPower(newJumpPower, smooth)
    if not player.Character or not player.Character:FindFirstChild("Humanoid") then
        return false
    end
    
    local humanoid = player.Character.Humanoid
    newJumpPower = math.clamp(newJumpPower, 0, maxJumpPower)
    
    if smooth then
        local tweenInfo = TweenInfo.new(1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
        local tween = TweenService:Create(humanoid, tweenInfo, {JumpPower = newJumpPower})
        tween:Play()
        
        tween.Completed:Connect(function()
            currentJumpPower = newJumpPower
            print("🦘 Jump power smoothly set to: " .. currentJumpPower)
        end)
    else
        humanoid.JumpPower = newJumpPower
        currentJumpPower = newJumpPower
        print("🦘 Jump power set to: " .. currentJumpPower)
    end
    
    return true
end

function resetJumpPower()
    setJumpPower(defaultJumpPower, true)
    print("🔄 Jump power reset to default")
end

function superJump()
    setJumpPower(150, false)
    print("🚀 Super jump activated!")
end

function moonJump()
    setJumpPower(200, false)
    print("🌙 Moon jump activated!")
end

-- Example usage
print("🦘 Jump Power Modifier loaded")
print("Commands: superJump(), moonJump(), resetJumpPower()")
print("Current jump power: " .. currentJumpPower)`,
      category: "rgt",
      difficulty: "Beginner",
      tags: ["jump", "movement", "enhancement"],
    },
    {
      name: "Infinite Health",
      description: "Maintains maximum health with regeneration and damage immunity",
      content: `-- Infinite Health System v1.8
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

local player = Players.LocalPlayer
local infiniteHealth = false
local maxHealth = 100
local regenRate = 5 -- Health per second

function enableInfiniteHealth()
    infiniteHealth = true
    print("💚 Infinite health enabled")
    
    local connection
    connection = RunService.Heartbeat:Connect(function()
        if not infiniteHealth then
            connection:Disconnect()
            return
        end
        
        if player.Character and player.Character:FindFirstChild("Humanoid") then
            local humanoid = player.Character.Humanoid
            
            -- Set max health if needed
            if humanoid.MaxHealth ~= maxHealth then
                humanoid.MaxHealth = maxHealth
            end
            
            -- Maintain full health
            if humanoid.Health < maxHealth then
                humanoid.Health = maxHealth
            end
        end
    end)
end

function disableInfiniteHealth()
    infiniteHealth = false
    print("❤️ Infinite health disabled")
end

function setMaxHealth(newMaxHealth)
    maxHealth = math.max(1, newMaxHealth)
    
    if player.Character and player.Character:FindFirstChild("Humanoid") then
        local humanoid = player.Character.Humanoid
        humanoid.MaxHealth = maxHealth
        humanoid.Health = maxHealth
    end
    
    print("💪 Max health set to: " .. maxHealth)
end

function healToFull()
    if player.Character and player.Character:FindFirstChild("Humanoid") then
        local humanoid = player.Character.Humanoid
        humanoid.Health = humanoid.MaxHealth
        print("✨ Healed to full health")
    end
end

-- Auto-enable on character spawn
player.CharacterAdded:Connect(function(character)
    wait(1) -- Wait for character to fully load
    if infiniteHealth then
        print("🔄 Re-enabling infinite health for new character")
    end
end)

print("💚 Infinite Health System loaded")
print("Commands: enableInfiniteHealth(), disableInfiniteHealth(), healToFull()")`,
      category: "rgt",
      difficulty: "Advanced",
      tags: ["health", "immortality", "regeneration"],
    },
    {
      name: "Fly Mode",
      description: "Advanced flying system with speed control and smooth movement",
      content: `-- Fly Mode v3.2
local Players = game:GetService("Players")
local UserInputService = game:GetService("UserInputService")
local RunService = game:GetService("RunService")

local player = Players.LocalPlayer
local flying = false
local flySpeed = 50
local bodyVelocity = nil
local bodyAngularVelocity = nil

function createFlyObjects()
    if not player.Character or not player.Character:FindFirstChild("HumanoidRootPart") then
        return false
    end
    
    local hrp = player.Character.HumanoidRootPart
    
    -- Create BodyVelocity for movement
    bodyVelocity = Instance.new("BodyVelocity")
    bodyVelocity.MaxForce = Vector3.new(4000, 4000, 4000)
    bodyVelocity.Velocity = Vector3.new(0, 0, 0)
    bodyVelocity.Parent = hrp
    
    -- Create BodyAngularVelocity for rotation
    bodyAngularVelocity = Instance.new("BodyAngularVelocity")
    bodyAngularVelocity.MaxTorque = Vector3.new(0, math.huge, 0)
    bodyAngularVelocity.AngularVelocity = Vector3.new(0, 0, 0)
    bodyAngularVelocity.Parent = hrp
    
    return true
end

function destroyFlyObjects()
    if bodyVelocity then
        bodyVelocity:Destroy()
        bodyVelocity = nil
    end
    
    if bodyAngularVelocity then
        bodyAngularVelocity:Destroy()
        bodyAngularVelocity = nil
    end
end

function startFlying()
    if flying then return end
    
    if not createFlyObjects() then
        print("❌ Cannot start flying - character not ready")
        return
    end
    
    flying = true
    print("✈️ Flying enabled - Speed: " .. flySpeed)
    
    local connection
    connection = RunService.Heartbeat:Connect(function()
        if not flying then
            connection:Disconnect()
            return
        end
        
        if not player.Character or not player.Character:FindFirstChild("HumanoidRootPart") then
            stopFlying()
            return
        end
        
        local camera = workspace.CurrentCamera
        local moveVector = player.Character.Humanoid.MoveDirection
        local lookDirection = camera.CFrame.LookVector
        local rightDirection = camera.CFrame.RightVector
        
        local velocity = Vector3.new(0, 0, 0)
        
        -- Forward/Backward movement
        if moveVector.Magnitude > 0 then
            velocity = velocity + (lookDirection * moveVector.Z * flySpeed)
            velocity = velocity + (rightDirection * moveVector.X * flySpeed)
        end
        
        -- Up/Down movement
        if UserInputService:IsKeyDown(Enum.KeyCode.Space) then
            velocity = velocity + Vector3.new(0, flySpeed, 0)
        elseif UserInputService:IsKeyDown(Enum.KeyCode.LeftShift) then
            velocity = velocity + Vector3.new(0, -flySpeed, 0)
        end
        
        bodyVelocity.Velocity = velocity
    end)
end

function stopFlying()
    if not flying then return end
    
    flying = false
    destroyFlyObjects()
    print("🛬 Flying disabled")
end

function setFlySpeed(newSpeed)
    flySpeed = math.max(1, newSpeed)
    print("⚡ Fly speed set to: " .. flySpeed)
end

-- Toggle function
function toggleFly()
    if flying then
        stopFlying()
    else
        startFlying()
    end
end

print("✈️ Fly Mode loaded")
print("Commands: startFlying(), stopFlying(), toggleFly(), setFlySpeed(speed)")
print("Controls: WASD to move, Space to go up, Shift to go down")`,
      category: "rgt",
      difficulty: "Advanced",
      tags: ["flying", "movement", "controls"],
    },
    {
      name: "Noclip Mode",
      description: "Walk through walls and objects with collision detection toggle",
      content: `-- Noclip Mode v2.5
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

local player = Players.LocalPlayer
local noclipping = false
local originalCanCollide = {}

function setNoclip(enabled)
    if not player.Character then
        return false
    end
    
    noclipping = enabled
    
    for _, part in pairs(player.Character:GetDescendants()) do
        if part:IsA("BasePart") and part.Name ~= "HumanoidRootPart" then
            if enabled then
                -- Store original CanCollide state
                if originalCanCollide[part] == nil then
                    originalCanCollide[part] = part.CanCollide
                end
                part.CanCollide = false
            else
                -- Restore original CanCollide state
                if originalCanCollide[part] ~= nil then
                    part.CanCollide = originalCanCollide[part]
                end
            end
        end
    end
    
    if enabled then
        print("👻 Noclip enabled - You can walk through walls")
    else
        print("🚶 Noclip disabled - Normal collision restored")
    end
    
    return true
end

function enableNoclip()
    setNoclip(true)
end

function disableNoclip()
    setNoclip(false)
end

function toggleNoclip()
    setNoclip(not noclipping)
end

-- Auto-maintain noclip when enabled
local connection
connection = RunService.Stepped:Connect(function()
    if noclipping and player.Character then
        for _, part in pairs(player.Character:GetDescendants()) do
            if part:IsA("BasePart") and part.Name ~= "HumanoidRootPart" then
                part.CanCollide = false
            end
        end
    end
end)

-- Handle character respawn
player.CharacterAdded:Connect(function(character)
    originalCanCollide = {} -- Reset stored states
    wait(1) -- Wait for character to load
    
    if noclipping then
        print("🔄 Re-enabling noclip for new character")
        setNoclip(true)
    end
end)

print("👻 Noclip Mode loaded")
print("Commands: enableNoclip(), disableNoclip(), toggleNoclip()")
print("Status: " .. (noclipping and "Enabled" or "Disabled"))`,
      category: "rgt",
      difficulty: "Intermediate",
      tags: ["noclip", "collision", "movement"],
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
            <div className="flex items-center space-x-4 px-2">
              <Button variant="ghost" onClick={() => setCurrentPage("main")} className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Button>
            </div>

            <div className="text-center space-y-2 px-4">
              <h2 className="text-3xl font-bold text-slate-800">{currentCategory.toUpperCase()} Scripts</h2>
              <p className="text-slate-600">Professional scripts with advanced features and safety measures</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-2">
              {scripts[currentCategory]?.map((script, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer border hover:border-blue-200"
                  onClick={() => showScriptDetail(script)}
                >
                  <CardHeader className="p-4 md:p-6">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base md:text-lg group-hover:text-blue-600 transition-colors leading-tight">
                        {script.name}
                      </CardTitle>
                      <Badge className={`${getDifficultyColor(script.difficulty)} text-xs shrink-0`}>
                        {script.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">{script.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0">
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
            <div className="flex items-center space-x-4 px-2">
              <Button variant="ghost" onClick={() => setCurrentPage("list")} className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Scripts</span>
              </Button>
            </div>

            <div className="space-y-6 px-2">
              <div className="flex flex-col space-y-4">
                <div className="space-y-3">
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">{selectedScript.name}</h1>
                  <p className="text-slate-600 leading-relaxed">{selectedScript.description}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className={getDifficultyColor(selectedScript.difficulty)}>{selectedScript.difficulty}</Badge>
                    {selectedScript.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <Play className="h-4 w-4" />
                    <span>How To Use?</span>
                    <button
                      onClick={() => window.open("https://youtube.com/@yourchannel", "_blank")}
                      className="text-blue-600 hover:text-blue-800 font-medium underline transition-colors"
                    >
                      Watch
                    </button>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={copyScript}
                    className="flex items-center justify-center space-x-2 flex-1 sm:flex-none"
                  >
                    <Copy className="h-4 w-4" />
                    <span>Copy Script</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open("https://t.me/yourusername", "_blank")}
                    className="flex items-center justify-center space-x-2 flex-1 sm:flex-none"
                  >
                    <Bug className="h-4 w-4" />
                    <span>Report Bug</span>
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <pre className="bg-slate-900 text-slate-100 p-4 md:p-6 rounded-lg overflow-x-auto text-xs md:text-sm font-mono leading-relaxed">
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
