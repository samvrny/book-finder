import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_NEW_BOOK = gql`
    mutation saveNewBook($bookId: String!, $authors: [String!], $description: String!, $title: String!, $image: String!, $link: String!) {
        saveNewBook(bookId: $bookId, authors: $authors, description: $description, title: $title, image: $image, link: $link) {
            savedBooks {
                id
                authors
                description
                title
                image
                link
            } 
            _id
            username
            email
            bookCount
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            _id
            username
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;