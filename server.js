const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

// DeepSeek API 配置
const DEEPSEEK_API_KEY = 'sk-1b10a0e8b6ad43708fa3dca610907f0e';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

// 处理聊天请求
app.post('/chat', async (req, res) => {
    try {
        const response = await fetch(DEEPSEEK_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    {
                        role: 'user',
                        content: req.body.message
                    }
                ]
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('服务器运行在 http://localhost:3000')); 