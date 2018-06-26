import gql from "graphql-tag"

export const GET_ALL_VIDEOS = gql`
  query GetVideos($token: String) {
    videos(token: $token) {
      _id
      title
      detail
      vote
      user
      voters
      comments
    }
  }
`