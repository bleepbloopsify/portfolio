import { gql } from 'apollo-boost';
import React from 'react';
import { Query } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import AccountCard from './Account';

const GET_ACCOUNTS = gql`
{
  accounts {
    username
    email
  }
}
`;

export default () => (
  <div className="list-group-flush">
    <Query query={GET_ACCOUNTS}>
      {({ loading, error, data: { accounts } = {}}) => {
        if (loading) return <FontAwesomeIcon icon={faSpinner} spin />;
        if (error) return `Error ${error.message}`;

        return accounts.map((account, idx) => 
          <AccountCard key={idx} {...account} />
        );
      }}
    </Query>
  </div>
);

