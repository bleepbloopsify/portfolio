import { gql } from 'apollo-boost';

export const REGISTER_ACCOUNT = gql`
mutation {
  registerAccount
}
`;

export const LOGIN_ACCOUNT = gql`
mutation login($email: String!, $password: String!) {
  login(account:{
    email: $email
    password: $password
  })
}
`;


export const GET_ACCOUNT = gql`
{
  me {
    username
    email
  }
}
`;

export const GET_ROCKS = gql`
{
  rocks {
    id
    name
    count
  }
}
`;

export const MINE_ROCK = gql`
mutation mineRock($tool_id: Int) {
  mineRock(tool_id:$tool_id) {
    id
    name
    count
  }
}
`;

export const GET_TOOLS = gql`
{
  tools {
    id
    name
    power
    modifiers { text }
  }
}
`;

export const PURCHASE_TOOLS = gql`
mutation {
  addTool(rocks:[]) {
    id
    name
    power
    modifiers
  }
}
`;

export const GET_STORE = gql`
{
  store {
    name
    costs {
      name
      cost
    }
  }
}
`;

export const PURCHASE_TOOL = gql`
mutation purchaseTool($shop_idx: Int){
  purchaseTool(shop_idx: $shop_idx) {
    id
    name
    power
    modifiers { text }
  }
}
`;

export const DELETE_TOOL = gql`
mutation deleteTool($tool_id: Int) {
  deleteTool(tool_id: $tool_id) {
    id
  }
}
`;

export const USE_RECIPE = gql`
mutation useRecipe($tool_id: Int, $recipe_id: Int) {
  useRecipe(tool_id: $tool_id, recipe_id: $recipe_id) { 
    text
  }
}
`;