const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');

const POSTS = [
  { name: 'John Doe', address: 'Hello world', email: 'test@email.com' },
  { name: 'Jane Doe', address: 'Hi, planet!', email: 'test@email.com' },
];

const schema = buildASTSchema(gql`
  type Query {
    posts: [Post]
    post(id: ID!): Post
    sticker: [Stickers]
  }

  type Post {
    id: ID
    name: String
    address: String
    email: String
  }

  type Stickers {
    id: ID
    sticker: String
    type: String
  }
`);

const mapPost = (post, id) => post && { id, ...post };

const root = {
  posts: () => POSTS.map(mapPost),
  post: ({ id }) => mapPost(POSTS[id], id),
};

const app = express();
app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

const port = process.env.PORT || 4300;
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
