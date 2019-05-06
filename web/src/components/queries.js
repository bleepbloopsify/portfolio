import { gql } from 'apollo-boost';

export const GET_ROCKS = gql`
{
  rocks {
    id
    name
    value
  }
}
`;

export const MINE_ROCK = gql`
mutation {
  mineRock(tool_id:0) {
    id
    name
    value
  }
}
`;