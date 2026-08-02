import { GraphQLClient } from 'graphql-request'
import { API } from './API'

const client = new GraphQLClient(API.BASE_URL, {
  headers: {
    Authorization: `Bearer ${API.HYGRAPH_TOKEN}`,
    'gcms-stage': 'DRAFT'
  },
})

export default client