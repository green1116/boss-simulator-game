# 替换 App.jsx 文件内容
cat > src/App.jsx << "EOF"
import React, { useState } from 'react'
import './App.css'

function App() {
  const [satisfaction, setSatisfaction] = useState(0)
  const [round, setRound] = useState(1)
  const [currentScene, setCurrentScene] = useState('迟到风波')
  const [dialogue, setDialogue] = useState('约客户来公司开会，但你迟到了两小时...')

  const scenarios = [
    {
      title: '迟到风波',
      description: '约客户来公司开会，但你迟到了两小时...',
      options: [
        { text: '抱歉老板，路上堵车了', effect: -10 },
        { text: '客户临时改时间了', effect: -20 },
        { text: '我错了，马上准备会议材料', effect: +15 }
      ]
    },
    {
      title: '日报失踪', 
      description: '连续一周没有发日报，老板终于忍不住了...',
      options: [
        { text: '工作太忙忘了', effect: -15 },
        { text: '系统有问题发不出去', effect: -5 },
        { text: '马上补发并设置提醒', effect: +20 }
      ]
    }
  ]

  const handleChoice = (effect) => {
    setSatisfaction(prev => Math.max(0, Math.min(100, prev + effect)))
    setRound(prev => prev + 1)
    
    if (round < scenarios.length) {
      setCurrentScene(scenarios[round].title)
      setDialogue(scenarios[round].description)
    }
  }

  return (
    <div className="game-container">
      <header className="game-header">
        <h1>哄哄老板模拟器</h1>
        <p>职场演练安全空间：10轮对话挑战</p>
        <div className="stats">
          <span>满意度: {satisfaction}分</span>
          <span>第{round}轮</span>
        </div>
      </header>

      <main className="game-main">
        <div className="scene">
          <h2>{currentScene}</h2>
          <p>{dialogue}</p>
        </div>

        <div className="choices">
          {scenarios.find(s => s.title === currentScene)?.options.map((option, index) => (
            <button 
              key={index}
              className="choice-btn"
              onClick={() => handleChoice(option.effect)}
            >
              {option.text}
            </button>
          ))}
        </div>

        {satisfaction >= 100 && (
          <div className="victory">
            <h2>🎉 恭喜！你成功哄好老板！</h2>
            <p>职场生存技能 +100</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
EOF