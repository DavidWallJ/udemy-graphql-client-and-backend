/**
 * Created by david on 7/6/17.
 */
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString
} = graphql;
const UserType = require('./types/userType');
const AuthService = require('../services/auth')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      // request represents the request object coming from the front-end
      // es6 destructuring below.  GraphQL is passing args through the second argument. We can call it whatever we want
      // args has an email and password field on it thus { email, password }
      resolve(parentValue, { email, password }, req) {
       return AuthService.signup({ email, password, req
       });
      }
      // next wire-up mutation to schema.js
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        // same as const user = req.user
        // this is coming from passport as is the logout function
        const { user } = req;
        req.logout();
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.login({ email, password, req });
      }
    }
  }
});

module.exports = mutation;
