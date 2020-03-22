import React from 'react';
import { Card, CardBody, CardHeader, Table } from 'reactstrap';
import { useMembers } from '../hooks/useMembers';

export const MembersPage = (props: any) => {
  console.log(props)
  return (
    <div>
      <MembersComponent />
    </div>
  );
}

const MembersComponent = (props: any) => {
  const { user, createUser, deleteUser } = useMembers(props);

  const createRandomUser = () => {
    var now = Date.now();
    const newUser = {
      userName: now.toString(),
      email: now.toString() + "@email.com",
      bio: "This is the best thing ever!",
      avatarUrl: "https://image.com/new.png"
    };
    createUser(newUser);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <h2>Users</h2>
        </CardHeader>
        <CardBody>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Bio</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {
                user.map((u: any) => (
                  <tr key={u.userName}>
                    <td>{u.userName}</td>
                    <td>{u.bio}</td>
                    <td><button onClick={() => { deleteUser(u) }}>Remove</button></td>
                  </tr>
                ))
              }
              <tr>
                <td>
                  <button onClick={() => { createRandomUser() }}>Create random user</button>
                </td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  )
}
