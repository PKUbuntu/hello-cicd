# Hello CI/CD

CI/CD 实验项目，用于测试 GitHub Actions 和 Gitea Actions。

## 项目结构

```
hello-cicd/
├── src/
│   ├── index.js        # HTTP 服务
│   └── index.test.js   # 单元测试
├── .gitea/workflows/
│   └── ci.yml          # CI 工作流
├── package.json
└── README.md
```

## 本地开发

```bash
# 安装依赖
npm install

# 运行服务
npm start

# 运行测试
npm test

# 代码检查
npm run lint
```

## CI/CD 流程

| Stage | 描述 |
|-------|------|
| Lint | ESLint 代码检查 |
| Test | Jest 单元测试 |
| Build | 验证服务启动 |

## API

| 端点 | 描述 |
|------|------|
| `GET /` | 返回 Hello World |
| `GET /health` | 健康检查 |