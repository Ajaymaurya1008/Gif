# Gif App 🎭

A feature-rich mobile application built with Expo and React Native that allows users to browse, search, download and share GIFs from the GIPHY platform.

## Media

<div style="display: flex; justify-content: space-between;">
   <img src="https://res.cloudinary.com/dfh7pmyj0/image/upload/v1731798776/Home_xfv77p.jpg" alt="Home" width="32%" />
   <img src="https://res.cloudinary.com/dfh7pmyj0/image/upload/v1731798775/Details_y6ucir.jpg" alt="Details" width="32%" />
   <img src="https://res.cloudinary.com/dfh7pmyj0/image/upload/v1731798776/Search_o6qrxu.jpg" alt="Search" width="32%" />
</div>
<div style="display: flex; justify-content: space-between;">
   <img src="https://res.cloudinary.com/dfh7pmyj0/image/upload/v1731798776/Home-dark_kes25h.jpg" alt="Home dark" width="32%" />
   <img src="https://res.cloudinary.com/dfh7pmyj0/image/upload/v1731798775/Details-dark_ygbbnl.jpg" alt="Details dark" width="32%" />
   <img src="https://res.cloudinary.com/dfh7pmyj0/image/upload/v1731798776/Search-dark_jewapd.jpg" alt="Search dark" width="32%" />
</div>

[Video](https://github.com/user-attachments/assets/dfebc793-f875-4ccb-98a7-c5d1f5b72e00)

## Features ✨

- Browse trending GIFs
- Search GIFs with debounced search
- Dark/Light theme with persistent storage
- Download GIFs (Android)
- Share GIFs (iOS & Android)
- Infinite scroll pagination
- Custom splash screen
- Responsive tab navigation
- TypeScript support
- Tailwind CSS styling with NativeWind

## Tech Stack 🛠

- **Framework**: [Expo](https://expo.dev) with React Native
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (TailwindCSS for React Native)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **UI Components**:
  - [Expo Image](https://docs.expo.dev/versions/latest/sdk/image/)
  - [@shopify/flash-list](https://shopify.github.io/flash-list/)
  - [Expo Icons](https://docs.expo.dev/guides/icons/)
- **Storage**: [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- **Animations**: [Lottie React Native](https://github.com/lottie-react-native/lottie-react-native)

## Prerequisites 📋

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio & Android SDK (for Android development)

## Installation 🚀

1. Clone the repository:
```bash
git clone <repository-url>
cd gif-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your GIPHY API key:
```bash
EXPO_PUBLIC_GIPHY_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm start
```

## Project Structure 📁

```
├── app/                    # Main application screens
│   ├── (tabs)/            # Tab-based screens
│   ├── gif/               # GIF detail screens
│   └── search/            # Search screen
├── assets/                # Static assets
├── components/            # Reusable components
├── services/              # API services
├── styles/                # Global styles
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

## Key Features Explained 🔍

### Theme Switching
The app supports dynamic theme switching between light and dark modes. Theme preference is persisted using AsyncStorage.

### GIF Handling
- **Viewing**: GIFs are displayed using the optimized Expo Image component
- **Downloading**: Android users can download GIFs directly to their device
- **Sharing**: Cross-platform sharing functionality using Expo's sharing API

### Search
Implements debounced search to optimize API calls while typing.

### Performance
- Uses FlashList for optimized list rendering
- Implements infinite scroll with TanStack Query
- Lazy loading of images
- Debounced search functionality

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments 🙏

- [GIPHY API](https://developers.giphy.com/) for providing the GIF database
- [Expo](https://expo.dev) for the amazing development framework
- All the open-source libraries used in this project

## Contact 📧

For any queries or suggestions, please open an issue in the repository.

