const axios = require('axios')

const resolvers = {
  Query: {
    video: async (_, { token }) => {
      try {
        let video = await axios.get('http://localhost:3000/videos/email', { headers: { token } })
        return video
      } catch (error) {
        return error
      }
    },

    videos: async (_, { token }) => {
      try {
        let videos = await axios.get('http://localhost:3000/videos', { headers: { token } })
        return videos
      } catch (error) {
        return error
      }
    },

    comment: async (_, { token }) => {
      try {
        let comment = await axios.get('http://localhost:3000/comments/email', { headers: { token } })
        return comment
      } catch (error) {
        return error
      }
    },

    comments: async (_, { token }) => {
      try {
        let comments = await axios.get('http://localhost:3000/comments', { headers: { token } })
        return comments
      } catch (error) {
        return error
      }
    }
  },

  Mutation: {
    commentVideo: async (_, { id, detail }) => {
      try {
        let comment = await axios.post(`http://localhost:3000/comments/${id}`, { detail } ,{ headers: { token } })
        return comment
      } catch (error) {
        return error
      }
    },
    voteVideo: async (_, { id, vote }) => {
      try {
        let video = await axios.put(`http://localhost:3000/videos/vote/${id}`, { vote } ,{ headers: { token } })
        return video
      } catch (error) {
        return error
      }
    },
    voteComment: async (_, { id, vote }) => {
      try {
        let comment = await axios.put(`http://localhost:3000/comments/vote/${id}`, { vote } ,{ headers: { token } })
        return comment
      } catch (error) {
        return error
      }
    },
    deleteComment: async (_, { id }) => {
      try {
        let comment = await axios.delete(`http://localhost:3000/comments/${id}`, { headers: { token } })
        return comment
      } catch (error) {
        return error
      }
    },
    deleteVideo: async (_, { id }) => {
      try {
        let video = await axios.delete(`http://localhost:3000/videos/${id}`, { headers: { token } })
        return video
      } catch (error) {
        return error
      }
    },
  }
}

module.exports = resolvers