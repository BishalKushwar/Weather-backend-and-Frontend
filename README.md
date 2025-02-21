# Weather App

A modern weather application built with Next.js that allows users to check weather conditions for cities worldwide. The app features a clean, responsive interface with real-time weather updates and recent search history.

## Features

- Real-time weather data from OpenWeatherMap API
- Search for any city worldwide
- Recent search history
- Detailed weather information including:
  - Temperature (current, feels like, min/max)
  - Humidity
  - Wind speed and direction
  - Weather conditions with icons
- Responsive design with a modern UI
- Local storage for search history persistence

## Prerequisites

Before you begin, ensure you have:
- Node.js 18.17 or later
- An OpenWeatherMap API key ([Get one here](https://openweathermap.org/api))

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Create a `.env.local` file in the root directory and add your OpenWeatherMap API key:
```
API_KEY=your_openweathermap_api_key_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
weather-app/
├── app/
│   ├── api/
│   │   └── weather/
│   │       └── route.js    # Weather API endpoint
│   ├── layout.js           # Root layout
│   └── page.js             # Main weather app page
├── public/
├── .env.local              # Environment variables
└── package.json
```

## Technologies Used

- [Next.js 14](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide React](https://lucide.dev/) - Icons
- [OpenWeatherMap API](https://openweathermap.org/api) - Weather data

## Development

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a custom font family.

## API Routes

The app includes a Next.js API route for fetching weather data:

- `/api/weather?city={cityname}` - GET request to fetch weather data for a specific city

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1. Push your code to a Git repository
2. Import your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
- [OpenWeatherMap API Documentation](https://openweathermap.org/api) - Weather API endpoints
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Styling framework
- [Lucide React Documentation](https://lucide.dev/docs/lucide-react) - Icon library

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.