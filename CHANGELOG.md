# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.0.0](https://github.com/kobihanoch/pilatesapp-frontend/compare/v0.1.1...v1.0.0) (2025-07-01)


### Features

* **AddUserToSessionModal:** Implement user addition to session with error handling and notifications ([9d338f0](https://github.com/kobihanoch/pilatesapp-frontend/commit/9d338f03ee702956860c01ac7b35a69fa8cd68a1))
* **AdminDashboard:** Created first UI design ([19c532f](https://github.com/kobihanoch/pilatesapp-frontend/commit/19c532fec34d1573c483fbde4547c21807c72503))
* **AdminDashboard:** Created logic hook to admins dashboard, added API call to fetch all sessions for admins ([eaab5ce](https://github.com/kobihanoch/pilatesapp-frontend/commit/eaab5cea04b2988317078fdf0695a200444d831f))
* **AdminDashboard:** Integrate user data fetching and loading state management ([7cd58a5](https://github.com/kobihanoch/pilatesapp-frontend/commit/7cd58a561c5ca065c9f62aa38bb8623cee5f4803))
* **admins:** added admins page and auto redirect ([c889b75](https://github.com/kobihanoch/pilatesapp-frontend/commit/c889b758823eadc16bf393d204f78719543779d9))
* **AdminsDashboard:** Created user data serction and session data section manager ([d344035](https://github.com/kobihanoch/pilatesapp-frontend/commit/d3440355fee219087ef9bff4fe8b8a0e76897f36))
* **AllSessionsTable:** Added notes to info ([561f130](https://github.com/kobihanoch/pilatesapp-frontend/commit/561f1308ed08c4bb79e9c3ed54ec00980b4273e0))
* **AllSessionsTable:** Center align text in table header for improved readability ([a24da03](https://github.com/kobihanoch/pilatesapp-frontend/commit/a24da0396b30dd9f6b1d4cfdb540059b44efd7fd))
* **AllSessionsTable:** Display session duration in minutes ([a8800ed](https://github.com/kobihanoch/pilatesapp-frontend/commit/a8800ed95b5572f82a4d7764a10b6b88190e0ae7))
* **AllSessionsTable:** Implement user registration to sessions with error handling ([8301038](https://github.com/kobihanoch/pilatesapp-frontend/commit/83010380842b252345133a89e9d7e4496bb4bccc))
* **AllUsersTable:** Add role badge styling for better visual distinction ([cfbf95e](https://github.com/kobihanoch/pilatesapp-frontend/commit/cfbf95e15b63b94a6c467a349c6513d552e6e01a))
* **AllUsersTable:** Implement user deletion functionality and enhance error translations ([c50ede4](https://github.com/kobihanoch/pilatesapp-frontend/commit/c50ede4752a3810c85e74aaeb301f66f5a5e0f80))
* **AvailableSessionItem:** update session opacity and disable button for completed sessions ([3b05c9e](https://github.com/kobihanoch/pilatesapp-frontend/commit/3b05c9eb13128a1a91b47c73ad730dc1d7655dd3))
* **EditSessionModal:** Integrate session update functionality with toast notifications ([06ccab7](https://github.com/kobihanoch/pilatesapp-frontend/commit/06ccab769247e13097c243ad099cf3fdcbad4b5a))
* **EditUser:** Add user editing functionality with modal and update service ([4cc1342](https://github.com/kobihanoch/pilatesapp-frontend/commit/4cc13421bfcc1f74b6ea6950cb932adf779ee6bd))
* **ErrorContext:** Created error context using toast notifications ([9cacf6c](https://github.com/kobihanoch/pilatesapp-frontend/commit/9cacf6c2b5d611db91ffaaa833cfe20a3a1f5666))
* **HandleSessions:** Live updating with in component states ([0df8872](https://github.com/kobihanoch/pilatesapp-frontend/commit/0df8872c6fb97383bc9d44e9222c4f5f915fe61d))
* **Layout:** Created auth. layout to show top bar. Top bar is fully independed with access to auth context. ([9fc67cd](https://github.com/kobihanoch/pilatesapp-frontend/commit/9fc67cd4fe2ec2c2f8a8d134f3ee1ebde50877cf))
* **routes:** add logging for user roles in Private and Admin routes ([8b1965c](https://github.com/kobihanoch/pilatesapp-frontend/commit/8b1965c281a9ccd2d976acb5134aa7ed7d93c135))
* **SessionFilterSection, UserFilterSection:** Remove maxWidth property for improved responsiveness ([d1e06cc](https://github.com/kobihanoch/pilatesapp-frontend/commit/d1e06cc2cd3391bfc6abc905480179304bf8077d))
* **Sessions:** Created a modal for creating new sessions ([5cb50df](https://github.com/kobihanoch/pilatesapp-frontend/commit/5cb50dfa33f8fdf47992c097644ddd12600b87e3))
* **sessionService:** Add fetchFilteredSessions function for paginated and searchable session retrieval ([e735a18](https://github.com/kobihanoch/pilatesapp-frontend/commit/e735a18b0bd2fbd014c4f7be852e403675164588))
* **Sessions:** Implemented feature to create a session ([84a9af7](https://github.com/kobihanoch/pilatesapp-frontend/commit/84a9af7b12565af8039a3c464608047a13095d7f))
* **SessionsSection:** Add Pagination component for improved session navigation ([5fb676b](https://github.com/kobihanoch/pilatesapp-frontend/commit/5fb676be393bc750fa3bed3fe8579ed03f3b92e9))
* **SessionsSection:** Admin now can add/remove a user (integrate with server, UI not fully implemented yet). ([731dc39](https://github.com/kobihanoch/pilatesapp-frontend/commit/731dc3942859ecaa6b166fd3938739d65be6fc33))
* **SessionsSection:** Enhance create session button with icon and styling ([2eaf4ef](https://github.com/kobihanoch/pilatesapp-frontend/commit/2eaf4efd3b666579cf71c10acfc2bce875c96376))
* **SessionsSection:** Enhance session pagination and search functionality ([ed53418](https://github.com/kobihanoch/pilatesapp-frontend/commit/ed53418d1dff92c053c29abb4443da98bd78c5f4))
* **SessionsSection:** Enhance UI with search and sorting functionality ([3b1b276](https://github.com/kobihanoch/pilatesapp-frontend/commit/3b1b276427f616d065a2c7c0e7f0dd548e874bf3))
* **SessionsSection:** Implement debounced search and fetch filtered sessions ([0d8daf0](https://github.com/kobihanoch/pilatesapp-frontend/commit/0d8daf0d58878dad7265f7470cacaee2b09f27df))
* **SessionsSection:** Implement session data update functionality, no UI yet ([a445a11](https://github.com/kobihanoch/pilatesapp-frontend/commit/a445a11740a1705e437acd368f381755f1f2bcca))
* **SessionsSection:** Integrate AllSessionsTable component to display session data ([3faca91](https://github.com/kobihanoch/pilatesapp-frontend/commit/3faca91d621310bc5d269e9a20aba61dd04abc48))
* **SessionsSection:** Integrate SessionFilterSection for improved search and sorting functionality ([8f786c0](https://github.com/kobihanoch/pilatesapp-frontend/commit/8f786c07ed72d14e38c61e8960395f328e4d9202))
* **SessionsTable:** Created modals for updating a session / add a user to session ([c99974c](https://github.com/kobihanoch/pilatesapp-frontend/commit/c99974cd67a18e21d44cde1903f4fbca4ee988c3))
* **TopBar:** Add home button for admins on admin page, enhance navigation options ([96c46cc](https://github.com/kobihanoch/pilatesapp-frontend/commit/96c46cc42bf1d7d5cd5dcfd9c69d2a1cb4f9086b))
* **TopBar:** enhance button styles for better accessibility and user experience ([f18b1ae](https://github.com/kobihanoch/pilatesapp-frontend/commit/f18b1ae84e2f698c317aee042ba6155cda14a648))
* **TopBar:** enhance layout and add admin dashboard navigation ([0efc32d](https://github.com/kobihanoch/pilatesapp-frontend/commit/0efc32d6b44a84e7a924986498c03f3007afae46))
* **translateError:** Add error translation utility for improved error handling ([71f1d5d](https://github.com/kobihanoch/pilatesapp-frontend/commit/71f1d5d991a3ac9d7ea65382e4ea39f898855dc4))
* **translateError:** Add translation for "User already registered to this session" ([8be6bd4](https://github.com/kobihanoch/pilatesapp-frontend/commit/8be6bd44358d4e29628ef32a400959a85d9cf463))
* **TranslateErrors:** Added new translations to new server errors ([0058878](https://github.com/kobihanoch/pilatesapp-frontend/commit/0058878909d03a72f819b12ded368d05f4e60738))
* **useAdminPageLogic:** Added fetching for all users ([891cc93](https://github.com/kobihanoch/pilatesapp-frontend/commit/891cc933b88ce715408f7de9e8d5a30204798a5d))
* **UsersSection:** Implement user filtering and pagination with new components ([5fd307f](https://github.com/kobihanoch/pilatesapp-frontend/commit/5fd307fef4e151afc25f154ff4c1d5533acb1b05))
* **WorkoutSection:** filter upcoming workouts to show only today's and future sessions ([7625caf](https://github.com/kobihanoch/pilatesapp-frontend/commit/7625cafb92ba74a14046e37ea36c23476eb4c82a))


### Bug Fixes

* **api:** Prevent token refresh for specific routes ([e7ea7bf](https://github.com/kobihanoch/pilatesapp-frontend/commit/e7ea7bf2a687dfac959d9b225c58bd902cad9132))
* **App:** Update loading spinner text for PrivateRoute and AdminRoute ([36e711f](https://github.com/kobihanoch/pilatesapp-frontend/commit/36e711f1810512643b6626ca8c91ff4d47034b8a))
* **AuthProvider:** Add setSessions to context value ([36c1716](https://github.com/kobihanoch/pilatesapp-frontend/commit/36c17164a0b5059e62badcc91bb06ecbc07c45e2))
* **ErrorContext:** Correct toast error message formatting ([f6e7f13](https://github.com/kobihanoch/pilatesapp-frontend/commit/f6e7f13dc682d7df1cb5ad9e66faaa514e8d51c6))
* **ErrorContext:** Refactor setError function to accept error object for better clarity ([b1a387b](https://github.com/kobihanoch/pilatesapp-frontend/commit/b1a387b9ca87640861da9751f7b84f3f86cd59d9))
* **ErrorProvider:** Change toast notification from error to warning for error messages ([c4a27ce](https://github.com/kobihanoch/pilatesapp-frontend/commit/c4a27ce32c5afa9aaea6f99cb8a4c1e1a3c70e85))
* **ErrorProvider:** Change toast notification from warning to error for error messages ([8658e27](https://github.com/kobihanoch/pilatesapp-frontend/commit/8658e27770a3b9e5460ca13340998cbcdd824cbb))
* **Errors:** All components are showing errors with error context ([b3696d0](https://github.com/kobihanoch/pilatesapp-frontend/commit/b3696d0bf339dcdcd205baf6c0aa5049f522648f))
* **LoadingSpinner:** Change background color from #fff0db to white ([625cda1](https://github.com/kobihanoch/pilatesapp-frontend/commit/625cda1656ca2c7cb837f565931c5e2bfd6ded57)), closes [#fff0](https://github.com/kobihanoch/pilatesapp-frontend/issues/fff0)
* **LoginAndRegisterForms:** Update setError to use Error object ([b63a072](https://github.com/kobihanoch/pilatesapp-frontend/commit/b63a07207fec40c2004030a694ff2af04901ac9d))
* **LoginForm:** Replace alert with setError ([f77f77d](https://github.com/kobihanoch/pilatesapp-frontend/commit/f77f77dd32aa5850897f37103f51d7f197d3d32f))
* **RegisterForm:** Replace alert with error context for validation messages ([8adf441](https://github.com/kobihanoch/pilatesapp-frontend/commit/8adf4415f3806ebf23297abce0bf564676dad6f8))
* **registerUser:** Remove validation check for user fields in registration ([831ff60](https://github.com/kobihanoch/pilatesapp-frontend/commit/831ff60800bdbd1e88f3215e31e39e825e443e88))
* **RegistrationAndSessions:** Replace alerts with toast notifications for session registration and unregistration ([b83351f](https://github.com/kobihanoch/pilatesapp-frontend/commit/b83351fb6aedb4a6ef3f5c3532b043b08c371c69))
* **SessionService:** Added await to async function ([edf96af](https://github.com/kobihanoch/pilatesapp-frontend/commit/edf96af5fd1303a8214d424b565893f0fced2d05))
* **sessionService:** Remove unnecessary console logs and improve error handling ([f2a7b78](https://github.com/kobihanoch/pilatesapp-frontend/commit/f2a7b78bdf6c8cc1c6a229a4b8f85a843c590139))
* **useAllSessionsFromDB:** Ensure loading state is managed correctly during data fetch ([a658415](https://github.com/kobihanoch/pilatesapp-frontend/commit/a658415dce3e6ad02b7b28d500fd34c5db89d3bc))
* **useAllSessionsFromDB:** Set error to context ([508b187](https://github.com/kobihanoch/pilatesapp-frontend/commit/508b1870ecf5630b0703ef806ba98e8fe1d30325))

### 0.1.1 (2025-05-14)


### Features

* Login and local storage for logged in users is fully functional ([4cb06b3](https://github.com/kobihanoch/pilatesapp-frontend/commit/4cb06b30643d49a78e7705c611c4678ca3ac20aa))
