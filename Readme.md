Project name- SauceDemo Automation Testing

This repository contains automated tests for the SauceDemo website using WebDriverIO and Node.js. 
 The tests cover various user scenarios to ensure the functionality of the application.

 Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Test Cases](#test-cases)
  - [Q1:Try login with locked_out_user and verify the error message,]
  - [Q2: Login, Reset App State, Add Items, Checkout]
  - [Q3: Performance User Login, Filter and Add Item, Checkout]
- [Running the Tests](#running-the-tests)
- [License](#license)

- Node.js (version 14 or higher)
- npm (Node package manager)
- A modern web browser - Google Chrome

- Installation
1. Clone the repository:
   bash
   git clone https://github.com/Ekaanta/Automation_Final_Project.git
   cd Automation_Final_Project
Install the necessary dependencies:
npm install
npx wdio config

Test Cases
Q1: Try Login with Locked Out User
Description: This test case attempts to log in using the locked_out_user 
account and verifies that the correct error message is displayed, indicating that the user cannot log in.
File: specs/Q1_LockedOutUserLogin.spec.js

Q2: Login, Reset App State, Add Items, Checkout
Description: This test case logs in as a standard user, resets the app state, 
adds three items to the cart, navigates to the checkout page, verifies product names and total price, completes the purchase, verifies the successful order message, resets the app state again, and logs out.
File: specs/Q2_LoginResetAddItemsCheckout.spec.js

Q3: Performance User Login, Filter and Add Item, Checkout
Description: This test case logs in as a performance glitch user, resets the app state,
filters products by name (Z to A), adds the first product to the cart, navigates to the checkout page, 
verifies product name and total price, completes the purchase, verifies the successful order message, 
resets the app state again, and logs out.
File: specs/Q3_PerformanceUserFilterAddItemCheckout.spec.js

TEST FILE
npx wdio run wdio.conf.js

Note -I can't run some test runnig successfulley but spec report show :2 pass,1 faild
if possible give me a feedback



