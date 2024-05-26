## File Structure

```plaintext
.paramtech-case-study/
├── assets/
│   ├── Fonts/
│   │   ├── fonts (e.g. poppins)
│   │
│   ├── Icons/
│   │   ├── icons (e.g. arrowIcon.tsx)
│
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   └── index.tsx
│   │   ├── Input/
│   │   │   └── index.tsx
│   │   ├── Navigator/
│   │   │   └── Header.tsx
│   │   ├── Sheet/
│   │   │   ├── InfoSheet.tsx
│   │   │   └── SelectSheet.tsx
│   │   ├── Text/
│   │       └── index.tsx
│   │
│   ├── context/
│   │   └── theme.ts
│   │
│   ├── core/
│   │   ├── localization/
│   │   └── i18next.config.ts
│   │
│   ├── hooks/
│   │   ├── useAddAddress.tsx
│   │   └── useTheme.ts
│   │
│   ├── navigation/
│   │   └── root.tsx
│   │
│   ├── screens/
│   │   ├── AddNewAddress/
│   │   │   └── Items/
│   │   │       └── helper components (e.g. AddressForm.tsx)
│   │   │   └── index.tsx
│   │   ├── AddressList/
│   │   │   └── Items/
│   │   │       └── helper components (e.g. EmptyList.tsx)
│   │   │   └── index.tsx
│   │   └── Splash/
│   │       └── index.tsx
│   │
│   ├── service/
│   │   ├── axios.ts
│   │   └── service.ts
│   │
│   ├── store/
│   │   └── features/
│   │       ├── address/
│   │       │   └── addressSlice.ts
│   │   ├── rootReducer.ts
│   │   └── store.ts
│   │
│   ├── types/
│   │   ├── addressSlice.type.ts
│   │   ├── addressTypes.ts
│   │   ├── apiTypes.ts
│   │   └── navigationTypes.ts
│   │
│   ├── utils/
│   │   ├── errorAlert.ts
│   │   └── formatting.ts
│
├── App.tsx
├── package.json
```

## Important Files and Functions

- useAddressForm.tsx: This file is a custom React hook for managing the address form. It contains various functions to
  handle user inputs, validation, and form state management.
- addressSlice.ts: [Click for information](src/store/store-usage.md)

## API

[Please use this doc for api](./src/service/use-api.md)

## Localization

The localization folder contains translation files for different languages. The application automatically loads the
correct translations based on the user's language preference.

## Application Flow

- Address Form: Users enter their address information on this screen.
- Address Listing: Entered addresses are listed and managed on this screen.
- Language Support
- The application supports multiple languages. Currently supported languages are:

Turkish
English

## Adding a New Language

- Add a new language file to the localization folder (e.g., es.json).
- Add the translations to the corresponding language file.

## Package Scripts

- yarn start: Starts the application in development mode.
- yarn build: Builds the application for production.
- yarn test: Runs the tests.

## Conclusion

This document provides information about the setup, usage, and internal structure of the address application. For any
questions or contributions, please feel free to contact us.
