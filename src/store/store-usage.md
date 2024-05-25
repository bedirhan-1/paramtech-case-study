# Address Management with Redux Toolkit

### Asynchronous Actions

In our address management system, we use Redux Toolkit to handle asynchronous operations through extra reducers. These
reducers manage state updates for fetch, add, update, and delete actions for addresses.

- `fetchAddresses`
  This function is an extra reducer function because it handles asynchronous operations. It sends a request to fetch all
  addresses and, upon receiving a response, saves the data to the store using Redux Toolkit.

- `addAddress`
  This function is an extra reducer function for adding a new address. It sends a request to add an address and saves
  the
  returned data to the store if the request is successful.

- `updateAddress`
  This function is an extra reducer function for updating an existing address. It sends a request to update the address
  and updates the store with the new address data upon success.

- `deleteAddress`
  This function is an extra reducer function for deleting an address by ID. It sends a request to delete the address and
  removes the address from the store upon successful deletion.

### Extra Reducers Overview

Each of these functions follows a similar pattern:

`Pending`: The state status is set to loading.

`Fulfilled`: If the request is successful, the state status is set to succeeded and the data is updated in the store.

`Rejected`: If the request fails, the state status is set to failed and an error message is saved.

By handling these asynchronous actions with extra reducers, we ensure that our application state is consistently managed
and updated in response to backend operations.
