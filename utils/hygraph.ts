import { GraphQLClient } from 'graphql-request'
import { API } from './API'

const client = new GraphQLClient(API.BASE_URL, {
//   headers: {
//     Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
//   },
})

export default client