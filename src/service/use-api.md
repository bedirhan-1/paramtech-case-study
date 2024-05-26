## API Usage

The address application provides two endpoints: addresses and cities. Below are the details for each endpoint and their
usage:

## Postman Collection

[click for open the collection](https://www.postman.com/blue-station-354277/workspace/paramtech-case-study/folder/16478148-b97ad295-5495-4dda-a708-feea0a54f041)

## Endpoints

1. `addresses`
   This endpoint is used for performing CRUD (Create, Read, Update, Delete) operations on the stored addresses.

    - GET /addresses: Retrieves a list of all addresses.
    - POST /addresses: Adds a new address.
    - PUT /addresses/ : Updates an existing address with the specified ID.
    - DELETE /addresses/ : Deletes an existing address with the specified ID.


2. `cities`
   This endpoint is used for retrieving the list of cities. It supports only the GET operation.

    - GET /cities: Retrieves a list of all cities.
      Example Usage

### Fetching All Addresses

```bash
curl -X GET https://664cb006ede9a2b556513515.mockapi.io/api/v1/addressList
```

### Adding a New Address

```bash
curl -X POST https://664cb006ede9a2b556513515.mockapi.io/api/v1/addressList \
-H "Content-Type: application/json" \
-d '{
"addressTitle": "address title",
"city": "city 1",
"addressDetails": "address details" 
}'
```

### Updating an Address

```bash
curl -X PUT https://664cb006ede9a2b556513515.mockapi.io/api/v1/addressList/:addressId \
-H "Content-Type: application/json" \
-d '{
"addressTitle": "address title",
"city": "city 1",
"addressDetails": "address details" 
}'
```

### Deleting an Address

```bash
curl -X DELETE https://664cb006ede9a2b556513515.mockapi.io/api/v1/addressList/:addressId
```

### Fetching All Cities

```bash
curl -X GET https://664cb006ede9a2b556513515.mockapi.io/api/v1/cities
```

### Conclusion

This document provides detailed information on how to use the API endpoints available in the address application.
If you
have any questions or need further assistance, please feel free to contact us.
