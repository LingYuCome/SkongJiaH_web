/**
 * 智能家居官网后端服务器
 * 提供AI对话功能，集成DeepSeek API
 */

// 引入必要的依赖包
const express = require('express'); // Web服务框架
const fetch = require('node-fetch'); // 用于发送HTTP请求
const app = express(); // 创建Express应用实例

// 配置中间件，解析JSON请求体
app.use(express.json());

/**
 * DeepSeek API 配置
 * 用于AI对话功能的API密钥和接口地址
 * 注意：在生产环境中，API密钥应存储在环境变量中，而不是硬编码在代码中
 */
const DEEPSEEK_API_KEY = 'sk-1b10a0e8b6ad43708fa3dca610907f0e';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

/**
 * 处理聊天请求的路由
 * 接收用户消息，转发给DeepSeek API，并返回AI回复
 */
app.post('/chat', async (req, res) => {
    try {
        // 调用DeepSeek API
        const response = await fetch(DEEPSEEK_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'deepseek-chat', // 使用的AI模型
                messages: [
                    {
                        role: 'user',
                        content: req.body.message // 用户发送的消息
                    }
                ]
            })
        });

        // 解析API响应并返回给客户端
        const data = await response.json();
        res.json(data);
    } catch (error) {
        // 错误处理
        res.status(500).json({ error: error.message });
    }
});

// 启动服务器，监听3000端口
app.listen(3000, () => console.log('服务器运行在 http://localhost:3000'));