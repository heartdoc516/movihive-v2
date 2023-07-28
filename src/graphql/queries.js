/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFavorite = /* GraphQL */ `
  query GetFavorite($id: ID!) {
    getFavorite(id: $id) {
      id
      name
      tmdbId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listFavorites = /* GraphQL */ `
  query ListFavorites(
    $filter: ModelFavoriteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFavorites(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        tmdbId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;