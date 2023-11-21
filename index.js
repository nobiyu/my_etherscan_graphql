const { ApolloServer } = require("apollo-server"); // Import ApolloServer from apollo-server
const { importSchema } = require("graphql-import"); // Import importSchema from graphql-import
const EtherDataSource = require("./datasource/ethDatasource"); // Import EtherDataSource class 

require("dotenv").config(); // Load environment variables from .env file

const resolvers = {
    Query: {
        etherBalanceByAddress: (root, _args, { dataSources }) => // Resolver to get ether balance for an address
            dataSources.ethDataSource.etherBalanceByAddress(),

        totalSupplyOfEther: (root, _args, { dataSources }) => // Resolver to get total ether supply
            dataSources.ethDataSource.totalSupplyOfEther(),

        latestEthereumPrice: (root, _args, { dataSources }) => // Resolver to get latest ETH price
            dataSources.ethDataSource.getLatestEthereumPrice(),

        blockConfirmationTime: (root, _args, { dataSources }) => // Resolver to get average block confirmation time
            dataSources.ethDataSource.getBlockConfirmationTime(),
    },
};

const server = new ApolloServer({ // Create ApolloServer instance
    typeDefs,
    resolvers,
    dataSources: () => ({
        ethDataSource: new EtherDataSource(), // Instantiate EtherDataSource
    }),
});

server.timeout = 0;

server.listen("9000").then(({ url }) => { // Start ApolloServer on port 9000
    console.log(`🚀 Server ready at ${url}`);
});