# E-Cart React Native App

Welcome to **E-Cart**, a React Native e-commerce application built using Expo Router and Zustand for state management. This app supports user authentication (Sign Up / Sign In) and guest checkout with separate checkout flows.

---

### Login Credentails
username: mor_2314

password: 83r5^_

Note: FakeStoreApi only support single credentials for login as the SignUp user is NOT stored in their database.

## Features

- **User Authentication**: Sign Up / Sign In with user details stored securely.
- **Guest Checkout**: Users can checkout as guests by providing additional details (username, password).
- **Cart Management**: Add, increment, decrement, remove products with a limit of up to 10 per item.
- **Persistent Cart**: Cart data saved and loaded from AsyncStorage.
- **Responsive UI**: Built with React Native responsive utilities.
- **Order Summary**: Checkout page displays real cart data including product details, quantity, and total price.

---

## Project Structure

/app # Expo Router routes (screens)
/screens
/auth # Authentication screens (Sign In / Sign Up)
/tabs # Main app tab navigation (Home, Cart, Profile, etc.)
Landing.tsx # Landing page for guest or auth navigation
/hooks # Custom React hooks (e.g., useAuthMode)
/store # Zustand store files (cartStore.ts)
/utils # Utility and helper functions (e.g., constants, helper.tsx)
/components # Reusable UI components (e.g., CustomButton.tsx)
/assets # Images, fonts, icons, etc.
app.json # Expo configuration with scheme for deep linking

yaml
Copy
Edit

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Fang-dev73/E-Cart
cd E-Cart


Install dependencies:
npm install
# or
yarn install


To run on android: 
npm run android
# or
To run on ios:
npm run ios

Routes / Screens
Route Path	Description
/ (Landing)	Landing page with Sign In / Guest option
/screens/(auth)/Auth	Authentication screen (Sign Up / Sign In)
/screens/(tabs)/Home	Main app home tab
/screens/(tabs)/Cart	Cart screen with checkout form
/screens/(tabs)/Orders	Past orders and history


```


Contact
For any questions or contributions, please reach out to:
GitHub: Fang-dev73
