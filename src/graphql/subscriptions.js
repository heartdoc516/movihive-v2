/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFavorite = /* GraphQL */ `
  subscription OnCreateFavorite(
    $filter: ModelSubscriptionFavoriteFilterInput
    $owner: String
  ) {
    onCreateFavorite(filter: $filter, owner: $owner) {
      id
      tmdbId
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateFavorite = /* GraphQL */ `
  subscription OnUpdateFavorite(
    $filter: ModelSubscriptionFavoriteFilterInput
    $owner: String
  ) {
    onUpdateFavorite(filter: $filter, owner: $owner) {
      id
      tmdbId
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteFavorite = /* GraphQL */ `
  subscription OnDeleteFavorite(
    $filter: ModelSubscriptionFavoriteFilterInput
    $owner: String
  ) {
    onDeleteFavorite(filter: $filter, owner: $owner) {
      id
      tmdbId
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
