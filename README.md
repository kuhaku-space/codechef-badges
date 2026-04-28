# CodeChef Badges

Generate dynamic CodeChef rating badges for your GitHub README.

## 🚀 Features

- **Dynamic Ratings**: Fetches real-time rating data from CodeChef.
- **Shields.io Compatible**: Fully compatible with [Shields.io](https://shields.io/) endpoint for customizable badges.
- **Badge Generator UI**: A simple homepage to easily generate your badge code.
- **Vercel Ready**: Built with Next.js, ready to deploy 0n Vercel.

## 🛠 Usage

### 1. Badge Generator (Recommended)
Visit the homepage of your deployed application (e.g., `https://your-app.vercel.app`) to generate your badge interactively.

### 2. Manual Usage (Markdown)
You can manually create a badge using the following pattern. Replace `YOUR_VERCEL_DOMAIN` and `USERNAME` with your details.

```markdown
[![CodeChef Rating](https://img.shields.io/endpoint?url=https%3A%2F%2FYOUR_VERCEL_DOMAIN%2Fapi%2Fcodechef%2FUSERNAME)](https://www.codechef.com/users/USERNAME)
```

**Example (using `compro-badges.vercel.app`):**

```markdown
[![CodeChef Rating](https://img.shields.io/endpoint?url=https%3A%2F%2Fcodechef-badges.vercel.app%2Fapi%2Fcodechef%2Ftourist)](https://www.codechef.com/users/tourist)
```

## 📡 API

### `GET /api/codechef/[username]`
Returns a JSON response compatible with Shields.io endpoint.

**Response Example:**
```json
{
  "schemaVersion": 1,
  "label": "CodeChef",
  "message": "3822",
  "color": "#D0011B",
  "cacheSeconds": 3600
}
```

## 💻 Development

### Prerequisites
- Node.js
- pnpm

### Installation
```bash
pnpm install
```

### Run Locally
```bash
pnpm dev
```
Access the app at `http://localhost:3000`.

### Run Tests
```bash
pnpm test
```

## ☁️ Deployment

Deploy easily with Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkuhaku-space%2Fcodechef-badges)
