## Server part

### How to start:
- execute `npm run dev`
- open http://localhost:5000/graphql

---

### Examples

```graphql
query {
    getAllUsers {
        id, username
    }
}

query {
    getUser(id: "1") {
        username, age
    }
}

mutation {
    createUser(input: {
        username: "TestUser",
        age: 35
    }) {
        id, username, age
    }
}

mutation {
    createUser(input: {
        username: "TestUser",
        age: 35,
        posts: [
            { id: "222", title: "Test post", content: " some content" }
        ]
    }) {
        id, username, age
    }
}

query {
    getAllUsers {
        username, posts {
            id, title, content
        }
    }
}
```
