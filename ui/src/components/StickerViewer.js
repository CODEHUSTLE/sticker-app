import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Table } from 'reactstrap';

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      name
      address
      email
    }
  }
`;

export default () => (
  <Query query={GET_POSTS}>
    {({ loading, data }) =>
      !loading && (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.name}</td>
                <td>{post.address}</td>
                <td>{post.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    }
  </Query>
);
