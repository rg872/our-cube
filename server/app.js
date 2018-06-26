require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const { apolloUploadExpress } = require('apollo-upload-server')
const fs = require('fs')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds117701.mlab.com:17701/ourcube`)

const app = express()

const typeDefs = fs.readFileSync('./graphql/typeDefs.gql', 'utf8')
const resolvers = require('./graphql/resolvers')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

// The GraphQL endpoint
app.use('/graphql', apolloUploadExpress(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected to mongoose mlab')
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
