This project was bootstrapped with `dotnet new webapi`.

## Available Scripts

In the project directory, you can run:

### `dotnet run`

Builds and runs the app in the development mode.

Open [http://localhost:5000](http://localhost:5000)  or [https://localhost:5001](https://localhost:5001) to view it in the browser.

## Routes

### `/api/user`

- Add user
  - Method: `POST`
  - Data Constraints: `{"email": "<email address>", "userName": "<user name>"}`
- Get all users
  - Method: `GET`
- Get specific user
  - Method: `GET`
  - URL: `/api/user/<user name>`
- Update user
  - Method: `PUT`
  - Data Constraints: `{"userName": "<user name>", "bio": "<bio>", "avatarUrl": "<link to image or embedded image data>"}`
- Delete user
  - Method: `DELETE`
  - Data Constraints: `{"userName": "<user name>"}`

### `dotnet test ..\..\..\tests\unittests\infra\webapi`

Launches the test runner.

### `dotnet build`

Builds the component.
