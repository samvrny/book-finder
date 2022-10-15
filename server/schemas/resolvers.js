const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Book } = require('../models');

//create and define the resolvers 
const resolvers = {
    //queries (the 'R' in the CRUD operations)
    Query: {
        me: async(parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('savedBooks');
                
                return userData;
            }
            throw new AuthenticationError('Not logged in')
        },
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('savedBooks');
        }
    },
    //mutations (the C,U,D of the CRUD operations)
    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async(parent, { email, password}) => {
            const user = await User.findOne({ email });

            if(!user) {
                throw new AuthenticationError('Invalid username')
            }

            const correctPassword = await user.isCorrectPassword(password);

            if(!correctPassword) {
                throw new AuthenticationError('Incorrect password')
            }

            const token = signToken(user)
            return { token, user };
        },
        saveBook: async(parent, { bookId }, context) => {
            if(context.user) {
                const updatedBookList = await User.findOneAndUpdate(
                    { _id: User.ID },
                    { $push: { savedBooks: { bookId } } },
                    { new: true, runValidators: true }
                );
                return updatedBookList;
            }
            throw new AuthenticationError('You need to be logged in!')
        }
    }
};

//export the resolvers
module.exports = resolvers;