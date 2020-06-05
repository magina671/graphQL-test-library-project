const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;

//dummy data
var books = [
  { name: "Game of thrones", genre: "Fantasy", id: "1" },
  { name: "Harry Potter", genre: "Fantasy", id: "2" },
  { name: "Game of thrones", genre: "Sci-Fi", id: "3" },
  { name: "Cosmos", genre: "Sci-Fi", id: "4" },
  { name: "Moon life", genre: "Sci-Fi", id: "5" },
  { name: "Galacticos", genre: "Thriller", id: "6" },
];

var authors = [
  { name: "John Snow", age: 42, id: "1" },
  { name: "Tirion Lannister", age: 30, id: "2" },
  { name: "Daenerys Targaryen", age: 18, id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db/ other source
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
